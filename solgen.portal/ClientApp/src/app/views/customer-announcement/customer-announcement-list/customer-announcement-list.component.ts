import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { CustomerAnnouncementService } from '../customer-announcement.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-customer-announcement-list',
  templateUrl: './customer-announcement-list.component.html',
  styleUrls: ['./customer-announcement-list.component.scss']
})
export class CustomerAnnouncementListComponent implements OnInit {
  
  SelectionType = SelectionType;
  modulePermission: any[] = [];
  loadSave: boolean = false;
  pageNo: number;
  totalPage:number=10;
  lstPageSize: any;
  selected = [];
  deleteId: any;
  tableName = 'tblCustomerAnnouncement';

  sortCol:string='id';
  sortDir:string='desc';
  filter:string='';
  PagedData:any={
    data:[],
    pager:{}
  };
  offset: number;
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  constructor(private service: CustomerAnnouncementService,
              private commonService: CommonService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private toaster: ToastrService, private dialogService: ConfirmationDialogService) { 

    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
//debugger;
    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'CUSTOMERANNOUNCEMENTADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'CUSTOMERANNOUNCEMENTUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'CUSTOMERANNOUNCEMENTDELETE');
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }
              }
  

  ngOnInit() {
    this.GetCustomerAnnouncementList();
    this.getPageSizes();

  }

  GetCustomerAnnouncementList(){
    this.loadSave = true;
    this.service.GetCustomerAnnouncementList(this.pageNo,this.totalPage,this.sortCol,this.sortDir,this.filter).
    subscribe((res: any)=>{
      //debugger;
        this.PagedData ={
          data: res.data,
          pager:res.pager
        }
        this.offset = 1;
        this.loadSave = false;
      },
      (err) => {
        this.loadSave = false;
      })
      }
      
      setPageNo($event) {
        this.pageNo = $event.page - 1;
        this.GetCustomerAnnouncementList()
      }
    
      search() {
        this.pageNo = 0;
        this.totalPage = 15;
        this.GetCustomerAnnouncementList();
      }
      reset() {
        this.pageNo = 0;
        this.totalPage = 15;
        this.filter = '';
        this.GetCustomerAnnouncementList()
        // this.refresh();
      }
      AddNew() {
        this.router.navigateByUrl("/customerannouncements/AddAnnouncement");
      }
    
    
      get curPage(): number {
        return this.offset;
      }
    
      getPageSizes() {
        this.commonService.getMasterItemsList('PageSize').subscribe((res: any) => {
          //debugger
          this.lstPageSize = this.commonService.masters;
        });
      }
    
      setPage($event) {
        //debugger;
        this.loadSave = true;
        this.pageNo = $event.page - 1;
        // this.currentPage=$event.page-1;
        this.GetCustomerAnnouncementList()
      }
    
      onSort($event) {
        const sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortCol = sort.prop;
        this.pageNo = 0;
        this.GetCustomerAnnouncementList();
      }
      onChange($event) {
        ;
        this.totalPage = Number($event.text);
        this.pageNo = 0;
        // this.refresh();
        this.GetCustomerAnnouncementList();
      }

      Delete(Id: number) 
      {
        this.dialogService.confirm('Delete Customer Announcement', 'Are you sure you want to delete the selected customer announcement ?').subscribe(confirmed => {
        if (confirmed) 
        {
          return this.service.DeleteCustomerAnnouncement(Id).subscribe(res => {
            if (res == true) {
              this.toaster.success("Customer Announcement has been deleted successfully");
              this.GetCustomerAnnouncementList();
            }
          })
        }
      });
    }

    
  getIsShowColName({ row, column, value }) {    
    //debugger
    if (row.statusId != 1001) {
      return {
        'dispaly-none': true
      };
    }
  }
  onSelect({ selected }) {
    //debugger
    if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].id.toString() + ",";
      }

    }
    else {
      this.deleteId = null;
      this.deleteId = "";
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].id.toString() + ",";
      }
    }
  }
  
  deleteAll() {
    //debugger    
    this.deleteId = this.PagedData.data.filter(x => this.deleteId.includes(x.id) ).map(x => x.id).join(',');
    if (this.deleteId != null && this.deleteId != "") {
      const message = `Are you sure you want to delete the selected customer announcement(s)?`;
      this.dialogService.confirm('Delete Customer Announcement', message).subscribe(confirmed => {
        if (confirmed) {
          this.commonService.DeleteRecords(this.deleteId, this.tableName).subscribe(r => {
            this.toaster.success(`Customer announcement(s) has been deleted successfully.`);
            this.deleteId = "";
            this.selected = [];
            this.GetCustomerAnnouncementList();
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
