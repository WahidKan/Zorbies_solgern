import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CommonService, ModuleList } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormService, GroupAddForm } from './form.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder } from '@angular/forms';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-formlist',
  templateUrl: './formlist.component.html',
  styleUrls: ['./formlist.component.scss']
})
export class FormlistComponent implements OnInit {
  @ViewChild('makeForm', { static: false }) makeFormModel: ModalDirective;
  SubModuleForm: GroupAddForm = new GroupAddForm();
  companyType: any;
  modulelist: any;
  subModulelist: any;
  ddlModulelist: any[] = [];
  ddlSubModulelist: any[] = [];
  lstUserType: any;
  searchUserType = '';
  loginuserid: any;
  companyid: any;
  isAddForm = false;
  loading = false;
  id: any;
  sortDir = 'desc';
  sortColumn = 'Id';
  deleteId: any;
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  searchTxt = '';
  selectedValue: any;
  SelectedText: any;
  lstPageSize: any;// = 0;
  pageSizeValue: number;
  modulecode: number = 0;
  modulenamecode: any;
  modulePermission: ModuleList;
  loadSave: boolean = false;
  moduleId: any;
  subModuleId: any;
  isCompanyTypeFinancialInstitute: boolean = false;
  companyId = 1004;
  userInfo: any[] = [];

  @Input() offset: number;
  currentPage: any;
  SelectionType = SelectionType;
  selected = [];
  contentHeader: object;

  moduleIdHidden: any;
  subModuleIdHidden: any;
  formName: any;

  constructor(private fb: FormBuilder,
    private formservice: FormService,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService,
    private route: ActivatedRoute) {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermission(moduleCode);
    this.commonService.getLoggedInName.subscribe((userdetail: any) => {
      this.loginuserid = userdetail.id;
      this.companyid = userdetail.companyId;
    });
  }

