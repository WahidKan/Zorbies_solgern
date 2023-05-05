import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { strategy } from '@angular-devkit/core/src/experimental/jobs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequirementModel, RequirementProjectModel, RequirementsService } from '../requirements.service';
import { CommonService } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { DateTimeToLocalForAddEditPipe, DateTimeToLocalPipe } from 'src/app/pipes/datetime.pipe';
import moment from 'moment';

@Component({
  selector: 'app-addeditprojectrequirements',
  templateUrl: './addeditprojectrequirements.component.html'
})
export class addeditprojectrequirements implements OnInit {
  @ViewChild('addEditprojectRequirementPopup', { static: false }) modalAddEditRequirementPopup: ModalDirective;

  @Output() callGetRequirementListingData = new EventEmitter<boolean>();

  requirementModel: RequirementProjectModel = new RequirementProjectModel();
  title: string;
  lstType: any;
  lstRequiredBy: any;
  accountId: any;
  loadSave = false;
  disabledCondtion= true;
  addForm: FormGroup;
  createdBy:any;
  updatedBy:any;
  createdDate:any;
  updatedDate:any;
  lstappointmentstatus: any;
  searchText = '';
  RecordTypeForUi = '';
  utilityCompanyList: any;
  RequireByid: any;
  RequirementName: any;
  SFName: any;
  RequirementIdMaster: any;
  len: any = 10;

  constructor(private fb: FormBuilder,
    private requirementsService: RequirementsService,
    private commonService: CommonService,
    private dateTimeToLocal: DateTimeToLocalPipe,
    private el: ElementRef,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.disabledCondtion =false;
    this.RequirementName = '';
    this.RecordTypeForUi = '';
    this.initForm();
    this.GetlstType();

    this.GetUtilityCompanyDll(null);
  }


  show(row, accountId, accountName) {
    ;
    // console.log("row", row);
    // console.log("add", this.addForm);
    if (row == '') {
      this.disabledCondtion =true;
      this.RecordTypeForUi = '';
      this.initForm();
      this.title = 'New Requirement';
      this.addForm.controls.Account.setValue(accountName);
      this.accountId = accountId;
      this.modalAddEditRequirementPopup.show();

    }
    else {
      if (row != null) {
        this.disabledCondtion =false;
        const convertDateTime = new DateTimeToLocalPipe;
        this.addForm.controls.Account.setValue(accountName);

        this.requirementsService.GetRequirementById(row.id).subscribe(response => {
          if (response) {
            this.RequirementName = response.Name;
            this.RequirementIdMaster = response.RequirementId
              this.createdBy=response.CreatedBy;
              this.updatedBy=response.UpdatedBy;
              this.createdDate=response.CreatedDate;
              this.updatedDate=response.UpdatedDate;
            this.SFName= response.SFNAME
            this.getAppointmentStatus(response.Requirement_Type);
            this.accountId = response.accountId;
            if (response.Required_By) {
              this.RequireByid = response.Required_By;
            }
            if (response.RecordTypeName.toLowerCase() == 'trackable') {
              this.RecordTypeForUi = "trackable";
              this.addForm.get('type').setValidators([Validators.required]);
              this.addForm.get('type').updateValueAndValidity();
              this.addForm.get('requirementStatus').setValidators([Validators.required]);
              this.addForm.get('requirementStatus').updateValueAndValidity();

            }
            else if (response.RecordTypeName.toLowerCase() == 'informational') {
              this.RecordTypeForUi = "informational";
              this.addForm.get('type').clearValidators();
              this.addForm.get('type').updateValueAndValidity();
              this.addForm.get('type').setValue(null);
              this.addForm.get('requirementStatus').clearValidators();
              this.addForm.get('requirementStatus').updateValueAndValidity();
              this.addForm.get('requirementStatus').setValue(null);
            }
            ;
            this.addForm.patchValue({
              id: response.id,
              requirementName: response.Name,
              requirementStatus: response.SFStatus,
              type: response.Requirement_Type,
              recordType: response.RecordTypeName,
              description: response.Requirement_Description,
              RequireBy: response.RequiredByName != null ? response.RequiredByName : null,
              // DateSubmitted: response.Date_Submitted != null ? moment(convertDateTime.transform(response.Date_Submitted, null)).format('L').toString() : null,
              // CompltedDate: response.Completed_Date != null ? moment(convertDateTime.transform(response.Completed_Date, null)).format('L').toString() : null,
              // DueDate: response.Due_Date != null ? moment(convertDateTime.transform(response.Due_Date, null)).format('L').toString() : null,
              // OrginalDueDate: response.Original_Due_Date != null ? moment(convertDateTime.transform(response.Original_Due_Date, null)).format('L').toString() : null,

              DateSubmitted: response.Date_Submitted != null ? moment(response.Date_Submitted, null).format('L').toString() : null,
              CompltedDate: response.Completed_Date != null ? moment(response.Completed_Date, null).format('L').toString() : null,
              DueDate: response.Due_Date != null ? moment(response.Due_Date, null).format('L').toString() : null,
              OrginalDueDate: response.Original_Due_Date != null ? moment(response.Original_Due_Date, null).format('L').toString() : null,
            })
          }
        })
        this.title = "Edit Requirement"

        this.modalAddEditRequirementPopup.show();
      }
    }
    // console.log("this.addForm", this.addForm);
  }

