import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { FbMarketingService } from '../fb-marketing.service';

@Component({
  selector: 'app-ad-set-view',
  templateUrl: './ad-set-view.component.html',
  styleUrls: ['./ad-set-view.component.scss']
})
export class AdSetViewComponent implements OnInit {
  loadSave= false;
  id  : any = 2;
  viewData : any;
  submoduleName : string= "facebookAdSet";
  accountId : any;
  lstadList: any = {
    pager: {},
    data: []
  }
  AdPageNo: number = 1;
  sortDirad = 'desc';
  sortColumnad: any = 'fbAdId';
  AdCount : number = 0;
  adPageSize: number = 4;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  contentHeader: object;
  constructor(private fbMarketingService : FbMarketingService,private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService
    ,private activeRoute: ActivatedRoute,
    
    public commonService: CommonService
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
    this.loadSave = true
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.id = id;
      })
    this.GetAdSetDetails();
    this.GetAdsList();
    this.initBreadCrumb();
  }
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Ad Set Details',
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
            name : 'Manage Ad Sets',
            isLink : true,
            link : '/marketing/ads-list'
          },
          {
            name: 'Ad Set Details',
            isLink: false
          }

        ]
    };
  }
  GetAdSetDetails(){
    ;
    this.loadSave = true;
    this.fbMarketingService.GetAdSetDetailsById(this.id).subscribe((response : any)=>{
      if(response){
        ;
        if(response.AdSets){
          response.AdSets = JSON.parse(response.AdSets);
        }
        this.viewData = response;
        setTimeout(() => {
          this.loadSave = false;
        }, 1000);
      }
      setTimeout(() => {
        this.loadSave = false;
      }, 1000);
      // console.log(response);
    });
  }

  GetAdsList() {
    
    this.loadSave = true;
    this.fbMarketingService.GetAdsList(this.id, this.sortColumnad, this.sortDirad, this.AdPageNo, this.adPageSize).subscribe(result => {
      if (result) {
        this.lstadList = result;
        this.AdCount = result.pager.totalItems;
         setTimeout(() => {
          this.loadSave = false;
        }, 1000);
      }
    },
      err => {  setTimeout(() => {
        this.loadSave = false;
      }, 1000); },
      () => {  setTimeout(() => {
        this.loadSave = false;
      }, 1000); });
  }

  setAdPageNo($event) {
    this.AdPageNo = $event.page;
    this.GetAdsList();
  }
  onAdSort($event) {
    const sort = $event.sorts[0]
    this.sortDirad = sort.dir;
    this.sortColumnad = $event.column.prop;
    this.GetAdsList();
  }
  DeleterelatedAds(row:any){
    
    const message = 'Are you sure you want to delete the ad "'+row.AdName+'" ?';
    this.dialogService.confirm('DELETE AD', message).subscribe(confirmed => {
      if (confirmed) {

    this.loadSave = true;
    this.fbMarketingService.deleteAds(row.fbAdId).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.toaster.success(result.responseMessage);
        this.GetAdsList();
      }
      else {
        this.toaster.error(result.responseMessage);
        this.GetAdsList();
      }
    },
      error => {
        // console.log(error);
      }
    );
    }});
  }
}
