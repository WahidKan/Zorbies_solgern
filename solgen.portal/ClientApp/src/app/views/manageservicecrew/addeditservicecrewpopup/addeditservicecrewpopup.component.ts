import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ManageservicecrewService, serviceCrewJsonData, UsersList } from '../manageservicecrew.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { CheckboxData } from '../../location/locationlist.service';
import { ModuleList, CommonService } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { id } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-addeditservicecrewpopup',
  templateUrl: './addeditservicecrewpopup.component.html',
  styleUrls: ['./addeditservicecrewpopup.component.scss']
})
export class AddeditservicecrewpopupComponent implements OnInit {
  @Output() manageServiceCrewEmitter = new EventEmitter();

  pageTitle: any
  loadSave: boolean = false;
  crewId: any;
  moduleName = 'serviceappointment';
  inEditMode: boolean = false;
  submoduleName = 'servicecrew';
  addOrUpdatePermission: boolean;
  //modulePermission: ModuleList;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  customCompnentValues: any;
  formControlList: any[] = [];
  UsersList: any[] = []; ;
  checkboxdata1: Array<CheckboxData> = [];
  userId: any;
  userName: string;
  displayType: any;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  JsonData: serviceCrewJsonData = new serviceCrewJsonData();
  @ViewChild('AddEditServiceCrew', { static: false }) AddEditModal: ModalDirective;

  constructor(private fb: FormBuilder, private crewService: ManageservicecrewService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService) {
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
      this.userName = userdetail.firstName + ' ' + userdetail.lastName;
    });
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICECREWADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICECREWUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }
  }

  ngOnInit() {
      this.crewId = '';
  }

  refresh() {
    this.loadSave = true;
    this.formControlList.splice(0);
    this.commonService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.crewId, this.displayType).subscribe(resp => {
      if (resp) {
        this.customCompnentValues = resp.data;

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
              this.checkboxdata1.forEach((item) => { // // console.log(item.controlname, item.controlvalues);
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }

          if (id) {
            if (cnt.name == 'CreatedById' || cnt.name == 'LastModifiedById' ) {
              val = cnt.value.toLowerCase();
              cnt.is_readOnly = true;
            }
          }

          if (cnt.name == 'OwnerId' && this.displayType == 'ADD') {
            cnt.select_options.push({ name: this.userName, value: this.userId })
            val = this.userId;
            cnt.is_readOnly = true;
          }

          if (cnt.name == 'OwnerId' && this.displayType == 'EDIT') {
            cnt.select_options.forEach(itemList => {
              ;
              if (itemList.value.toUpperCase() == cnt.value.toUpperCase()) {
                val = itemList.value;
              }
            });
            cnt.is_readOnly = true;
          }



          group[cnt.form_controlName] = new FormControl(val, [cnt.is_required == true ? Validators.required : Validators.nullValidator,
          cnt.actual_data_type == "int" ? Validators.pattern("[0-9]{1,9}") :
            cnt.actual_data_type == "bigint" ? Validators.pattern("[0-9]{1,9}") :
              cnt.actual_data_type == "decimal" ? Validators.pattern("[0-9]+(\.[0-9][0-9]?)?") :
                Validators.nullValidator
          ])

        });
        // console.log("group", group);
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

  show(crewId:any) {

    if (crewId) {
      this.crewId = crewId;
      this.displayType = 'EDIT';
      this.addOrUpdatePermission = this.isUpdate;
    } else {
      this.crewId = '';
      this.displayType = 'ADD';
      this.addOrUpdatePermission = this.isAdd;
    }
    this.AddEditModal.show();
    this.refresh();
  }

  close() {
    this.AddEditModal.hide();
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
      this.JsonData.crewId = this.crewId;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
      this.JsonData.companyId = this.companyId;
      this.JsonData.userId = this.userId;
      this.JsonData.FormJsonData = JSON.stringify(this.form.value);

      this.crewService.addOrUpdateServiceCrew(this.JsonData).subscribe((result: any) => {
        if (result.statusCode == 200) {
          setTimeout(() => {
            this.toaster.success(result.responseMessage);
            this.loadSave = false;
            this.manageServiceCrewEmitter.emit();
            this.close();
          }, 500);
        }
        else  {
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
 
}
