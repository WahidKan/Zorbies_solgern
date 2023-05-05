import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CheckboxData } from '../../queue/queueservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageservicecrewService, serviceCrewJsonData, serviceCrewMemberJsonData } from '../manageservicecrew.service';
import { CommonService, ModuleList } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { DatePipe } from '@angular/common';
import { DateTimeToLocalForAddEditPipe, DateTimeToLocalPipe } from '../../../pipes/datetime.pipe';
@Component({
  selector: 'app-addeditservicecrewmember',
  templateUrl: './addeditservicecrewmember.component.html',
  styleUrls: ['./addeditservicecrewmember.component.scss']
})
export class AddeditservicecrewmemberComponent implements OnInit {
  @Output() ServiceCrewMemberEmitter = new EventEmitter();

  pageTitle: any
  loadSave: boolean = false;
  crewId: any;
  moduleName = 'serviceappointment';
  inEditMode: boolean = false;
  submoduleName = 'servicecrewmember';
  addOrUpdatePermission: boolean;

  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  customCompnentValues: any;
  formControlList: any[] = [];
  UsersList: any[] = [];;
  checkboxdata1: Array<CheckboxData> = [];
  userId: any;
  userName: string;
  displayType: any;
  crewMemberId: any = '';
  crewName: any;
  JsonData: serviceCrewMemberJsonData = new serviceCrewMemberJsonData();
  @ViewChild('AddEditServiceCrewMember', { static: false }) AddEditModal: ModalDirective;
  id:any;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;

  scrollDataList: any;
  custom_field_id: any;
  len: any = 10;
  field_code: any;
  searchText: string;
  timeFormat: string;

  constructor(private fb: FormBuilder, private crewService: ManageservicecrewService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService, private datetime: DatePipe) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.userName = userdetail.firstName + ' ' + userdetail.lastName;
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICECREWMEMBERADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }

    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICECREWMEMBERUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICECREWMEMBERDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }
  }

  ngOnInit() {
    this.crewId = '';
  }

  refresh() {
    this.loadSave = true;
    this.crewId;
    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.crewMemberId, this.displayType).subscribe(resp => {
      if (resp) {
        this.customCompnentValues = resp.data;
        this.formControlList = [];
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

          }
        })
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

          if (cnt.name == 'ServiceCrewId' && this.displayType == 'ADD') {
            cnt.select_options.forEach(itemList => {
              debugger;
              if (itemList.value == this.crewId) {
                val = itemList.value;
                cnt.is_readOnly = true;
              }
            });
          }
          if (cnt.name == 'ServiceCrewId' && this.displayType == 'EDIT') {
            cnt.select_options.forEach(itemList => {
              debugger;
              if (itemList.value == this.crewId) {
                val = itemList.value;
                cnt.is_readOnly = true;
              }
            });
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
      }
      else {
        this.loadSave = false;
      }
    }, err => {
      this.loadSave = false;
    });
  }
  convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
  }
  show(crewId: any, crewName: any, crewMemberId: any) {
    ;
    this.crewId = crewId;
    this.crewName = crewName;
    if (crewMemberId) {
      this.crewMemberId = crewMemberId;
      this.displayType = 'EDIT';
      this.addOrUpdatePermission = this.isUpdate;
    } else {
      this.crewMemberId = '';
      this.displayType = 'ADD';
      this.addOrUpdatePermission = this.isAdd;
    }
    this.timeFormat = this.commonService.getTimeFormat();

    this.refresh();
    this.AddEditModal.show();
  }

  close() {
    this.AddEditModal.hide();
    this.ServiceCrewMemberEmitter.emit();
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
      //;
      this.loadSave = true;
      this.JsonData.crewMemberId = this.crewMemberId;
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

      this.crewService.addOrUpdateServiceCrewMember(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          setTimeout(() => {
            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            this.close();
          }, 1000);
        }
        else if (result.statusCode == 220) {

          let json = JSON.parse(result.responseMessage);
          const  _datetime = new DateTimeToLocalPipe
          if (json) {
            let _data = json["data"][0]
            let start = _datetime.transform(_data.StartDate,null);
            let End = _datetime.transform(_data.EndDate,null);
            this.toaster.error('This service resource already assigned in  "' + _data.Name + '" Crew from "' + start + '" to "' + End +'. Please select another resource or different timeslot.');
          }
          
          this.loadSave = false;
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
}
