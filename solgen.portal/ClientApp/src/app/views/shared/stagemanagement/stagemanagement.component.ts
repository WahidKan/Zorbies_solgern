import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, dynamicsectionarray, CheckboxData, StageData, MarkAsCompleteData, fieldsJson } from '../common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LeadlistService } from '../../lead/leadlist.service';
import { LeadService } from '../../lead/lead.service';
import { DateTimeToLocalForAddEditPipe } from '../../../pipes/datetime.pipe';
import { OpportunityListService } from '../../opportunity/opportunitylist.service';
import { ProposallistService } from '../../proposal/proposallist.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LeadconvertpopupComponent } from '../../lead/leadconvertpopup.component';

import { Location } from '@angular/common';
import { cssClass } from '@syncfusion/ej2-angular-lists';
@Component({
  selector: 'app-stagemanagement',
  templateUrl: './stagemanagement.component.html',
  styleUrls: ['./stagemanagement.component.scss']
})
export class StagemanagementComponent implements OnInit {
  @ViewChild('stage', { static: false }) stage: ModalDirective;
  // @Output() showConvert = new EventEmitter<string>();
  @Output() showConvert: EventEmitter<any> = new EventEmitter();

  @Output() newItemEvent = new EventEmitter<boolean>();
  @Output() callToViewFilterBarFunction: EventEmitter<any> = new EventEmitter();
  @Output() callForDDLList: EventEmitter<any> = new EventEmitter();

  @Input() submoduleName: string;
  @Input() moduleName: string;
  @Input() showdet: boolean;
  @Input() iconClass: string = 'feather-user';
  @Input() areButtonsVisible: boolean = true;
  @Input() isadmin: boolean = true;
  @Input() isLoanProductAssociated: boolean = true;
  @Input() selectedAction: any = '';
  @Input() pageLink: string;

  @Input() headerTitleName: string = '';

  loading = false;
  showdetail:boolean=true;
  stageData: any;
  stagearray: dynamicsectionarray[];
  _formstagearray: dynamicsectionarray[] = [];
  stagedatamaster: any;
  checkflag: boolean = false;
  itemdata: any;
  editHousingvalues: any;
  title = "";
  customCompnentValues: any[] = [];
  showFormDiv: boolean = false;
  optionalParameters: boolean = false;
  showDetailDiv: boolean = false;
  formControlList: any[] = [];
  checkboxdata1: Array<CheckboxData> = [];
  form: FormGroup;
  formGroup: FormGroup;
  Id: any;
  JsonData: StageData = new StageData();

  markAsCompleteData: MarkAsCompleteData = new MarkAsCompleteData();
  scrollDataList: any;
  custom_field_id: any;
  len: any;
  field_code: any;
  searchText: string;
  stageId: any;

  buttonTitle: any;
  showMarkAsCompleteButton: boolean = false;
  is_converted: boolean = false;
  masterKey: string
  unqualifiedStage: boolean = false;
  stageName: string;
  loadSave: boolean = false;
  checkEmail: string;
  existsEmail: boolean = false;
  timeFormat: string = '12';
  cleanValues: any[] = [];
  cascadingCompnentValues: any;
  hideConstomerSatgeDtails: boolean = false;
  displayType = 'VIEW';
  companyId: any;
  additionalGroups: any[];
  groupTop: any[] = [];
  operatorList: any;
  ownerId: any = '';
  @Input() customCompnentValuesTop: any;
  executionFlow: any[] = [];
  checkboxdataTop: Array<CheckboxData> = [];
  LeadFirstName = '';
  LeadLastName = '';
  solgenpower: boolean = true;
  companyType: any;
  @ViewChild('leadconvert', { static: false }) leadconvert: LeadconvertpopupComponent;
  isEnabledDetailsView: boolean = false;
  previousSatgeId: number = 0;
  customCompnentValues_Copy: any[] = [];
  isEditable: boolean = false;
  currentStageDataObject: any;
  stageTitle: any = '';


  constructor(private route: ActivatedRoute,
    private proposalService: ProposallistService,
    private toaster: ToastrService, private commonService: CommonService,
    private leadservice: LeadlistService, private opportunityService: OpportunityListService, private leadService: LeadService, private router: Router,
    private location: Location) {


  }

