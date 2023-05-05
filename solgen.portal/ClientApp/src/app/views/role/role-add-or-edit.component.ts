import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService, ModuleList } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Role, RoleService, ParentModules } from './role.service';
import { RoleModule } from './role.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { TreeNode } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { parse } from 'querystring';

@Component({
  selector: 'app-role-add-or-edit',
  templateUrl: './role-add-or-edit.component.html',
  styleUrls: ['./role-add-or-edit.component.scss']
})
export class RoleAddOrEditComponent implements OnInit {
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
  selectUpdateEnable: boolean = false;
  errorMessage: string;
  roleModulesData: RoleModule[] = [];
  roledata: [];
  selectedValue: any
  isDisabled = '';
  addOrUpdatePermission: boolean=false;
  //modulePermission: ModuleList;
  parentModule: ParentModules[] = []
  roleTreeData: any;
  files1: TreeNode[];
  files2: TreeNode[];
  reporttoname: any = '';
  reporttoidselected: any;
  reportid: string;
  reportname: string;
  rolegetid: any
  modulePermission: any[] = [];
  isUpdate: boolean = false;
  isAdd: boolean = false;
  contentHeader: object;
  //templateObjects: Template[] = new Array();
  //parentModule1: ParentModules;
  constructor(private commonService: CommonService,
    private fb: FormBuilder,
    private roleService: RoleService,
    private dialogService: ConfirmationDialogService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute, private http: HttpClient) {
    const priviledgeCode = this.route.snapshot.data.privilegeCode;
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase());
    if (add == undefined) {
      this.addOrUpdatePermission = false;
    } else {
 
      this.addOrUpdatePermission = true;
    }
    

