import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { ActivatedRoute } from '@angular/router';
import { ServicesappointmentService } from '../servicesappointment.service';
import { SelectionType, NgxDatatableModule, DatatableComponent } from '@swimlane/ngx-datatable';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { NgSelectComponent } from '@ng-select/ng-select';



@Component({
  selector: 'app-managequestionnaire-list',
  templateUrl: './managequestionnaire-list.component.html'
})
export class ManagequestionnaireListComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;  
  //@ViewChild('userTypeSelect') userTypeSelect: NgSelectComponent;


  listFilter = '';
  searchTxt = '';
  isAdd: boolean = false;
  isDelete: boolean = false;
  isUpdate: boolean = false;
  modulePermission: any[] = [];
  listingGridData: any = {
    pager: {},
    data: []
  };
  loading = false;
  sortDir = 'desc';
  sortColumn = 'Createdon';
  currentPage: any;
  currPage: number;
  pageSizeValue: number;
  @Input() offset: number;
  SelectionType = SelectionType;
  deleteId: any;
  selected = [];
  lstPageSize: any



  constructor(private commonService: CommonService, 
    private activeRoute: ActivatedRoute,
    private serviceappointmentlistService: ServicesappointmentService,
    private dialogService: ConfirmationDialogService,
    private toaster: ToastrService) {
    const moduleCode = this.activeRoute.snapshot.data.moduleCode; 
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);

    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'USERADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }

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
  }

  ngOnInit() {
    this.getPageSizes();
    this.currPage = 0;
    this.pageSizeValue = 15;
    this.getListingGridData();
  }

  getListingGridData() {
    this.loading = true;
    this.serviceappointmentlistService.GetListingGridData(this.searchTxt, this.sortColumn, this.sortDir, this.currPage, this.pageSizeValue).subscribe(result => {
      this.listingGridData = result;
      // console.log("this.listingGridData", this.listingGridData);
      this.offset = this.currPage + 1;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  setPage($event) {
    this.loading = true;
    var ab = $event.page - 1;
    this.currPage = ab;
    this.currentPage = ab;
    this.getListingGridData();
  }

  get curPage(): number {
    return this.offset;
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

  onChange() {
    this.loading = true;
    this.serviceappointmentlistService.GetListingGridData(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue).subscribe(result => {
      this.listingGridData = result;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  updateFilter(event) {
    this.searchTxt = event.target.value;
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13 || keycode === '13') {
      this.getListingGridData(); 
    }
  }

  search() {
    this.getListingGridData();
  }
  reset() {
    this.table.sorts = [];
   // this.userTypeSelect.clearModel();
    this.loading = true;
    this.listFilter = '';
    this.searchTxt = '';
    //this.searchUserType = '';
    this.sortDir = 'desc';
    this.sortColumn = 'CreatedOn';
    this.pageSizeValue = 15;
    this.currPage = 0;
    this.getListingGridData();

  }

  getPageSizes() {
    this.commonService.getMasterItemsList("PageSize").subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    })
  }


  deleteAll() {
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete Question(s)"`;
      this.dialogService.confirm('Delete Question(s)', message).subscribe(confirmed => {
        if (confirmed) {
          this.serviceappointmentlistService.DeleteRecords(this.deleteId, "tblCheckList").subscribe(r => {
            this.toaster.success(`Record(s) has been deleted successfully`);
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
  DeleteQuestionnaire(row: any) {
    const message = `Are you sure you want to delete question "${row.name}"?`;
    this.dialogService.confirm('Delete Question ', message).subscribe(confirmed => {
      if (confirmed) {
        this.serviceappointmentlistService.deleteQuestionnaire(row.Id).subscribe((result: any) => {
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
}
