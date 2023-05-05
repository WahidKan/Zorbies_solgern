import { FbMarketingService } from './../fb-marketing.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { ManageUserService, User } from '../../manageuser/addedituser.service';
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import moment from 'moment';


@Component({
  selector: 'app-addedit-campaign',
  templateUrl: './addedit-campaign.component.html',
  styleUrls: ['./addedit-campaign.component.scss']
})
export class AddeditCampaignComponent implements OnInit {
  pageTitle: any = "Add Campaign";
  @ViewChild('incomeSelect', { static: false }) incomeSelect: NgSelectComponent;
  addCampaignForm: FormGroup;
  lstCategoryCode: string;
  categoryList: any = [];
  objectiveList: any = [];
  camgaignlist: any = [];
  SalesGroupList: any = [];
  loadSave = false;
  statusList: any = [];
  id: any = 0;
  pageNo = 0;
  pageSize = 10;
  listFilter: string = '';
  From: any;
  To: any;
  LoginName: any;
  LoginId: any;
  lstTerritory: any;

  item: FormControl;
  max = 2048;
  pagedData: any = {
    pager: {},
    data: [],
  };
  sortDir: any = 'desc';
  sortColumn: any = 'CreatedAt';

  addOrUpdatePermission: boolean;
  //modulePermission: ModuleList;
  modulePermission: any[] = [];
  isAdd: boolean = false;
  isUpdate: boolean = false;
  contentHeader: object;
  