  ngOnInit() {

    this.userInfo = JSON.parse(localStorage.getItem('userinfo'));
    this.companyType = this.userInfo["companyType"];
    this.companyId = this.userInfo["companyId"];

    if (this.companyType === "companytypeFinancialInstitute" && this.companyId === 1004) {
      this.isCompanyTypeFinancialInstitute = true;
    }
    this.currentPage = 0;
    this.pageSizeValue = 15;
    // this.pageSizeValue = 10;
    this.getPageSizes();
    this.refresh();
    this.getModuleddl();

    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.id = id;
      });
  
  this.initBreadCrumb();
  }
  initBreadCrumb() {
  this.contentHeader = {
    headerTitle: 'Manage Form',
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
          name: 'Manage Form',
          isLink: false
        }

      ]
  };
  }



  getModuleddl() {
    this.formservice.getFinanceModuleList().subscribe((result: any) => {
      if (result) {
        let _result = JSON.parse(result);
        ;
        this.modulelist = _result.module;
        this.ddlModulelist = _result.module;
      }
    });
  }
  onModuleSelect(event) {
    if (event) {
      this.moduleId = event.module_id;
      this.formservice.GetfinanceModuleSubModuleByCompany(this.moduleId).subscribe((result: any) => {
        this.subModuleId = null;
        if (result) {
          let _result = JSON.parse(result);
          this.subModulelist = _result.submodule;
        }
      });
    }
    else {
      this.moduleId = null;
      this.subModuleId = null;
      this.subModulelist = null;
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

  //edit(event) {
  //  ;
  //  let moduleCode = event.module_name_code, formName = event.sub_module_name, subModuleCode=event.sub_module_code
  //  this.router.navigate(['/formlist/editform', moduleCode, subModuleCode, formName]);
  //}
  delete(deleteId, submoduelcode) {
    this.deleteId = deleteId;
    ;
    const message = `Are you sure you want to delete this form?`;
    this.dialogService.confirm('DELETE FORM', message).subscribe(confirmed => {
      if (confirmed) {
        this.formservice.DeleteRecords(this.deleteId, "tblform_master", this.loginuserid).subscribe(r => {
          this.toaster.success(`Form has been deleted successfully.`);
          this.deleteId = "";
          this.refresh();
        }, error => {
        });
      }
    });
  }

  deleteForm(module, submdoule, formMasterId) {
    console.log(module, submdoule, formMasterId);
    const message = `Are you sure you want to delete this form?`;
    this.dialogService.confirm('DELETE FORM', message).subscribe(confirmed => {
      if (confirmed) {
        this.loadSave = true;

        this.formservice.deleteForm(module, submdoule, formMasterId).subscribe(result => {
          this.toaster.success(`Form has been deleted successfully.`);
          this.deleteId = "";
          this.refresh();
        }, error => {
        }, () => {
          this.loadSave = false;
        });
      }
    });
  }
  onChange($event) {
    //this.currentPage = 0;
    //this.refresh();
    this.loading = true;
    this.formservice.GetFormList_finance(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.moduleId, this.subModuleId).subscribe(response => {
      this.pagedData = this.formservice.pagedData;
      this.offset = 1;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }


  refresh() {
    this.selected = [];
    this.deleteId = null;
    this.loading = true;
    this.formservice.GetFormList_finance(this.listFilter, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue, this.loginuserid, this.moduleId, this.subModuleId).subscribe(response => {
      this.pagedData = this.formservice.pagedData;
      this.offset = 1;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  setPage($event) {
    this.loading = true;
    // this.lstPageSize = $event.page - 1;
    //// this.pageSizeValue = $event.page - 1;
    var ab = $event.page - 1;
    this.currentPage = ab;

    this.refresh();
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    /////////////// this.lstPageSize = $event.page - 1;
    ///// this.pageSizeValue = $event.page - 1;
    this.refresh();;
  }

  showpopup() {
    this.addForm.reset();
    this.isAddForm = true;
    this.getModuleddl();
    this.addForm.get('ddlModule').enable();
    this.addForm.get('ddlSubmodule').enable();
    this.makeFormModel.show();
  }
  Editshowpopup(row: any) {
    this.formservice.GetFormEditData(row.form_master_id).subscribe((result: any) => {
      if (result != null) {
        let _result = JSON.parse(result);
        console.log(_result.submoduleIdHidden);
        this.moduleIdHidden = _result.moduleId;
        this.subModuleIdHidden = _result.subModuleId;
        this.formName = _result.formName;



        this.GetEditSubModule(row.form_master_id);

      }
    });

    // this.addForm.patchValue({
    //   moduleName: this.formName,
    //   Id: row.form_master_id,
    //   ddlSubmodule: this.submoduleIdHidden,
    //   ddlModule: this.moduleIdHidden,
    // });
    // this.addForm.get("ddlModule").patchValue(this.moduleIdHidden);
    // this.addForm.get("ddlSubmodule").patchValue(this.submoduleIdHidden);
    //this.addForm.get("moduleName").patchValue(this.formName);



    // this.addForm.get('ddlSubmodule').disable();
    // this.addForm.get('ddlModule').disable();
    this.makeFormModel.show();
  }
  close() {
    this.makeFormModel.hide();
  }
  addForm = this.fb.group({
    moduleName: [null, Validators.required],
    ddlModule: [null, Validators.required],
    ddlSubmodule: [null, Validators.required],
    Id: [null]
  })
  get moduleName() { return this.addForm.get('moduleName'); }
  get ddlModule() { return this.addForm.get('ddlModule'); }
  get ddlSubmodule() { return this.addForm.get('ddlSubmodule'); }
  get Id() { return this.addForm.get('Id'); }

  saveNewForm() {
    if (this.addForm.valid) {

      let modulecode = (this.ddlModulelist.filter(m => m.module_id == this.ddlModule.value)[0].module_code as string).toLowerCase();
      let submodulecode = (this.ddlSubModulelist.filter(m => m.sub_module_id == this.ddlSubmodule.value)[0].sub_module_code as string).toLowerCase();

      this.SubModuleForm.moduleName = this.addForm.value.moduleName;
      this.SubModuleForm.moduleId = this.ddlModule.value;
      this.SubModuleForm.subModuleId = this.ddlSubmodule.value;
      this.SubModuleForm.Id = this.addForm.value.Id;
      
      this.formservice.saveNewSubModule(this.SubModuleForm, this.loginuserid, this.companyid).subscribe((result: any) => {
        if (result.statusCode == 200) {
          this.toaster.success(result.responseMessage);
          this.makeFormModel.hide();
          this.refresh();
          this.router.navigate(['/manageform/editform', modulecode, submodulecode, result.id]);
        }
        else if (result.statusCode == 300) {
          this.toaster.success(result.responseMessage);
          this.makeFormModel.hide();
          this.refresh();
          //this.router.navigate(['/manageform/editform', modulecode, submodulecode, result.id]);
        }
        else if (result.statusCode == 500 && result.id == -1) {
          this.toaster.error("Already Exists with same form Name");
        }
        else if (result.statusCode == 500 && result.id == -2) {
          this.toaster.error("Can not be same name as system predefine");
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
  GetEditSubModule(formMasterId) {
    if (formMasterId) {
      this.formservice.GetfinanceModuleSubModuleByCompany(formMasterId).subscribe((result: any) => {
        if (result) {
          let _result = JSON.parse(result);
          this.ddlSubModulelist = _result.submodule;
          // setInterval(() => {
          //   this.addForm.patchValue({
          //     moduleName: this.formName,
          //     Id: formMasterId,
          //     ddlSubmodule: this.subModuleIdHidden,
          //     ddlModule: this.moduleIdHidden,
          //   });
          // }, 1000);
          this.addForm.patchValue({
            moduleName: this.formName,
            Id: formMasterId,
            ddlSubmodule: this.subModuleIdHidden,
            ddlModule: this.moduleIdHidden,
          });
        }
      });
    }
  }
  getSubmodulesByModuleId(event) {
    if (event) {
      let moduleId = event.module_id;
      if (moduleId) {
        this.formservice.GetfinanceModuleSubModuleByCompany(moduleId).subscribe((result: any) => {
          if (result) {
            let _result = JSON.parse(result);
            this.ddlSubModulelist = _result.submodule;
          }
        });
      }
    }
    else {
      this.ddlSubModulelist = null;
      this.ddlSubmodule.setValue(null);
    }
  }

  get curPage(): number {
    return this.offset;
  }


  onSelect({ selected }) {
    if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].form_master_id.toString() + ",";
      }

    }
    else {
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].form_master_id.toString() + ",";
      }
    }
  }

  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete this form(s)?`;
      this.dialogService.confirm('DELETE FORM(S)', message).subscribe(confirmed => {
        if (confirmed) {
          this.loadSave = true;

          this.formservice.deleteFormMultiple(this.deleteId).subscribe(result => {
            this.toaster.success(`Form has been deleted successfully.`);
            this.deleteId = "";
            this.selected = [];
            this.refresh();
          }, error => {
          }, () => {
            this.loadSave = false;
          });
        }
      });
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  }

}
