import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Role, RoleModule, ParentModules, RoleService, saveRoleModel } from './role.service';
import { ModuleList, CommonService } from '../shared/common.service';
import { TreeNode } from 'primeng/api';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { DatePipe, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-roleedit',
  templateUrl: './roleedit.component.html',
  styleUrls: ['./roleedit.component.scss']
})
export class RoleeditComponent implements OnInit {
  @ViewChild('treepopup', { static: false }) treepopup: ModalDirective;
  pageTitle: string;
  loadSave: boolean = false;
  read = false;
  loadRoleModules = false;
  roleForm: FormGroup;
  lstUserType: any;
  statuses: any;
  Detail: any;
  role: Role = new Role();
  saveRoleModel: saveRoleModel = new saveRoleModel();
  selectUpdateEnable: boolean = false;
  errorMessage: string;
  roleModulesData: RoleModule[] = [];
  roledata: [];
  selectedValue: any
  isDisabled = '';
  addOrUpdatePermission: boolean = false;
  // modulePermission: ModuleList;
  parentModule: ParentModules[] = []
  roleTreeData: any;
  files1: TreeNode[];
  files2: TreeNode[];
  reporttoname: any = '';
  reporttoidselected: any;
  reportid: string;
  reportname: string;
  rolegetid: any
  tabdata: any;
  selected: any[] = [];
  radiobuttondata: any[] = [];
  selectedid: any;
  count: any;
  values: any;
  tabshow: boolean = false;
  radiobutton: string = '';
  privilageid: string = '';
  privilageidArray: any[] = [];
  roleautoid: any;
  privilageList: any[] = [];
  modulePermission: any[] = [];
  lstWidgets: any[] = [];
  FirstWidgetId: any;
  isLoanHomi: boolean = false;
  statusColor: boolean = false;
  contentHeader: object;
  userstype: any
  userTypeChange: any;

