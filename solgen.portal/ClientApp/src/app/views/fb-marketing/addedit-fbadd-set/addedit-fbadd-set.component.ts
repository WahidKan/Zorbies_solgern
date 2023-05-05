import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DateTimeToLocalPipeForAppointment } from '../../../pipes/datetime.pipe';
import { CommonService } from '../../shared/common.service';
import { FbMarketingService } from '../fb-marketing.service';
import moment from 'moment';
import { load } from '@syncfusion/ej2-angular-charts';
@Component({
  selector: 'app-addedit-fbadd-set',
  templateUrl: './addedit-fbadd-set.component.html',
  styleUrls: ['./addedit-fbadd-set.component.scss']
})
export class AddeditFbaddSetComponent implements OnInit {
  pageTitle: any = "Add Ad Set";
  loadSave = false;
  lstUserType: any;
  targetingList: any;
  minimumDate;
  defaultminDate: Date;
  Edit_time: any;
  id: any = 0;
  statusList: any;
  bilingListMaster: any;
  bilingListChild: any = [];
  optimizationGoalListMaster: any;
  optimizationGoalListChild: any;
  addFbAdSetForm: FormGroup;
  campaignsList: any = [];
  contentHeader: object;

  todayDate = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private fbMarketingService: FbMarketingService,
    private toastrSerivce: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private dateTimeToLocalForApp: DateTimeToLocalPipeForAppointment
  ) {
    this.commonService.getMasterItemsList("manageuser_usertype").subscribe((result: any) => {
      this.lstUserType = this.commonService.masters;
      // // console.log("userType", this.lstUserType);  
      this.minimumDate = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));

    })
  }

  ngOnInit() {
    ;
    this.loadSave = true;
    this.initForm();
    this.getFacebookCampaignsDDL();
    this.gettargetin();
    this.getbillingEvent();
    this.getoptimizationGoal();
    this.getStatus();
    this.route.paramMap.subscribe(
      params => {
        
        this.id = params.get('id');
        if (this.id > 0) {
          this.GetAdSetById(this.id);
          this.pageTitle = "Edit Ad Set";
        }
      });
      this.initBreadCrumb();
    this.defaultminDate = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.minimumDate = this.defaultminDate;

  }
  initBreadCrumb() {
    this.contentHeader = {
      headerTitle:'Manage Ad Sets',
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
            link : '/marketing/adsSet-list'
          },
          {
            name: this.pageTitle,
            isLink: false
          }

        ]
    };
  }
  GetAdSetById(id) {
    
    this.fbMarketingService.GetAdSetById(id).subscribe(res => {
      if (res != null) {
        res = JSON.parse(res);
        this.initForm(res);
      }
    });
  }
  getFacebookCampaignsDDL() {
    this.fbMarketingService.GetFacebookCampaignsDDL().subscribe((result: any) => {
      
      if (result != null) {
        result = JSON.parse(result);
        this.campaignsList = result.data;
        //  this.handleCampaignChange({value:this.campaign_id});
        this.handleCampaignChange({ id: this.campaign_id.value });
      } else {
        this.campaignsList = [];
      }
    })
  };
  gettargetin() {
    this.commonService.GetMasterItemsNotAuth("fb_special_ad_categories").subscribe((result: any) => {
      ;
      this.targetingList = this.commonService.masters;
    })
  }
  initForm(ad = null) {
    
    if (this.addFbAdSetForm == null) {
      this.addFbAdSetForm = this.fb.group({
        adSetId: [null],
        id: [null],
        account_id: [null],
        name: [null, Validators.required],
        lifetime_budget: [''],
        start_time: [null, Validators.required],
        end_time: [null],
        campaign_id: [null, Validators.required],
        bid_amount: [null, [Validators.required,this.ValidateBidAmount]],
        billing_event: [null, Validators.required],
        optimization_goal: [null, Validators.required],
        targeting: [null],
        status: [null, Validators.required],
        daily_budget: [null,[ Validators.required,this.ValidateDailyBudget]],
         adset_id: [null],
         spent_amount:[null],
         cost_per_result:[null],
         frequency:[null],
         impressions:[null],
         reach:[null],
         unique_link_clicks:[null],
         external_id:[null],
         adset_objective:[null],
         costper_unique_clicks:[null],
         updated_time:[null],
         cost_per_mile: [],
         cost_per_pixel: [null],
         click_through_rate: [null],
         social_spend: [null],
         video_view: [null],
         ad_objective: [null],
         effective_status:[null],
         editTime: [null],
         effective_status_num: [null],
        // optimization_sub_event: [''],
        // pacing_type: [''],
        // recurring_budget_semantics: [null],
        // use_new_app_click: [null],
        // source_adset_id: [''],

        // adlabels: [''],
        // adset_schedule: [''],
        // asset_feed_id: [''],
        bid_strategy: [''],
        // budget_remaining: [''],
        // campaignId: [null],
        // creative_sequence: [''],
        // daily_min_spend_target: [''],
        // daily_spend_cap: [''],
        // frequency_control_specs: [''],
        // instagram_actor_id: [''],
        // issues_info: [''],
        // lifetime_min_spend_target: [''],
        // lifetime_spend_cap: [''],
        // recommendations: [''],
        // review_feedback: [''],
        // targeting_optimization_types: [''],
        // time_based_ad_rotation_id_blocks: [''],
        // time_based_ad_rotation_intervals: [''],
      });
    }
    if (ad != null) {
      ;
      this.addFbAdSetForm.patchValue({
        id: ad.id,
        adSetId: ad.adSetId,
        account_id: ad.account_id,
        name: ad.name,
        lifetime_budget: ad.lifetime_budget,
        start_time: (ad.start_time != null) ? new Date(ad.start_time) : null, //new Date(ad.start_time),
        end_time: (ad.end_time != null) ? new Date(ad.end_time) : null,//new Date(ad.end_time),
        campaign_id: ad.campaign_id,
        bid_amount: ad.bid_amount,
        billing_event: ad.billing_event,
        optimization_goal: ad.optimization_goal,
        targeting: null,
        status: ad.status,
        daily_budget: ad.daily_budget,
        adset_id: ad.adset_id,
        spent_amount: ad.spent_amount,
        cost_per_result: ad.cost_per_result,
        frequency: ad.frequency,
        impressions: ad.impressions,
        reach: ad.reach,
        unique_link_clicks: ad.unique_link_clicks,
        external_id: ad.external_id,
        adset_objective: ad.adset_objective,
        costper_unique_clicks: ad.costper_unique_clicks,
        updated_time: (ad.updated_time != null) ? new Date(ad.updated_time) : null,
        editTime: (ad.updated_time != null) ? new Date(ad.updated_time) : null,
        cost_per_mile: ad.cost_per_mile,
        cost_per_pixel: ad.cost_per_pixel,
        bid_strategy: ad.bid_strategy,
        click_through_rate: ad.click_through_rate,
        social_spend: ad.social_spend,
        video_view: ad.video_view,
        ad_objective: ad.ad_objective,
        effective_status: ad.effective_status,
        effective_status_num: ad.effective_status,

        // daily_min_spend_target:ad.daily_min_spend_target,
        // daily_spend_cap:ad.daily_spend_cap,
        // destination_type:ad.destination_type,

        // frequency_control_specs:ad.frequency_control_specs,
        // instagram_actor_id:ad.instagram_actor_id,
        // is_dynamic_creative:ad.is_dynamic_creative,
        // issues_info:ad.issues_info,
        // lifetime_imps:ad.lifetime_imps,
        // lifetime_min_spend_target:ad.lifetime_min_spend_target,
        // lifetime_spend_cap:ad.lifetime_spend_cap,
        // multi_optimization_goal_weight:ad.multi_optimization_goal_weight,
        // optimization_sub_event:ad.optimization_sub_event,
        // pacing_type:ad.pacing_type,
        // recommendations:ad.recommendations,
        // recurring_budget_semantics:ad.recurring_budget_semantics,
        // review_feedback:ad.review_feedback,
        // source_adset_id:ad.source_adset_id,
        // targeting_optimization_types:ad.targeting_optimization_types,
        // time_based_ad_rotation_id_blocks:ad.time_based_ad_rotation_id_blocks,
        // time_based_ad_rotation_intervals:ad.time_based_ad_rotation_intervals,
        // updated_time:ad.updated_time,
        // created_time:ad.created_time,
        // use_new_app_click:ad.use_new_app_click
      });
      this.handleCampaignChange({ id: ad.campaign_id });
      this.loadBillingEvent({ value: ad.optimization_goal });

    }
  }



  // get adlabels() { return this.addFbAdSetForm.get('adlabels'); }
  // get adset_schedule() { return this.addFbAdSetForm.get('adset_schedule'); }
  // get asset_feed_id() { return this.addFbAdSetForm.get('asset_feed_id'); }
  // get attribution_spec() { return this.addFbAdSetForm.get('attribution_spec'); }
  get bid_amount() { return this.addFbAdSetForm.get('bid_amount'); }
  get bid_strategy() { return this.addFbAdSetForm.get('bid_strategy'); }
  get billing_event() { return this.addFbAdSetForm.get('billing_event'); }
  // get budget_remaining() { return this.addFbAdSetForm.get('budget_remaining'); }
  // get campaignId() { return this.addFbAdSetForm.get('campaignId'); }
  get campaign_id() { return this.addFbAdSetForm.get('campaign_id'); }
  // get configured_status() { return this.addFbAdSetForm.get('configured_status'); }
  // get creative_sequence() { return this.addFbAdSetForm.get('creative_sequence'); }
  get daily_budget() { return this.addFbAdSetForm.get('daily_budget'); }


  get cost_per_mile() { return this.addFbAdSetForm.get('cost_per_mile'); }
  get cost_per_pixel() { return this.addFbAdSetForm.get('cost_per_pixel'); }
  get click_through_rate() { return this.addFbAdSetForm.get('click_through_rate'); }
  get social_spend() { return this.addFbAdSetForm.get('social_spend'); }
  get effective_status_num() { return this.addFbAdSetForm.get('effective_status_num'); }
  get video_view() { return this.addFbAdSetForm.get('video_view'); }
  get ad_objective() { return this.addFbAdSetForm.get('ad_objective'); }



  // get daily_min_spend_target() { return this.addFbAdSetForm.get('daily_min_spend_target'); }
  // get daily_spend_cap() { return this.addFbAdSetForm.get('daily_spend_cap'); }
  // get destination_type() { return this.addFbAdSetForm.get('destination_type'); }
  // get effective_status() { return this.addFbAdSetForm.get('effective_status'); }
  // get frequency_control_specs() { return this.addFbAdSetForm.get('frequency_control_specs'); }
  // get instagram_actor_id() { return this.addFbAdSetForm.get('instagram_actor_id'); }
  // get is_dynamic_creative() { return this.addFbAdSetForm.get('is_dynamic_creative'); }
  // get issues_info() { return this.addFbAdSetForm.get('issues_info'); }
  // get lifetime_budget() { return this.addFbAdSetForm.get('lifetime_budget'); }
  // get lifetime_imps() { return this.addFbAdSetForm.get('lifetime_imps'); }
  // get lifetime_min_spend_target() { return this.addFbAdSetForm.get('lifetime_min_spend_target'); }
  // get lifetime_spend_cap() { return this.addFbAdSetForm.get('lifetime_spend_cap'); }
  // get multi_optimization_goal_weight() { return this.addFbAdSetForm.get('multi_optimization_goal_weight'); }

  get name() { return this.addFbAdSetForm.get('name'); }
  get optimization_goal() { return this.addFbAdSetForm.get('optimization_goal'); }
  // get optimization_sub_event() { return this.addFbAdSetForm.get('optimization_sub_event'); }
  // get pacing_type() { return this.addFbAdSetForm.get('pacing_type'); }
  // get recommendations() { return this.addFbAdSetForm.get('recommendations'); }

  // get recurring_budget_semantics() { return this.addFbAdSetForm.get('recurring_budget_semantics'); }
  // get review_feedback() { return this.addFbAdSetForm.get('review_feedback'); }
  // get source_adset_id() { return this.addFbAdSetForm.get('source_adset_id'); }
  get start_time() { return this.addFbAdSetForm.get('start_time'); }
  get status() { return this.addFbAdSetForm.get('status'); }

  // get targeting_optimization_types() { return this.addFbAdSetForm.get('targeting_optimization_types'); }
  // get time_based_ad_rotation_id_blocks() { return this.addFbAdSetForm.get('time_based_ad_rotation_id_blocks'); }
  // get time_based_ad_rotation_intervals() { return this.addFbAdSetForm.get('time_based_ad_rotation_intervals'); }
  // get updated_time() { return this.addFbAdSetForm.get('updated_time'); }
  // get created_time() { return this.addFbAdSetForm.get('created_time'); }
  // get use_new_app_click() { return this.addFbAdSetForm.get('use_new_app_click'); }

