import { Component, OnInit } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { DocumentMakerRouteRuleService } from '../document-maker-route-rule.service';

@Component({
  selector: 'app-document-maker-route-rule-list',
  templateUrl: './document-maker-route-rule-list.component.html',
  styleUrls: ['./document-maker-route-rule-list.component.scss']
})
export class DocumentMakerRouteRuleListComponent implements OnInit {
  moduleName = '';
  subModuleName = '';
  searchTxt = '';
  listFilter = '';
  listFiltertext = '';
  currentPage: number;
  deleteId: any;
  selected = [];
  loadSave = false;
  sortColumn = 'Id';
  sortDir = 'desc';
  pageSizeValue: number;
  lstPageSize: any;
  companyId: any;
  offset : number = 1;
  pagedData: any = {
    pager: {},
    data: []
  };
  contentHeader: object;

  SelectionType = SelectionType;
  constructor(private commonService : CommonService,
    private documentMakerRouteRuleService : DocumentMakerRouteRuleService,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.loadSave = true;
    this.pageSizeValue = 15;
    this.refresh();
    this.getPageSizes();
    this.initBreadCrumb();
  }
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Document Route/Rule',
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
            name: 'Document Route/Rule',
            isLink: false
          }
  
        ]
    };
  }
  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }

  getPageSizes() {
    //alert("testf");
    this.commonService.getMasterItemsList('PageSize').subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    });
  }
  get curPage(): number {
    return this.offset;
  }
  search() {
    this.currentPage = 1;
    this.listFiltertext = '';
    if (this.listFilter.trim().length > 0) {
      this.listFiltertext = "name like '%" + this.listFilter + "%'";
    }
    this.refresh();
  }
  refresh() {
    this.loadSave = true;
    this.documentMakerRouteRuleService.GetDoumentMakerRouteRuleList(this.sortColumn, this.sortDir, 0, this.pageSizeValue,this.listFilter).subscribe(response => {
      this.pagedData = this.documentMakerRouteRuleService.pagedData;
      this.offset = 1;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }
  reset() {
    this.listFilter = '';
    this.listFiltertext = '';
    this.currentPage = 1;
    this.refresh();
  }
  getIsShowColName({ row, column, value }) {    
    if (row.MappingRouteStatus != 'NotAvilable') {
      return {
        'dispaly-none': true
      };
    }
  }

  setPage($event) {
    this.loadSave = true;
    this.documentMakerRouteRuleService.GetDoumentMakerRouteRuleList(this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue,this.listFilter).subscribe(response => {
      this.pagedData = this.documentMakerRouteRuleService.pagedData;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    });
    // this.loading = true;
    // this.currentPage = $event.page;
    // this.refresh();
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.currentPage = 1;
    this.refresh();
  }
  onSelect({ selected }) {
    if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].Id.toString() + ",";
      }

    }
    else {
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].Id.toString() + ",";
      }
    }
  }
  deleteAll() {
    ;
    this.deleteId = this.pagedData.data.filter(x => x.MappingRouteStatus == 'NotAvilable' && this.deleteId.includes(x.Id) ).map(x => x.Id).join(',');
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete the selected Route/Rule(s)?`;
      this.dialogService.confirm('DELETE ROUTE/RULE(S)', message).subscribe(confirmed => {
        if (confirmed) {
          this.documentMakerRouteRuleService.deleteAll(this.deleteId).subscribe(r => {
            this.toaster.success(`Route/Rule(s) has been deleted successfully.`);
            this.deleteId = "";
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
  Delete(row: any) {
    const message = `Are you sure you want to delete Route/Rule "${row.Name}"?`;
    this.dialogService.confirm('DELETE ROUTE/RULE', message).subscribe(confirmed => {
      if (confirmed) {
        this.documentMakerRouteRuleService.delete(row.Id).subscribe((result: any) => {
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
}
