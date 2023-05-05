import { Component, OnInit } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { CommonService } from '../../shared/common.service';
import { SolgenRuleEngineService } from '../solgen-rule-engine.service';

@Component({
  selector: 'app-rule-engine-formul-list',
  templateUrl: './rule-engine-formul-list.component.html',
  styleUrls: ['./rule-engine-formul-list.component.scss']
})
export class RuleEngineFormulListComponent implements OnInit {
  listFilter: string = '';
  pageSizeValue: number = 10;
  SelectionType = SelectionType;
  loadSave: boolean = false;
  isEdit: boolean = false;
  selected = [];

  pagedData: any = {
    pager: {},
    data: [],
  };
  myTime: Date;
  timepickerVisible = true;
  offset: number;
  lstPageSize: any;
  loading: boolean;
  currentPage: any;
  sortDir: any;
  sortColumn: any;
  deleteId: string;
  isAddForm = false;
  timezoneList: any;
  ruleEngineFormulaParams = {
    filter: '',
    sortColumn:'createdDate',
    sortDir: 'desc',
    page: 0,
    pageSize: 10,
  };
  contentHeader: object;
  constructor( private ruleEngineService: SolgenRuleEngineService,  public commonService: CommonService, ) { }

  ngOnInit() {
  alert("list");
  this.getOperatingHoursList();
  this.getPageSizes();
  
  this.initBreadCrumb();
  }
  
  initBreadCrumb() {
     this.contentHeader = {
       headerTitle: 'Manage Rule Engine Formulas',
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
             name: 'Manage Rule Engine Formulas',
             isLink: false
           }
  
         ]
     };
   }
  getOperatingHoursList()
  {
    this.loadSave = true;
    this.ruleEngineService.getRuleEnginFormulaList(this.ruleEngineFormulaParams).subscribe(

      res=> {
        this.pagedData = {
          data: res.data,
          pager: res.pager,

        };
        this.offset = 1;
        this.loadSave = false;
      },
      (err) => {
        this.loadSave = false;
      }
    )
  }

  getPageSizes() {
    this.commonService.getMasterItemsList('PageSize').subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    });
  }
  get curPage(): number {
    return this.offset;
  }



  setPage($event) {
    this.loading = true;
    this.currentPage = $event.page - 1;
    this.ruleEngineFormulaParams.page = $event.page - 1;
    this.refresh();
  }

  onSort($event) {
    const sort = $event.sorts[0];
    this.ruleEngineFormulaParams.sortDir = sort.dir;
    this.ruleEngineFormulaParams.sortColumn = sort.prop;
    this.currentPage = 1;
    this.refresh();
  }
  onChange($event) {
    this.currentPage = 1;
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.ruleEngineService.getRuleEnginFormulaList(this.ruleEngineFormulaParams).subscribe(
      (response) => {
        this.pagedData = {
          data: response.data,
          pager: response.pager,
        };
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
  search() {
    this.currentPage = 1;
    this.ruleEngineFormulaParams.filter = '';
    if (this.listFilter.trim().length > 0) {
      this.ruleEngineFormulaParams.filter = this.listFilter;
    }
    this.refresh();
  }
  reset() {
    this.listFilter = '';
    this.ruleEngineFormulaParams.filter = '';
    this.currentPage = 1;
    this.refresh();
  }
}