  close() {
    this.modalAddEditRequirementPopup.hide();
    this.callGetRequirementListingData.emit(true);
  }


  ddlchange(value) {
    this.getAppointmentStatus(value.type);
    ;
    let ths = this;
    this.addForm.controls.recordType.setValue(value.recordType);
    this.addForm.controls.type.setValue(value.type);
    this.addForm.controls.description.setValue(value.description);
    this.addForm.controls.RequireBy.setValue(value.requiredByName);
    if (value.requiredBy) {
      this.RequireByid = value.requiredBy;
    }
    if (value.recordType.toLowerCase() == 'trackable') {
      this.RecordTypeForUi = "trackable";
      this.addForm.get('type').setValidators([Validators.required]);
      this.addForm.get('type').updateValueAndValidity();
      this.addForm.get('requirementStatus').setValidators([Validators.required]);
      this.addForm.get('requirementStatus').updateValueAndValidity();
    }
    else if (value.recordType.toLowerCase() == 'informational') {
      this.RecordTypeForUi = "informational";



      this.addForm.get('type').clearValidators();
      this.addForm.get('type').updateValueAndValidity();
      this.addForm.get('type').setValue(null);

      this.addForm.get('requirementStatus').clearValidators();
      this.addForm.get('requirementStatus').updateValueAndValidity();
      this.addForm.get('requirementStatus').setValue(null);


    }
    this.addForm.controls.DateSubmitted.setValue('');
    this.addForm.controls.CompltedDate.setValue('');
    this.addForm.controls.DueDate.setValue('');
    this.addForm.controls.OrginalDueDate.setValue('');

  }

  ddlTypechange(value) {
    ;
    this.getAppointmentStatus(value.text);
    this.addForm.controls.requirementStatus.setValue(null);
  }