  constructor(
    
    private fb: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private fbMarketingService: FbMarketingService,
   
    private router: Router) {
      // this.item = new FormControl(null, [Validators.pattern(/^[+-]?[0-9]+(,[0-9]+)?$/)])
    const moduleCode = this.route.snapshot.data.moduleCode;
    this.modulePermission = this.commonService.getPermissiondata(moduleCode);
    // console.log('modulePermission', this.modulePermission);
    let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOCATIONSADD');
    if (add == undefined) {
      add = "null";
    } else {
      this.isAdd = true;
    }
    let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'LOCATIONSUPDATE');
    if (update == undefined) {
      update = "null";
    } else {
      this.isUpdate = true;
    }


     }
  ngOnInit() {
    this.loadSave = true;
    let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    this.LoginName = userinfo['firstName'] + ' ' + userinfo['lastName'];
    this.LoginId = userinfo['id'].toLowerCase();
    this.createFormForCampaigns();
    this.getCategories();
    this.getObjective();
    this.getcampaigntype();
    this.getcampaignSaleGroup();
    this.getStatus();
    this.GetTerritoryType();
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id');
        if (this.id > 0) {
          this.getCampaignById(this.id);
          this.pageTitle = "Edit Campaign";
        }
      });
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
            name : 'Manage Campaigns',
            isLink : true,
            link : '/marketing/campaigns-list'
          },
          {
            name: this.pageTitle,
            isLink: false
          }
  
        ]
    };
  }
  getCampaignById(id) {
    this.fbMarketingService.GetCampaignById(id).subscribe(res => {
      ;
      if (res != null) {
        res = JSON.parse(res);
        this.createFormForCampaigns(res);
      }
    });
  }
  createFormForCampaigns(camp = null) {    
    if (this.addCampaignForm == null) {
      this.addCampaignForm = this.fb.group({
        Id: [null],
        account_id: [null],
        ad_strategy_group_id: [null],
        ad_strategy_id: [null],
        boosted_object_id: [null],
        budget_rebalance_flag: [null],
        budget_remaining: [null],
        buying_type: [null, Validators.required],
        can_create_brand_lift_study: [null],
        can_use_spend_cap: [null],
        created_time: [null],
        daily_budget:  [null, Validators.required],
        is_skadnetwork_attribution: [null],
        last_budget_toggling_time: [null],
        lifetime_budget: [null],
        name: [null, Validators.required],
        objective: [null, Validators.required],
        source_campaign_id: [null],
        spend_cap: [null],
        start_time: [null, Validators.required],
        stop_time: [null],
        topline_id: [null],
        updated_time: [null],
        pacing_type: [null],
        bid_strategy: [null],
        configured_status: [null],
        effective_status: [null],
        smart_promotion_type: [null],
        status: [null, Validators.required],
        special_ad_categories: [null, Validators.required],
        special_ad_category_country: [null],
        created_at: [null],
        created_by: [null],
        modified_at: [null],
        modified_by: [null],
        status_id: [null],
        campaign_owner: [this.LoginName],
        isActive: [null],
        end_time: [null, Validators.required],
         discount_amount: [null],
        discount_name: [null],
        sale_group_type: [null],
        service_territory: [null],
        external_id: [null],
        campaign_status_facebook: [null],
        impressions: [null, Validators.required],
        facebook_account_id: [null],
        spends: [null],
        description: [null],
        num_sent_in_campaign : [null],
        budgeted_cost_in_campaign : [null],
        expected_response : [null],
        actual_cost_in_campaign : [null],
        expected_revenue_in_campaign : [null],
        type : [null],
      });
    }
    if (camp != null) {
      this.addCampaignForm.patchValue({
        Id: camp.id,
        account_id: camp.account_id,
        ad_strategy_group_id: camp.ad_strategy_group_id,
        ad_strategy_id: camp.ad_strategy_id,
        boosted_object_id: camp.boosted_object_id,
        budget_rebalance_flag: camp.budget_rebalance_flag,
        budget_remaining: camp.budget_remaining,
        buying_type: camp.buying_type,
        can_create_brand_lift_study: camp.can_create_brand_lift_study,
        can_use_spend_cap: camp.can_use_spend_cap,
        created_time: camp.created_time,
        daily_budget: camp.daily_budget,
        is_skadnetwork_attribution: camp.is_skadnetwork_attribution,
        last_budget_toggling_time: camp.last_budget_toggling_time,
        lifetime_budget: camp.lifetime_budget,
        name: camp.name,
        objective: camp.objective,
        source_campaign_id: camp.source_campaign_id,
        spend_cap: camp.spend_cap,
        start_time: new Date(camp.start_time),
        end_time: new Date(camp.end_time),
        stop_time: camp.stop_time,
        topline_id: camp.topline_id,
        updated_time: camp.updated_time,
        pacing_type: camp.pacing_type,
        bid_strategy: camp.bid_strategy,
        configured_status: camp.configured_status,
        effective_status: camp.effective_status,
        smart_promotion_type: camp.smart_promotion_type,
        status: camp.status,
        special_ad_categories: (camp.special_ad_categories != null) ? camp.special_ad_categories.split(",") : '',
        special_ad_category_country: camp.special_ad_category_country,
        created_at: camp.created_at,
        created_by: camp.created_by,
        modified_at: camp.modified_at,
        modified_by: camp.modified_by,
        status_id: camp.status_id,
        campaign_owner: camp.campaign_owner,
        isActive: camp.isActive,
        discount_amount: camp.discount_amount,
        discount_name: camp.discount_name,
        sale_group_type: camp.sale_group_type,
        service_territory: camp.service_territory,
        external_id: camp.external_id,
        campaign_status_facebook: camp.campaign_status_facebook,
        impressions: camp.impressions,
        facebook_account_id: camp.facebook_account_id,
        spends: camp.spends,
        description: camp.description,
        num_sent_in_campaign: camp.num_sent_in_campaign,
        budgeted_cost_in_campaign: camp.budgeted_cost_in_campaign,
        expected_response: camp.expected_response,
        actual_cost_in_campaign: camp.actual_cost_in_campaign,
        expected_revenue_in_campaign: camp.expected_revenue_in_campaign,
        type: camp.type,
      });
    }

    // this.isAddForm = true;
    // this.addOperatingHoursModal.show();
    // this.isEdit = false;
  }
  get name() { return this.addCampaignForm.get('name'); }
  get special_ad_categories() { return this.addCampaignForm.get('special_ad_categories'); }
  get objective() { return this.addCampaignForm.get('objective'); }
  get buying_type() { return this.addCampaignForm.get('buying_type'); }
  get start_time() { return this.addCampaignForm.get('start_time'); }
  get end_time() { return this.addCampaignForm.get('end_time'); }
  get status() { return this.addCampaignForm.get('status'); }
  get campaign_owner() { return this.addCampaignForm.get('campaign_owner'); }
  get isActive() { return this.addCampaignForm.get('isActive'); }
  get discount_amount() { return this.addCampaignForm.get('discount_amount'); }
  get discount_name() { return this.addCampaignForm.get('discount_name'); }
  get sale_group_type() { return this.addCampaignForm.get('sale_group_type'); }
  get service_territory() { return this.addCampaignForm.get('service_territory'); }
  get external_id() { return this.addCampaignForm.get('external_id'); }
  get campaign_status_facebook() { return this.addCampaignForm.get('campaign_status_facebook'); }
  get daily_budget() { return this.addCampaignForm.get('daily_budget'); }
  get impressions() { return this.addCampaignForm.get('impressions'); }
  get facebook_account_id() { return this.addCampaignForm.get('facebook_account_id'); }
  get spends() { return this.addCampaignForm.get('spends'); }
  get description() { return this.addCampaignForm.get('description'); }
  get num_sent_in_campaign() { return this.addCampaignForm.get('num_sent_in_campaign'); }
  get budgeted_cost_in_campaign() { return this.addCampaignForm.get('budgeted_cost_in_campaign'); }
  get expected_response() { return this.addCampaignForm.get('expected_response'); }
  get actual_cost_in_campaign() { return this.addCampaignForm.get('actual_cost_in_campaign'); }
  get expected_revenue_in_campaign() { return this.addCampaignForm.get('expected_revenue_in_campaign'); }
  get type() { return this.addCampaignForm.get('type'); }
  getCategories() {
    ;
    this.commonService.GetMasterItemsNotAuth("fb_special_ad_categories").subscribe((result: any) => {
      ;
      this.categoryList = this.commonService.masters;
    })
  }

  // numberOnly(event): boolean {
  //   
  //   var index = event.target.value.indexOf('.');
  //   var len = event.target.value.length;
  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
  //     return false;
  //   }
  //   else  if (charCode == 46) {
  //     //Check if the text already contains the . character
  //     if (event.target.value.indexOf('.') === -1) {        
  //       return true;
  //     } else {
  //       return false;
  //     }
      
  //   } 
  //   return true;

  // }


  // numberOnly(event): boolean {
  //   
  //   var charCode = (event.which) ? event.which : event.keyCode;
  //   if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
  //     return false;
  //   else {
  //     var len = event.target.value.length;
  //     var index = event.target.value.indexOf('.');
  //     if (index > 0 && charCode == 46) {
  //       return false;
  //     }
  //     if (index > 0) {
  //       var CharAfterdot = (len + 1) - index;
  //       if (CharAfterdot > 3) {
  //         return false;
  //       }
  //     }
  
  //   }
  //   return true;
  // }

  
  numberOnly(event): boolean {
    
    var index = event.target.value.indexOf('.');
    var len = event.target.value.length;
      if (index > 0) {
        var CharAfterdot = (len) - index;
        if (CharAfterdot > 3) {
          return false;
        }  
    }
    return true;
  }

  changeTotimeValue(evt) {
    
    let dtstartdate = moment(new Date(this.addCampaignForm.value.start_time)).format('MM/DD/YYYY');
    let dtenddate = moment(new Date(this.addCampaignForm.value.end_time)).format('MM/DD/YYYY');
    if (dtenddate < dtstartdate) {
      this.addCampaignForm.get('end_time').setValue(null);
      this.toaster.error('You can not select the end date less than to start date.');
      return;
    }
  }






  validateNumber(event: any) {
    
    ;
    let input = String.fromCharCode(event.charCode);
    const reg = /^\d*(?:[.,]\d{1,2})?$/;

    if (!reg.test(input)) {
      event.preventDefault();
    }
}

 isNumberKey(txt, evt): boolean {
   ;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode == 46) {
    //Check if the text already contains the . character
    if (txt.value.indexOf('.') === -1) {
      return true;
    } else {
      return false;
    }
  } else {
    if (charCode > 31 &&
      (charCode < 48 || charCode > 57))
      return false;
  }
  return true;
}


  

  

  getObjective() {
    this.commonService.GetMasterItemsNotAuth("fb_objective").subscribe((result: any) => {
      ;
      this.objectiveList = this.commonService.masters;
    })
  }

  getcampaigntype() {
    this.commonService.GetMasterItemsNotAuth("fb_campaign_type").subscribe((result: any) => {
      ;
      this.camgaignlist = this.commonService.masters;
    })
  }

  getcampaignSaleGroup() {
    this.commonService.GetMasterItemsNotAuth("fb_campaign_sale_group_type").subscribe((result: any) => {
      ;
      this.SalesGroupList = this.commonService.masters;
    })
  }


  

  getStatus() {
    this.commonService.GetMasterItemsNotAuth("fb_status").subscribe((result: any) => {
      this.statusList = this.commonService.masters;
    })
    setTimeout(() => {
      this.loadSave = false;
    }, 500);
  };

  GetTerritoryType() {
    this.commonService.getMasterItemsList('ServiceTerritory').subscribe((result: any) => {
      this.lstTerritory = this.commonService.masters;
      
    })
  }

  saveForm() {
    ;
    if (this.addCampaignForm.valid) {
      this.loadSave = true;
      if(this.addCampaignForm.value.start_time)
      {
        let dtstartdate = new Date(this.addCampaignForm.value.start_time);
        const dstartDate = moment(dtstartdate).format('MM/DD/YYYY');
        this.addCampaignForm.value.start_time=dstartDate;
      }
      else{
        this.addCampaignForm.value.start_time=null;
      }
      

      if(this.addCampaignForm.value.end_time)
      {
      let dtenddate = new Date(this.addCampaignForm.value.end_time);
      const denddate = moment(dtenddate).format('MM/DD/YYYY');
      this.addCampaignForm.value.end_time=denddate;
      }
      else{
        this.addCampaignForm.value.end_time=null;
      }



      this.addCampaignForm.value.campaign_owner=this.LoginId;
      // // console.log(this.addCampaignForm.getRawValue());
      let data = this.addCampaignForm.value;
      ;
      if (data.Id == null) {
        this.fbMarketingService.saveCampaign(data).subscribe((result: any) => {
          this.loadSave = false;
          this.toaster.success(result.responseMessage);
          this.router.navigateByUrl("/marketing/campaigns-list");
          this.refresh();
        });
      }
      else {
        this.fbMarketingService.updateCampaign(data).subscribe((result: any) => { 
        this.toaster.success(result.responseMessage);
        this.router.navigateByUrl("/marketing/campaigns-list");
        this.refresh();
      });
      }
    }
    else {
      this.commonService.validateAllFormFields(this.addCampaignForm);
    }
  }

  refresh() {
    this.loadSave = true;
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
  close() {
    this.router.navigateByUrl("/marketing/campaigns-list");
  }

  // GetCategories() {
  //   this.lstCategoryCode = 'fb_special_ad_categories'
  //   this.commonService.GetMasterItemsNotAuth("IncomeFrequency").subscribe((result: any) => { 
  //     this.lstIncomeFrequency = this.commonService.masters;
  //     this.iFreqYear = this.lstIncomeFrequency.filter(x => x.text == "Annually");
  //     this.iFreqYearValue = this.iFreqYear[0].value;
  //     this.iFreqMonth = this.lstIncomeFrequency.filter(x => x.text == "Monthly");
  //     this.iFreqMonthValue = this.iFreqMonth[0].value;
  //   })
  // }
}