ValidateDailyBudget(control: AbstractControl): {[key: string]: any} | null  {
  ;
  if (control.value && control.value<19000 ) {
    return { 'dailyBudgetInvalid': true };
  }
  return null;
}
ValidateBidAmount(control: AbstractControl): {[key: string]: any} | null  {
  ;
  if (control.value && control.value>100 ) {
    return { 'bidAmountInvalid': true };
  }
  return null;
}
  addeditFbAdSet() {
    
    if (this.addFbAdSetForm.valid) {
      this.loadSave = true;

      if (this.addFbAdSetForm.value.start_time) {
        let dtstartdate = new Date(this.addFbAdSetForm.value.start_time);
        const dstartDate = moment(dtstartdate).format('MM/DD/YYYY');
        this.addFbAdSetForm.value.start_time = dstartDate;
      }
      else {
        this.addFbAdSetForm.value.start_time = null;
      }


      if (this.addFbAdSetForm.value.end_time) {
        let dtenddate = new Date(this.addFbAdSetForm.value.end_time);
        const dendDate = moment(dtenddate).format('MM/DD/YYYY');
        this.addFbAdSetForm.value.end_time = dendDate;
      }
      else {
        this.addFbAdSetForm.value.end_time = null;
      }

      if (this.addFbAdSetForm.value.updated_time) {

        let editTim = moment(this.addFbAdSetForm.value.editTime).format('HH:mm')
        let dtupdateTime = new Date(this.addFbAdSetForm.value.updated_time);
        const dUpdate = moment(dtupdateTime).format('MM/DD/YYYY') + ' ' + editTim;
        this.addFbAdSetForm.value.updated_time = dUpdate;
      }
      else {
        this.addFbAdSetForm.value.updated_time = null;
      }

      let formData = this.addFbAdSetForm.value;
      // console.log(formData);
      
      if (formData.id == null) {
        this.fbMarketingService.saveFbAdSet(formData).subscribe(response => {
          
          if (response.statusCode == 200) {
            this.loadSave = false;
            this.toastrSerivce.success(response.responseMessage);
            this.router.navigateByUrl("/marketing/adsSet-list");
          }
          else {
            this.toastrSerivce.error(response.responseMessage);
            this.loadSave = false;
          }
        });
      }
      else {
        ;
        this.fbMarketingService.updateFbAdSet(formData).subscribe(response => {
          ;
          if (response.statusCode == 200) {
            this.loadSave = false;
            this.toastrSerivce.success(response.responseMessage);
            this.router.navigateByUrl("/marketing/adsSet-list");
          }
          else {
            this.toastrSerivce.error(response.responseMessage);
            this.loadSave = false;
          }
        });
      }
    }
    else {
      this.commonService.validateAllFormFields(this.addFbAdSetForm);
    }
  }
  Cancel() {
    this.router.navigateByUrl("/marketing/adsSet-list");

  }

  onTodayClick(e: any) {
    this.defaultminDate = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.addFbAdSetForm.get('start_time').setValue(this.defaultminDate);
  }
  OnChanged(e: any) {

    // e = e.getDate() + ' ' + e.getFullYear();
    // let ab: Date = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    // var as = ab.getDate() + ' ' + ab.getFullYear();
    // this.minToTime = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
  }
  selectTodayCss(elem, date1, date2) {
    if (date1.day == date2.getDate()
      && date1.month == date2.getMonth()
      && date1.year == date2.getFullYear()) {
      elem.parentElement.parentElement.classList.add('ui-datepicker-today');
    } else {
      elem.parentElement.parentElement.classList.remove('ui-datepicker-today');
    }
  }

  getStatus() {
    this.commonService.GetMasterItemsNotAuth("fb_status").subscribe((result: any) => {
      this.statusList = this.commonService.masters;
      setTimeout(() => {
        this.loadSave =  false;
      }, 500);
    })
  };
  getbillingEvent() {
    this.commonService.GetMasterItemsNotAuth("fb_billing_event").subscribe((result: any) => {
      this.bilingListMaster = this.commonService.masters;
      this.loadBillingEvent({ value: this.optimization_goal })
    })
  };
  getoptimizationGoal() {
    this.commonService.GetMasterItemsNotAuth("fb_optimization_goal").subscribe((result: any) => {
      this.optimizationGoalListMaster = this.commonService.masters;
    })
  };
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
    // 
    // const charCode = (event.which) ? event.which : event.keyCode;
    // if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    //   return false;
    // }
    // return true;

  }

  numberOnlyWithoutDecimal(event): boolean {
    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;


  }



  loadBillingEvent(event) {
    ;
    // console.log(event);
    this.bilingListChild = this.bilingListMaster.filter(x => x.text.toLowerCase() == "impressions" || x.value == event.value);
    setTimeout(() => {
      this.loadSave = false;
    }, 500);
  }
  changeTotimeValue(evt) {
    
    let dtstartdate = moment(new Date(this.addFbAdSetForm.value.start_time)).format('MM/DD/YYYY');
    let dtenddate = moment(new Date(this.addFbAdSetForm.value.end_time)).format('MM/DD/YYYY');
    if (dtenddate < dtstartdate) {
      this.addFbAdSetForm.get('end_time').setValue(null);
      this.toastrSerivce.error('You can not select the end date less than to start date.');
      return;
    }
  }
  handleCampaignChange(event) {
    
    if (event != null) {

      if (event.objective != '' && event.objective != null) {

        this.optimizationGoalListChild = this.optimizationGoalListMaster.filter(x => x.value == event.objective);

      } else if (event.id != null) {
        let obj = this.campaignsList.find(x => x.id == event.id);
        this.optimizationGoalListChild = this.optimizationGoalListMaster.filter(x => x.value == obj.objective);
        // this.loadBillingEvent({ value: obj.objective });
      }

    }
    else {
      this.optimizationGoalListChild = [];
    }
  }
  changeToValue(e) {
    ;
    // console.log(e);
    this.addFbAdSetForm.value.editTime = e;
  }

}
