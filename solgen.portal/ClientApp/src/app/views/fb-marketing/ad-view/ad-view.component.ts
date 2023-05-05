
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../shared/common.service';
import { FbMarketingService } from '../fb-marketing.service';

@Component({
  selector: 'app-ad-view',
  templateUrl: './ad-view.component.html',
  styleUrls: ['./ad-view.component.scss']
})
export class AdViewComponent implements OnInit {

  loadSave : boolean = false;
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
  constructor(private commonService: CommonService,
    private fbMarketingService : FbMarketingService,private router: Router,private route: ActivatedRoute
    ) 
  {
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(9008);
    ;
    let add = this.modulePermission.find(m => m.privilegecode.toLowerCase() == 'facebookadadd'); //MANAGELOCATIONADD
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toLowerCase() == 'facebookadupdate'); //MANAGELOCATIONUPDATE

    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }

    let deletedata = this.modulePermission.find(m => m.privilegecode.toLowerCase() == 'facebookaddelete'); //MANAGELOCATIONDELETE
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
    this.GetAdDetails();    
    this.initBreadCrumb();
  }
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Ad Details',
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
            name : 'Manage Ads',
            isLink : true,
            link : '/marketing/ads-list'
          },
          {
            name: 'Ad Details',
            isLink: false
          }

        ]
    };
  }
  GetAdDetails(){
    ;
    this.loadSave = true;
    this.fbMarketingService.GetAdDetails(this.id).subscribe((response : any)=>{
      ;
      if(response){
        if(response.AdSets){
          response.AdSets = JSON.parse(response.AdSets);
        }
        this.viewData = response;
        this.loadSave = false;
      }
      this.loadSave = false;
      // console.log(response);
    });
  }

  


}
