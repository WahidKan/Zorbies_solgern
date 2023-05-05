import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { strategy } from '@angular-devkit/core/src/experimental/jobs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { CommonService } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { DateTimeToLocalForAddEditPipe } from 'src/app/pipes/datetime.pipe';
import moment from 'moment';
// import { RequirementProjectModel } from '../../requirementslist/requirements.service';
import { AccountserviceService, JurisdictionModel } from '../accountservice.service';

@Component({
  selector: 'app-accountJurisdiction',
  templateUrl: './accountJurisdiction.component.html'
})
export class accountJurisdiction implements OnInit {
  @ViewChild('accountJurisdictionPopup', { static: false }) modalaccountJurisdictionPopup: ModalDirective;

  @Output() callGetJurisdictionListingData = new EventEmitter<boolean>();

  requirementModel: JurisdictionModel = new JurisdictionModel();
  title: string;
  lstType: any;
  lstRequiredBy: any;
  accountId: any;
  loadSave = false;
  addForm: FormGroup;
  lstappointmentstatus: any;
  searchText = '';
  len: any = 10;
  Name: any;
  JurisdictionSFName: any;
  JurisdictionType: any;
  accountInstallWOPermitting: any;
  


  constructor(private fb: FormBuilder,   
    private accountserviceService: AccountserviceService,
    private commonService: CommonService,
    private el: ElementRef,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getAppointmentStatus();
  }


  show(row, accountId, accountName) {
    ;
    ;
    console.log("row", row);
    console.log("add", this.addForm);
    if (row == '') {
      this.initForm();
      this.title = 'New Jurisdiction';
      this.addForm.controls.Account.setValue(accountName);
      this.accountId = accountId;
      this.modalaccountJurisdictionPopup.show();

    }
    else {
      if (row != null) {         
        this.addForm.controls.Account.setValue(accountName);
        this.accountserviceService.GetJurisdictionById(row.Id).subscribe(response=>{
          if(response)
          {
            this.accountId = response.accountId;  
            this.Name =   response.Name ;
            this.JurisdictionSFName =   response.Type__c;  
            this.JurisdictionType =   response.jurisdictiontype    ;
            this.accountInstallWOPermitting =   response.InstallWOPermitting   
            this.addForm.patchValue({
              id: response.id,
              JurisdictionName: response.Type__c,
              IsUpdate:response.Update__c,
              Note: response.Notes__c              
            })
          }
        })
        this.title = "Edit Jurisdiction"
        this.modalaccountJurisdictionPopup.show();
      }
    }
    console.log("this.addForm", this.addForm);
  }

  close() {
    this.modalaccountJurisdictionPopup.hide();
    this.callGetJurisdictionListingData.emit(true);
  }

  Save() {
    ;
    if (this.addForm.valid) {
      this.loadSave = true;
      this.requirementModel.Id = this.addForm.value.id;
      this.requirementModel.Type__c = this.addForm.value.JurisdictionName;//this.utilityCompanyList.find(x => x.value == this.addForm.value.requirementName).text ;
      this.requirementModel.JurisdictionId = this.lstappointmentstatus.find(x => x.text == this.addForm.value.JurisdictionName).value ;
      this.requirementModel.Account = this.accountId;
      this.requirementModel.Update__c = this.addForm.value.IsUpdate;//this.lstappointmentstatus.find(x => x.value == this.addForm.value.requirementStatus).text ;
      this.requirementModel.Notes__c = this.addForm.value.Note;
      if(this.accountId)
      {
        this.accountserviceService.AddeditJurisdictionAccount(this.requirementModel).subscribe((result: any) => {
          ;
          if (result.statusCode == 200) {
            this.callGetJurisdictionListingData.emit(true);
            this.modalaccountJurisdictionPopup.hide();
            this.loadSave = false;
            this.toaster.success(result.responseMessage);
  
          }
          else {
            this.loadSave = false;
            this.toaster.error(result.responseMessage);
          }
        })
      }
      else{
        this.loadSave = false;
        this.toaster.error("Please add account first");
      }
      
    }
    else {
      for (const key of Object.keys(this.addForm.controls)) {
        if (this.addForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          console.log("sddasd", invalidControl);
          invalidControl.focus();
          break;
        }
      }

      this.commonService.validateAllFormFields(this.addForm);
    }
  }

  private initForm() {
    this.addForm = this.fb.group({
      id: [null],
      JurisdictionName: [null, Validators.required],
      Note: [null],
      IsUpdate: [false],
      Account: [null],
    })
  }


  get JurisdictionName() { return this.addForm.get('JurisdictionName'); }
  get Note() { return this.addForm.get('Note'); }
  get IsUpdate() { return this.addForm.get('IsUpdate'); }
  get Account() { return this.addForm.get('Account'); }

  getAppointmentStatus() {
    this.commonService.getMasterItemsList('Jurisdiction').subscribe((result: any) => {
      this.lstappointmentstatus = this.commonService.masters;
    })
  }

}
