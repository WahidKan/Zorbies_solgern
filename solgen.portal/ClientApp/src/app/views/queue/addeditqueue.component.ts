import { Component, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { CustomFieldService } from '../shared/custom-field/customfield.service';
import { CommonService, ModuleList } from '../shared/common.service';
import { QueueserviceService, CheckboxData, JsonData } from './queueservice.service';
import { OrderListModule } from 'primeng/orderlist';

@Component({
  selector: 'app-addeditqueue',
  templateUrl: './addeditqueue.component.html',
  styleUrls: ['./addeditqueue.component.scss']
})
export class AddeditqueueComponent implements OnInit {
  @ViewChild('droppedView', { static: false }) DroppedView: ElementRef;
  config: any[] = [];
  control: any;
  pageTitle: any;
  group_id: any;
  moduleName = 'Queue';
  submoduleName = 'queue';
  selecteddata: any;
  group_name: any;
  group_display_name: any;
  customCompnentValues: any;
  userListValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  sDtaa: any;
  loadSave = false;
  id: any = '';
  isLead = false;
  showChild = false;
  formControlList: any[] = [];
  errors: string[] = [];
  JsonData: JsonData = new JsonData();
  userId: any;
  addOrUpdatePermission: boolean;
  modulePermission: ModuleList;
  userListData: any[] = [];
  userListDataDummy: any[] = [];
  droped: any[] = [];
  dropdownFilter: any;
  searchtext: any;
  contentHeader: object;
 

  constructor(private fb: FormBuilder, private queueserviceService: QueueserviceService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
  }
  checkboxdata1: Array<CheckboxData> = [];

  ngOnInit() {
    this.dropdownFilter = 'users';
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.loadSave = true;
          this.id = id;
          this.pageTitle = 'Edit Queue';
          this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
        } else {
          this.pageTitle = 'Add Queue';
          this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
        }
      }
    );

    this.queueserviceService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.id).subscribe((result: any) => {
      if (result) {
        this.customCompnentValues = this.queueserviceService.customFieldsList.data;

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
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else if (cnt.dt_code == 'date' || cnt.actual_data_type == 'date') {
            if (cnt.value == "") {
              val = null;
            } else {
              let val1 = new Date(cnt.value);
              val = val1.getMonth() + 1 + '/' + val1.getDate() + '/' + val1.getFullYear();
            }
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
    });

    this.queueserviceService.GetUsersList(this.companyId, this.id).subscribe((resultUser: any) => {
      if (resultUser)
      {
        this.userListValues = this.queueserviceService.userList.data;
        this.userListData = [];
        let i = 0;

        this.userListValues.forEach(t => {
          let obj = {
            text: t.UserName,
            index: i,
            value: t.Id,
            fieldName: t.DepartmentName,
          }
          this.userListDataDummy.push(obj);
        })

        this.userListValues.filter(x => x.selected== "false").forEach(t => {
          let obj = {
            text: t.UserName,
            index: i,
            value: t.Id,
            fieldName: t.DepartmentName,
          }
          this.userListData.push(obj);
        })

        this.userListValues.filter(x => x.selected == "true").forEach(t => {
          let obj1 = {
            text: t.UserName,
            index: i,
            value: t.Id,
            fieldName: t.DepartmentName,
          }
           this.droped.push(obj1);
        })
      }
    });
 
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Queue',
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
             name : 'Manage Queue',
             isLink : true,
             link : '/queuelist'
           },
           {
             name: this.pageTitle,
             isLink: false
           }
  
         ]
     };
   }
  OnItemSelected(item) {
    if (item.selected == true) {
      item.selected = false;
      return;
    }
    else {
      this.userListData[this.userListData.indexOf(item)].selected = true;
    }
  }

  OnShiftOneFromDragToDrop() {
    let selected: number[] = [];
    for (var i = 0; i < this.userListData.length; i++) {
      if (this.userListData[i].selected == true) {
        this.userListData[i].selected = false;

        this.droped.push(this.userListData[i]);
        selected.push(i);
      }
    }
    for (var i = selected.length - 1; i >= 0; i--) {
      let temp: number = selected[i];
      this.userListData.splice(temp, 1);
    }
  }
  OnShiftAllFromDragToDrop() {

    for (var i = 0; i < this.userListData.length; i++) {

      this.userListData[i].selected = false;
      this.droped.push(this.userListData[i]);
    }

    this.userListData.splice(0, this.userListData.length);

  }
  OnShiftAllFromDropToDrag() {
    for (var i = 0; i < this.droped.length; i++) {
      this.droped[i].selected = false;
      for (var j = 0; j < this.userListDataDummy.length; j++) {
        if (this.droped[i].value == this.userListDataDummy[j].value) {
          this.droped[i].selected = false;
          this.userListData.splice(j, 0, this.droped[i]);
          break;
        }
      }
    }
    this.droped.splice(0, this.droped.length);
  }
  OnShiftOneFromDropToDrag() {
   
    for (var i = 0; i <= this.droped.length; i++) {
      if (this.droped[i].selected == true) {
        for (var j = 0; j < this.userListDataDummy.length; j++) {
          if (this.droped[i].value == this.userListDataDummy[j].value) {
            this.droped[i].selected = false;
            this.userListData.splice(j, 0, this.droped[i]);
            this.droped.splice(i, 1);
            i--;
            break;
          }
        }
      }
    }
  }
  onDroppedItemClick(item) {
    this.droped[this.droped.indexOf(item)].selected = !item.selected;
  }

  clearFilter() {
    this.userListData = [];
    this.searchtext = '';
    let i = 0;
    this.userListValues.filter(x => x.selected == "false").forEach(t => {
      let obj = {
        text: t.UserName,
        index: i,
        value: t.Id,
        fieldName: t.DepartmentName,
      }
      this.userListData.push(obj);
    })
  }


  searchFilter() {
    this.userListData = [];
    let i = 0; 
    if (this.dropdownFilter == 'users') {
      this.userListValues.filter(s => s.UserName.toLocaleLowerCase().includes(this.searchtext.toLocaleLowerCase()) && s.selected == "false").forEach(t => {
        let obj = {
          text: t.UserName,
          index: i,
          value: t.Id,
          fieldName: t.DepartmentName,
        }
        this.userListData.push(obj);
      });
    } else {
      this.userListValues.filter(x => x.DepartmentName.toLocaleLowerCase().includes(this.searchtext.toLocaleLowerCase()) && x.selected == "false").forEach(t => {
        let obj = {
          text: t.UserName,
          index: i,
          value: t.Id,
          fieldName: t.DepartmentName,
        }
        this.userListData.push(obj);
      });
    }
      

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
  test(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  OnCheck() {
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
    if ( this.droped.length == 0 ) {
      this.toaster.error('No User Selected.');
      return
    }
   

    if (this.form.valid) {
      this.loadSave = true;
      this.JsonData.Id = this.id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.selecteddata = JSON.stringify(this.droped);
      this.JsonData.selecteddata = this.selecteddata;
      this.JsonData.userId = this.userId;
      this.JsonData.FormJsonData = JSON.stringify(this.form.value);

      this.queueserviceService.addEditForm(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          setTimeout(() => {
            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            this.router.navigateByUrl("/queuelist");
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

  displayInsuranceDetail(reposnse): void {
    const formGroup = {};
    for (let prop of Object.keys(this.customCompnentValues)) {
      formGroup[prop] = new FormControl(this.customCompnentValues[prop].value);
    }
    this.form = new FormGroup(formGroup);
  }

  close() {
    this.router.navigateByUrl("/queuelist");
  }
  MakeArray(value, type) {
    var array = [];
    var arr = String(value).split(',');
    if (type == "radio" || type == "checkbox") {
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].split("|").length > 1) {
            var person = { name: arr[i].split("|")[0], value: arr[i].split("|")[1] };
            array.push(person);
          }
          else {
            var person = { name: arr[i], value: arr[i] };
            array.push(person);
          }
        }
      }
    }
    else {
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          var person = { name: arr[i], value: arr[i] };
          array.push(person);
        }
      }
    }

    return array;
  }
  MakeNormalArray(value) {
    if (value) {
      try {
        return JSON.parse(value);
      }
      catch (ex) {
        return value;
      }
    }
    else {
      value = [];
    }
  }
  MakeSelectArray(objItem) {
    var array = [];
    var arr = String(objItem.select_options).split(',');
    if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {

      var person = { name: arr[0], value: arr[1] };
      array.push(person);
    }
    return array
  }
  removeValue = function (list, value, separator) {
    separator = separator || ",";
    var values = list.split(separator);
    for (var i = 0; i < values.length; i++) {
      if (values[i] == value) {
        values.splice(i, 1);
        return values.join(separator);
      }
    }
    return list;
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
  change(e){
    this.dropdownFilter = e.target.value;
  }
}
