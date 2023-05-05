import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SelectionType, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { WorktypeService } from './worktype.service';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-worktypelist',
  templateUrl: './worktypelist.component.html'
})
export class WorktypelistComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @Input() offset: number;
  sortDir = 'desc';
  sortColumn = 'CreatedAt';
  searchTxt: any;
  listFilter = '';
  curPage: number;
  pageSizeValue: number;
  lstPageSize: any
  tableName='tblworktype'
  loading = false;
  isDelete: boolean = false;
  isAdd: boolean = false;
  isUpdate: boolean = false;
  modulePermission: any[] = [];
  deleteId: any;
  selected = [];
  SelectionType = SelectionType;
  loadSave = false;

  workTypeListingData: any = {
    pager: {},
    data: []
  };
  contentHeader: object;

  constructor(private activeRoute: ActivatedRoute,
    private commonService: CommonService,
    private worktypeService: WorktypeService,
    private dialogService: ConfirmationDialogService,
    private toaster: ToastrService) {
    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'USERUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'USERDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'USERADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    } 

  }

  ngOnInit() {
    this.loadSave = true;
    this.sortColumn = 'CreatedAt';
    this.curPage = 1;
    this.isAdd = true;
    this.isUpdate = true;
    this.isDelete = true;
    this.listFilter = '';
    this.pageSizeValue = 10;
    this.getPageSizes();
    this.getListingGridData();
    this.initBreadCrumb();
}

initBreadCrumb() {
   this.contentHeader = {
     headerTitle: 'Manage Work Type',
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
           name: 'Manage Work Type',
           isLink: false
         }

       ]
   };
 }

  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.getListingGridData();
    }
  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }

  getListingGridData() {
    this.selected = [];
    this.deleteId = null;
    this.loadSave = true;
    this.worktypeService.GetWorkTypeListingData(this.listFilter, this.sortColumn, this.sortDir, this.curPage, this.pageSizeValue).subscribe(result => {
      this.workTypeListingData = result;
      this.workTypeListingData.data.duration=new Date(this.commonService.ConvertUserSelectedTimeZoneToUTCForAppointment(this.workTypeListingData.data.duration))
      // console.log("this.listingGridData", this.workTypeListingData);
      this.offset = 1;
      this.loadSave = false;
    }, error => {
      this.loadSave = false;
    })
  }

  onChange($event) {
    this.curPage = 1;
    this.getListingGridData();
  }

  setPage($event) {
    ;
    this.loadSave = true;
    var ab = $event.page;
    this.curPage = ab;
    this.getListingGridData();
  }

  onSort($event) {
    const sort = $event.sorts[0]
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.getListingGridData();
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
  reset() {
    this.table.selected = [];
    this.table.sorts = [];
    this.loading = true;
    this.listFilter = '';
    this.sortDir = 'desc';
    this.sortColumn = 'CreatedOn';
    this.pageSizeValue = 10;
    this.curPage = 1;
    this.selected = [];
    this.deleteId = null;
    this.getListingGridData();

  }

  DeleteWorkType(row: any) {
    ;
    const message = `Are you sure you want to delete Work Type "${row.WorkTypeName}"?`;
    this.dialogService.confirm('Delete Work Type ', message).subscribe(confirmed => {
      if (confirmed) {
        this.worktypeService.deleteWorkType(row.Id).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
            this.getListingGridData();
          }
          else {
            this.toaster.error(result.responseMessage);
          }
        })
      }
    });
   

  }
  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete the selected Work Type(s)?`;
      this.dialogService.confirm('Delete WorkType', message).subscribe(confirmed => {
        if (confirmed) {
          this.worktypeService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
            this.toaster.success(`Selected Work Type(s) has been deleted successfully.`);
            this.deleteId = "";
            this.selected = [];
            this.getListingGridData();
          }, error => {
          });
        }
      });
    }
    else {
      this.toaster.error("Please select at least one row.");
    }
  }
}
