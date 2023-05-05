import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { RuleEngineService } from './rule-engine.service';
import { CommonService } from '../shared/common.service';
import { ActivatedRoute } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-rule-engine-list',
  templateUrl: './rule-engine-list.component.html',
  styles: [`
.ngx-datatable.scroll-horz .datatable-body{
    overflow-x:hidden !important;
}
`]
})
export class RuleEngineListComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
  sortDir = 'desc';
  sortColumn = 'created_at';
  pagedData: any = {
    pager: {},
    data: []
  };
  listFilter = '';
  lstPageSize: any
  pageSizeValue: number;
  loanProducts: any;
  loanData: any = null;
  SelectionType = SelectionType;
  selected = [];
  rulId: any;
  loadSave: boolean = false;
  displayCheck: any;
  laPagedData: any = {
    pager: {},
    data: []
  };
  
  listFiltertext = '';
  searchUserType = '';
  laSortColumn = 'CreatedOn';
  laSortDir = 'desc';
  currentPage: number=1;
  laPageSizeValue: number=10;
  loginuserid: any;
  batchid: number = 0;
  contentHeader: object;

  listOne: Array<string> = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];
  constructor(private ruleService: RuleEngineService, private commonService: CommonService,
    private dialogService: ConfirmationDialogService, private activeRoute: ActivatedRoute,
    private toaster: ToastrService) {
    this.rulId = "";
  }

  ngOnInit() {  
    this.loadSave = true;  
    this.pageSizeValue = 10;
    this.refresh();
    this.getLoanProductList();
    this.getPageSizes();
   
 
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


  onClick() {
    // // console.log(this.listOne);
  }

  updateFilter(event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }
  getLoanProductList() {
    this.ruleService.getLoanProducts('all').subscribe((m: any) => {
      this.loanProducts = m;
    });
  }

  SetLoanData(event: any) {
   
    if (typeof event != "undefined") {
      this.loanData = event.Id;
    }
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  onChange($event) {
    this.loadSave = true;
    this.ruleService.getRuleList(this.listFilter, this.loanData, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.ruleService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }

  search() {
    this.loadSave = true;
    if (typeof this.loanData == 'undefined') {
      this.loanData = null;
    }
    this.ruleService.getRuleList(this.listFilter, this.loanData, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.ruleService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }

  reset() {
    this.table.sorts = [];
    this.selected = [];
    this.loadSave = true;
    this.listFilter = '';    
    this.sortDir = 'desc';
    this.sortColumn = 'created_at';
    this.pageSizeValue = 10;
    this.ruleService.getRuleList(this.listFilter, null,this.sortColumn, this.sortDir, 0, 10).subscribe(response => {
      this.pagedData = this.ruleService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }

  setPage($event) {
    this.loadSave = true;
    this.ruleService.getRuleList(this.listFilter, this.loanData, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.ruleService.pagedData;
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
    this.ruleService.getRuleList(this.listFilter, this.loanData, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.ruleService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
  }

  refresh() {
    this.loadSave = true;
    this.ruleService.getRuleList('', this.loanData,this.sortColumn,  this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.ruleService.pagedData;
     
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }

  DeleteRule(row: any) {
    
    const message = `Are you sure you want to delete rule "${row.rule_name}"?`;
    this.dialogService.confirm('Delete Rule ', message).subscribe(confirmed => {
      if (confirmed) {
        this.ruleService.deleteRule(row.RuleId).subscribe((result: any) => {
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
  onSelectLA({ selected }) {
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
  

  remove() {    
    if (this.rulId != null && this.rulId != "") {
      const message = `Are you sure you want to delete Rule(s)?`;
      this.dialogService.confirm('Delete Rule(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.ruleService.deleteRules(this.rulId).subscribe(r => {
            this.toaster.success(`Rule(s) has been deleted successfully.`);
            this.rulId = "";
            this.selected = [];
            this.search();
          }, error => {
          });
        }
      });
    }
    else {
      this.toaster.error("Please select at least one row.");      
    }    
  }

  disable(row) {

    const message = `Are you sure you want to disable this Rule "${row.RuleName}"?`;
    this.dialogService.confirm('Disable Rule', message).subscribe(confirmed => {
      if (confirmed) {
        this.ruleService.changeStatus(row.RuleId).subscribe(r => {
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
        this.ruleService.changeStatus(row.RuleId).subscribe(response => {
          this.refresh();
          this.toaster.success(`"${row.RuleName}" has been enabled successfully`);
        }, error => {
        });
      }
    });
  }

  ruleId: number;
  

  applyLatestRule() {
    // console.log(this.selected);
  }
  onActivate(event) {

  }
}
