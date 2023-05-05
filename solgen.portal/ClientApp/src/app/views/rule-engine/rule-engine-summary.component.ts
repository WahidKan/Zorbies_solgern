import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgSelectComponent } from '@ng-select/ng-select';
import { RuleEngineService } from './rule-engine.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { CommonService } from '../shared/common.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rule-engine-summary',
  templateUrl: './rule-engine-summary.component.html'
})
export class RuleEngineSummaryComponent implements OnInit {
  displayCheck: any;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent; 
  loading = false;
  sortDir = 'desc';
  sortColumn = 'created_at';
  pagedData: any = {
    pager: {},
    data: []
  };
  loadSave: boolean = false;

  listFilter = '';
  lstPageSize: any
  pageSizeValue: number;
  loanProducts: any;
  loanData: any = null;
  SelectionType = SelectionType;
  selected = [];
  rulId: string ="";
  contentHeader: object;
  constructor(private ruleService: RuleEngineService, private commonService: CommonService,
    private dialogService: ConfirmationDialogService, private activeRoute: ActivatedRoute,
    private toaster: ToastrService) { }

  ngOnInit() {

    this.pageSizeValue = 10;
    this.refresh();
    this.getLoanProductList();
    this.getPageSizes();
  
    this.initBreadCrumb();
  }
  initBreadCrumb() {
  this.contentHeader = {
    headerTitle: 'Rule Engine Summary',
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
          name: 'Rule Engine Summary',
          isLink: false
        }
  
      ]
  };
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
    this.loading = true;
    this.ruleService.getRuleSummaryList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.ruleService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  search() {
    this.loading = true;
    if (typeof this.loanData == 'undefined') {
      this.loanData = null;
    }
    this.ruleService.getRuleSummaryList(this.listFilter,  this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.ruleService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  reset() {
    this.table.sorts = [];
    this.selected = [];
    this.loading = true;
    this.listFilter = '';
    this.sortDir = 'desc';
    this.sortColumn = 'created_at';
    this.pageSizeValue = 10;
    this.ruleService.getRuleSummaryList(this.listFilter, this.sortColumn, this.sortDir, 0, 10).subscribe(response => {
      this.pagedData = this.ruleService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  setPage($event) {
    this.loading = true;
    this.ruleService.getRuleSummaryList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.ruleService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.loading = true;
    this.ruleService.getRuleSummaryList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.ruleService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  refresh() {
    this.loading = true;
    this.ruleService.getRuleSummaryList('', this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(response => {
      this.pagedData = this.ruleService.pagedData;

      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  onSelect({ selected }) {
    if (this.rulId == "" || this.rulId == null || this.rulId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);

      for (let i = 0; i < selected.length; i++) {
        // if (selected[i].asociatedUser !== 1) {
        this.rulId += selected[i].rule_id.toString() + ",";
        // }
      }

    }
    else {
      this.rulId = null;
      this.rulId = "";
      for (let i = 0; i < selected.length; i++) {
        //if (selected[i].asociatedUser !== 1) {
        this.rulId += selected[i].rule_id.toString() + ",";
        // }
      }
    }
  }

  onActivate(e) {

  }
}
