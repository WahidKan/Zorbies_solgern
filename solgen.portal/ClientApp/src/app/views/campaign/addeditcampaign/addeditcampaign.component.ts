import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { CampaignService, campaignJsonData } from '../campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService, ModuleList } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { CheckboxData } from '../../loanapplication/loanapplicationservice.service';
import { Location } from '@angular/common';
import { DateTimeToLocalForAddEditPipe } from '../../../pipes/datetime.pipe';

@Component({
  selector: 'app-addeditcampaign',
  templateUrl: './addeditcampaign.component.html',
  styleUrls: ['./addeditcampaign.component.scss']
})
export class AddeditcampaignComponent implements OnInit {

  pageTitle: any
  loadSave: boolean = false;
  campaignId: any;
  moduleName = 'crm';
  inEditMode: boolean = false;
  submoduleName = 'campaign';
  addOrUpdatePermission: boolean;
 // modulePermission: ModuleList;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  customCompnentValues: any;
  formControlList: any[] = [];
  checkboxdata1: Array<CheckboxData> = [];
  userId: any;
  userName: string;
  displayType: any;
  JsonData: campaignJsonData = new campaignJsonData();
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;

  scrollDataList: any;
  custom_field_id: any;
  len: any = 10;
  field_code: any;
  searchText: string;
  timeFormat: string='12';
  contentHeader: object;


  constructor(private fb: FormBuilder, private campaignService: CampaignService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService, private location: Location) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.userName = userdetail.firstName + ' ' + userdetail.lastName;
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'CAMPAIGNADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }

    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'CAMPAIGNUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }


  }

  ngOnInit() {     
    this.campaignId = '';
    this.timeFormat = this.commonService.getTimeFormat();
    // console.log("companyId", this.companyId);
    this.route.paramMap.subscribe(
      params => {
        let _campaignId = params.get('id');

        if (this.commonService.getQueryStringValue("campaign") != null)
          _campaignId = this.commonService.getQueryStringValue("campaign");
       
        this.loadSave = true;

        if (_campaignId) {
          this.campaignId = _campaignId;
          this.inEditMode = true;
          this.pageTitle = 'Edit Campaign';
          this.displayType = 'EDIT';
          this.addOrUpdatePermission = this.isUpdate;
        } else {
          this.pageTitle = 'Add Campaign';
          this.displayType = 'ADD';
          this.addOrUpdatePermission = this.isAdd;
        }

      }
    );
    this.campaignService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.campaignId,this.displayType).subscribe((result: any) => {
      if (result) {
        // console.log("this.campaignService.customFieldsList", this.campaignService.customFieldsList)
        this.customCompnentValues = this.campaignService.customFieldsList.data;

        let fieldArray = [];
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
            //for (let config of this.formControlList) {

            //}
          }
        })
        // console.log("formControlList", this.formControlList)
        const group: any = {};
        data_type_name: Text
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
              this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues);
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }

          // group[cnt.form_controlName] = new FormControl(val, cnt.is_required == true ? Validators.required : Validators.nullValidator)
          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])

        });

        this.form = new FormGroup(group);
        // // console.log("validationFROM", this.form);
        this.loadSave = false;
      }
    }, err => {
        this.loadSave = false;
    });



  
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Campaign',
       actionButton: true,
       iconCssClass: '',
       breadcrumb:
         [
           {
             name: 'Dashboard',
             isLink: true,
             link: '/dashboard'
           },
           {
             name : 'Manage Campaign',
             isLink : true,
             link : '/campaign'
           },
           {
             name: this.pageTitle,
             isLink: false
           }
  
         ]
     };
   }
  close() {
    this.location.back();
  }

  onSubmit() {
    this.loadSave = true;
    this.checkboxdata1.forEach((item) => {
      if (item.controlvalues != "" && item.controlvalues != undefined) {
        var selvalues = "";
        if (selvalues == "" || selvalues == null) {
          this.form.get(item.controlname).setValue(item.controlvalues);
        } else {
          this.form.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
        }
      }
    });
    if (this.form.valid) {
      this.loadSave = true;
      this.JsonData.campaignId = this.campaignId;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;

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

      this.campaignService.addOrUpdateCampaign(this.JsonData).subscribe((result: any) => {

        if (result.statusCode == 200) {
          setTimeout(() => {
            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            this.location.back();
          }, 1000);
        }
        else {
          this.toaster.error(result.responseMessage);
          this.loadSave = false;
        }
      }, error => {
        this.loadSave = false;
      });
    }
    else {
      this.commonService.validateAllFormFields(this.form);
      this.loadSave = false;

    }

  }


  onScrollToEnd(dataList: any, j: number) {
    this.fetchMore(dataList, j);
  }

  private fetchMore(dataList: any, j: number) {
    
    // console.log("e", dataList);
    if (this.searchText == undefined) {
      this.searchText = '';
    }
    this.len = dataList[j].select_options.length;
    this.custom_field_id = dataList[j].custom_field_id;
    this.field_code = dataList[j].field_code;
    let data = (dataList[j].select_options as any[]);
    //this.len = this.getreturnNumber(this.len = 10, dataList[j].select_options.length);
    this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe((res: any) => {
      this.scrollDataList = this.commonService.customFieldsListData;
      // console.log('scrollDataList:', this.scrollDataList);
      
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
      // console.log('scrollDataList:', this.scrollDataList);
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
      // console.log('scrollDataList:', this.scrollDataList);
      (dataList[j].select_options as any[]) = this.scrollDataList;
    })
  }
  getreturnNumber(x, y) {
    return x + y;
  }
}
