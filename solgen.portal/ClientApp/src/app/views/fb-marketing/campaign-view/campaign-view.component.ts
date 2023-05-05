import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeadlistService } from '../../lead/leadlist.service';
import { OpportunityListService } from '../../opportunity/opportunitylist.service';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { NewnoteslistComponent } from '../../shared/new-notes/newnoteslist.component';
import { FbMarketingService } from '../fb-marketing.service';


@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.scss']
})
export class CampaignViewComponent implements OnInit {
  @ViewChild('listnotesmodel', { static: false }) addNewNotesPopupModel: NewnoteslistComponent;
  loadSave : boolean = false;
  id  : any = 2;
  facebookId  : any;
  viewData : any;
  adSetData : any;
  DataAvailable = 'no';
  submoduleName : string= "facebookcampaign";
  accountId : any;
  lstOpportunity: any = {
    pager: {},
    data: []
  }
  OpportunityPageNo: number = 1;
  sortDirOppr = 'desc';
  sortColumnOppr: any = 'id';
  OpportunityCount : number = 0;
  pageSize: number = 4;
  lstlead: any = {
    pager: {},
    data: []
  }
  LeadPageNo: number = 1;
  sortDirlead = 'desc';
  sortColumnlead: any = 'LeadID';
  LeadCount : number = 0;
  leadPageSize: number = 4;
  lstadset: any = {
    pager: {},
    data: []
  }
  AdsetPageNo: number = 1;
  sortDiradSet = 'desc';
  sortColumnadSet: any = 'id';
  AdsetCount : number = 0;
  adSetPageSize: number = 4;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;  
  contentHeader: object;

  constructor(private fbMarketingService : FbMarketingService,private router: Router,private route: ActivatedRoute,
    private commonService : CommonService, private dialogService: ConfirmationDialogService,
    private opportunitylistService: OpportunityListService, private toaster: ToastrService
    ,private activeRoute: ActivatedRoute
    ,private leadservice: LeadlistService,) {
      const moduleCode = this.activeRoute.snapshot.data.moduleCode;
      this.modulePermission = this.commonService.getPermissiondata(9056);   
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
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.id = id;
      })
    this.loadSave = true;
    this.getCompaignDetails();
    this.GetAdSetList();
  
    this.initBreadCrumb();
  }
  
initBreadCrumb() {
  this.contentHeader = {
    headerTitle: 'Campaign Details',
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
          name : 'Manage Campaigns',
          isLink : true,
          link : '/marketing/campaigns-list'
        },
        {
          name: 'Campaign Details',
          isLink: false
        }

      ]
  };
}




  getCompaignDetails(){

    this.loadSave = true;
    this.fbMarketingService.GetCampaignDetailsById(this.id).subscribe((response : any)=>{
      if(response){
        if(response.AdSets){
          response.AdSets = JSON.parse(response.AdSets);
        }
        this.facebookId = response.facebookCampaignId;
        this.viewData = response;
        this.loadSave = false;
        this.GetOpportunityList();
        this.GetLeadList();
        
      }
     
      this.loadSave = false;
    });
  }


  DeleteOpp(row: any) {
    const message = `Are you sure you want to delete Opportunity  "${row.OpportunityName}"?`;
    this.dialogService.confirm('Delete Opportunity', message).subscribe(confirmed => {
      if (confirmed) {
        this.opportunitylistService.DeleteRecords(row.Id, 'tblOpportunity').subscribe(r => {
          this.toaster.success(`Opportunity "${row.OpportunityName}" has been deleted successfully`);
          this.GetOpportunityList();
        }, error => {
        });
      }
    });
  }

  DeleteLead(row: any) {
    const message = `Are you sure you want to delete Lead  "${row.LeadName}"?`;
    this.dialogService.confirm('Delete Lead', message).subscribe(confirmed => {
      if (confirmed) {
        this.leadservice.DeleteRecords(row.LeadID, 'tblLeads').subscribe(r => {
          this.toaster.success(`Lead "${row.LeadName}" has been deleted successfully`);
          this.GetLeadList();
        }, error => {
        });
      }
    });
  }


  getCompaignAdSetDetails(){
    ;
    this.loadSave = true;
    this.fbMarketingService.GetFacebookCampaignAdSetDetails(this.id).subscribe((response : any)=>{
      if(response){
        response.forEach(element => {
          if(element.Ads){
            element.Ads = JSON.parse(element.Ads);
          }
        });
        this.adSetData = response;
        this.loadSave = false;
        if(response.length>0)
        {
          this.DataAvailable = "yes";
        }
        else
        {
          this.DataAvailable = "no";
        }
        
      }
      else
      {
        this.DataAvailable = "no";
      }


      this.loadSave = false;
    });
    
  }
  onAdSetTabLoad(){
    this.getCompaignAdSetDetails();
  }
  GetOpportunityList() {
    this.loadSave = true;
    this.fbMarketingService.GetOpportunityList(this.id, this.sortColumnOppr, this.sortDirOppr, this.OpportunityPageNo, this.pageSize).subscribe(result => {
      if (result) {
        this.lstOpportunity = result;
        this.OpportunityCount = result.pager.totalItems;
        this.loadSave = false;
      }
    },
      err => { this.loadSave = false },
      () => { this.loadSave = false });
  }

  setOpportunityPageNo($event) {
    this.OpportunityPageNo = $event.page;
    this.GetOpportunityList();
  }
  onOpportunitySort($event) {
    const sort = $event.sorts[0]
    this.sortDirOppr = sort.dir;
    this.sortColumnOppr = $event.column.prop;
    this.GetOpportunityList();
  }
  GetLeadList() {
    this.loadSave = true;
    this.fbMarketingService.GetLeadsList(this.facebookId, this.sortColumnlead, this.sortDirlead, this.LeadPageNo, this.leadPageSize).subscribe(result => {
      if (result) {
        this.lstlead = result;
        this.LeadCount = result.pager.totalItems;
        this.loadSave = false;
      }
    },
      err => { this.loadSave = false },
      () => { this.loadSave = false });
  }

  setLeadPageNo($event) {
    this.LeadPageNo = $event.page;
    this.GetLeadList();
  }
  onLeadSort($event) {
    const sort = $event.sorts[0]
    this.sortDirlead = sort.dir;
    this.sortColumnlead = $event.column.prop;
    this.GetLeadList();
  }
  GetAdSetList() {
    this.loadSave = true;
    this.fbMarketingService.GetAdsetListByCampaignId(this.id, this.sortColumnadSet, this.sortDiradSet, this.AdsetPageNo, this.adSetPageSize).subscribe(result => {    
      if (result) {
        this.lstadset = result;
        this.AdsetCount = result.pager.totalItems;
        this.loadSave = false;
      }
    },
      err => { this.loadSave = false },
      () => { this.loadSave = false });
  }

  setAdSetPageNo($event) {
    this.AdsetPageNo = $event.page;
    this.GetAdSetList();
  }
  setAdSetListPageNo($event) {
    this.AdsetPageNo = $event.page;
    this.GetAdSetList();
  }
  onAdSetSort($event) {
    const sort = $event.sorts[0]
    this.sortDiradSet = sort.dir;
    this.sortColumnadSet = $event.column.prop;
    this.GetAdSetList();
  }
}
