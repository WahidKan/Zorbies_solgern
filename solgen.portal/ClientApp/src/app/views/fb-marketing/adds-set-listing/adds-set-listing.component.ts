import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionType } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { FbMarketingService } from '../fb-marketing.service';

@Component({
  selector: 'app-adds-set-listing',
  templateUrl: './adds-set-listing.component.html',
  styleUrls: ['./adds-set-listing.component.scss']
})
export class AddsSetListingComponent implements OnInit {

  moduleName = 'facebook';
  submoduleName = 'facebookcampaign';
  @ViewChild('addEditModal', { static: false })
  pageNo = 0;
  pageSize = 15;
  listFilter: string = '';
  SelectionType = SelectionType;
  From: any;
  To: any;
  loadSave: boolean = false;
  isEdit: boolean = false;
  pagedData: any = {
    pager: {},
    data: [],
  };
  offset: number;
  selected = [];
  lstPageSize: any;
  loading: boolean;
  sortDir: any = 'desc';
  sortColumn: any = 'CreatedAt';
  deleteId: string;
  isAddForm = false;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  contentHeader: object;

  constructor(
    private fbMarketingService: FbMarketingService,

    public commonService: CommonService,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService,
    private router: Router
    ,private activeRoute: ActivatedRoute
  ) { 

    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(9007);
    ;
    let add = this.modulePermission.find(m => m.privilegecode.toLowerCase() == 'facebookadsetadd'); //MANAGELOCATIONADD
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toLowerCase() == 'facebookadsetupdate'); //MANAGELOCATIONUPDATE

    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toLowerCase() == 'facebookadsetdelete'); //MANAGELOCATIONDELETE
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }


  }

  ngOnInit() {
    this.refresh();
    this.getPageSizes();
    this.initBreadCrumb();
  }
  
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Ad Sets',
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
            name: 'Manage Ad Sets',
            isLink: false
          }
  
        ]
    };
  }







  AddNew() {
    this.router.navigateByUrl("/marketing/addfbAddSet");
  }

  DeleteAdset(row: any) {
    const message = "Are you sure you want to delete the ad set   "+ "‘" + row.Name  +"’ ?" ;
    
    this.dialogService.confirm('DELETE AD SET', message).subscribe(confirmed => {
      if (confirmed) {

        this.loadSave = true;
        this.fbMarketingService.deleteAdset(row.FacebookAdSetId).subscribe((result: any) => {
          if (result.statusCode == 200) {
            this.toaster.success(result.responseMessage);
            this.refresh();
          }
          else {
            this.toaster.error(result.responseMessage);
            this.refresh();
          }

        },
          error => {
            // console.log(error);
          }
        );
      }
    });
  }
  refresh() {
    ;
    this.loadSave = true;

    if ((this.From == null && this.To == null) || (this.From && this.To)) {
      this.fbMarketingService.GetAddSetsList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, this.pageNo, this.pageSize).subscribe(result => {
        // console.log(result);
        if (result) {
          ;
          this.pagedData = result;
  
          this.loadSave = false;
        }
      });
      
    }
    else{
      this.loadSave = false;
      this.toaster.error('Both Start Date and End Date are required to search.');
    }




    
  }

  setPageNo($event) {
    this.pageNo = $event.page;
    this.refresh();
  }



  search() {
    this.pageNo = 0;
    this.pageSize = 15;
    this.refresh();
  }

  reset() {
    this.pageNo = 0;
    this.pageSize = 15;
    this.From = null;
    this.To = null;
    this.listFilter = '';
    this.refresh();
  }



  get curPage(): number {
    return this.offset;
  }

  getPageSizes() {
    this.commonService.getMasterItemsList('PageSize').subscribe((res: any) => {
      this.lstPageSize = this.commonService.masters;
    });
  }

  setPage($event) {
    this.loading = true;
    this.pageNo = $event.page - 1;
    this.refresh();
  }

  onSort($event) {
    const sort = $event.sorts[0];
    this.sortDir = sort.dir;
    this.sortColumn = sort.prop;
    this.pageNo = 0;
    this.refresh();
  }
  onChange($event) {
    this.pageNo = 0;
    this.refresh();
  }
  updateFilter(event) {
    this.listFilter = event.target.value;
    let keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode === 13 || keycode === '13') {
      this.search();
    }
  }
  onSelect({ selected }) {
    
    if (this.deleteId == '' || this.deleteId == null || this.deleteId == 'undefined') {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
      this.deleteId = null;
      this.deleteId = '';
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].FacebookAdSetId.toString() + ',';
      }
    } else {
      this.deleteId = null;
      this.deleteId = '';
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].FacebookAdSetId.toString() + ',';
      }
    }
  }
  onDeleteMultipleAdSets() {
    
    if (this.deleteId) {
      const message = `Are you sure you want to delete all the selected ad set(s) ?`;
      this.dialogService.confirm('DELETE AD SET(S)', message).subscribe((confirmed) => {
        if (confirmed) {
          this.loadSave = true;
          this.fbMarketingService.deleteselectedAdset(this.deleteId).subscribe(
            (result) => {
              this.loadSave = false;
              this.toaster.success(result.responseMessage);
              this.deleteId = '';
              this.selected = [];
              this.refresh();
            },
            (error) => { },
            () => {
              this.loadSave = false;
            }
          );
        }
      });
    } else {
      this.toaster.error('Please select at least one row.');
    }
  }

}
