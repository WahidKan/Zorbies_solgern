import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SearchfilteraddComponent } from '../../shared/searchfilter/searchfilteradd.component';
import { ManageviewComponent } from '../../shared/manageview/manageview.component';
import { ModuleList, CommonService, validationModel } from '../../shared/common.service';
import { ContractService } from '../../contract/contract.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectionType, DatatableComponent, id } from '@swimlane/ngx-datatable';
import { CopyLinkModalComponent } from '../../shared/copy-link-modal/copy-link-modal.component';
import { ProposallistService } from '../../proposal/proposallist.service';
import { FbMarketingService } from '../fb-marketing.service';


@Component({
  selector: 'app-campaign-listing',
  templateUrl: './campaign-listing.component.html',
  styleUrls: ['./campaign-listing.component.scss']
})
export class CampaignListingComponent implements OnInit {

  moduleName = 'facebook';
  SelectionType = SelectionType;
  submoduleName = 'facebookcampaign';
  @ViewChild('addEditModal', { static: false })
  pageNo = 0;
  pageSize = 15;
  listFilter: string = '';
  selected = [];
  actionarray: any[] = [];
  From: any;
  To: any;
  loadSave: boolean = false;
  isEdit: boolean = false;
  pagedData: any = {
    pager: {},
    data: [],
  };
  offset: number;
  lstPageSize: any;
  loading: boolean;
  sortDir: any = 'desc';
  sortColumn: any = 'CreatedAt';
  deleteId: string;
  isAddForm = false;

  addOrUpdatePermission: boolean;
  //modulePermission: ModuleList;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  contentHeader: object;


  constructor(
    private fbMarketingService: FbMarketingService,
    private router: Router,
    private commonService: CommonService,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService,
    private activeRoute: ActivatedRoute
  ) {

    const moduleCode = this.activeRoute.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(9056);
    ;
    let add = this.modulePermission.find(m => m.privilegecode.toLowerCase() == 'facebookcampaignadd'); //MANAGELOCATIONADD
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toLowerCase() == 'facebookcampaignupdate'); //MANAGELOCATIONUPDATE

    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toLowerCase() == 'facebookcampaigndelete'); //MANAGELOCATIONDELETE
    if (deletedata == undefined) {
      deletedata = "null";
    } else {
      this.isDelete = true;
    }


  }

  ngOnInit() {
    this.actionarray = [
      { "name": "Edit", "click": "goToPage(row)", "route": "/department/editdepartment/", "title": "Edit", "iclass": "feather-edit-2 text-success", "condition": "this.isUpdate" },
      { "name": "Delete", "click": "goToPage(row)", "title": "Delete", "iclass": "feather-trash-2 text-danger", "condition": "this.isDelete" }
    ]
    this.refresh();
    this.getPageSizes();
    this.getCompaignDetails();
    this.initBreadCrumb();
  }
  
initBreadCrumb() {
  this.contentHeader = {
    headerTitle: 'Manage Campaigns',
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
          name: 'Manage Campaigns',
          isLink: false
        }

      ]
  };
}

  AddNew() {
    this.router.navigateByUrl("/marketing/addcampaign");
  }

  getCompaignDetails() {
    this.fbMarketingService.GetCampaignDetailsById(2).subscribe((response: any) => {
      if (response) {
        if (response.AdSets) {
          response.AdSets = JSON.parse(response.AdSets);
        }
      }
      // console.log(response);
    });
  }
  refresh() {
    this.loadSave = true;

    if ((this.From == null && this.To == null) || (this.From && this.To)) {
      this.fbMarketingService.GetCampaignList(this.listFilter, this.From, this.To, this.sortColumn, this.sortDir, this.pageNo, this.pageSize).subscribe(result => {
        ;
        // console.log(result);
        if (result) {
          this.pagedData = result;
          this.loadSave = false;
        }
      }, error => {
        this.loadSave = false;
      });
      
    }
    else{
      this.loadSave = false;
      this.toaster.error('Both Start Date and End Date are required to search.');
    }

  }

  setPageNo($event) {
    ;
    this.pageNo = $event.page;
    this.refresh();
  }

  DeleteCampaign(row: any) {
    const message = `Are you sure you want to delete the campaign  "${row.Name}"?`;
    this.dialogService.confirm('Delete Campaign', message).subscribe(confirmed => {
      if (confirmed) {
        ;
        this.loadSave = true;
        this.fbMarketingService.deleteCampaign(row.FacebookCampaignId).subscribe((result: any) => {
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
    })

    // const message = `Are you sure you want to delete Announcement "${row.TITLE}"?`;


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
    ;
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
        this.deleteId += selected[i].FacebookCampaignId.toString() + ',';
      }
    } else {
      this.deleteId = null;
      this.deleteId = '';
      for (let i = 0; i < selected.length; i++) {
        this.deleteId += selected[i].FacebookCampaignId.toString() + ',';
      }
    }
  }
  onDeleteMultipleCamp() {
    
    if (this.deleteId) {
      const message = `Are you sure you want to delete all the selected campaign(s)?`;
      this.dialogService.confirm('DELETE CAMPAIGN(S)', message).subscribe((confirmed) => {
        if (confirmed) {
          this.loadSave = true;
          this.fbMarketingService.deleteselectedCampaign(this.deleteId).subscribe(
            (result) => {
              ;
              this.loadSave = false;
              this.toaster.success(result.responseMessage);
              this.deleteId = '';
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