    this.commonService.getMasterItemsList("manageuser_usertype_role").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;//.filter(x => x.masterName == "UserType");
    })
  }

  ngOnInit() {


    this.initForm();
    this.getStatuses();

    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.rolegetid = id;
        if (id) {

          this.loadSave = true;
          this.getRole(id);

          //
        }
        else {
          this.pageTitle = 'Edit Role';
    
          this.getRoleModules(null);
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
    
    this.roleModules.controls = [];
    this.getRoleModules(event.value);
    this.roleForm.patchValue({
      readSelect: false,
      addSelect: false,
      deleteSelect: false,
      updateSelect: false
    });
  }

  getStatuses() {
    this.commonService.getMasterItemsList("role_Status").subscribe((response: any) => {
      this.statuses = this.commonService.masters;
    });
  }

  cancelForm() {
    this.router.navigateByUrl("/role");
  }


  getRole(id: string) {
    this.roleService.getRoleById(id)
      .subscribe(
        (role: Role) => {
          this.displayRole(role);
          this.loadSave = false;
        }, (error: any) => {
          this.errorMessage = <any>error;
          this.loadSave = false;
        });
  }

  displayRole(role: Role): void {
    if (this.roleForm) {
      this.roleForm.reset();
      this.parentModule.length = 0;
    }
    this.role = role;
    // console.log('role', this.role);
    // // console.log("RoleUserT", this.role)
    if (this.role.roleId === '') {
      this.pageTitle = 'Add Role';
    }
    else {
      this.pageTitle = `Edit Role: ${this.role.roleName}`;
    }

    this.userType.disable();
    this.reportid = this.role.reporttoid;
    this.reportname = this.role.reportto

    // Update the data on the form
    this.roleForm.patchValue({
      reportto: this.role.reportto,
      roleId: this.role.roleId,
      roleName: this.role.roleName,
      userType: this.role.userType.toString(),
      roleDescription: this.role.roleDescription,
      roleStatusId: this.role.roleStatusId.toString(),
    });
    // // console.log("RoleModuleFor", this.role.roleModuleModel);
    this.role.roleModuleModel.forEach(m => {
      if (m.isManageable === true) {
        //alert(1);
        this.roleModules.push(this.buildRoleModules(m));
      }
      else {
        //Parent Modules
        this.parentModule.push(new ParentModules(m.roleModuleModuleID, m.roleModuleModuleName));
      }
    });
    if (this.role.isRoleAssined) {
      this.roleForm.get('roleStatusId').disable();
    }


  }
  buildRoleModules(roleModule: RoleModule): FormGroup {
    // console.log("RoleModule1", roleModule);
    return this.fb.group({
      roleModuleId: roleModule.roleModuleId,
      roleModuleRoleID: roleModule.roleModuleRoleID,
      roleModuleModuleID: roleModule.roleModuleModuleID,
      roleModuleModuleName: roleModule.roleModuleModuleName,
      roleModuleName: roleModule.roleModuleName,
      moduleDisplayOrder: roleModule.moduleDisplayOrder,
      roleModuleNotificationFlag: roleModule.roleModuleNotificationFlag,
      roleModuleEmailFlag: roleModule.roleModuleEmailFlag,
      roleModuleAddFlag: roleModule.roleModuleAddFlag,
      roleModuleUpdateFlag: roleModule.roleModuleUpdateFlag,
      roleModuleSMSFlag: roleModule.roleModuleSMSFlag,
      roleModuleReadFlag: roleModule.roleModuleReadFlag,
      roleModuleDeleteFlag: roleModule.roleModuleDeleteFlag,
      isEnableAddPermission: roleModule.isEnableAddPermission,
      isEnableReadPermission: roleModule.isEnableReadPermission,
      isEnableEditPermission: roleModule.isEnableEditPermission,
      isEnableDeletePermission: roleModule.isEnableDeletePermission,
      isManageable: roleModule.isManageable,
      moduleParentModuleId: roleModule.moduleParentModuleId,
      roleModuleIsView: roleModule.roleModuleIsView,
      roleModuleIsViewShared: roleModule.roleModuleIsViewShared,
      roleModuleIsViewOwn: roleModule.roleModuleIsViewOwn,
      roleModuleIsViewAll: roleModule.roleModuleIsViewAll
    });

  }
  getRoleModules(userId) {
    
    //kate
    this.loadSave = true;
    this.parentModule = [];
    this.loadRoleModules = true; // // console.log("inn")
    this.roleService.getRoleModules(userId).subscribe((response: any) => {
      //// // console.log("reole  response", response)
      this.roleModulesData = response;
      if (response) {
        this.roleService.roleModules.forEach(m => {
          //  this.roleModules.push(this.buildRoleModules(m));
          //// // console.log("RoleModule",this.roleService.roleModules);
          if (m.isManageable === true) {
            this.roleModules.push(this.buildRoleModules(m));

          }
          else {
            //Parent Modules
            // let parentModule1: ParentModules;
            // parentModule1.roleModuleId = m.roleModuleId;
            //parentModule1.roleModuleModuleName = m.roleModuleModuleName;

            this.parentModule.push(new ParentModules(m.roleModuleModuleID, m.roleModuleModuleName));

            //this.parentModule.push(m.roleModuleId);
            //this.parentModule. = m.roleModuleModuleName;
            //this.parentModule.push(parentModule);
          }

        });
        // // console.log("RoleMiduleIsManageble", this.roleModules);
        // // console.log("RoleMiduleIsManagebleFalse", this.parentModule);
        this.loadSave = false;
        this.loadRoleModules = false;
      }
    }, error => {
      this.loadRoleModules = false;
      this.loadSave = false;
    })
    // // console.log("this.parentModule", this.parentModule);
    var d = this.parentModule.filter(x => x.roleModuleId === "442f8d12-92b0-42fd-aa0b-a71514d54d9f")
    // // console.log(d);

  }

  save() {

    // console.log('this.roleForm.value', this.roleForm.value);
    //   return;    


    if (this.roleForm.valid) {
      var selected = this.roleModules.controls.filter(m => m.get('roleModuleReadFlag').value === true
        || m.get('roleModuleAddFlag').value === true
        || m.get('roleModuleUpdateFlag').value === true
        || m.get('roleModuleDeleteFlag').value === true);

      this.loadSave = true;
      this.roleService.checkRoleNameIsExist(this.roleForm.controls.roleId.value, this.roleForm.controls.roleName.value).subscribe(m => {
        if (!m) {
          if (selected.length != 0) {
            this.roleService.saveRole(this.roleForm.value).subscribe((result: any) => {
              if (result.statusCode == 200) {

                this.toastr.success(result.responseMessage);
                this.router.navigateByUrl("/role");
                setTimeout(() => { this.loadSave = false; }, 3000);
              }
              else {
                this.loadSave = false;
                this.toastr.error('Error!', 'Unable to save record.');
              }
            })
          }
          else {
            this.loadSave = false;
            this.dialogService.confirm("Role Access", 'Please select atleast one Access Level.', 'Ok', 'Cancel', false).subscribe(confirmed => {

            });
          }
        } else {
          this.loadSave = false;
          this.dialogService.confirm("Add Role", `'${this.roleForm.controls.roleName.value}' role name is already exist.`, 'Ok', 'Cancel', false).subscribe(confirmed => {
          });
        }
      });

    }
    else {
      this.commonService.validateAllFormFields(this.roleForm);
    }
  }


  enableSelectAll($event) {
    if ($event.target.value === 'add') {
      this.roleModules.controls.forEach(obj => {
        obj.patchValue({
          roleModuleAddFlag: $event.target.checked
        });
      });

      //Start Read Role

      this.roleModules.controls.forEach(obj => {
        if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
          this.roleForm.patchValue({
            readSelect: true
          });
          obj.patchValue({
            roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        } else if ($event.target.checked == true) {
          this.roleForm.patchValue({
            readSelect: true
          });
          obj.patchValue({
            roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        }

      });

      //End Read Role
    }
    else if ($event.target.value === 'read') {
      if ($event.target.checked) {
        this.roleModules.controls.forEach(obj => {
          obj.patchValue({
            roleModuleReadFlag: $event.target.checked,
            roleModuleIsView: 'all'
          });
        });

      }
      else {
        this.roleModules.controls.forEach(obj => {
          obj.patchValue({
            //roleModuleReadFlag: $event.target.checked,
            roleModuleIsView: ''
          });
        });
      }
      if (!$event.target.checked) {
        this.roleModules.controls.forEach(obj => {
          obj.patchValue({
            roleModuleAddFlag: false,
            roleModuleUpdateFlag: false,
            roleModuleDeleteFlag: false
          });
        });

        this.roleForm.patchValue({
          addSelect: false,
          deleteSelect: false,
          updateSelect: false,
          readSelect: false
        });
      }
      else {
        this.roleModules.controls.forEach(obj => {
          obj.patchValue({
            roleModuleReadFlag: $event.target.checked,
            roleModuleIsView: 'all'
          });
        });
      }

    }
    else if ($event.target.value === 'update') {
      this.roleModules.controls.forEach(obj => {
        obj.patchValue({
          roleModuleUpdateFlag: $event.target.checked
        });
      });

      //Start Read Role

      this.roleModules.controls.forEach(obj => {
        if ($event.target.checked == false && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
          this.roleForm.patchValue({
            readSelect: true
          });
          obj.patchValue({
            roleModuleReadFlag: true,
           // roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        } else if ($event.target.checked == true) {
          this.roleForm.patchValue({
            readSelect: true
          });
          obj.patchValue({
            roleModuleReadFlag: true,
            //roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        }

      });

      //End Read Role

    }
    else if ($event.target.value === 'delete') {
      this.roleModules.controls.forEach(obj => {
        obj.patchValue({
          roleModuleDeleteFlag: $event.target.checked
        });
      });

      //Start Read Role

      this.roleModules.controls.forEach(obj => {
        if ($event.target.checked == false && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleUpdateFlag').value == true)) {
          this.roleForm.patchValue({
            readSelect: true
          });
          obj.patchValue({
            roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        } else if ($event.target.checked == true) {
          this.roleForm.patchValue({
            readSelect: true
          });
          obj.patchValue({
            roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        }

      });

      //End Read Role
    }
    this.selectUpdateEnable = true;


  }

  enableTopHeader(type, control, $event) {

    if (type === 'add') {
      this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

        obj.patchValue({
          roleModuleAddFlag: $event.target.checked
        });
      });

      this.roleForm.patchValue({
        addSelect: !this.roleModules.controls.some(m => m.get('roleModuleAddFlag').value === false)
      });

      //Start Read Role
      this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

        if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
          obj.patchValue({
            roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        }
        else if ($event.target.checked == true) {
          obj.patchValue({
            roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        }
      });

      //End Read Role

    }
    else if (type === 'read') {
      this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

        obj.patchValue({
          roleModuleReadFlag: $event.target.checked
        });
        if (!$event.target.checked) {
          obj.patchValue({
            roleModuleAddFlag: false,
            roleModuleDeleteFlag: false,
            roleModuleUpdateFlag: false
          });
        }
      });

      this.roleForm.patchValue({
        readSelect: !this.roleModules.controls.some(m => m.get('roleModuleReadFlag').value === false)
      });

      if (!$event.target.checked) {
        this.roleForm.patchValue({
          addSelect: false,
          updateSelect: false,
          deleteSelect: false
        });
      }

    } else if (type === 'update') {
      this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

        obj.patchValue({
          roleModuleUpdateFlag: $event.target.checked
        });
      });

      this.roleForm.patchValue({
        updateSelect: !this.roleModules.controls.some(m => m.get('roleModuleUpdateFlag').value === false)
      });

      //Start Read Role
      this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

        if (($event.target.checked == false) && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
          obj.patchValue({
            roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        }
        else if ($event.target.checked == true) {
          obj.patchValue({
            roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        }
      });

      //End Read Role

    } else if (type === 'delete') {
      this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

        obj.patchValue({
          roleModuleDeleteFlag: $event.target.checked
        });
      });

      this.roleForm.patchValue({
        deleteSelect: !this.roleModules.controls.some(m => m.get('roleModuleDeleteFlag').value === false)
      });

      //Start Read Role
      this.roleModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

        if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleAddFlag').value == true)) {
          obj.patchValue({
            roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        }
        else if ($event.target.checked == true) {
          obj.patchValue({
            roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        }
      });

      //End Read Role

    }

  }

  get roleModules(): FormArray {
    return <FormArray>this.roleForm.get('roleModules');
  }



  GetRoleNameForTree(id: any) {
    this.roleService.GetRoleNameForTree(id).subscribe((result: any) => {
      // console.log('result', result)
      this.files2 = JSON.parse(result).data;

      // console.log('this.files1', this.files2)
    })

  }

  nodeSelect(e: any) {
    // console.log('sadasdf', e)
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
      'addSelect': false,
      'updateSelect': false,
      'deleteSelect': false,
      'readSelect': false,
      'userType': [this.role.userType, Validators.required],
      roleModules: this.fb.array([], Validators.required),
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
      // console.log('report', this.reportid);
      let data: any = this.CheckId(s, this.reportid.toString());
      if (data != null) {
        
        this.selectedAllNodes.forEach(node => {
          node.expanded = true;
        })

      }
      
    })
  }




  CheckId(s: TreeNode, selectedId: string) {
    // console.log('children', s.children);
    if (s.data.toString() === selectedId) {
      this.selectedAllNodes.push(s);
      return s;
    }
    else if ((s.children != null && s.children.length != undefined)) {


      let i = 0;
      // console.log('inchildren', s.children);
  
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