  //templateObjects: Template[] = new Array();
  //parentModule1: ParentModules;
  constructor(private commonService: CommonService,
    private fb: FormBuilder,
    private roleService: RoleService,
    private dialogService: ConfirmationDialogService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute, private http: HttpClient,
    @Inject(DOCUMENT) private document: any) {
    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
    if (add == undefined) {
      this.addOrUpdatePermission = false;
    } else {

      this.addOrUpdatePermission = true;
    }
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      console.log('userdetail', userdetail);
      if (userdetail.companyType != null && userdetail.companyType.toUpperCase() == 'COMPANYTYPEFINANCIALINSTITUTE') {
        this.isLoanHomi = true;
      }
    });
    this.commonService.getMasterItemsList("manageuser_usertype_role").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;//.filter(x => x.masterName == "UserType");
      console.log('lstUserType', this.lstUserType);
    })
  }

  ngOnInit() {


    this.initForm();
    this.getStatuses();
    this.userstype = this.commonService.getUserType()
    console.log("init user type", this.userstype);
    this.route.paramMap.subscribe(
      params => {

        const id = params.get('id');
        this.rolegetid = id;
        if (id) {

          this.loadSave = true;
          //this.getRole(id);
          this.pageTitle = 'Edit Role';
          this.GetRoleDataByid(id);


          //
        }
        else {
          this.loadSave = true;
          this.pageTitle = 'Add Role';

          // this.getRoleModules(null);
        }
      }
    );
    //this.getFiles().then(files => {  
    //  this.files1 = files;
    //});
    //this.roleService
    //   .get('json.json')
    //   .subscribe((response: any) => {
    //     this.files1 = response.data
    //   });   
    this.GetRoleNameForTree(this.rolegetid);
    this.initBreadCrumb();
  }

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Roles',
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
            name: 'Manage Roles',
            isLink: true,
            link: '/role'
          },
          {
            name: this.pageTitle,
            isLink: false
          }

        ]
    };
  }
  selectUser(event) {

    this.userTypeChange = event.text;
    this.getRoletabdata(event.value);

  }

  getStatuses() {
    this.commonService.getMasterItemsList("role_Status").subscribe((response: any) => {
      this.statuses = this.commonService.masters;
    });
  }

  cancelForm() {
    this.router.navigateByUrl("/role");
  }


  //getRole(id: string) {
  //  this.addOrUpdatePermission = this.;
  //  this.roleService.getRoleById(id)
  //    .subscribe(
  //      (role: Role) => {
  //        this.displayRole(role);
  //        this.loadSave = false;
  //      }, (error: any) => {
  //        this.errorMessage = <any>error;
  //        this.loadSave = false;
  //      });
  //}

  //displayRole(role: Role): void {
  //  if (this.roleForm) {
  //    this.roleForm.reset();
  //    this.parentModule.length = 0;
  //  }
  //  this.role = role;
  //  console.log('role', this.role);
  //  // console.log("RoleUserT", this.role)
  //  if (this.role.roleId === '') {
  //    this.pageTitle = 'Add Role';
  //  }
  //  else {
  //    this.pageTitle = `Edit Role: ${this.role.roleName}`;
  //  }

  //  this.userType.disable();
  //  this.reportid = this.role.reporttoid;
  //  this.reportname = this.role.reportto

  //  // Update the data on the form
  //  this.roleForm.patchValue({
  //    reportto: this.role.reportto,
  //    roleId: this.role.roleId,
  //    roleName: this.role.roleName,
  //    userType: this.role.userType.toString(),
  //    roleDescription: this.role.roleDescription,
  //    roleStatusId: this.role.roleStatusId.toString(),
  //  });
  //  // console.log("RoleModuleFor", this.role.roleModuleModel);
  //  this.role.roleModuleModel.forEach(m => {
  //    if (m.isManageable === true) {
  //      //alert(1);
  //      this.roleModules.push(this.buildRoleModules(m));
  //    }
  //    else {
  //      //Parent Modules
  //      this.parentModule.push(new ParentModules(m.roleModuleModuleID, m.roleModuleModuleName));
  //    }
  //  });
  //  if (this.role.isRoleAssined) {
  //    this.roleForm.get('roleStatusId').disable();
  //  }


  //}
  //buildRoleModules(roleModule: RoleModule): FormGroup {
  //  console.log("RoleModule1", roleModule);
  //  return this.fb.group({
  //    roleModuleId: roleModule.roleModuleId,
  //    roleModuleRoleID: roleModule.roleModuleRoleID,
  //    roleModuleModuleID: roleModule.roleModuleModuleID,
  //    roleModuleModuleName: roleModule.roleModuleModuleName,
  //    roleModuleName: roleModule.roleModuleName,
  //    moduleDisplayOrder: roleModule.moduleDisplayOrder,
  //    roleModuleNotificationFlag: roleModule.roleModuleNotificationFlag,
  //    roleModuleEmailFlag: roleModule.roleModuleEmailFlag,
  //    roleModuleAddFlag: roleModule.roleModuleAddFlag,
  //    roleModuleUpdateFlag: roleModule.roleModuleUpdateFlag,
  //    roleModuleSMSFlag: roleModule.roleModuleSMSFlag,
  //    roleModuleReadFlag: roleModule.roleModuleReadFlag,
  //    roleModuleDeleteFlag: roleModule.roleModuleDeleteFlag,
  //    isEnableAddPermission: roleModule.isEnableAddPermission,
  //    isEnableReadPermission: roleModule.isEnableReadPermission,
  //    isEnableEditPermission: roleModule.isEnableEditPermission,
  //    isEnableDeletePermission: roleModule.isEnableDeletePermission,
  //    isManageable: roleModule.isManageable,
  //    moduleParentModuleId: roleModule.moduleParentModuleId,
  //    roleModuleIsView: roleModule.roleModuleIsView,
  //    roleModuleIsViewShared: roleModule.roleModuleIsViewShared,
  //    roleModuleIsViewOwn: roleModule.roleModuleIsViewOwn,
  //    roleModuleIsViewAll: roleModule.roleModuleIsViewAll
  //  });

  //}
  //getRoleModules(userId) {
  //  //kate
  //  this.loadSave = true;
  //  this.parentModule = [];
  //  this.loadRoleModules = true; // console.log("inn")
  //  this.roleService.getRoleModules(userId).subscribe((response: any) => {
  //    //// console.log("reole  response", response)
  //    this.roleModulesData = response;
  //    if (response) {
  //      this.roleService.roleModules.forEach(m => {
  //        //  this.roleModules.push(this.buildRoleModules(m));
  //        //// console.log("RoleModule",this.roleService.roleModules);
  //        if (m.isManageable === true) {
  //          this.roleModules.push(this.buildRoleModules(m));

  //        }
  //        else {
  //          //Parent Modules
  //          // let parentModule1: ParentModules;
  //          // parentModule1.roleModuleId = m.roleModuleId;
  //          //parentModule1.roleModuleModuleName = m.roleModuleModuleName;

  //          this.parentModule.push(new ParentModules(m.roleModuleModuleID, m.roleModuleModuleName));

  //          //this.parentModule.push(m.roleModuleId);
  //          //this.parentModule. = m.roleModuleModuleName;
  //          //this.parentModule.push(parentModule);
  //        }

  //      });
  //      // console.log("RoleMiduleIsManageble", this.roleModules);
  //      // console.log("RoleMiduleIsManagebleFalse", this.parentModule);
  //      this.loadSave = false;
  //      this.loadRoleModules = false;
  //    }
  //  }, error => {
  //    this.loadRoleModules = false;
  //    this.loadSave = false;
  //  })
  //  // console.log("this.parentModule", this.parentModule);
  //  var d = this.parentModule.filter(x => x.roleModuleId === "442f8d12-92b0-42fd-aa0b-a71514d54d9f")
  //  // console.log(d);

  //}

  save() {
    if (this.roleForm.valid) {
      this.roleService.checkRoleNameIsExist(this.roleForm.controls.roleId.value, this.roleForm.controls.roleName.value).subscribe(m => {
        if (!m) {
          let dataas: string;
          dataas = this.radiobuttondata.map(x => x.Id).join(",");


          console.log(dataas);
          if (dataas != '') {
            this.privilageid = this.privilageid.concat(',')

            console.log(this.privilageid);
            this.privilageid = this.privilageid.concat(dataas)
          }

          console.log(this.privilageid);
          console.log('this.roleForm.value', this.roleForm.value);
          if (this.privilageid != '' && this.privilageid != undefined) {


            this.saveRoleModel.userTypeId = this.roleForm.value.userType,
              this.saveRoleModel.roleId = this.roleautoid == null ? 0 : this.roleautoid,
              this.saveRoleModel.roleStatusId = this.roleForm.value.roleStatusId,
              this.saveRoleModel.roleName = this.roleForm.value.roleName
            this.saveRoleModel.reporttoid = this.roleForm.value.reporttoid

            this.saveRoleModel.roleDescription = this.roleForm.value.roleDescription
            this.saveRoleModel.privilegesIds = this.privilageid

            var data = JSON.stringify(this.saveRoleModel);


            this.roleService.SaveRoledata(data).subscribe((result: any) => {

              var resultdata = JSON.parse(result);
              if (resultdata.MSG == 'SUCCESS') {
                this.toastr.success('Role has been added successfully.');
                this.router.navigateByUrl("/role");
              }
              else if (resultdata.MSG == 'UPDATE_SUCCESS') {
                this.toastr.success('Role has been updated successfully.');
                this.router.navigateByUrl("/role");
              }
              else {
                this.toastr.error('Error!', 'Unable to save record.');
              }
            })
          }
          else {
            this.dialogService.confirm("Role Access", 'Please select atleast one Access Level.', 'Ok', 'Cancel', false).subscribe(confirmed => {

            });
          }
        }
        else {
          this.dialogService.confirm("Add Role", `'${this.roleForm.controls.roleName.value}' role name is already exist.`, 'Ok', 'Cancel', false).subscribe(confirmed => {
          });

        }
      });
    }

    else {
      this.commonService.validateAllFormFields(this.roleForm);
    }
  }

  //console.log('this.roleForm.value', this.roleForm.value);
  //   return;    


  //if (this.roleForm.valid) {
  //  var selected = this.roleModules.controls.filter(m => m.get('roleModuleReadFlag').value === true
  //    || m.get('roleModuleAddFlag').value === true
  //    || m.get('roleModuleUpdateFlag').value === true
  //    || m.get('roleModuleDeleteFlag').value === true);

  //  this.loadSave = true;
  //  this.roleService.checkRoleNameIsExist(this.roleForm.controls.roleId.value, this.roleForm.controls.roleName.value).subscribe(m => {
  //    if (!m) {  
  //      if (selected.length != 0) {
  //        this.roleService.saveRole(this.roleForm.value).subscribe((result: any) => {
  //          if (result.statusCode == 200) {

  //            this.toastr.success(result.responseMessage);
  //            this.router.navigateByUrl("/role");
  //            setTimeout(() => { this.loadSave = false; }, 3000);
  //          }
  //          else {
  //            this.loadSave = false;
  //            this.toastr.error('Error!', 'Unable to save record.');
  //          }
  //        })
  //      }
  //      else {
  //        this.loadSave = false;
  //        this.dialogService.confirm("Role Access", 'Please select atleast one Access Level.', 'Ok', 'Cancel', false).subscribe(confirmed => {

  //        });
  //      }
  //    } else {
  //      this.loadSave = false;
  //      this.dialogService.confirm("Add Role", `'${this.roleForm.controls.roleName.value}' role name is already exist.`, 'Ok', 'Cancel', false).subscribe(confirmed => {
  //      });
  //    }
  //  });

  //}
  //else {
  //  this.commonService.validateAllFormFields(this.roleForm);
  //}



  //enableSelectAll($event) {
  //  if ($event.target.value === 'add') {
  //    this.roleModules.controls.forEach(obj => {
  //      obj.patchValue({
  //        roleModuleAddFlag: $event.target.checked
  //      });
  //    });

  //    //Start Read Role

  //    this.roleModules.controls.forEach(obj => {
  //      if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
  //        this.roleForm.patchValue({
  //          readSelect: true
  //        });
  //        obj.patchValue({
  //          roleModuleReadFlag: true,
  //          roleModuleIsView: 'all'
  //        });
  //      } else if ($event.target.checked == true) {
  //        this.roleForm.patchValue({
  //          readSelect: true
  //        });
  //        obj.patchValue({
  //          roleModuleReadFlag: true,
  //          roleModuleIsView: 'all'
  //        });
  //      }

  //    });

  //    //End Read Role
  //  }
  //  else if ($event.target.value === 'read') {
  //    if ($event.target.checked) {
  //      this.roleModules.controls.forEach(obj => {
  //        obj.patchValue({
  //          roleModuleReadFlag: $event.target.checked,
  //          roleModuleIsView: 'all'
  //        });
  //      });

  //    }
  //    else {
  //      this.roleModules.controls.forEach(obj => {
  //        obj.patchValue({
  //          //roleModuleReadFlag: $event.target.checked,
  //          roleModuleIsView: ''
  //        });
  //      });
  //    }
  //    if (!$event.target.checked) {
  //      this.roleModules.controls.forEach(obj => {
  //        obj.patchValue({
  //          roleModuleAddFlag: false,
  //          roleModuleUpdateFlag: false,
  //          roleModuleDeleteFlag: false
  //        });
  //      });

  //      this.roleForm.patchValue({
  //        addSelect: false,
  //        deleteSelect: false,
  //        updateSelect: false,
  //        readSelect: false
  //      });
  //    }
  //    else {
  //      this.roleModules.controls.forEach(obj => {
  //        obj.patchValue({
  //          roleModuleReadFlag: $event.target.checked,
  //          roleModuleIsView: 'all'
  //        });
  //      });
  //    }

  //  }
  //  else if ($event.target.value === 'update') {
  //    this.roleModules.controls.forEach(obj => {
  //      obj.patchValue({
  //        roleModuleUpdateFlag: $event.target.checked
  //      });
  //    });

  //    //Start Read Role

  //    this.roleModules.controls.forEach(obj => {
  //      if ($event.target.checked == false && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
  //        this.roleForm.patchValue({
  //          readSelect: true
  //        });
  //        obj.patchValue({
  //          roleModuleReadFlag: true,
  //          // roleModuleReadFlag: true,
  //          roleModuleIsView: 'all'
  //        });
  //      } else if ($event.target.checked == true) {
  //        this.roleForm.patchValue({
  //          readSelect: true
  //        });
  //        obj.patchValue({
  //          roleModuleReadFlag: true,
  //          //roleModuleReadFlag: true,
  //          roleModuleIsView: 'all'
  //        });
  //      }

  //    });

  //    //End Read Role

  //  }
  //  else if ($event.target.value === 'delete') {
  //    this.roleModules.controls.forEach(obj => {
  //      obj.patchValue({
  //        roleModuleDeleteFlag: $event.target.checked
  //      });
  //    });

  //    //Start Read Role

  //    this.roleModules.controls.forEach(obj => {
  //      if ($event.target.checked == false && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleUpdateFlag').value == true)) {
  //        this.roleForm.patchValue({
  //          readSelect: true
  //        });
  //        obj.patchValue({
  //          roleModuleReadFlag: true,
  //          roleModuleIsView: 'all'
  //        });
  //      } else if ($event.target.checked == true) {
  //        this.roleForm.patchValue({
  //          readSelect: true
  //        });
  //        obj.patchValue({
  //          roleModuleReadFlag: true,
  //          roleModuleIsView: 'all'
  //        });
  //      }

  //    });

  //    //End Read Role
  //  }
  //  this.selectUpdateEnable = true;


  //}

  //enableTopHeader(type, control, $event) {      

  //  if (type === 'add') {
  //    this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

  //      obj.patchValue({
  //        roleModuleAddFlag: $event.target.checked
  //      });
  //    });

  //    this.roleForm.patchValue({
  //      addSelect: !this.roleModules.controls.some(m => m.get('roleModuleAddFlag').value === false)
  //    });

  //    //Start Read Role
  //    this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

  //      if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
  //        obj.patchValue({
  //          roleModuleReadFlag: true,
  //          roleModuleIsView: 'all'
  //        });
  //      }
  //      else if ($event.target.checked == true) {
  //        obj.patchValue({
  //          roleModuleReadFlag: true,
  //          roleModuleIsView: 'all'
  //        });
  //      }
  //    });

  //    //End Read Role

  //  }
  //  else if (type === 'read') {
  //    this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

  //      obj.patchValue({
  //        roleModuleReadFlag: $event.target.checked
  //      });
  //      if (!$event.target.checked) {
  //        obj.patchValue({
  //          roleModuleAddFlag: false,
  //          roleModuleDeleteFlag: false,
  //          roleModuleUpdateFlag: false
  //        });
  //      }
  //    });

  //    this.roleForm.patchValue({
  //      readSelect: !this.roleModules.controls.some(m => m.get('roleModuleReadFlag').value === false)
  //    });

  //    if (!$event.target.checked) {
  //      this.roleForm.patchValue({
  //        addSelect: false,
  //        updateSelect: false,
  //        deleteSelect: false
  //      });
  //    }

  //  } else if (type === 'update') {
  //    this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

  //      obj.patchValue({
  //        roleModuleUpdateFlag: $event.target.checked
  //      });
  //    });

  //    this.roleForm.patchValue({
  //      updateSelect: !this.roleModules.controls.some(m => m.get('roleModuleUpdateFlag').value === false)
  //    });

  //    //Start Read Role
  //    this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

  //      if (($event.target.checked == false) && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
  //        obj.patchValue({
  //          roleModuleReadFlag: true,
  //          roleModuleIsView: 'all'
  //        });
  //      }
  //      else if ($event.target.checked == true) {
  //        obj.patchValue({
  //          roleModuleReadFlag: true,
  //          roleModuleIsView: 'all'
  //        });
  //      }
  //    });

  //    //End Read Role

  //  } else if (type === 'delete') {
  //    this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

  //      obj.patchValue({
  //        roleModuleDeleteFlag: $event.target.checked
  //      });
  //    });

  //    this.roleForm.patchValue({
  //      deleteSelect: !this.roleModules.controls.some(m => m.get('roleModuleDeleteFlag').value === false)
  //    });

  //    //Start Read Role
  //    this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

  //      if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleAddFlag').value == true)) {
  //        obj.patchValue({
  //          roleModuleReadFlag: true,
  //          roleModuleIsView: 'all'
  //        });
  //      }
  //      else if ($event.target.checked == true) {
  //        obj.patchValue({
  //          roleModuleReadFlag: true,
  //          roleModuleIsView: 'all'
  //        });
  //      }
  //    });

  //    //End Read Role

  //  }

  //}

  //get roleModules(): FormArray {
  //  return <FormArray>this.roleForm.get('roleModules');
  //}



  GetRoleNameForTree(id: any) {
    this.roleService.GetRoleNameForTree(id).subscribe((result: any) => {
      this.files2 = JSON.parse(result).data;
      this.loadSave = false;
    }, error => {
      console.log(error);
      this.loadSave = false;
    })
  };

  nodeSelect(e: any) {
    this.reporttoname = e.node.label;
    this.reporttoidselected = e.node.data;
    this.roleForm.get("reportto").setValue(this.reporttoname);
    this.roleForm.get("reporttoid").setValue(this.reporttoidselected);
    this.treepopup.hide();
  }

  private initForm() {

    this.roleForm = this.fb.group({
      'roleId': [this.role.roleId, Validators.nullValidator],
      'roleName': [this.role.roleName, [Validators.required, Validators.maxLength(50)]],
      'roleDescription': [this.role.roleDescription, Validators.maxLength(200)],
      'roleStatusId': [this.role.roleStatusId, Validators.required],
      //'addSelect': false,
      //'updateSelect': false,
      //'deleteSelect': false,
      //'readSelect': false,
      'userType': [this.role.userType, Validators.required],
      // roleModules: this.fb.array([], Validators.required),
      reportto: [''],
      reporttoid: [''],

    });
  }


  private dataUrl = 'assets';
  selectedAllNodes: TreeNode[] = [];
  openPopup() {


    //this.GetRoleNameForTree();
    this.treepopup.show();
    this.files2.forEach(s => {
      console.log('report', this.reportid);
      let data: any = this.CheckId(s, this.reportid.toString());
      if (data != null) {

        this.selectedAllNodes.forEach(node => {
          node.expanded = true;
        })

      }

    })
  }




  CheckId(s: TreeNode, selectedId: string) {
    console.log('children', s.children);
    if (s.data.toString() === selectedId) {
      this.selectedAllNodes.push(s);
      return s;
    }
    else if ((s.children != null && s.children.length != undefined)) {


      let i = 0;
      console.log('inchildren', s.children);

      if (s.children.length > 0) {

        while (s.children.length > i) {
          let data: any = this.CheckId(s.children[i], selectedId);
          if (data != null) {
            this.selectedAllNodes.push(s);
            return data;
          }
          i++;
        }
      }
    }
  }
  ClosePopup() {
    this.treepopup.hide();
  }

  getRoletabdata(usertypeid, id = null) {
    ;
    id = this.rolegetid;
    //console.log("this.rolegetid", this.rolegetid);
    this.loadSave = true;
    this.tabshow = true;
    setTimeout(() => {
      this.roleService.getRoletabdata(usertypeid, id).subscribe((result: any) => {
        this.tabdata = JSON.parse(result);
        if (this.tabdata != null) {
          this.tabdataFiltered();
          (this.tabdata as any[]).forEach(i => {
            (i.SUB_MODULES as any[]).forEach(s => {
              i["parentIsSelected"] = false;
              (s.PRIVILEGE_LISTS as any[]).forEach(d => {

                if (d.IS_SUB_CHILD === true && d.IS_Selected === 1) {
                  this.radiobuttondata.push({ Id: d.PRIVILEGE_ID, GroupId: d.SUB_CHILD_GROUP });
                } else if (d.IS_SUB_CHILD === false && d.IS_Selected === 1) {
                  this.privilageidArray.push({ Id: d.PRIVILEGE_ID });
                  i.parentIsSelected = true;
                  //this.parentIsSelected = 1;

                }
                if (d.IS_SUB_CHILD === false && d.IS_Selected === 0) {
                  i.parentIsSelected = false;
                }

              })
            });
          })
        }
        if (this.privilageidArray.length > 0) {
          this.privilageid = this.privilageidArray.map(x => x.Id).join(',');
          this.selected = this.privilageid.split(',').map(function (item) {
            return parseInt(item, 10);
          });
        }
        this.loadSave = false;
      });
    }, 2000);

  }
  getPriviledgesByType(list, type) {

    return list.filter(item => { return item.PRIVILEGE_TYPE == type })
  }
  getUniquePriviledgesType(list) {

    return list.map(item => item.PRIVILEGE_TYPE)
      .filter((value, index, self) => self.indexOf(value) === index)
  }
  onChangeMainCheckbox(event, e, s) {
    console.log(s);
    const checked = event.target.checked;
    let data: any[] = [];
    data = s.PRIVILEGE_LISTS;
    let radio = data.find(s => s.DEFAULT_VIEW != 0 && s.PRIVILEGE_TYPE.toUpperCase() === 'URL');
    let parentid = data.find(s => s.PRIVILEGE_TYPE.toUpperCase() === 'URL' && s.PARENT_ID === 0)
    if (checked) {
      data.forEach(s => {
        if (s.IS_Selected != 1 && s.IS_SUB_CHILD === false) {
          this.selected.push(s.PRIVILEGE_ID);
          s.IS_Selected = 1;
        }
      })
      if (radio.IS_Selected != 1) {

        var ind = this.radiobuttondata.findIndex(x => x.GroupId.toString() == radio.SUB_CHILD_GROUP.toString())

        if (ind == -1) {
          this.radiobuttondata.push({ Id: radio.PRIVILEGE_ID, GroupId: radio.SUB_CHILD_GROUP });
          radio.IS_Selected = 1;
        }
      }

    }
    else {
      data.forEach(s => {
        if (s.IS_Selected === 1 && s.IS_SUB_CHILD === false) {
          s.IS_Selected = 0;
          const indexOfList = this.selected.indexOf(s.PRIVILEGE_ID);
          if (indexOfList != -1) {
            this.selected.splice(indexOfList, 1);
          }
        }
      })
      data.forEach(s => {
        if (s.IS_SUB_CHILD === true) {

          s.IS_Selected = 0;
          var radioindlist = this.radiobuttondata.findIndex(x => x.GroupId.toString() == s.SUB_CHILD_GROUP.toString())
          if (radioindlist != -1) {
            this.radiobuttondata.splice(radioindlist, 1);
          }
        }
      })

    }
    this.privilageid = this.selected.toString();
  }
  tabdataFiltered() {
    if (!this.userTypeChange || this.userTypeChange != 'Company Administrator') {
      this.tabdata = this.tabdata.filter(x => x.MODULE_CODE != 'settings' && x.MODULE_CODE != 'users');
    }
  }
  onChange(Id: any, event, data, plist: any[]) {
    const checked = event.target.checked;

    let id = data.PARENT_ID;
    let radio = plist.find(s => s.DEFAULT_VIEW != 0);
    console.log('radio', radio);
    console.log('data', data);
    console.log('plist', plist);
    if (checked) {

      this.selected.push(Id);
      data.IS_Selected = 1;
      if (id != 0 && data.PRIVILEGE_TYPE == 'URL') {
        let parent = plist.find(s => s.PRIVILEGE_ID.toString() === id.toString());
        if (parent.IS_Selected != 1 && parent.PRIVILEGE_TYPE == 'URL') {
          this.selected.push(parent.PRIVILEGE_ID);
          parent.IS_Selected = 1;
        }
      }
      if (radio.IS_Selected != 1 && data.PRIVILEGE_TYPE == 'URL') {

        var ind = this.radiobuttondata.findIndex(x => x.GroupId.toString() == radio.SUB_CHILD_GROUP.toString())

        if (ind == -1) {
          this.radiobuttondata.push({ Id: radio.PRIVILEGE_ID, GroupId: radio.SUB_CHILD_GROUP });
          radio.IS_Selected = 1;
        }
      }
    }
    else {



      if (data.PARENT_ID === 0 && data.PRIVILEGE_TYPE == 'URL') {
        let parentdata: any[] = [];
        parentdata = plist.filter(x => x.IS_Selected == 1);
        console.log('parentdata', parentdata);
        parentdata.forEach(s => {
          s.IS_Selected = 0;
          const indexOfList = this.selected.indexOf(s.PRIVILEGE_ID);
          console.log('indexOfList', indexOfList);
          if (indexOfList != -1) {
            this.selected.splice(indexOfList, 1);
          }

          var radioindlist = this.radiobuttondata.findIndex(x => x.GroupId.toString() == s.SUB_CHILD_GROUP.toString())
          if (radioindlist != -1) {
            this.radiobuttondata.splice(radioindlist, 1);
          }



        })
      }
      else {
        const index = this.selected.indexOf(Id);
        data.IS_Selected = 0;
        this.selected.splice(index, 1);
      }


    }
    console.log('radiobuttondataafter', this.radiobuttondata);
    this.values = this.selected.toString();
    const count = this.selected.length;
    this.count = count;
    console.log('selected', this.selected.toString());
    this.privilageid = this.selected.toString();
  }
  check(e, data, plist: any[]) {
    let parentid = data.PARENT_ID;
    let parent = plist.find(s => s.PRIVILEGE_ID.toString() === parentid.toString());
    if (parent.IS_Selected != 1) {
      parent.IS_Selected = 1;
      this.selected.push(parent.PRIVILEGE_ID);
      this.privilageid = this.selected.toString();

    }

    var ind = this.radiobuttondata.findIndex(x => x.GroupId == e.target.name)


    if (ind == -1) {
      this.radiobuttondata.push({ Id: e.target.value, GroupId: e.target.name });
      data.IS_Selected = 1;
    }
    else {
      var id = this.radiobuttondata[ind].Id;
      var changedata = plist.find(s => s.PRIVILEGE_ID.toString() === id.toString());

      changedata.IS_Selected = 0;
      this.radiobuttondata.splice(ind, 1);

      data.IS_Selected = 1;
      this.radiobuttondata.push({ Id: e.target.value, GroupId: e.target.name });
    }
  };

  GetRoleDataByid(id) {
    this.loadSave = true;
    this.roleService.GetRoleDataByid(id).subscribe((result: any) => {

      //console.log('result123', JSON.parse(result));
      let resultdata: any[] = [];
      resultdata.push(JSON.parse(result));

      this.roleautoid = resultdata[0].data[0].RoleIDAuto;
      this.getRoletabdata(resultdata[0].data[0].UserTypeID, resultdata[0].data[0].RoleId)
      this.reportid = resultdata[0].data[0].ReportTo;
      this.reportname = resultdata[0].data[0].reporttoname;
      this.userTypeChange = resultdata[0].data[0].UserTypeIdValue;
      console.log('result123', resultdata[0].data[0]);


      this.roleForm.patchValue({
        reportto: resultdata[0].data[0].reporttoname,
        roleId: resultdata[0].data[0].RoleId,
        roleName: resultdata[0].data[0].RoleName,
        userType: resultdata[0].data[0].UserTypeID == null ? resultdata[0].data[0].UserTypeID : resultdata[0].data[0].UserTypeID.toString(),
        roleDescription: resultdata[0].data[0].RoleDescription,
        roleStatusId: resultdata[0].data[0].RoleStatusId == null ? resultdata[0].data[0].RoleStatusId : resultdata[0].data[0].RoleStatusId.toString(),

      });

    })

  }
  isChecked(p: any): boolean {
    if (p.IS_Selected == 1) {
      return true;
    }
    else {
      return false;
    }
  }
  selectedrow: boolean = false;
  submoduleidrow: number = 0;
  checkisSelect(privilageList: any, i: any, Id: any) {
    //console.log('isSelect', isSelect)
    console
    if (this.submoduleidrow.toString() != Id.toString()) {
      this.selectedrow = false;
    }
    if (!this.selectedrow) {
      if (privilageList[i] != null && privilageList[i].IS_Selected == 1) {

        this.submoduleidrow = Id;
        this.selectedrow = true;
        return true;
      }
      else {
        return false
      }
    }
    else {
      return true;
    }

    //if (isSelect) {

    //}

  }

  //getFiles() {
  //  return this.http.get('json')
  //    .toPromise()
  //    .then(res => (<TreeNode[]> JSON.parse(res.toString()).data));
  //}        
  get roleId() { return this.roleForm.get('roleId'); }
  get roleName() { return this.roleForm.get('roleName'); }
  get addSelect() { return this.roleForm.get('addSelect'); }
  get updateSelect() { return this.roleForm.get('updateSelect'); }
  get deleteSelect() { return this.roleForm.get('deleteSelect'); }
  get readSelect() { return this.roleForm.get('readSelect'); }
  get roleDescription() { return this.roleForm.get('roleDescription'); }
  get roleStatusId() { return this.roleForm.get('roleStatusId'); }
  get userType() { return this.roleForm.get('userType'); }
  get reportto() { return this.roleForm.get('reportto'); }
  get reporttoid() { return this.roleForm.get('reporttoid'); }
}
