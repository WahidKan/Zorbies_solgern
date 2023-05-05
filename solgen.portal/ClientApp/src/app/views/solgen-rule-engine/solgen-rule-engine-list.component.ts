import { Component, OnInit, Input } from '@angular/core';
import { CommonService, ModuleList } from '../shared/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { SelectionType } from '@swimlane/ngx-datatable';
import { FormService } from '../manageform/form.service';
import { SolgenRuleEngineService } from './solgen-rule-engine.service';

@Component({
  selector: 'app-solgen-rule-engine-list',
  templateUrl: './solgen-rule-engine-list.component.html',
  styleUrls: ['./solgen-rule-engine-list.component.scss']
})
export class SolgenRuleEngineListComponent implements OnInit {


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
  sortColumn = 'RuleId';
  deleteId: any;
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
  rulId: string ="";
  pagedData: any = {
    pager: {},
    data: []
  };

  laPagedData: any = {
    pager: {},
    data: []
  };
  contentHeader: object;

  constructor(private fb: FormBuilder,
    private formservice: FormService,
    private commonService: CommonService,
    private SolgenService: SolgenRuleEngineService,
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
    this.loadSave = true;
    this.userInfo =  JSON.parse(localStorage.getItem('userinfo'));
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
         headerTitle: 'Rule Engine',
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
               name: 'Rule Engine',
               isLink: false
             }
    
           ]
       };
     }

  getModuleddl() {
    
    // this.formservice.getModuleList().subscribe((result: any) => {
    //   if (result) {
    //     let _result = JSON.parse(result);
    //     // this.modulelist = _result.module;
    //     // this.ddlModulelist = _result.module;
    //   }
    // });
    this.commonService.getSolgenModulesItemsList('custom_modules_layout').subscribe((result: any) => {
      let submmm = this.commonService.masters;
       this.modulelist = this.commonService.masters;
       this.ddlModulelist = this.commonService.masters;
    });
  }
  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }
  onModuleSelect(event) {
    
    if (event) {
      this.moduleId = event.value;
      this.subModuleId = null;
      // this.moduleId.valueChanges.subscribe((m: any) => {
        this.SolgenService.getSubModules(this.moduleId).subscribe((s: any) => {
          this.subModulelist = s;//.filter(a => a.Status_id === 1001 );
        });
      // });
      // this.formservice.getSubModuleListByModuleId(this.moduleId).subscribe((result: any) => {
      //   this.subModuleId = null;
      //   if (result) {
      //     let _result = JSON.parse(result);
      //     this.subModulelist = _result.submodule;
      //   }
      // });
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

  onChange($event) {
    this.loadSave = true;
    this.SolgenService.GetSolgenList(this.listFilter, this.moduleId, this.subModuleId, this.sortColumn, this.sortDir, 0, this.pageSizeValue,this.companyId).subscribe(response => {
      this.pagedData = this.SolgenService.pagedData;
      this.offset = 1;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }
  setPage($event) {
    this.loadSave = true;
    this.SolgenService.GetSolgenList(this.listFilter, this.moduleId, this.subModuleId, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue,this.companyId).subscribe(response => {
      this.pagedData = this.SolgenService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }
  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loadSave = true;
    this.SolgenService.GetSolgenList(this.listFilter, this.moduleId, this.subModuleId, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue,this.companyId).subscribe(response => {
      this.pagedData = this.SolgenService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }



  remove() {
    if (this.rulId != null && this.rulId != "") {
      const message = `Are you sure you want to delete Rule(s)?`;
      this.dialogService.confirm('Delete Rule(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.SolgenService.deleteRules(this.rulId).subscribe(r => {
            this.toaster.success(`Rule(s) has been deleted successfully.`);
            this.rulId = "";
            this.selected = [];
            this.refresh();
          }, error => {
          });
        }
      });
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  }

  onSelect({ selected }) {
    if (this.rulId == "" || this.rulId == null || this.rulId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);

      for (let i = 0; i < selected.length; i++) {
       // if (selected[i].asociatedUser !== 1) {
        this.rulId += selected[i].RuleId.toString() + ",";
       // }
      }

    }
    else {
      this.rulId = null;
      this.rulId = "";
      for (let i = 0; i < selected.length; i++) {
        //if (selected[i].asociatedUser !== 1) {
        this.rulId += selected[i].RuleId.toString() + ",";
       // }
      }
    }
  }

  refresh() {
    this.loadSave = true;
    this.SolgenService.GetSolgenList(this.listFilter, this.moduleId, this.subModuleId, this.sortColumn, this.sortDir, 0, this.pageSizeValue,this.companyId).subscribe(response => {
      this.pagedData = this.SolgenService.pagedData;
      this.offset = 1;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }

  DeleteRule(row: any) {

    const message = `Are you sure you want to delete rule "${row.RuleName}"?`;
    this.dialogService.confirm('Delete Rule ', message).subscribe(confirmed => {
      if (confirmed) {
        this.SolgenService.deleteRule(row.RuleId).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
            this.refresh();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
  }




  disable(row) {

    const message = `Are you sure you want to disable this Rule "${row.RuleName}"?`;
    this.dialogService.confirm('Disable Rule', message).subscribe(confirmed => {
      if (confirmed) {
        this.SolgenService.changeStatus(row.RuleId).subscribe(r => {
          this.refresh();
          this.toaster.success(`"${row.RuleName}" has been disabled successfully `);
        }, error => {
        });
      }
    });
  }

  enable(row) {
    const message = `Are you sure you want to enable this Rule  "${row.RuleName}"?`;
    this.dialogService.confirm('Enable Email Template', message).subscribe(confirmed => {
      if (confirmed) {
        this.SolgenService.changeStatus(row.RuleId).subscribe(response => {
          this.refresh();
          this.toaster.success(`"${row.RuleName}" has been enabled successfully`);
        }, error => {
        });
      }
    });
  }

}
