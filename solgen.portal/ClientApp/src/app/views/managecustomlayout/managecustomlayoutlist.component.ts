import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomLayoutService, LayoutForm, JsonData, updateDefaultStatus } from './managecustomlayout.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-managecustomlayoutlist',
  templateUrl: './managecustomlayoutlist.component.html',
  styleUrls: ['./managecustomlayoutlist.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class CustomLayoutlistComponent implements OnInit {
  @ViewChild('makeForm', { static: false }) makeFormModel: ModalDirective;
  @ViewChild('makeLayoutRole', { static: false }) layoutRoleModel: ModalDirective;
  @ViewChild('makeRolePopup', { static: false }) makeRolePopup: ModalDirective;
  layoutForm: LayoutForm = new LayoutForm();
  @Input() offset: number;
  txtFilter: string = "";
  filter: string = "";
  modulelist: any;
  lstUserType: any;
  searchUserType = '';
  id: any;
  sortDir = 'desc';
  sortColumn = 'custom_view_id';
  pagedData: any = {
    pager: {},
    data: []
  };
  @ViewChild('Select', { static: false }) MySelect: NgSelectComponent;
  listFilter = '';
  selectedValue;
  SelectedText: any;
  lstPageSize: any
  pageSizeValue: number;
  modulecode: number = 0;
  modulenamecode: any;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  loadSave: boolean = false;
  currentPage: number;
  module_id: number;
  subModuleId: any;
  deviceTypeId: any;
  layoutTypeId: any;
  subModulelist: any;
  totalRecords: any;
  columndata: any;
  modulelistPopUP: any;
  submodulelistPopUP: any;
  moduleSelectedValue: any;
  subModuleSelectedValue: any;
  deviceSelectedValue: any;
  layoutTypeSelectedValue: any;
  deviceList: any;
  layoutlist: any;
  rolelist: any;
  roleSelectedValue: any;
  JsonData: JsonData = new JsonData();
  custom_id: any = '';
  editrolelist: any;
  roleListPopup: any[] = [];
  isRoleAssigned: boolean;
  isSuperAdmin: any;

  constructor(private fb: FormBuilder,
    private customLayoutService: CustomLayoutService,
    private commonService: CommonService,
    private router: Router,
    private dialogService: ConfirmationDialogService,
    private toaster: ToastrService,
    private route: ActivatedRoute) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);


    this.commonService.getMasterItemsList('deviceType').subscribe((result: any) => {
      this.deviceList = this.commonService.masters;
    })
    this.commonService.getMasterItemsList('layoutType').subscribe((result: any) => {
      this.layoutlist = this.commonService.masters;
    })
    this.commonService.getMasterItemsList('roleList').subscribe((result: any) => {
      debugger;
      this.rolelist = this.commonService.masters;
      for (let i = 0; i < this.rolelist.length; i++) {
        if (this.rolelist[i].text.toLowerCase() == 'Default Company Admin Role'.toLowerCase()) {
            this.rolelist.splice(i,1)
        } 
      }
    })
  }

  ngOnInit() {
    this.isSuperAdmin = localStorage.getItem('isSuperAdmin');
    this.loadSave = true;
    this.module_id = null;
    this.deviceTypeId = null;
    this.layoutTypeId = null;
    this.getModuleddl();
    this.getPageSizes();
    this.currentPage = 0;
    this.pageSizeValue = 15;

    this.refresh();
  }
  get curPage(): number {
    return this.offset;
  }



  getModuleddl() {
    this.customLayoutService.GetModulesNameList(this.module_id).subscribe(response => {
      if (this.module_id == null || this.module_id == 0) {
        this.modulelist = JSON.parse(this.customLayoutService.customFieldsList).module;
        this.modulelistPopUP = JSON.parse(this.customLayoutService.customFieldsList).module;
      } else {
        this.submodulelistPopUP = JSON.parse(this.customLayoutService.customFieldsList).submodule;
      }
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }
  selectmodule(event) {
    if (event) {
      this.module_id = event.module_id;
      this.customLayoutService.getSubModuleListByModuleId(this.module_id).subscribe((result: any) => {
        this.subModuleId = null;
        if (result) {
          let _result = JSON.parse(result);
          this.subModulelist = _result.submodule;
        }
      });
    }
    else {
      this.module_id = null;
      this.subModuleId = null;
      this.subModuleSelectedValue = null;
      this.subModulelist = null;
      this.deviceTypeId = null;
      this.layoutTypeId = null;
    }
    ///////////////// this.lstPageSize = 0;
    this.currentPage = 0;
    this.refresh();
  }
  onSubModuleSelect(event) {
    if (event) {
      this.subModuleId = event.sub_module_id;
    }
    else {
      this.subModuleId = null;
    }
    ////////////this.lstPageSize = 0;
    this.currentPage = 0;
    this.refresh();
  }
  onDeviceTypeSelect(event) {
    if (event) {
      this.deviceTypeId = event.value;
    }
    else {
      this.deviceTypeId = null;
      this.layoutTypeId = null;
    }
    ////////////this.lstPageSize = 0;
    this.currentPage = 0;
    this.refresh();
  }
  onlayoutTypeSelect(event) {
    if (event) {
      this.layoutTypeId = event.value;
    }
    else {
      this.layoutTypeId = null;
    }
    ////////////this.lstPageSize = 0;
    this.currentPage = 0;
    this.refresh();
  }

  onSort(event) {
    var sort = event.sorts[0];
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 0;
    this.refresh();
  }

  edit(custom_view_id) {
    this.router.navigate(['/customlayoutlist/customlayout', custom_view_id]);
  }

  addRole(custom_view_id) {
    this.addFormLayout.reset();
    this.layoutRoleModel.show();
    this.custom_id = custom_view_id;
    if (this.custom_id > 0) {
      this.commonService.getMasterItemsInMultiple('roleIdJson', custom_view_id).subscribe((result: any) => {
        debugger;
        this.editrolelist = this.commonService.masters;
        let aa = JSON.parse(this.editrolelist[0].value);
        this.addFormLayout.patchValue({ roleid: aa.map(String) });
      });
    }
  }

  refresh() {
    this.loadSave = true;
    this.customLayoutService.GetSubModulesNameList(this.currentPage, this.pageSizeValue, null, this.module_id, this.subModuleId, this.deviceTypeId, this.layoutTypeId, this.sortDir, this.sortColumn, this.txtFilter).subscribe(response => {
      debugger;
      this.pagedData = this.customLayoutService.pagedData;

      this.pagedData.data.forEach((x)=>{
        if(x.module_name != null && x.module_name=='Solar'){
          x.module_name ='CRM';
        }
      });

      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  };

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  setPage($event) {
    this.currentPage = $event.page - 1;
    this.refresh();
  }
  showpopup() {
    this.addForm.reset();
    this.makeFormModel.show();
    this.loadSave = true;
    setTimeout(() => {
      this.loadSave = false;
    }, 500);
  }
  onChange($event) {
    this.currentPage = 0;
    this.refresh();
  }
  close() {
    this.makeFormModel.hide();
  }

  closeLayoutRole() {
    this.layoutRoleModel.hide();
  }

  addFormLayout = this.fb.group({
    roleid: [null, Validators.required],
  })
  debugger;
  get roleid() { return this.addFormLayout.get('roleid'); }

  addForm = this.fb.group({
    displayName: [null],
    layoutName: [null, Validators.required],
    moduleid: [null, Validators.required],
    submoduleid: [null, Validators.required],
    layoutNameDesc: [null],
    deviceid: [null, Validators.required],
    layoutTypeid: [null, Validators.required],
  })

  get displayName() { return this.addForm.get('displayName'); }
  get layoutName() { return this.addForm.get('layoutName'); }
  get moduleid() { return this.addForm.get('moduleid'); }
  get submoduleid() { return this.addForm.get('submoduleid'); }
  get layoutNameDesc() { return this.addForm.get('layoutNameDesc'); }
  get deviceid() { return this.addForm.get('deviceid'); }
  get layoutTypeid() { return this.addForm.get('layoutTypeid'); }

  selectmodulePop(event) {
    this.subModuleSelectedValue = null;
    if (typeof event === 'undefined') {
    }
    else {
      this.module_id = (event.module_id);
      this.getModuleddl();
    }
  }
  resetModule() {
    this.moduleSelectedValue = null;
    this.submodulelistPopUP = null;
    this.subModuleSelectedValue = null;
  }
  resetSubModule() {
    this.subModuleSelectedValue = null;
  }

  saveNewLayout() {
    if (this.addForm.valid) {
      this.layoutForm.displayName = this.addForm.value.displayName;
      this.layoutForm.layoutName = this.addForm.value.layoutName;
      this.layoutForm.moduleid = this.addForm.value.moduleid;
      this.layoutForm.submoduleid = this.addForm.value.submoduleid;
      this.layoutForm.layoutNameDesc = this.addForm.value.layoutNameDesc;
      this.layoutForm.deviceid = this.addForm.value.deviceid;
      this.layoutForm.layoutTypeid = this.addForm.value.layoutTypeid;
      this.customLayoutService.saveLayoutType(this.layoutForm).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.makeFormModel.hide();
          this.router.navigate(['/customlayoutlist/customlayout', result.id]);
        }
        else if (result.statusCode == 500 && result.id == -1) {
          this.toaster.error("Layout Name is already exist. Please use another Layout Name.");
        }
        else {
          this.toaster.error(result.responseMessage);
        }
      });
    }
    else {
      this.commonService.validateAllFormFields(this.addForm);
    }
  }

  saveLayoutRole() {

    if (this.addFormLayout.valid) {
      this.JsonData.Id = this.custom_id;
      this.JsonData.FormJsonData = JSON.stringify(this.addFormLayout.value);



      this.customLayoutService.checkRoleNameExist(this.JsonData).subscribe((result1: any) => {
        if (result1.statusCode == 201) {
          this.dialogService.confirm('', '""' + result1.responseMessage + '"  role(s) is already assigned in other layout. Are you sure you want to assign "' + result1.responseMessage + '" role(s) in this layout ?"').subscribe((confirmed) => {
            if (confirmed) {
              this.saveLayoutRoles_MethodCall();
            }
          });
        }
        else {
          this.saveLayoutRoles_MethodCall();
        }

      });


    } else {
      this.commonService.validateAllFormFields(this.addFormLayout);
    }
  }

  saveLayoutRoles_MethodCall() {
    this.customLayoutService.saveLayoutRoles(this.JsonData).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.toaster.success(result.responseMessage);
        this.layoutRoleModel.hide();
        this.custom_id = '';
        this.refresh();
      }
      else {
        this.toaster.error(result.responseMessage);
      }
    });
  }

  delete(row: any) {
    debugger;
      const message = Number(row.rolec_count) > 0 
                      ? `There are assigned role(s) with this layout. If you delete this layout then all the assigned role(s) users will get the default layout. Are you sure you want to delete the layout "${row.view_name}" ?` 
                      : `Are you sure you want to delete Layout "${row.view_name}" ?`;     
      this.dialogService.confirm('Delete Layout', message).subscribe(confirmed => {
      if (confirmed) {
        this.customLayoutService.DeleteRecords(row.custom_view_id, 'tblcustom_field_viewport').subscribe(r => {
          this.toaster.success(`Layout "${row.view_name}" has been deleted successfully`);
          this.refresh();
        }, error => {
        });
      }
      });
  }

  isCustomLayoutStatusChanged(event) {
    event.is_default == true ? event.is_default = false : event.is_default = true;
  }

  switchClicked(event, status) {
    if (event) {
      if (event.rolec_count > 0) {
        this.dialogService.confirm('Make Default Layout',
          'All the assigned roles will be removed from the default layout. Are you sure you want to make this layout as a default?').subscribe(confirmed => {
            if (confirmed) {
              this.updateCustomLayoutStatus(event, true);
            }
            else {
              status ? event.is_default = false : (event.is_default == true ? event.is_default = false : event.is_default = true);
            }
          });
      }
      else {
        this.updateCustomLayoutStatus(event, false);
      }
    }

  }

  updateCustomLayoutStatus(event, is_remove_role_status) {
    let data: updateDefaultStatus = new updateDefaultStatus();
    this.loadSave = true;
    data.device_type = event.device_type;
    data.layout_type = event.Screen_Type;
    data.sub_module_id = event.sub_module_id;
    data.custom_view_id = event.custom_view_id;
    data.is_remove_role = is_remove_role_status;
    this.customLayoutService.UpdateCustomLayoutDefaultStatus(data).pipe(take(1)).subscribe((response: any) => {
      if (response.statusCode == 200) {
        this.toaster.success(response.responseMessage);
        this.refresh();
        setTimeout(() => {
          this.loadSave = false;
        }, 1000);
      }
      else {
        this.toaster.error(response.Message);
      }
    });
  }

  resetFilter() {
    this.selectedValue = null;
    this.module_id = 0;
    this.subModuleSelectedValue = null;
    this.subModuleId = 0;

    this.layoutTypeId = null;
    this.deviceTypeId = null;
    this.txtFilter = null;
    this.refresh();
  };

  getRoleListData(id: any) {
    if (id > 0) {
      this.commonService.getMasterItemsInMultiple('roleCustomListData', id).subscribe((result: any) => {
        this.roleListPopup = this.commonService.masters;

        if (this.roleListPopup.length > 0) {
          this.isRoleAssigned = true;
        }
        else {
          this.isRoleAssigned = false;
        }
        this.makeRolePopup.show();
      });
    }
  }
  closeRoleModel() {
    this.makeRolePopup.hide();
  }


  OnSearch() {
    this.refresh();
  }

  searchLayoutName(event) {
    this.txtFilter = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.refresh();
    }
  };
  //getAssignRoleList(viewId: any) {
  //  { }
  //  this.customLayoutService.getAssignRoleList(viewId).subscribe()
  //}
}
