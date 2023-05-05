import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { LoanproductService, DocumentModel, UpdateDocumentModel } from '../loanproduct.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModuleList, CommonService } from '../../shared/common.service';
import { isNullOrUndefined } from 'util';
import { parse } from 'url';

@Component({
  selector: 'app-addprerequisitedocument',
  templateUrl: './addprerequisitedocument.component.html',
  styleUrls: ['./addprerequisitedocument.component.scss']
})
export class AddprerequisitedocumentComponent implements OnInit {
  @ViewChild('presiteDocument', { static: false }) presiteDocument: ModalDirective;
  @Output() prerequisiteDocument = new EventEmitter();
  chkListEmployementType: Array<any> = [];  
  prerequisiteDocumentForm: FormGroup;
  docName: any;
  active = false;
  loanProductId: any;
  documentModel: DocumentModel = new DocumentModel();
  modulePermission: ModuleList;
  loadSave: boolean = false;

  constructor(private fb: FormBuilder,
    private loanproductService: LoanproductService,
    private router: Router, private commonService: CommonService,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
    this.initForm();
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.loanProductId = id;
      });
    this.loanproductService.GetEmploymentTypes().subscribe(resp => {
      if (!isNullOrUndefined(resp)) {
        this.chkListEmployementType = JSON.parse(resp);
        while (this.employmentTypeList.length != 0) {
          this.employmentTypeList.removeAt(0);
        }

        this.chkListEmployementType.forEach(m => {
          this.employmentTypeList.push(this.loanproductService.buildEmplymentType(m));
        });

      }
    }, error => {
      this.toaster.error("Something went wrong. Please contact with administrator.");
    });
  }

  show() {

    this.presiteDocument.show();
    this.prerequisiteDocumentForm.patchValue({
      documentTypeId: null,
      documentName: null,
      isVisible: false,
      isMandatory: false,
      employmentType: null,
      employmentTypeList: this.chkListEmployementType.map(m => {
        return {
          name: m.name,
          value: m.value,
          SelectedValue: false
        }}),
    });
    this.prerequisiteDocumentForm.markAsUntouched();
  }

  checkemployementtype(e, val1) {
   
    let index = this.chkListEmployementType.findIndex(x => x.value == val1);
    if (e.target.checked) {
      this.chkListEmployementType[index].SelectedValue = '1'
    } else {
    this.chkListEmployementType[index].SelectedValue = '0'
    }
  }

  close() {
    this.active = false;
    this.presiteDocument.hide();
  }

  sendDataToDocumentType() {
    
    let documentId = null;

    // console.log(this.employmentTypeList.value);
    if (this.prerequisiteDocumentForm.valid) {
      this.documentModel.documentName = this.documentName.value;
      this.documentModel.mandatory = this.isMandatory.value;
      this.documentModel.visibility = this.isVisible.value;
      this.documentModel.loanProductId = this.loanProductId;
      this.documentModel.employmentType = this.employmentTypeList.value.filter(m => m.SelectedValue == true).map(m => { return m.value }).join(',');
      this.employmentType.setValue(this.documentModel.employmentType);
      
      this.presiteDocument.hide(); 
      this.loanproductService.AddEditPresiteDocument(this.documentModel).subscribe((result: any) => {
        // console.log(result);
        if (result.statusCode == 200) {                                  
          this.documentTypeId.setValue(result.responseMessage);
          this.documentModel.documentTypeId = result.responseMessage;
          this.prerequisiteDocument.emit(this.documentModel);
          this.presiteDocument.hide();     
        }
        else {
          //this.loadSave = false;
          this.toaster.error(result.responseMessage);

        }
      }, error => {
        //this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.prerequisiteDocumentForm);
    }
  }

  get documentTypeId() { return this.prerequisiteDocumentForm.get('documentTypeId'); }
  get documentName() { return this.prerequisiteDocumentForm.get('documentName'); }
  get isVisible() { return this.prerequisiteDocumentForm.get('isVisible'); }
  get isMandatory() { return this.prerequisiteDocumentForm.get('isMandatory'); }
  get employmentType() { return this.prerequisiteDocumentForm.get('employmentType'); }
  get employmentTypeList() { return this.prerequisiteDocumentForm.get('employmentTypeList') as FormArray; }

  initForm() {
    this.prerequisiteDocumentForm = this.loanproductService.buildPrerequisiteDocument();  
  }

}
