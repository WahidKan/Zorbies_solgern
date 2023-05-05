import { Component, OnInit } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { DocumentMakerSubModuleMappingService } from '../document-maker-sub-module-mapping.service';

@Component({
  selector: 'app-document-maker-sub-module-mapping-list',
  templateUrl: './document-maker-sub-module-mapping-list.component.html',
  styleUrls: ['./document-maker-sub-module-mapping-list.component.scss']
})
export class DocumentMakerSubModuleMappingListComponent implements OnInit {

  moduleName = '';
  subModuleName = '';
  searchTxt = '';
  listFilter = '';
  listFiltertext = '';
  currentPage: number;
  deleteId: any;
  selected = [];
  loading = false;
  sortColumn = 'Id';
  sortDir = 'desc';
  pageSizeValue: number;
  companyId: any;
  lstPageSize: any;
  offset : number = 1;
  pagedData: any = {
    pager: {},
    data: []
  };
  SelectionType = SelectionType;
  contentHeader: object;
  constructor(private commonService : CommonService,
    private documentMakerSubModuleMappingService : DocumentMakerSubModuleMappingService,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.pageSizeValue = 15;
    this.refresh();
    this.getPageSizes();
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Document Mapping',
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
            name: 'Document Mapping',
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

  onChange($event) {
    this.loading = true;
    this.documentMakerSubModuleMappingService.GetDoumentMakerSubModuleMappingList(this.sortColumn, this.sortDir, 0, this.pageSizeValue,this.listFilter).subscribe(response => {
      this.pagedData = this.documentMakerSubModuleMappingService.pagedData;
      this.offset = 1;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
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
    this.loading = true;
    this.documentMakerSubModuleMappingService.GetDoumentMakerSubModuleMappingList(this.sortColumn, this.sortDir, 0, this.pageSizeValue,this.listFilter).subscribe(response => {
      this.pagedData = this.documentMakerSubModuleMappingService.pagedData;
      this.offset = 1;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
  reset() {
    this.listFilter = '';
    this.listFiltertext = '';
    this.currentPage = 1;
    this.refresh();
  }

  setPage($event) {
    this.loading = true;
    this.documentMakerSubModuleMappingService.GetDoumentMakerSubModuleMappingList(this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue,this.listFilter).subscribe(response => {
      this.pagedData = this.documentMakerSubModuleMappingService.pagedData;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
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
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete the selected Document Mapping(s)?`;
      this.dialogService.confirm('Delete Document Mapping(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.documentMakerSubModuleMappingService.deleteAll(this.deleteId).subscribe(r => {
            this.toaster.success(`Document Mapping(s) has been deleted successfully.`);
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
    const message = `Are you sure you want to delete Document Mapping "${row.Name}"?`;
    this.dialogService.confirm('DELETE DOCUMENT MAPPING ', message).subscribe(confirmed => {
      if (confirmed) {
        this.documentMakerSubModuleMappingService.delete(row.Id).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success("Document Mapping has been deleted successfully.");
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
