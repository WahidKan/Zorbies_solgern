import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { LoanproductService,  UpdateDocumentModel } from '../loanproduct.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModuleList, CommonService } from '../../shared/common.service';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-updateprerequisitedocument',
  templateUrl: './updateprerequisitedocument.component.html',
  styleUrls: ['./updateprerequisitedocument.component.scss']
})
export class UpdateprerequisitedocumentComponent implements OnInit {
  leadId: any;
  documentsList: any;
  @ViewChild('updatePresiteDocuments', { static: false }) updatePresiteDocuments: ModalDirective;
  @Output() updatePresiteDocument = new EventEmitter();
  @Output() event = new EventEmitter();
  chkListEmployementTypes: Array<any> = [];
  prerequisiteDocumentForm: FormGroup;
  docName: any;
  documentId: number;
  //documentTypeId: number;
  editFormGroup: FormGroup;
  active = false;
  updatetModel: UpdateDocumentModel = new UpdateDocumentModel();
  modulePermission: ModuleList;
  loadSave: boolean = false;
  constructor(private fb: FormBuilder,
    private loanproductService: LoanproductService,
    private router: Router, private commonService: CommonService,
    private toaster: ToastrService,
    private route: ActivatedRoute, private dialogService: ConfirmationDialogService) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }

  ngOnInit() {
    this.initForm();
    this.loanproductService.GetEmploymentTypes().subscribe(resp => {
      if (!isNullOrUndefined(resp)) {
        this.chkListEmployementTypes = JSON.parse(resp);
        // console.log('this.chkListEmployementType', this.chkListEmployementTypes);
      }
    }, error => {
      this.toaster.error("Something went wrong. Please contact with administrator.");
    });
  }

  showUpdate(id: any, obj: FormGroup, documentList: any) {
    // console.log('id: ', id);
    // console.log('obj: ', obj);
    // console.log('documentList: ', documentList);
    this.leadId = id;
    this.documentsList = documentList;    
    this.prerequisiteDocumentForm.patchValue({
      documentId: obj.get('documentId').value,
      documentTypeId: obj.get('documentTypeId').value,
      documentName: obj.get('documentName').value,
      isVisible: obj.get('isVisible').value,
      isMandatory: obj.get('isMandatory').value
    });

    let employeeTypes = obj.get('employmentType').value != null ? obj.get('employmentType').value.split(',') : [];
    // console.log(employeeTypes);
    this.documentId = obj.get('documentId').value;

    while (this.employmentTypeList.length != 0) {
      this.employmentTypeList.removeAt(0);
    }

    this.chkListEmployementTypes.forEach(m => {
      this.employmentTypeList.push(this.loanproductService.buildEmplymentType(m));
    });
    
    this.employmentTypeList.controls.forEach(mobj => {
      let value = (employeeTypes.filter(m => parseInt(m) == parseInt(mobj.get('value').value)).length > 0 ? true : false);
      mobj.get('SelectedValue').setValue(value)
    })
    //this.chkListEmployementTypes.forEach((fobj, index) => {
    //  // console.log(fobj);
    //  // console.log(employeeTypes.filter(m => (m) == parseInt(fobj.value)).length);
    //  if (employeeTypes.filter(m => parseInt(m) == parseInt(fobj.value)).length > 0) {
    //    fobj.SelectedValue = true;

    //  } else {
    //    fobj.SelectedValue = 0;
    //  }
    //});
     
    this.updatePresiteDocuments.show();
  }
  close() {
    this.active = false;
    this.updatePresiteDocuments.hide();
  }
  UpdatePresiteDocuments() {
    //this.updatePresiteDocuments.hide();
     
    //const message = `Are you sure you want to Update Prerequisite Document Type. "${this.addForm.value.documentName}" will change in all over application?`;
    //this.dialogService.confirm('Update Document Type', message).subscribe(confirmed => {
    //  if (confirmed) {
    if (this.leadId != "") {
      // console.log('out');
      if (this.prerequisiteDocumentForm.valid) {
        this.updatetModel.documentName = this.prerequisiteDocumentForm.value.documentName;
            this.updatetModel.mandatory = (this.isVisible.value == true) ? this.isMandatory.value : false;
            this.updatetModel.visibility = this.isVisible.value;
            this.updatetModel.documentId = this.documentId;
            this.updatetModel.documentTypeId = this.documentTypeId.value;
            this.updatetModel.employmentType = this.employmentTypeList.value.filter(m => m.SelectedValue == true).map(m => { return m.value }).join(',');            
            this.employmentType.setValue(this.updatetModel.employmentType);            
        //return;
            this.loanproductService.UpdatePresiteDocument(this.updatetModel).subscribe((result: any) => {
              if (result.statusCode == 200) {
                this.toaster.success(result.responseMessage);
                this.prerequisiteDocumentForm.reset();
                this.updatePresiteDocuments.hide();
                this.updatePresiteDocument.emit(this.updatetModel);
              }
              else {
                this.toaster.error(result.responseMessage);
                this.updatePresiteDocuments.show();
              }
            }, error => {
              this.toaster.error(error);
            });
          }
          else {
        this.commonService.validateAllFormFields(this.prerequisiteDocumentForm);
          }

        }
        else {
          // console.log('in');
          let doclist = this.documentsList.value;
          

          let Mandatory = this.isMandatory;
          let Visibility = this.isVisible;
      let docName = this.prerequisiteDocumentForm.value.documentName;
          let currentContext = this;
          doclist.forEach(function (item) {
            if (item.documentTypeId === currentContext.documentTypeId.value) {
              item.mendatory = Mandatory;
              item.visibility = Visibility;
              item.documentName = docName;
            }
          });
          //this.event.emit(doclist);
          this.updatePresiteDocument.emit(this.prerequisiteDocumentForm);
          this.updatePresiteDocuments.hide();


          // console.log("docList", doclist);
        }
    //  }
    //  else{
    //    this.updatePresiteDocuments.show();
    //  }
    //});
  }

  checkemployementtype(e, val1) {
   
    let index = this.chkListEmployementTypes.findIndex(x => x.value == val1);
    if (e.target.checked) {
      this.chkListEmployementTypes[index].SelectedValue = 1;
    } else {
      this.chkListEmployementTypes[index].SelectedValue = 0;
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

  //VisibilityChanged(values: any) {
  //  this.isVisible.setValue(values.currentTarget.checked);
  //}

  //MandatoryChanged(values: any) {
  //  this.isMandatory.setValue(values.currentTarget.checked);
  //}
}
