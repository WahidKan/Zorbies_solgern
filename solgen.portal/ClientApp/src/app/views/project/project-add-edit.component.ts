import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProjectService, projectJsonData } from './project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../shared/common.service';
import { CheckboxData } from '../loanapplication/loanapplicationservice.service';
import { LeadJsonData } from '../lead/lead.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-project-add-edit',
  templateUrl: './project-add-edit.component.html',
  styleUrls: ['./project-add-edit.component.scss']
})
export class ProjectAddEditComponent implements OnInit {
  config: any[] = [];
  control: any;
  pageTitle: any;
  group_id: any;
  moduleName = 'settings';
  submoduleName = 'projects';
  group_name: any;
  group_display_name: any;
  customCompnentValues: any;
  form: FormGroup;
  formGroup: FormGroup;
  companyId: any;
  grpId: any;
  sDtaa: any;
  loadSave = false;
  Id: any = '';
  displayType: any;
  isLead = false;
  showChild = false;
  formControlList: any[] = [];
  errors: string[] = [];
  modulePermission: any[] = [];
  isAdd: boolean = true;
  isUpdate: boolean = true;
  isDelete: boolean = true;
  searchText: string;
  len: any = 10;
  custom_field_id: any;
  field_code: any;
  scrollDataList: any;
  //JsonData: JsonData = new JsonData();
  JsonData: projectJsonData = new projectJsonData();
  userId: any;
  addOrUpdatePermission: boolean = false;
  warehouseControlName: any;
  wareHouseMappingList: any;
  contentHeader: object;
 
  // modulePermission: any[] = [];
  //isAdd: boolean = false;
  //isUpdate: boolean = false;
  //isDelete: boolean = false;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private router: Router,
    private toaster: ToastrService, private route: ActivatedRoute, private commonService: CommonService, private activeRoute: ActivatedRoute, private location: Location) {

    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.companyId = userdetail.companyId;
      this.userId = userdetail.id;
    });
    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICERESOURCEADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICERESOURCEUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'SERVICERESOURCEDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }
  }

  checkboxdata1: Array<CheckboxData> = [];
  ngOnInit() {

    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.loadSave = true;
          this.Id = id;
          this.isLead = true;
          this.pageTitle = 'Edit Project';
          this.displayType = 'EDIT';

        } else {
          this.loadSave = true;
          this.pageTitle = 'Add Project';
          this.displayType = 'ADD';

        }
      }
    );
    this.projectService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe((result: any) => {
      if (result) {
        // console.log("result onint", this.projectService.customFieldsList);
        this.loadSave = false;
        this.customCompnentValues = this.projectService.customFieldsList.data;

        let fieldArray = [];
        this.customCompnentValues.forEach(t => {
          if (t.name == "WareHouseMappingId") {
            this.wareHouseMappingList = t.select_options;
          }
          let groupCheck = this.formControlList.filter(y => y.group_id == t.group_id);
          if (t.dt_code == 'checkbox') {
            let checkdata = new CheckboxData();
            checkdata.controlname = t.ColumnName;
            this.checkboxdata1.push(checkdata);
          }
          if (t.dt_code == 'select' && t.picklist_options == 'true') {
            if (t.value != "") {
              t.value = JSON.parse(t.value);
            }
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
        data_type_name: Text
        this.customCompnentValues.forEach(cnt => {
          let val = null;
          if (cnt.actual_data_type == 'bit') {
            val = cnt.value == 1 ? true : false;
          }
          else {
            val = (cnt.value == '' ? null : cnt.value);
          }

          this.checkboxdata1.forEach((item) => { if (cnt.form_controlName == item.controlname) { item.controlvalues = cnt.value; } }); //for checkboxes on form
          if (cnt.actual_data_type == 'checkbox') {
            try {
              this.checkboxdata1.forEach((item) => {
                this.form.get(item.controlname).setValue(item.controlvalues.split(','));
              });
            }
            catch (err) { }
          }

          if (this.displayType == "EDIT" && cnt.dt_code == 'select' && (cnt.name == 'OwnerId' || cnt.name == 'RelatedRecord_UserID')) {
            cnt.select_options.forEach(itemList => {
              if (itemList.value.toUpperCase() == cnt.value.toUpperCase()) {
                val = itemList.value;
              }
            });
            cnt.is_readOnly = true;
            cnt.is_required = false;
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
  
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Projects',
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
             name : 'Manage Projects',
             isLink : true,
             link : '/projects'
           },
           {
             name: this.pageTitle,
             isLink: false
           }
  
         ]
     };
   }

  onSubmit() {
    this.loadSave = true;
    // let warehouseValue = this.form.get(this.warehouseControlName).value;
    // this.form.get(this.warehouseControlName).setValue(warehouseValue.value);
    if (this.form.valid) {
      this.loadSave = true;
      this.JsonData.Id = this.Id;
      this.JsonData.moduleCode = this.moduleName;
      this.JsonData.subModuleCode = this.submoduleName;
    
      this.JsonData.FormJsonData = JSON.stringify(this.form.value);

      this.projectService.addEditForm(this.JsonData).subscribe((result: any) => {

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

  close() {
    this.location.back();
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
    let data = (dataList[j].select_options as any[]);
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


  onResourceChange(a: any, b: any, c: any) {
    // console.log('a', a)
    // console.log('b', b)
    // console.log('c', c)
    // console.log('formControlList', this.formControlList);;
    if (c == 'ResourceType' && a.name == "Equipment") {

      //this.form.controls['1298_RelatedRecord_UserID'].clearValidators();
      //// console.log('formControlList', this.formControlList);;
      var keys = Object.keys(this.form.value);


      keys.forEach(t => {
        if (t.toString().includes("RelatedRecord_UserID")) {
          // console.log('t', t);
          this.form.get(t).setValidators(Validators.nullValidator);
          this.form.get(t).updateValueAndValidity();



        }
      });

      this.formControlList[0].InnerData.forEach(x => {
        if (x.name == "RelatedRecord_UserID") {
          x.is_required = false;

        }
      });

    }
    else if (c == 'ResourceType') {
      var keys = Object.keys(this.form.value);


      keys.forEach(t => {
        if (t.toString().includes("RelatedRecord_UserID")) {
          // console.log('t', t);
          this.form.get(t).setValidators(Validators.required);
          this.form.get(t).updateValueAndValidity();



        }
      });

      this.formControlList[0].InnerData.forEach(x => {
        if (x.name == "RelatedRecord_UserID") {
          x.is_required = true;

        }
      });

    }
  }
}
//"1300_RelatedRecord_UserID"
