import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ModuleList, CommonService } from '../../../common.service';

@Component({
  selector: 'app-filesupload',
  templateUrl: './filesupload.component.html',
  styleUrls: ['./filesupload.component.scss']
})
export class FilesuploadComponent implements OnInit {

  @ViewChild('appointFile', { static: false }) modalFiles: ModalDirective;
  @ViewChild('fileInput', { static: false }) fileInput;;
  @Output() uploadFileEvent = new EventEmitter();
  active = false;
  appointments: any;
  customers: any;
  lstappointment: any;
  lstappointmentstatus: any;
  isValid = true;
  isDateChanged: any = true;
  lstResource: any;
  imageLink = '';
  appmodel: any;// Skillmodel = new Skillmodel();
  fTime: Date = new Date(0);
  Tdate: Date = new Date(0); customerID: any;
  utcDate: Date;
  appId: any;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  title: any;
  minimumDate = new Date();
  loadSave = false;
  isEdit = false;
  fileName = "Select";
  type: any;
  startDateModel: any;
  minToTime: Date;
  maxToTime: Date;
  //isEdit = false;
  addForm: FormGroup;
  minFromTime: Date;
  todate: Date;
  interAppointmentId: any;
  lstResourceSkill: any;
  isLead: boolean = true;
  isCustomerApproval: boolean = false;
  lstfiletype: any;
  lstDocumentCategory: any = [];
  //lst: any;
  DocumentTypeCode: string;
  moduleName: string;
  submoduleName: string;
  fileTypesGroup: any;
  fileSize: number = 5;
  fileExtension: string = '';
  @ViewChild('fileuploadddl', { static: false }) fileuploadddl: NgSelectComponent;
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {

      }
    });
    this.initForm();
    this.GetDocumentCategory();
    this.getConfigurationTypeFileExtensions();
    this.filetype.valueChanges.subscribe(res => {
      if (res && this.lstfiletype) {
        let doc = this.lstfiletype.find(x => x.value == res);
        this.isCustomerApproval = doc ? doc.customerReview : false;
      } else {
        this.isCustomerApproval = false;
      }
      this.isRequired.setValue(this.isCustomerApproval);
    });
  }

  getConfigurationTypeFileExtensions() {
    this.commonService.getConfigurationTypeFileExtensions('File Upload').subscribe((result: any) => {
      if (result && result.FileTypesGroup != '') {
        this.fileSize = result.FileSize;
        this.fileTypesGroup = JSON.parse(result.FileTypesGroup);
        this.fileTypesGroup.forEach((obj,index )=> {
          if (obj.FileTypes) {
            let extension = obj.FileTypes.map(x => x.Name);
            this.fileExtension += (index > 0 && this.fileExtension!="") ? ", " : "";
            this.fileExtension += extension.join(", ");
          }
        });
      }
    });
  }

  show(id, moduleName, submoduleName) {
    this.moduleName = moduleName;
    this.submoduleName = submoduleName;

    this.addForm.reset();
    this.interAppointmentId = id;
    this.title = "Upload File";
    this.modalFiles.show();
  }
  close() {
    this.active = false;
    this.fileName = 'Select';
    this.addForm.reset();
    this.modalFiles.hide();
  }

  setFile($event): void {
    this.commonService.validUploadDocumentType($event.target.files[0].name, $event.target.accept);
    this.commonService.validUploadDocumentSize($event.target.files[0].size, this.fileSize);
    if (this.commonService.isFileValid && this.commonService.isFileExtensionValid) {
      this.fileName = $event.target.files[0].name;
      this.type = $event.target.files[0].type;
      if (this.fileName != null && this.fileName != 'Select') {
        this.isValid = true;
      }
    }
  }
  get fileNames() { return this.addForm.get('fileName'); }
  get filetype() { return this.addForm.get('filetype'); }
  get isRequired() { return this.addForm.get('isRequired'); }
  get documentTitle() { return this.addForm.get('documentTitle'); }
  get description() { return this.addForm.get('description'); }
  get documentCategory() { return this.addForm.get('documentCategory'); }


  private initForm() {
    this.addForm = this.fb.group({
      id: [null],
      filename: ['', Validators.nullValidator],
      moduleName: [null, Validators.nullValidator],
      SubmoduleName: [null, Validators.nullValidator],
      file: [null],
      type: [null],
      filetype: [null],
      isRequired: [false],
      documentTitle: ['', Validators.required],
      description: ['', Validators.nullValidator],
      documentCategory: [null]
    })

  }

  private prepareFormDataForFiles() {
    const input = new FormData();
    input.append('Id', this.interAppointmentId);
    if (this.commonService.isUploadImageValid) {
      if (this.fileName !== null) {
        input.append('filename', this.fileName);
        input.append("moduleName", this.moduleName);
        input.append("SubmoduleName", this.submoduleName);
        input.append("type", this.submoduleName);
        input.append("filetype", (this.filetype.value == null) ? '' : this.filetype.value)
        input.append("documentTitle", this.addForm.value.documentTitle)
        input.append("categoryId", (this.documentCategory.value == null) ? '' : this.documentCategory.value)
        input.append("description", this.addForm.value.description)
        input.append("isRequired", this.addForm.value.isRequired)
      }
    }

    const fileBrowser = this.fileInput.nativeElement;

    if (fileBrowser.files && fileBrowser.files[0]) {
      input.append('file', fileBrowser.files[0]);
    }

    return input;
  }

  AddEditFiles() {
    if (this.fileName === null || this.fileName === ''
      || typeof this.fileName === 'undefined'
      || this.fileName == 'Select') {
      this.isValid = false;
    }

    else {
      this.isValid = true;
    }
    if (this.isValid && this.addForm.valid) {
      this.loadSave = true;

      const filesModel = this.prepareFormDataForFiles();

      this.commonService.addOrUpdateFiles(filesModel).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);

          this.fileInput.nativeElement.value = "";
          this.fileName = 'Select';
          this.uploadFileEvent.emit();
          // console.log("fileInput", this.fileInput.nativeElement.files);
          this.modalFiles.hide();
          setTimeout(() => { this.loadSave = false; }, 3000);
        }
        else {
          this.loadSave = false;
          this.toaster.error(result.responseMessage);
        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addForm);
    }
  }

  GetDocumentCategory() {
    this.commonService.GetDocumentCategory().subscribe(resp => {
      this.lstDocumentCategory = JSON.parse(resp);
    });
  }

  GetDocumentType(event) {
    if (event) {
      let categoryId = event.value;
      this.commonService.GetDocumentTypeByCategoryId(categoryId).subscribe(resp => {
        this.lstfiletype = JSON.parse(resp);
        this.filetype.setValue(null);
        //this.filetype.setErrors({ message: 'Document Type is Required' });
      });
    }
  }

  resetDocumentDDL() {
    this.filetype.setValue(null);
    this.lstfiletype = [];
    //this.filetype.setErrors({ message: 'Please select Document Category First.' });
    //this.filetype.updateValueAndValidity();

  }
}
