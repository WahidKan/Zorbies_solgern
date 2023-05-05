import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonService, ModuleList } from '../shared/common.service';
import { CompanyserviceService, ParentModules, Company, CompanyModel } from './companyservice.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addeditcompay',
  templateUrl: './addeditcompay.component.html',
  styleUrls: ['./addeditcompay.component.scss']
})
export class AddeditcompayComponent implements OnInit {
  pageTitle: string;
  loadSave: boolean = false;
    @ViewChild('fileInput', { static: false }) fileInput;;
  read = false;
  loadRoleModules = false;
  imageLink = '';
  fileName = 'Choose file';
  companyID: any;
  lstCompantType: any;
  company: Company = new Company();
  companyForm: FormGroup;
  selectUpdateEnable = false;
  modulePermission: ModuleList;
  roleModulesData: CompanyModel[] = [];
  parentModule: ParentModules[] = []
  lstUserType: any;
  isDisabled;
  constructor(private commonService: CommonService,
    private fb: FormBuilder,
    private companyserviceService: CompanyserviceService,
    private dialogService: ConfirmationDialogService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);



  }

  ngOnInit() {
    this.initForm();
    this.GetCompanyType();
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.companyID = id;
        if (id) {
          this.pageTitle = 'Edit Company';
          this.loadSave = true;
          //this.getRole(id);

          //
        }
        else {
          this.pageTitle = 'Add Company';
          this.getRoleModules(null);
        }
      }
    );
  }

  GetCompanyType() {
    this.commonService.getMasterItemsList("CompanyType").subscribe((result: any) => {
      this.lstCompantType = this.commonService.masters;
      // console.log("This", this.lstCompantType);
    })
  }
  get companyModules(): FormArray {
    return <FormArray>this.companyForm.get('companyModules');
  }
  private initForm() {

    this.companyForm = this.fb.group({
      companyId: ['', Validators.nullValidator],
      companyName: ['', [Validators.required, Validators.maxLength(50)]],
      companyLogo: ['', [Validators.required, Validators.maxLength(200)]],
      firstName: ['', Validators.required],
      companyType: [this.company.companyType, Validators.required],
      lastName: [this.company.lastName, Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      companyModules: this.fb.array([], Validators.required),
      'addSelect': false,
      'updateSelect': false,
      'deleteSelect': false,
      'readSelect': false,
      'moduleNameSelect': false
    });
  }
  get companyId() { return this.companyForm.get('companyId'); }
  get companyName() { return this.companyForm.get('companyName'); }
  get companyLogo() { return this.companyForm.get('companyLogo'); }
  get firstName() { return this.companyForm.get('firstName'); }
  get companyType() { return this.companyForm.get('companyType'); }
  get lastName() { return this.companyForm.get('lastName'); }
  get email() { return this.companyForm.get('email'); }
  get addSelect() { return this.companyForm.get('addSelect'); }
  get updateSelect() { return this.companyForm.get('updateSelect'); }
  get deleteSelect() { return this.companyForm.get('deleteSelect'); }
  get readSelect() { return this.companyForm.get('readSelect'); }
  get moduleNameSelect() { return this.companyForm.get('moduleNameSelect'); }

  setFile($event): void {
    this.commonService.uploadImageFileValidator($event);
    this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB")
    if (this.commonService.isFileValid) {
      this.fileName = $event.target.files[0].name;
    }
    else {
      this.fileInput.nativeElement = 'undefined';
      this.fileName = "Choose file";
    }
  }
  private prepareFormDataForDocument() {
    const input = new FormData();
    input.append('companyId', this.companyId.value);
    input.append('companyName', this.companyName.value);
    input.append('companyType', this.companyType.value);
    input.append('firstName', this.firstName.value);
    input.append('lastName', this.lastName.value);
    input.append('email', this.email.value);
    input.append('companyLogo', this.companyLogo.value);
    input.append('companyModules', this.companyModules.value);
    if (this.commonService.isUploadImageValid) {
      if (this.companyLogo.value !== null) {
        input.append('filename', this.companyLogo.value);

      }
      const fileBrowser = this.fileInput.nativeElement;

      if (fileBrowser.files && fileBrowser.files[0]) {
        input.append('file', fileBrowser.files[0]);
      }
      return input;
    }
  }
  save() {

    //   return;    


    if (this.companyForm.valid) {
      var selected = this.companyModules.controls.filter(m => m.get('roleModuleReadFlag').value === true
        || m.get('roleModuleAddFlag').value === true
        || m.get('roleModuleUpdateFlag').value === true
        || m.get('roleModuleDeleteFlag').value === true);

      this.loadSave = true;
      //this.roleService.checkRoleNameIsExist(this.roleForm.controls.roleId.value, this.roleForm.controls.roleName.value).subscribe(m => {
      //  if (!m) {
      //    if (selected.length != 0) {
      const companyModel = this.prepareFormDataForDocument();
      this.companyserviceService.SaveCompany(companyModel).subscribe((result: any) => {
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
      //    }
      //    else {
      //      this.loadSave = false;
      //      this.dialogService.confirm("Role Access", 'Please select atleast one Access Level.', 'Ok', 'Cancel', false).subscribe(confirmed => {

      //      });
      //    }
      //  } else {
      //    this.loadSave = false;
      //    this.dialogService.confirm("Add Role", `'${this.roleForm.controls.roleName.value}' role name is already exist.`, 'Ok', 'Cancel', false).subscribe(confirmed => {
      //    });
      //  }
      //});

    }
    else {
      this.commonService.validateAllFormFields(this.companyForm);
    }
  }

  enableSelectAll($event) {
    
    if ($event.target.value === 'add') {
      this.companyModules.controls.forEach(obj => {
        obj.patchValue({
          roleModuleAddFlag: $event.target.checked
        });
      });

      //Start Read Role

      this.companyModules.controls.forEach(obj => {
        if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
          this.companyForm.patchValue({
            readSelect: true,
            moduleNameSelect: true
          });
          obj.patchValue({
            roleModuleReadFlag: true,
            moduleRoleModuleAddFlag: true,
            roleModuleIsView: 'all'
          });
        } else if ($event.target.checked == true) {
          this.companyForm.patchValue({
            readSelect: true,
            moduleNameSelect: true
          });
          obj.patchValue({
            roleModuleReadFlag: true,
            moduleRoleModuleAddFlag: true,
            roleModuleIsView: 'all'
          });
        }

      });

      //End Read Role
    }
    else if ($event.target.value === 'read') {
      if ($event.target.checked) {
        this.companyModules.controls.forEach(obj => {
          obj.patchValue({
            roleModuleReadFlag: $event.target.checked,
            moduleRoleModuleAddFlag: $event.target.checked,
            roleModuleIsView: 'all'
          });
        });

      }
      else {
        this.companyModules.controls.forEach(obj => {
          obj.patchValue({
            roleModuleReadFlag: $event.target.checked,
            //moduleRoleModuleAddFlag: $event.target.checked,
            roleModuleIsView: ''
          });
        });
      }
      if (!$event.target.checked) {
        this.companyModules.controls.forEach(obj => {
          obj.patchValue({
            roleModuleAddFlag: false,
            roleModuleUpdateFlag: false,
            roleModuleDeleteFlag: false,
            //moduleNameSelect: false
            //moduleRoleModuleAddFlag:false
          });
        });

        this.companyForm.patchValue({
          addSelect: false,
          deleteSelect: false,
          updateSelect: false,
          //moduleRoleModuleAddFlag: false,
          //moduleNameSelect: false
        });
      }
      else {
        this.companyForm.patchValue({
          moduleNameSelect: true
        });
        this.companyModules.controls.forEach(obj => {
          obj.patchValue({
            roleModuleReadFlag: $event.target.checked,
            roleModuleIsView: '',
            moduleNameSelect: true,
            moduleRoleModuleAddFlag: $event.target.checked,

          });
        });
      }

    }
    else if ($event.target.value === 'update') {
      this.companyModules.controls.forEach(obj => {
        obj.patchValue({
          roleModuleUpdateFlag: $event.target.checked
        });
      });

      //Start Read Role

      this.companyModules.controls.forEach(obj => {
        if ($event.target.checked == false && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
          this.companyForm.patchValue({
            readSelect: true,
            moduleNameSelect: true
          });
          obj.patchValue({
            roleModuleReadFlag: true,
            // roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        } else if ($event.target.checked == true) {
          this.companyForm.patchValue({
            readSelect: true,
            moduleNameSelect: true
          });
          obj.patchValue({
            roleModuleReadFlag: true,
            moduleRoleModuleAddFlag: true,
            //roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        }

      });

      //End Read Role

    }
    else if ($event.target.value === 'moduleName') {
      this.companyModules.controls.forEach(obj => {
        obj.patchValue({
          moduleRoleModuleAddFlag: $event.target.checked
        });
      });

      //Start Read Role

      this.companyModules.controls.forEach(obj => {
        if ($event.target.checked == false && (obj.get('moduleRoleModuleAddFlag').value == true || obj.get('moduleRoleModuleAddFlag').value == true)) {
          this.companyForm.patchValue({
            moduleNameSelect: true
          });
          obj.patchValue({
            roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        } else if ($event.target.checked == true) {
          this.companyForm.patchValue({
            readSelect: true
          });
          obj.patchValue({
            roleModuleReadFlag: true,
            roleModuleIsView: 'all'
          });
        }

      });
    }
    else if ($event.target.value === 'delete') {
      this.companyModules.controls.forEach(obj => {
        obj.patchValue({
          roleModuleDeleteFlag: $event.target.checked
        });
      });

      //Start Read Role

      this.companyModules.controls.forEach(obj => {
        if ($event.target.checked == false && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleUpdateFlag').value == true)) {
          this.companyForm.patchValue({
            readSelect: true,
            moduleNameSelect: true
          });
          obj.patchValue({
            roleModuleReadFlag: true,
            moduleRoleModuleAddFlag: true,
            roleModuleIsView: 'all'
          });
        } else if ($event.target.checked == true) {
          this.companyForm.patchValue({
            readSelect: true,
            moduleNameSelect: true
          });
          obj.patchValue({
            roleModuleReadFlag: true,
            moduleRoleModuleAddFlag: true,
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
      this.companyModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

        obj.patchValue({
          roleModuleAddFlag: $event.target.checked
        });
      });

      this.companyForm.patchValue({
        addSelect: !this.companyModules.controls.some(m => m.get('roleModuleAddFlag').value === false)
      });

      //Start Read Role
      this.companyModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

        if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
          obj.patchValue({
            roleModuleReadFlag: true,
            moduleRoleModuleAddFlag: true,
            roleModuleIsView: 'all'
          });
        }
        else if ($event.target.checked == true) {
          obj.patchValue({
            roleModuleReadFlag: true,
            moduleRoleModuleAddFlag: true,
            roleModuleIsView: 'all'
          });
        }
      });

      //End Read Role

    }
    else if (type === 'read') {
      this.companyModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

        obj.patchValue({
          roleModuleReadFlag: $event.target.checked,
        });
        if (!$event.target.checked) {
          obj.patchValue({
            roleModuleAddFlag: false,
            roleModuleDeleteFlag: false,
            roleModuleUpdateFlag: false
          });
        }
      });

      this.companyForm.patchValue({
        readSelect: !this.companyModules.controls.some(m => m.get('roleModuleReadFlag').value === false),
        //moduleNameSelect: !this.companyModules.controls.some(m => m.get('roleModuleReadFlag').value === false),
      });
      
      if (!$event.target.checked) {
        this.companyForm.patchValue({
          addSelect: false,
          updateSelect: false,
          deleteSelect: false
        });
      }
      
    }
    else if (type === 'update') {
      this.companyModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

        obj.patchValue({
          roleModuleUpdateFlag: $event.target.checked,
        });
      });

      this.companyForm.patchValue({
        updateSelect: !this.companyModules.controls.some(m => m.get('roleModuleUpdateFlag').value === false)
      });

      //Start Read Role
      this.companyModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

        if (($event.target.checked == false) && (obj.get('roleModuleAddFlag').value == true || obj.get('roleModuleDeleteFlag').value == true)) {
          obj.patchValue({
            roleModuleReadFlag: true,
            moduleRoleModuleAddFlag: true,
            roleModuleIsView: 'all'
          });
        }
        else if ($event.target.checked == true) {
          obj.patchValue({
            roleModuleReadFlag: true,
            moduleRoleModuleAddFlag: true,
            roleModuleIsView: 'all'
          });
        }
      });

      //End Read Role

    }
    else if (type === 'delete') {
      this.companyModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

        obj.patchValue({
          roleModuleDeleteFlag: $event.target.checked,
        });
      });

      this.companyForm.patchValue({
        deleteSelect: !this.companyModules.controls.some(m => m.get('roleModuleDeleteFlag').value === false)
      });

      //Start Read Role
      this.companyModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

        if ($event.target.checked == false && (obj.get('roleModuleUpdateFlag').value == true || obj.get('roleModuleAddFlag').value == true)) {
          obj.patchValue({
            roleModuleReadFlag: true,
            moduleRoleModuleAddFlag: true,
            roleModuleIsView: 'all'
          });
        }
        else if ($event.target.checked == true) {
          obj.patchValue({
            roleModuleReadFlag: true,
            moduleRoleModuleAddFlag: true,
            roleModuleIsView: 'all'
          });
        }
      });

      //End Read Role

    }

    else if (type === 'modeuleName') {
      this.companyModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

        obj.patchValue({
          moduleRoleModuleAddFlag: $event.target.checked
        });
      });

      this.companyForm.patchValue({
        moduleNameSelect: !this.companyModules.controls.some(m => m.get('moduleRoleModuleAddFlag').value === false)
      });

      //Start Read Role
      this.companyModules.controls.filter(m => m.get('roleModuleModuleID').value === control.get('roleModuleModuleID').value).forEach(obj => {

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
    }

  }

  selectUser(event) {
    this.companyModules.controls = [];
    this.getRoleModules(event.value);
    this.companyForm.patchValue({
      readSelect: false,
      addSelect: false,
      deleteSelect: false,
      updateSelect: false,
      moduleNameSelect: false
    });
  }

  getRoleModules(userId) {
    //kate
    this.loadSave = true;
    this.parentModule = [];
    this.loadRoleModules = true; // // console.log("inn")
    this.companyserviceService.getRoleModules("700").subscribe((response: any) => {
      //// // console.log("reole  response", response)

      if (response) {
        this.companyserviceService.roleModules.forEach(m => {
          //  this.roleModules.push(this.buildRoleModules(m));
          //// // console.log("RoleModule",this.roleService.roleModules);
          if (m.isManageable === true) {
            this.companyModules.push(this.buildRoleModules(m));

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

  buildRoleModules(roleModule: CompanyModel): FormGroup {
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
      moduleRoleModuleAddFlag: roleModule.moduleRoleModuleAddFlag,
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
}