  ngOnInit() {
    debugger
    this.isEnabledDetailsView = false;
    this.previousSatgeId = 0;
    if(this.showdet==false)
    {
      this.showdetail=this.showdet;
      this.showDetailDiv=this.showdet;
    }

    this.buttonTitle = 'Mark As Completed';
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.Id = id;
        this.getStageDetailsById(id);
      }
      else {
      }
    });
    this.customCompnentValues_Copy =  this.customCompnentValues ;
    this.GetLeadAccountdata();
    this.GetCustomFieldsList();
    this.timeFormat = this.commonService.getTimeFormat();
    this.isEditable = false;

  }



  showpopup() {
    this.leadconvert.show(this.Id);
  }

  OnBackToListClick() {
    this.location.back();
  }

  GetLeadAccountdata() {
    this.leadservice.GetLeadAccountdata(this.Id, null, 'lead').subscribe((result: any) => {
      if (result[0])
        this.is_converted = result[0].is_Converted;
    })
  }


  showConvertPopUp() {
    this.commonService.successMessage = "Marked as completed successfully"
    this.showConvert.emit()
  }

  showConvertModel(event){
    debugger
    this.commonService.successMessage = "Lead has been Converted successfully"
    this.showConvert.emit(event)
  }

  getSatgeDataById(item, ParentId, loanAppStageId, isEnabledDetailsView)
  {
    debugger
    this.currentStageDataObject = item;
    this.isEnabledDetailsView = isEnabledDetailsView;
    // if(this.isEnabledDetailsView == true)
    // {
    //   this.isEnabledDetailsView  = false;
    // }
    // else
    // {
    //   this.isEnabledDetailsView  = true;
    // }
    this.loading = true;
    this.showMarkAsCompleteButton = false;
    if (item != null) {
      if (item.masterValue == "Closed - Converted") {
        this.showMarkAsCompleteButton = true;
      }

    }
    if (ParentId != null) {
      //let data: any[] = this.formstagedatasub(ParentId)
      // data.forEach(s => {
      //   s.stageSelectedClass = '';
      //   StageNamePro = s.loan_app_stage_name;
      // })
      this.stagedatamaster.forEach(m => {
        if(m.stageclass == 'step-grey')
        {
          m.stageclass = '';
        }
        m.stageSelectedClass = '';
        m.stageClassCopy = m.stageclass;
      });
      item.stageSelectedClass = 'ui-current';

    }

    if (item != null) {

      if (item.stageActive == 1 && item.stageapproved == 1) {
        this.buttonTitle = ' Mark As Status Changed';
      }
      else {
        this.buttonTitle = 'Mark As Completed';
      }
    }
    this.loading = true;

    this.stagedatamaster.forEach(m => {
      debugger
      let data: any[] = this.formstagedatasub(m.loan_app_stage_id)
      //m.stageClassCopy = m.stageclass ;
      // data.forEach(s => {
      //   s.stageSelectedClass = '';
      // })
      if(loanAppStageId == m.loan_app_stage_id)
      {
        //m.stageSelectedClass= "ui-open"
        if(this.isEnabledDetailsView)
        {
          m.stageclass = "ui-open";
        }
        else if( m.stageClassCopy == 'ui-done')
        {
          m.stageclass = "ui-done"
        }
        else if( m.stageClassCopy == 'ui-current' ||  m.stageClassCopy == 'step-grey')
        {
          m.stageclass = ""
        }
        else
        {
          m.stageclass = "ui-done"
        }
      }
      else
      {
        if(this.isEnabledDetailsView &&  m.stageClassCopy == 'ui-done')
        {
          m.stageclass = "ui-done";
        }
        else if( m.stageClassCopy == '')
        {
          m.stageclass = "ui-done"
        }
        else if( m.stageClassCopy == 'ui-current' ||  m.stageClassCopy == 'step-grey')
        {
          m.stageclass = ""
        }
        else
        {
          m.stageclass = "ui-done"
        }
      }
      // else
      // {
      //   m.stageclass = "ui-current"
      // }

      if (m.stageclass == 'ui-current') {

        m.stageclass = '';// 'step-green';
        item.stageClassCopy = ''

      }
    });
    if(item.stageActive == 1 && ( item.stageClassCopy == 'step-green' ||  item.stageClassCopy == 'step-grey')  && item.stageclass == 'ui-open')
    {
      if(this.isEnabledDetailsView)
      {
        item.stageSelectedClass = 'ui-current'
      }
      else
      {
        item.stageclass = 'ui-done'
      }
    }

    else
    if (item) {
      item.stageSelectedClass = 'ui-current'
    }

    this.stageId = loanAppStageId;

    this.formControlList = [];
    this.commonService.GetSolCustomFieldsList(loanAppStageId, this.Id).subscribe((result: any) => {

      if (result) {
        this.customCompnentValues = this.commonService.solCustomFieldsList.data;
        debugger
        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }
          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              group_id: t.group_id,
              group_name: t.group_name,
              group_display_name: t.group_display_name,
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id)
            }

            this.formControlList.push(obj);

          }
        })
        //// console.log('formControlList', this.formControlList);
        const group: any = {};
        const convertdatetime = new DateTimeToLocalForAddEditPipe();

        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }

          else if (cnt.dt_code == 'datetime') {
            val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, null)); // to convert to local time
          }
          else if (cnt.dt_code == 'date') {
            val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, 'Date')); // to convert to local time
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => {
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }
          if (cnt.dt_code == 'select' && cnt.name == 'Mounting_Location' && cnt.name != 'undefinded') {

            //this.optionalParameters = true;
            this.editHousingvalues = cnt.value;
            //this.onCustomChange(cnt.value, cnt);
          }//ShopHasElectricalSubPanel
          if (cnt.dt_code == 'select' && cnt.name == 'ShopHasElectricalSubPanel' && cnt.name != 'undefinded') {

            this.optionalParameters = true;
            cnt.value = cnt.value.toString();
            this.onCustomChange(this.editHousingvalues, cnt);
          }
          if (cnt.name == 'Roof_Type' || cnt.name == 'ShopHasElectricalSubPanel' || cnt.name == 'Roof_Material') {
            val = cnt.value == null ? cnt.value : parseInt(cnt.value);//.toString();
            cnt.value = cnt.value == null ? cnt.value : parseInt(cnt.value);
          }
          if ((cnt.name == 'OwnerId' || cnt.name == 'Setter') && cnt.dt_code == 'select' && cnt.select_options != null && val != null) {
            val = val.toLowerCase();// due to user is in upper case
            cnt.value = val.toLowerCase();
          }

          if (cnt.dt_code == 'select' && cnt.select_options != null && (cnt.name == 'CreatedById' || cnt.name == 'LastModifiedById')) {
            if (cnt.value != '') {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  val = itemList.name;
                  cnt.dt_code = 'text';
                  cnt.is_readOnly = true;
                }
              });
            } else {
              cnt.dt_code = 'text';
              cnt.is_readOnly = true;
            }
          }
          //if ( cnt.dropdown_type == 'custom' && cnt.parent_id > 1 && (val != '' || val != null)) {
          //  cnt.select_options = null;
          //}

          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])

        });

        this.form = new FormGroup(group);
      }
      this.loading = false;

    });

    // if (show) {
    //   if(this.showdet==false)
    //   {

    //     this.showDetailDiv=this.showdet;
    //   }
    //   else
    //   {
    //     this.showDetailDiv = true;
    //   }

    //   this.showFormDiv = false;
    //   this.loading = false;
    // }
  }
  /// "Closed - Not Converted"
  showStage(loanAppStageId, show = null, item = null, ParentId: string = null, isEnabledDetailsView?) {
    debugger
    if(item && item.loan_app_stage_name == "Closed - Converted" && this.submoduleName == "lead"){
      this.showConvertPopUp();
    }else{

      this.isEditable = false;
      if(this.previousSatgeId != loanAppStageId  && this.showFormDiv == true)
      {
       if(item.stageClassCopy == "ui-done" && item.stageclass == "ui-open")
       {
        item.stageclass = "ui-done";
       }
       this.getSatgeDataById(item, ParentId, loanAppStageId, isEnabledDetailsView);
      }
      else if(this.previousSatgeId != loanAppStageId && this.showFormDiv == false)
      {
       if(item.stageClassCopy == "ui-done")
       {
        item.stageclass = "ui-done";
       }
       this.getSatgeDataById(item, ParentId, loanAppStageId, isEnabledDetailsView);
         this.editStageDetail();
      }
      else
      {

        if(this.previousSatgeId == loanAppStageId && this.showFormDiv == true)
        {
          if(item.stageClassCopy == "ui-done" && item.stageclass == "ui-open")
          {
           item.stageclass = "ui-done";
          }
          else  if(item.stageClassCopy == "ui-current" && item.stageclass == "ui-open")
          {
           item.stageclass = "";
          }
         this.closedetailform();
        }
        else
        {
         this.getSatgeDataById(item, ParentId, loanAppStageId, isEnabledDetailsView);
         this.editStageDetail();
        }
      }
    }
    this.previousSatgeId = loanAppStageId;
  }

  editStageDetail() {
    this.showDetailDiv = false;
    this.showFormDiv = true;
  }

  closedetailform() {
    //this.showDetailDiv = true;
    this.stagedatamaster.forEach(m => {
      if(m.loan_app_stage_id == this.currentStageDataObject.loan_app_stage_id)
      {
        if(m.stageClassCopy != "ui-current" && m.stageClassCopy != "ui-open")
        {
          m.stageclass =  "ui-done"
        }
        else if(m.stageClassCopy == "ui-current" && m.stageclass == "ui-open")
        {
          m.stageclass =  "";
        }
      }
      else if(m.stageClassCopy != "ui-current" && m.stageclass == "ui-open")
      {
        m.stageclass =  ""
      }

      if(m.stageclass == 'step-grey' || m.stageClassCopy == 'step-grey')
      {
        m.stageclass = '';
        // m.stageSelectedClass = '';
        // m.stageClassCopy = '';
      }
    });
    this.showFormDiv = false;
  }



  checkvalue(formvalues, selval) {
    let returnValue = false;
    if (formvalues != null) {
      formvalues.split(',').find((item) => {
        if (item == selval) {
          returnValue = true;
        }
      });
    }
    return returnValue;
  }

  onCheckboxChange(e, groupdisp, controldisp) {
    let checkboxdatanew = new CheckboxData();
    checkboxdatanew.controlname = controldisp.ColumnName;
    if (e.target.checked) {
      let strvalues = "";
      if (this.checkboxdata1.length > 0) {
        strvalues = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName).controlvalues;
      }
      if (strvalues == "") {
        checkboxdatanew.controlvalues = e.target.labels[0].innerHTML;
        this.checkboxdata1.push(checkboxdatanew);
      } else {
        let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName);
        let index = this.checkboxdata1.indexOf(updateItem);
        this.checkboxdata1[index].controlvalues = strvalues + "," + e.target.labels[0].innerHTML;


      }

    }
    else {

      let strs = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName).controlvalues.split(",");

      let updatedval = strs.splice(strs.indexOf(e.target.labels[0].innerHTML), 1);
      let updateItem = this.checkboxdata1.find(item => item.controlname == controldisp.ColumnName);
      let index = this.checkboxdata1.indexOf(updateItem);
      this.checkboxdata1[index].controlvalues = strs.toString();

    }

    var dd = this.formControlList;

  }


  getStageDetailsById(id) {
    //this.customCompnentValues_Copy =  this.customCompnentValues ;
    this.refreshData(id, this.submoduleName);
  }


  refreshData(id, moduleName, data: string = null) {
    debugger
    if (data == 'hideStageDetails') {
      this.hideConstomerSatgeDtails = true;
    }
      this.customCompnentValues = [];
      this.loading = true;
      this.submoduleName = moduleName;
      this.Id = id;
      this.commonService.getStageDetailsById(this.Id, this.submoduleName).subscribe((result: any) => {
        if (result) {
          debugger
          if (this.commonService.stageDetail == "0") {
            this.stageData = null;
            this.stagedatamaster = null;
            this.loading = false;
            return;
          }

          this.stageData = this.commonService.stageDetail;
          this.masterKey = this.stageData[0].MasterKey;
          if (this.masterKey == 'Unqualified') {
            this.unqualifiedStage = true;
          }
          this.stagearray = [];
          this.stagedatamaster = this.stageData.filter(item => item.ParentId == null).map(m => {
            return {
              BatchID: m.BatchID,
              DateSubmitted: m.DateSubmitted,
              LinkFormMaster: m.LinkFormMaster,
              LinkFormType: m.LinkFormType,
              ParentId: m.ParentId,
              SequenceType: m.SequenceType,
              display_order: m.display_order,
              loan_app_stage_id: m.loan_app_stage_id,
              loan_app_stage_name: m.loan_app_stage_name,
              masterIdAuto: m.masterIdAuto,
              masterValue: m.masterValue,
              stageActive: m.stageActive,
              stageapproved: m.stageapproved,
              stageclass: m.stageclass,
              stageSelectedClass: '',
              userTypes: m.userTypes,
              createdDate: m.createddate
            }
          });
          this.stagedatamaster.forEach(m => {
            debugger
            m.stageClassCopy = m.stageclass ;
             if(m.stageclass=='step-green'){
              m.stageclass='ui-done'
            }

            if(m.stageclass == "ui-current" && m.parentId == null)
            {
              m.stageclass = "";
            }
            if(m.stageActive != 1 && m.stageclass == 'step-grey')
            {
              m.stageclass = '';
              // m.stageSelectedClass = '';
              // m.stageClassCopy = '';
            }
            if(m.stageActive == 1 && m.stageclass == 'step-grey')
            {
              m.stageclass = 'ui-done';
            }
            });
          let stageapproved: any;
          stageapproved = this.stageData.filter(item => item.stageapproved == 1 && item.stageActive == 1)
          if (stageapproved.length > 0) {
            //
            this.currentStageDataObject = this.stagedatamaster.find(x => x.loan_app_stage_id == stageapproved[stageapproved.length - 1].loan_app_stage_id);
         //   this.showStage(stageapproved[stageapproved.length - 1].loan_app_stage_id, true,this.currentStageDataObject);
          }
          this.showFormDiv = false;

          let innerstageActive: any;
          innerstageActive = this.stageData.filter(item => item.stageActive == 1 && item.stageapproved == 0)
          if (innerstageActive && innerstageActive.length > 0) {
            this.stageId = innerstageActive[0].loan_app_stage_id;
            this.stageName = innerstageActive[0].loan_app_stage_name;
            this.buttonTitle = ' Mark As Status Changed';
          }

          this.stageData.forEach((item1) => {

            // if(item1.stageclass='step-green'){
            //   item1.stageclass=''
            // }

            item1.LinkFormMaster.split(',').forEach((item) => {
              let _stgname = item.split('::')
              let _stagearray = new dynamicsectionarray();
              if (_stgname.length <= 2) {

                _stagearray.stageName = _stgname[0];
              }
              _stagearray.stageActive = item1.stageActive;
              if (item.search('form::') == -1) {
                _stagearray.stageName = _stgname[0];
              }
              else {
                _stagearray.stageName = _stgname[2];
                _stagearray.formmasterid = _stgname[1];
              }
              _stagearray.stageclass = item1.stageclass;
              _stagearray.linkFormMaster = item1.LinkFormMaster;
              this.stagearray.push(_stagearray);
              this.loading = false;
            });
          });

        }
      });
      this.loading = false;
    }


  formstagedatasub(item) {

    var itemsdata = this.stageData.filter(x => x.ParentId == item);

    return itemsdata;
  }

  formstagedatasubProposal(item) {
    var itemsdata = this.stageData.filter(x => x.loan_app_stage_id == item);

    return itemsdata;
  }

  checksubchildsq(item) {

    var itemsdata = this.stageData.filter(x => x.ParentId == item && x.SequenceType == 'Sequence');
    return itemsdata.length > 0;
  }
  checksubchildpar(item) {

    var itemsdata = this.stageData.filter(x => x.ParentId == item && x.SequenceType == 'Parallel');
    return itemsdata.length > 0;
  }

  checklaststage() {
    let isdone = false;
    var itemsdata = this.stageData.filter(x => x.ParentId == null);
    if (itemsdata[itemsdata.length - 1].stageapproved == 1) {
      isdone = true;
    }
    var itemsdata = this.stageData.filter(x => x.ParentId == itemsdata[itemsdata.length - 1].loan_app_stage_id);
    itemsdata.forEach(item => {
      if (item.SequenceType == 'Parallel' && item.stageapproved == 1) { isdone = true; return isdone; }
      else if (item.SequenceType == 'Sequence' && item.stageapproved == 0) { isdone = false; return isdone; }
    });
    return isdone;

  }


  onSubmit() {

    this.checkboxdata1.forEach((item) => {

      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";// this.form.get(item.controlname).value;
        if (selvalues == "" || selvalues == null) {
          this.form.get(item.controlname).setValue(item.controlvalues);
        } else {
          this.form.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });

    if (Object.keys(this.form.value).find(Key => Key.includes('Email'))) {
      this.checkEmail = Object.keys(this.form.value).find(key => key.includes('Email')).valueOf();

      this.CheckEmailNotExists(this.checkEmail);

    }

    else {
      this.existsEmail = true
      this.FormSubmisiion();
    }


    this.isEditable = false;

  }


  FormSubmisiion() {
    if (this.form.valid) {
      if (this.existsEmail) {
        this.loading = true;
        this.JsonData.Id = this.Id;
        this.JsonData.moduleCode = this.moduleName;
        this.JsonData.subModuleCode = this.submoduleName;

        const _formData = this.form.value;
        for (let index in _formData) {
          let data = _formData[index];
          if (data) {
            if (Date.prototype.isPrototypeOf(data)) {
              _formData[index] = this.commonService.getUserSelectedZoneToUTC(data);
            }
          }
        }

        this.JsonData.FormJsonData = JSON.stringify(this.form.value);

        this.commonService.addEditSolgenStageForm(this.JsonData).subscribe((result: any) => {

          
          if (result.statusCode == 200) {

            debugger

            this.showStage(this.stageId,null,this.currentStageDataObject);
            this.toaster.success(this.commonService.successMessage);
            this.showDetailDiv = true;
            this.showFormDiv = false;

            this.newItemEvent.emit(true);

          }
          else {
            this.toaster.error(result.responseMessage);
            this.loading = false;
          }
        }, error => {
          this.loading = false;
        });

      }
      else {

        this.toaster.error('Email already associated with other User Type. Please use different Email.');
        this.loadSave = false;
      }
    }
    else {
      this.commonService.validateAllFormFields(this.form);
      this.loading = false;
    }
  }
  CheckEmailNotExists(email: string) {

    this.leadService.CheckEmailNotExistInOthersTypeAccount(this.form.value[email]).subscribe(m => {
      if (m == false) {
        this.existsEmail = true;
      }
      else {
        this.existsEmail = false;
      }
      this.FormSubmisiion();
    })
  }


  markAsComplete() {
    if (this.stageName == 'Closed - Converted') {
      this.showConvertPopUp();
    }

    else {
      this.loading = true;
      this.markAsCompleteData.Id = this.Id;
      this.markAsCompleteData.moduleCode = this.moduleName;
      this.markAsCompleteData.subModuleCode = this.submoduleName;
      this.markAsCompleteData.stageId = this.stageId;

      this.commonService.markAsCompleteStatus(this.markAsCompleteData).subscribe((result: any) => {

        if (result.statusCode == 200) {

          //setTimeout(() => {
          // this.router.navigateByUrl("/viewproposal/" + this.Id);
          this.proposalService.setStageChangeEvent();
          this.getStageDetailsById(this.Id);

          //this.showStage(this.stageId, true);

          this.newItemEvent.emit(true);

          this.toaster.success(result.responseMessage);


          //}, 1000);
        }
        else {
          this.toaster.error(result.responseMessage);
          this.loading = false;
        }
      }, error => {
        this.loading = false;
      });
    }

  }


  onScrollToEnd(dataList: any, j: number) {
    this.fetchMore(dataList, j);
  }

  private fetchMore(dataList: any, j: number) {
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList[j].select_options.length;
    this.custom_field_id = dataList[j].custom_field_id;
    this.field_code = dataList[j].field_code;

    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      (dataList[j].select_options as any[]) = (dataList[j].select_options as any[]).concat(this.scrollDataList);

    })
  }

  onKey(e: any, dataList: any, j: number) {
    this.len = 0
    this.custom_field_id = dataList[j].custom_field_id;
    this.field_code = dataList[j].field_code;
    this.searchText = e.target.value;
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      (dataList[j].select_options as any[]) = this.scrollDataList;
    })
  }

  onClearLang(dataList: any, j: number): void {
    this.len = 0
    this.custom_field_id = dataList[j].custom_field_id;
    this.field_code = dataList[j].field_code;
    this.searchText = '';
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      (dataList[j].select_options as any[]) = this.scrollDataList;
    })
  }
  enableEditing()
  {
    this.isEditable = true;
  }
  getValue(a, b: any[]): string {
    let data = "";
    //debugger
    if (b != null) {
      b.forEach(s => {
        try {
          if (s.value.toString() === a.toString()) {

            data = s.name;
          }
        } catch {

        }
      });
      return data;
    }
  }
  onCustomChange(e: any, inner: any) {
    //this.customCompnentValues.forEach(cnt => {
    //  if (cnt.dropdown_type == 'custom' && cnt.parent_id > 1) {
    //    cnt.select_options = null;
    //  }
    //});
    let id;
    if (this.optionalParameters == false) {
      id = e.value;
    }
    else {
      id = e;
    }

    this.clearCustomChange(inner);

    this.opportunityService.GetCascadingData(id, this.moduleName, this.submoduleName, 0).subscribe((result: any) => {
      //debugger
      if (result) {
        this.cascadingCompnentValues = this.opportunityService.cascadingFieldsList.data;

        this.cascadingCompnentValues.forEach(cascading => {
          this.customCompnentValues.forEach(cnt => {
            if (cnt.form_controlName == cascading.form_controlName) {

              cnt.select_options = cascading.m;
              this.optionalParameters = false;
            }
            else {
              if (cnt.name == "ShopHasElectricalSubPanel" && inner.name == 'ShopHasElectricalSubPanel') {
                cnt.select_options = null;
                this.optionalParameters = false;
              }
            }

          });
        });
        if (this.optionalParameters == true) {
          //inner.select_options = null;
          this.customCompnentValues.forEach(cnt => {
            if (cnt.name == "ShopHasElectricalSubPanel" && inner.name == 'ShopHasElectricalSubPanel') {
              cnt.select_options = null;
              this.optionalParameters = false;
            }

          });
        }
      }
      else {
      }
    });
  }
  clearCustomChange(inner: any) {
    this.cleanValues.length = 0;
    this.customCompnentValues.forEach(item => {// clear all dependent child
      if (inner.custom_field_id == item.parent_id) {
        item.select_options = null;
        this.form.get(item.form_controlName).setValue(null);
        this.cleanValues.push(item);
      }
    });



    if (this.cleanValues.length > 0) {
      this.cleanValues.forEach(clear => { // ? what about  child  and sub child and so on
        this.customCompnentValues.forEach(item => {// clear all dependent child
          if (clear.custom_field_id == item.parent_id) {
            item.select_options = null;
            this.form.get(item.form_controlName).setValue(null);
          }
        });
      });
    }


  }

  GetCustomFieldsList() {

    this.formControlList = [];
    this.displayType = 'VIEW';
    this.leadService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.leadService.customFieldsList.data;
        //debugger
        let unqualifiedStatus: any;
        let val: any;
        unqualifiedStatus = this.customCompnentValues.filter(item => item.name == 'StatusName')
        unqualifiedStatus.length > 0 ? val = unqualifiedStatus[0].value : val = null;
        if (typeof val != 'undefined' && val != null) {
          val = val.split(':', 1)
          if (val == 'Unqualified') {
            this.unqualifiedStage = true;
          }
          else {
            this.unqualifiedStage = false;
          }
        }
        this.customCompnentValues.forEach(t => {
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }
          if (groupCheck == null || groupCheck.length == 0) {
            let obj = {
              group_id: t.group_id,
              group_name: t.group_name,
              group_display_name: t.group_display_name,
              InnerData: this.customCompnentValues.filter(x => x.group_id == t.group_id),
              visibility_condition: t.visibility_condition,
              visibility_condition_label: t.visibility_condition_label,
              IsVisible: true,
              default_value: (t.default_value) ? t.default_value : '',
              layout_type: (t.layout_type) ? t.layout_type : '',
              group_display_order: (t.group_display_order) ? t.group_display_order : 0
            }
            this.formControlList.push(obj);
          }
        });
        //******************  merge groups and additional groups start here **********//
        if (this.additionalGroups) {
          this.additionalGroups.forEach(item => {

            let _object = {
              group_id: item.group_id,
              group_name: item.group_name,
              group_display_name: item.group_display_name,
              InnerData: [],
              visibility_condition: item.visibility_condition,
              visibility_condition_label: item.visibility_condition_label,
              IsVisible: true,
              default_value: (item.default_value) ? item.default_value : '',
              layout_type: (item.layout_type) ? item.layout_type : '',
              group_display_order: item.display_order
            };

            if (item.group_layout_type === 'textarea') {
              this.formControlList.push(_object);
            } else if (item.group_layout_type === 'textAreaTop') {
              this.groupTop.push(_object);
            }
          });
          this.formControlList.sort((a, b) => (a.group_display_order > b.group_display_order) ? 1 : -1);

          if (this.groupTop) {
            this.groupTop.sort((a, b) => (a.group_display_order > b.group_display_order) ? 1 : -1);

            this.groupTop.forEach((item, index) => {
              if (item.visibility_condition_label) {
                item.visibility_condition_label = (item.visibility_condition_label) ? JSON.parse(item.visibility_condition_label) : null;
                item.IsVisible = this.GetVisibilityDecision(item.visibility_condition_label);
              }
            });
          }
        }

        //******************  merge groups and additional groups end here **********//
        this.formControlList.forEach((item, index) => {
          if (item.visibility_condition_label) {
            item.visibility_condition_label = (item.visibility_condition_label) ? JSON.parse(item.visibility_condition_label) : null;
            item.IsVisible = this.GetVisibilityDecision(item.visibility_condition_label);
          }
        });
        const group: any = {};
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          //else if (cnt.dt_code == 'datetime') {
          //  if (cnt.value) {
          //    try {
          //      cnt.value = (cnt.value == '' ? null : new Date(cnt.value + 'Z'));
          //    }
          //    catch (e) {
          //      // console.log(e);
          //    }
          //  }
          //}
          //else if (cnt.dt_code == 'date' || cnt.actual_data_type == 'date') {
          //  if (cnt.value == "") {
          //    val = null;
          //  } else {
          //    let val1 = new Date(cnt.value);
          //    val = val1.getMonth() + 1 + '/' + val1.getDate() + '/' + val1.getFullYear();
          //  }
          //}
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }

          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => {
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }

          if (cnt.ColumnName == 'OwnerName') {
            this.ownerId = cnt.ref_value;
          }

          if (cnt.dt_code == 'select') {
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value) {
                  cnt.value = itemList.name;
                }
              });
            }
          }


          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])
        });
        this.form = new FormGroup(group);
        this.loadSave = false;
        this.GetCustomFieldsListTopRow();
        this.getRelatedObjects();
        /////////////////////////////////Flowwww////////////////////////////

        let flowList = this.leadService.customFieldsList.executionFlow;
        flowList.forEach(item => {
          let itmevisible = 'yes';
          if (item.filterConditions)
            item.filterConditions.forEach(condi => {
              let fieldValue = this.customCompnentValues.find(x => x.custom_field_id == Number(condi.field)).value;
              if (itmevisible == 'yes') {
                if (condi.operator == "=") {
                  if (fieldValue.toLowerCase() == condi.value.toLowerCase()) {
                    item.isVisible = true;
                    if (item.visibilityCondition == '2')
                          itmevisible = 'no'
                  }
                  else {
                    item.isVisible = false;
                  }
                }
                else if (condi.operator == "<>") {
                  if (fieldValue.toLowerCase() != condi.value.toLowerCase()) {
                    item.isVisible = true;
                  }
                  else {
                    item.isVisible = false;
                  }
                }
              }


              if (item.visibilityCondition) {
                // -----AND
                if (item.visibilityCondition == '1') {

                  if (itmevisible == 'yes') {
                    if (item.isVisible) {
                      itmevisible = 'yes'
                    }
                    else {
                      itmevisible = 'no'
                    }
                  }
                  else {
                    item.isVisible = false;
                  }
                }
                // -----OR
              }
            });
          else
            item.isVisible = true;
        });
        this.executionFlow = flowList.filter(x => x.isVisible == true);

      }
    });
  }
  GetVisibilityDecision(jsonData: any) {
    try {
      let result: any[] = [];
      var json = this.commonService.TryJsonParse(jsonData);
      json.forEach((field: fieldsJson, index) => {
        let values = this.customCompnentValues.filter(column => column.custom_field_id == field.column_name)[0].ref_value;
        let expression: string = this.commonService.GetOperatorExpression(field.operatorId, this.operatorList);

        switch (expression.toLowerCase()) {
          case "==":
            result.push(field.value.includes(values) ? true : false);
            break;
          case "like":
            result.push(values.includes(field.value) ? true : false);
            break;
          case "!=":
            result.push(field.value.includes(values) ? false : true);
            break;
          case "not like":
            result.push(values.includes(field.value) ? false : true);
            break;
          case "<":
            result.push((parseFloat(values) < parseFloat(field.value)) ? true : false);
            break;
          case "<=":
            result.push((parseFloat(values) <= parseFloat(field.value)) ? true : false);
            break;
          case ">":
            result.push((parseFloat(values) > parseFloat(field.value)) ? true : false);
            break;
          case ">=":
            result.push((parseFloat(values) >= parseFloat(field.value)) ? true : false);
            break;
          case "between":
            result.push((parseFloat(values) >= parseFloat(field.value) && parseFloat(values) <= parseFloat(field.second_value)) ? true : false);
            break;
          case "is null":
            result.push((!values) ? true : false);
            break;
          case "is not null":
            result.push((values) ? true : false);
            break;
          default:
            result.push(false);
            break;
        }
      });

      let finalDecision = true;
      if (json.length > 1) {
        let data: string[] = json.map((field: fieldsJson) => field.extended_operator).filter((value, index, self) => self.indexOf(value) == index && value != "") as [];

        if (data.length <= 1) {
          let operator = (data[0]) ? data[0] : "";
          if (operator.toLowerCase() === "or") {
            let _filterResult = result.filter(resp => resp == true);
            if (_filterResult.length > 0) {
              finalDecision = true;
            } else {
              finalDecision = false;
            }
          }
          else if (operator.toLowerCase() === "and") {
            let _data = result.filter((value, index) => result.indexOf(value) == index) as any[];

            if (_data.length) {
              if (_data.length == 1) {
                if (_data[0] === false) {
                  finalDecision = false;
                }
                else {
                  finalDecision = true;
                }
              }
              else {
                finalDecision = false;
              }
            }
          }
        }
      }
      else {
        finalDecision = result[0];
      }
      return finalDecision;
    }
    catch (e) {
      return true;
      //// console.log(e);
    }

  }
  subscriber = new Subject();
  relatedObjects: any[] = [];
  getRelatedObjects() {
    this.commonService.GetRelatedObjects(this.moduleName, this.submoduleName, this.Id, "", "")
      .pipe(takeUntil(this.subscriber))
      .subscribe(resp => {
        if (resp) {
          this.relatedObjects = resp["dataRelated"] as [];
          this.relatedObjects.forEach((item, index) => {
            if (item.visibility_condition_json) {
              item.visibility_condition_json = (item.visibility_condition_json) ? JSON.parse(item.visibility_condition_json) : null;
              item.IsVisible = this.GetVisibilityDecision(item.visibility_condition_json);
            }
          });
        } else {
          this.commonService.ShowError();
          this.loadSave = false;
        }
      }, error => {
        this.commonService.ShowError();
        this.loadSave = false;
      }, () => {
        this.loadSave = false;
      });
  }
  GetCustomFieldsListTopRow() {
    this.loadSave = true;
    this.displayType = 'VIEW_TOP';
    this.leadService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {
      if (result) {
        this.customCompnentValuesTop = this.leadService.customFieldsList.data;
        //debugger
        const group: any = {};
        var stageTitle =  this.customCompnentValuesTop.filter(x=> x.display_name == 'First Name' || x.display_name=='Last Name');

        if( this.submoduleName == 'opportunity')
        {

          this.customCompnentValuesTop =  this.customCompnentValuesTop.filter(x=>  x.display_name == 'Opportunity Owner'
           || x.display_name == 'Primary Proposal' || x.display_name == 'Utility Company' || x.display_name == 'Service Territory'   );
        }
        stageTitle.forEach(element => {
          this.stageTitle =  this.stageTitle + " " + element.value;
        });
        if(this.submoduleName != 'opportunity' && this.submoduleName != 'proposal')
        {
          this.headerTitleName = this.stageTitle;
        }
        this.customCompnentValuesTop =  this.customCompnentValuesTop.filter(x=> x.display_name != 'First Name' && x.display_name!='Last Name');
        const convertdatetime = new DateTimeToLocalForAddEditPipe();
        this.customCompnentValuesTop.forEach(cnt => {
          let val = null;

          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else if (cnt.dt_code == 'datetime') {
            cnt.value = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, null)); // to convert to local time
          } else if (cnt.dt_code == 'date') {
            cnt.value = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, 'Date')); // to convert to local time
          }
           else {
            val = (cnt.value == '' ? null : cnt.value);
          }
          if(cnt.ColumnName == "CreatedById")
          {
            cnt.display_name = "Prepared By";
          }
          this.checkboxdataTop.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } });//for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdataTop.forEach((item) => {
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }

          if (cnt.ColumnName == 'FirstName') {
            this.LeadFirstName = cnt.value;
          }
          if (cnt.ColumnName == 'LastName') {
            this.LeadLastName = cnt.value;
          }
          if (cnt.ColumnName == 'OwnerName') {
            this.ownerId = cnt.ref_value;
          }
          if (cnt.ColumnName == 'ContractNumber') {
            this.headerTitleName = cnt.value;
          }
          //"ContractNumber"
          if (cnt.dt_code == 'select') { // OwnerName
            if (cnt.value != '' && cnt.select_options != null) {
              cnt.select_options.forEach(itemList => {
                if (itemList.value == cnt.value && cnt.ColumnName != 'OwnerName' && cnt.ColumnName != 'Service_Territory_Text')
                {
                  cnt.value = itemList.name;
                }
              });
            }
          }
          // group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          //   cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
          //     cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
          //       cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
          //         Validators.nullValidator
          //   ])
        });
        this.customCompnentValuesTop = this.customCompnentValuesTop.filter(x=> x.display_name != 'First Name' && x.display_name!='Last Name');
        //debugger
        this.loadSave = false;
        //this.form = new FormGroup(group);
      }
    });
  }

  SendBackClick() {
    this.loadSave = true;
    this.leadservice.SendBack(this.Id).subscribe((r: any) => {
      this.loadSave = false;
      if (r) {
        if (r.statusCode == 200) {
          this.toaster.success(r.responseMessage);
          this.GetCustomFieldsList();
        }
        else {
          this.toaster.error(r.responseMessage);
        }
      }

    }, error => {
    });

  }
}