  Save() {
    ;
    if (this.addForm.valid) {
      this.loadSave = true;
      this.requirementModel.Id = this.addForm.value.id;
      this.requirementModel.requirementName = this.addForm.value.requirementName;//this.utilityCompanyList.find(x => x.value == this.addForm.value.requirementName).text ;
      if (this.addForm.value.requirementName != this.RequirementName) {
        this.requirementModel.RequirementId = this.utilityCompanyList.find(x => x.text == this.addForm.value.requirementName).value;
      }
      else {
        if (this.addForm.value.id) {
          this.requirementModel.RequirementId = this.RequirementIdMaster;
        }
      }
      this.requirementModel.requirementStatus = this.addForm.value.requirementStatus;//this.lstappointmentstatus.find(x => x.value == this.addForm.value.requirementStatus).text ;
      if (this.addForm.value.requirementStatus) {
        this.requirementModel.SGStatusId = this.lstappointmentstatus.find(x => x.text == this.addForm.value.requirementStatus).value;
      }
      else {
        this.requirementModel.SGStatusId = null;
      }
      this.requirementModel.type = this.addForm.value.type;
      if (this.addForm.value.type) {
        this.requirementModel.TypeId = this.lstType.find(x => x.text == this.addForm.value.type).value;
      }
      else {
        this.requirementModel.TypeId = null;
      }
      if (this.addForm.value.RequireBy) {
        if (this.RequireByid) {
          this.requirementModel.Required_By1 = this.RequireByid;
        }
      }
      this.requirementModel.recordType = this.addForm.value.recordType;
      this.requirementModel.Account = this.accountId;
      this.requirementModel.description = this.addForm.value.description;
      ;
      if (this.RecordTypeForUi = "trackable") {
        // let totime = moment(new Date(this.dateTimeToLocal.transform(new Date(),''))).format('HH:mm');
        if (this.addForm.value.DateSubmitted) {
          let totimeDate = moment(this.addForm.value.DateSubmitted).format('MM-DD-YYYY') ;
          //totimeDate = new Date(this.dateTimeToLocal.transform(totimeDate, ''));

         // let DateSub = this.commonService.ConvertUserSelectedTimeZoneToUTC(totimeDate);
          this.requirementModel.DateSubmitted = totimeDate;
        }
        else {
          this.requirementModel.DateSubmitted = null;
        }
        if (this.addForm.value.CompltedDate) {
          let totimeDate = moment(this.addForm.value.CompltedDate).format('MM-DD-YYYY');
         // totimeDate = new Date(this.dateTimeToLocal.transform(totimeDate, ''));
          //let CompltedDate = this.commonService.ConvertUserSelectedTimeZoneToUTC(totimeDate);
          this.requirementModel.CompltedDate = totimeDate;
        }
        else {
          this.requirementModel.CompltedDate = null;
        }
        if (this.addForm.value.DueDate) {
          // let totimeDate = new Date(moment(this.addForm.value.DueDate).format('MM-DD-YYYY') );         
          // let DueDate = this.commonService.ConvertUserSelectedTimeZoneToUTC(totimeDate);
          // this.requirementModel.DueDate = DueDate;
          let totimeDate = moment(this.addForm.value.DueDate).format('MM-DD-YYYY') ;         
          //let DueDate = this.commonService.ConvertUserSelectedTimeZoneToUTC(totimeDate);
          this.requirementModel.DueDate = totimeDate;
        }
        else {
          this.requirementModel.DueDate = null;
        }
        if (this.addForm.value.OrginalDueDate) {
          let totimeDate = moment(this.addForm.value.OrginalDueDate).format('MM-DD-YYYY') ;
         // totimeDate = new Date(this.dateTimeToLocal.transform(totimeDate, ''));
         // let DuOrginalDueDateeDate = this.commonService.ConvertUserSelectedTimeZoneToUTC(totimeDate);
          this.requirementModel.OrginalDueDate = totimeDate;
        }
        else {
          this.requirementModel.OrginalDueDate = null;
        }
      }
       ;
      if (this.accountId) {
        this.requirementsService.addeditprojectedRequirement(this.requirementModel).subscribe((result: any) => {
          ;
          if (result.statusCode == 200) {
            this.callGetRequirementListingData.emit(true);
            this.modalAddEditRequirementPopup.hide();
            this.loadSave = false;
            this.toaster.success(result.responseMessage);

          }
          else {
            this.loadSave = false;
            this.toaster.error(result.responseMessage);
          }
        })
      }
      else {
        this.loadSave = false;
        this.toaster.error("Please add account first");
      }

    }
    else {
      for (const key of Object.keys(this.addForm.controls)) {
        if (this.addForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          // console.log("sddasd", invalidControl);
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
      requirementName: [null, Validators.required],
      requirementStatus: [null, Validators.required],
      type: [null, Validators.required],
      recordType: [null, Validators.nullValidator],
      Account: [null, Validators.nullValidator],
      description: [null, Validators.nullValidator],
      DateSubmitted: [null],
      CompltedDate: [null],
      DueDate: [null],
      OrginalDueDate: [null],
      RequirementId: [null],
      TypeId: [null],
      RequireBy: [null],
      SGStatusId: [null],

    })
  }


  get requirementName() { return this.addForm.get('requirementName'); }
  get requirementStatus() { return this.addForm.get('requirementStatus'); }
  get type() { return this.addForm.get('type'); }
  get recordType() { return this.addForm.get('recordType'); }
  get Account() { return this.addForm.get('Account'); }
  get description() { return this.addForm.get('description'); }
  get DateSubmitted() { return this.addForm.get('DateSubmitted'); }
  get CompltedDate() { return this.addForm.get('CompltedDate'); }
  get DueDate() { return this.addForm.get('DueDate'); }
  get OrginalDueDate() { return this.addForm.get('OrginalDueDate'); }
  get RequireBy() { return this.addForm.get('RequireBy'); }
  get SGStatusId() { return this.addForm.get('SGStatusId'); }
  get TypeId() { return this.addForm.get('TypeId'); }
  get RequirementId() { return this.addForm.get('RequirementId'); }


  GetlstType() {
    this.commonService.getMasterItemsList("ReqProjectType").subscribe((result: any) => {
      ;
      this.lstType = this.commonService.masters;
    })
  }

  getAppointmentStatus(RequirementType: any) {
    // this.commonService.getMasterItemsList('ReqProjectstatus').subscribe((result: any) => {
    this.commonService.getMasterItemsInMultiple("ReqProjectstatus", "" + RequirementType + "").subscribe((result: any) => {
      this.lstappointmentstatus = this.commonService.masters;
    })
  }









  GetUtilityCompanyDll(id: any = 0) {
    ;
    this.requirementsService.GetRequirementDll(id, '0', this.searchText).subscribe((data: any) => {
      this.utilityCompanyList = data;
    })
  }



  onScrollToEndUtilityCompany(dataList: any) {
    this.fetchMoreUtilityCompany(dataList);
  }

  private fetchMoreUtilityCompany(dataList: any) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList.length;
    this.requirementsService.GetRequirementDll('', this.len, this.searchText).subscribe((data: any) => {
      this.utilityCompanyList = this.utilityCompanyList.concat(data);
    })
  }

  onKeyUtilityCompany(e: any, dataList: any) {
    ;
    this.len = 0
    this.searchText = e.target.value;
    this.requirementsService.GetRequirementDll('', this.len, this.searchText).subscribe((data: any) => {
      this.utilityCompanyList = data;
    })
  }

  onClearLangUtilityCompany(dataList: any): void {
    ;
    this.len = 0
    this.searchText = '';
    this.requirementsService.GetRequirementDll('', this.len, this.searchText).subscribe((data: any) => {
      this.utilityCompanyList = data;
    });

    this.RecordTypeForUi = "";
    this.addForm.controls.DateSubmitted.setValue('');
    this.addForm.controls.CompltedDate.setValue('');
    this.addForm.controls.DueDate.setValue('');
    this.addForm.controls.OrginalDueDate.setValue('');
    this.addForm.controls.type.setValue('');
    this.addForm.controls.recordType.setValue('');

  }


}
