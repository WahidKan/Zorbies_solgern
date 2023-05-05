import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CommonService } from '../../shared/common.service';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';
import { FbMarketingService } from '../fb-marketing.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendar } from '@fullcalendar/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import moment from 'moment';
import { DateTimeToLocalPipe, DateTimeToLocalPipeForAppointment } from '../../../pipes/datetime.pipe';

@Component({
  selector: 'app-addedit-fbadd',
  templateUrl: './addedit-fbadd.component.html',
  styleUrls: ['./addedit-fbadd.component.scss']
})
export class AddeditFbaddComponent implements OnInit {
  pageTitle: any = "Add ad";
  adsForm: FormGroup;
  statusList: any = [];
  id: any = 0;
  ParamCampainId: any = 0;
  loadSave = false;
  fTime: Date;
  adsetsList: any = [];
  adCreativeList: any = [];
  selectedAdsetsList: any = [];
  campaignsList: any = [];
  defaultminTime: Date;
  ParamAdSetId: any = 0;
  conversionRateRanckingList: any = [];
  contentHeader: object;
  constructor(
    private route: ActivatedRoute,
    private fbMarketingService: FbMarketingService,
    public commonService: CommonService,
    private dateTimeToLocalForApp: DateTimeToLocalPipeForAppointment,
    private router: Router,
    private toaster: ToastrService,
    private dialogService: ConfirmationDialogService,

    private fb: FormBuilder) {


  }
  get campaignId() { return this.adsForm.get('campaign_id'); }

  ngOnInit() {
    
    this.loadSave = true;
    this.defaultminTime = new Date(this.dateTimeToLocalForApp.transform(new Date(), ''));
    this.adsForm = this.initForm();
    this.getStatus();
    this.getFacebookCampaignsDDL();
    this.getFacebookadsetsDDL();
    this.GetFacebookAdCreativeDDL();
    this.getConversionRate();
    this.route.paramMap.subscribe(
      params => {
        ;
        this.id = params.get('id');

        if (this.id > 0) {
          this.pageTitle = "Edit Ad";
          this.getAdById(this.id);
          this.InitialFromTime();
        }
        this.initBreadCrumb();
      
      });
    this.route.queryParams.subscribe(
      params => {
          this.ParamCampainId = params['campaign_id'];
          this.ParamAdSetId = params['adSetId'];
          if (this.ParamCampainId > 0) {
            this.campaign_id.setValue(this.ParamCampainId);
            this.handleCampaignChange({ id: this.ParamCampainId });
            this.adset_id.setValue(this.ParamAdSetId);
          }
        }
      )
  }

  initBreadCrumb() {
    this.contentHeader = {
      headerTitle: 'Manage Ads',
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
            name: this.pageTitle,
            isLink: false
          }

        ]
    };
  }
  handleCampaignChange(event) {
    
    if (event != null) {
      this.selectedAdsetsList = this.adsetsList.filter(x => x.campaign_id == event.id);
    }
    else {
      this.selectedAdsetsList = [];
    }   
  }

  handleCampaignChangeddl(event) {
    
    if (event != null) {
      this.selectedAdsetsList = this.adsetsList.filter(x => x.campaign_id == event.id);
    }
    else {
      this.selectedAdsetsList = [];
    }
    this.adset_id.setValue(null);
  }



  getFacebookCampaignsDDL() {
    this.fbMarketingService.GetFacebookCampaignsDDL().subscribe((result: any) => {

      if (result != null) {
        result = JSON.parse(result);
        this.campaignsList = result.data;
      } else {
        this.campaignsList = [];
      }
    })
  };

  GetFacebookAdCreativeDDL() {
    this.fbMarketingService.GetFacebookAdCreativeDDL().subscribe((result: any) => {
      if (result != null) {
        result = JSON.parse(result);
        this.adCreativeList = result.data;
      } else {
        this.adsetsList = [];
      }
    })
  };

  getConversionRate() {
    this.commonService.GetMasterItemsNotAuth("fb_add_Conversion_Rate_Rancking").subscribe((result: any) => {
      ;
      this.conversionRateRanckingList = this.commonService.masters;
    })
  }

  getFacebookadsetsDDL() {
    
    this.fbMarketingService.GetFacebookadsetsDDL().subscribe((result: any) => {
      if (result != null) {
        result = JSON.parse(result);
        this.adsetsList = result.data;
        ;
        if (this.campaignId.value != null) {
          this.handleCampaignChange({ id: this.campaignId.value });
        }
      } else {
        this.adsetsList = [];
      }
    })
  };

  getStatus() {
    this.commonService.GetMasterItemsNotAuth("fb_status").subscribe((result: any) => {

      this.statusList = this.commonService.masters;
    })
  };

  getAdById(id) {
    this.fbMarketingService.GetAdById(id).subscribe(res => {
      if (res != null) {
        res = JSON.parse(res);
        this.initForm(res);
      }
    });
  }

  initForm(ad = null) {
    let adgroup = this.fb.group({
      adId: [null],
      id: [null],
      adSetId: [null],
      adset_id: [null, Validators.required],
      bid_amount: [null, Validators.required],
      campaignId: [null],
      creative_id: [null],
      campaign_id: [null, Validators.required],
      configured_status: [null],
      created_time: [null],
      effective_status: [null],
      name: [null, Validators.required],
      page_id: [null],
      link_url: [null, Validators.required],
      status: [null, Validators.required],
      tracking_specs: [null],
      updated_time: [null],
      created_at: [null],
      created_by: [null],
      status_id: [null],
      delivery: [null],
      amount_spent: [null],
      bid_strategy: [null],
      conversion_rate_ranking: [null],
      cost_per_result: [null],
      ends: [null],
      frequency: [null],
      impressions: [null],
      time: [null],
      significantdate: [null],
      reach: [null],
      result: [null],
      source: [null],
      unique_links_clicks: [null],
      external_id: [null],
      // lasteditdatetime: [null],
      // edit_time: [null],
      ad_start_date: [null],
      daily_budget: [null],
      ad_objective: [null],
      last_edit_time: [null],
      last_edit: [null],
    });
    if (ad) {
      this.adsForm.patchValue({
        adId: ad.adId,
        id: ad.id,
        adSetId: ad.adSetId,
        adset_id: ad.adset_id,
        bid_amount: ad.bid_amount,
        campaignId: ad.campaignId,
        campaign_id: ad.campaign_id,
        configured_status: ad.configured_status,

        effective_status: ad.effective_status,
        name: ad.name,
        page_id: ad.page_id,
        link_url: ad.link_url,
        creative_id: ad.creative_id,
        status: ad.status,
        tracking_specs: ad.tracking_specs,
        updated_time: ad.updated_time,
        created_at: ad.created_at,
        created_by: ad.created_by,
        status_id: ad.status_id,
        delivery: ad.delivery,
        amount_spent: ad.amount_spent,
        bid_strategy: ad.bid_strategy,
        conversion_rate_ranking: ad.conversion_rate_rancking,
        cost_per_result: ad.cost_per_result,
        ends: ad.ends,
        frequency: ad.frequency,
        impressions: ad.impressions,

        reach: ad.reach,
        result: ad.result,
        source: ad.source,
        unique_links_clicks: ad.unique_links_clicks,
        external_id: ad.external_id,
        //lasteditdatetime : ad.lasteditdatetime,
        // edit_time : ad.edit_time,

        daily_budget: ad.daily_budget,
        ad_objective: ad.add_objective,
        ///significantdate: ad.last_significant_edit,

        significantdate: (ad.last_significant_edit != null) ? new Date(ad.last_significant_edit) : null,
        ad_start_date: (ad.add_start_date != null) ? new Date(ad.add_start_date) : null,

        last_edit: (ad.last_edit != null) ? new Date(ad.last_edit) : null,
        last_edit_time: (ad.last_edit_time != null) ? new Date(moment(this.dateTimeToLocalForApp.transform(ad.last_edit_time, '')).format('MM/DD/YYYY HH:mm')) : null,
        time: (ad.last_significant_edit_time != null) ? new Date(moment(this.dateTimeToLocalForApp.transform(ad.last_significant_edit_time, '')).format('MM/DD/YYYY HH:mm')) : null,    ///new Date(moment(this.dateTimeToLocalForApp.transform(ad.last_significant_edit_time, '')).format('MM/DD/YYYY HH:mm')),

        created_time: ad.created_time,
      });
      this.handleCampaignChange({ id: ad.campaign_id });

    }
    setTimeout(() => {
      this.loadSave = false;
    }, 500);
    return adgroup;
  }

  get name() { return this.adsForm.get('name'); }
  get campaign_id() { return this.adsForm.get('campaign_id'); }
  get adset_id() { return this.adsForm.get('adset_id'); }
  get bid_amount() { return this.adsForm.get('bid_amount'); }
  get link_url() { return this.adsForm.get('link_url'); }
  get status() { return this.adsForm.get('status'); }
  get delivery() { return this.adsForm.get('delivery'); }
  get amount_spent() { return this.adsForm.get('amount_spent'); }
  get bid_strategy() { return this.adsForm.get('bid_strategy'); }
  get conversion_rate_ranking() { return this.adsForm.get('conversion_rate_ranking'); }
  get cost_per_result() { return this.adsForm.get('cost_per_result'); }
  get ends() { return this.adsForm.get('ends'); }
  get frequency() { return this.adsForm.get('frequency'); }
  get impressions() { return this.adsForm.get('impressions'); }
  get time() { return this.adsForm.get('time'); }
  get significantdate() { return this.adsForm.get('significantdate'); }
  get last_edit_time() { return this.adsForm.get('last_edit_time'); }
  get last_edit() { return this.adsForm.get('last_edit'); }
  get reach() { return this.adsForm.get('reach'); }
  get result() { return this.adsForm.get('result'); }
  get source() { return this.adsForm.get('source'); }
  get unique_links_clicks() { return this.adsForm.get('unique_links_clicks'); }
  get external_id() { return this.adsForm.get('external_id'); }
  // get lasteditdatetime() { return this.adsForm.get('lasteditdatetime'); }
  //get edit_time() { return this.adsForm.get('edit_time'); }
  get ad_start_date() { return this.adsForm.get('ad_start_date'); }
  get daily_budget() { return this.adsForm.get('daily_budget'); }
  get ad_objective() { return this.adsForm.get('ad_objective'); }




  close() {
    this.router.navigateByUrl("/marketing/ads-list");
  }


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
  numberOnlyWithOutDecimal(event): boolean {

    
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  InitialFromTime() {
    ;
    setTimeout(() => {
      this.loadSave = false;
    }, 500);
    // new Date(moment(this.dateTimeToLocalForApp.transform(result.editDateFrom, '')).format('MM/DD/YYYY HH:mm'));
  }


  onSubmit() {
    ;
    if (this.adsForm.valid) {
      this.loadSave = true;
      let data = this.adsForm.value;


      if (this.adsForm.value.significantdate) {
        let dsignificantdate = moment(this.adsForm.value.significantdate).format('MM/DD/YYYY');
        let dtsignificantdate = new Date(this.commonService.ConvertUserSelectedTimeZoneToUTCForAppointment(dsignificantdate));
        this.adsForm.value.significantdate = dtsignificantdate.toDateString();
      }
      else {
        this.adsForm.value.significantdate = null;
      }

      if (this.adsForm.value.ad_start_date) {
        let dsignificantdate = moment(this.adsForm.value.ad_start_date).format('MM/DD/YYYY');
        let dtsignificantdate = new Date(this.commonService.ConvertUserSelectedTimeZoneToUTCForAppointment(dsignificantdate));
        this.adsForm.value.ad_start_date = dtsignificantdate.toDateString();
      }
      else {
        this.adsForm.value.ad_start_date = null;
      }

      if (this.adsForm.value.time) {
        this.fTime = new Date(this.commonService.ConvertUserSelectedTimeZoneToUTCForAppointment(this.adsForm.value.time));
        this.adsForm.value.time = this.fTime.getHours() + ":" + this.fTime.getMinutes();
      }
      else {
        this.adsForm.value.time = null;
      }


      if (this.adsForm.value.last_edit) {
        let dlast_edit = moment(this.adsForm.value.last_edit).format('MM/DD/YYYY');
        let dtlast_edit = new Date(this.commonService.ConvertUserSelectedTimeZoneToUTCForAppointment(dlast_edit));
        this.adsForm.value.last_edit = dtlast_edit.toDateString();
      }
      else {
        this.adsForm.value.last_edit = null;
      }


      if (this.adsForm.value.last_edit_time) {
        this.fTime = new Date(this.commonService.ConvertUserSelectedTimeZoneToUTCForAppointment(this.adsForm.value.last_edit_time));
        this.adsForm.value.last_edit_time = this.fTime.getHours() + ":" + this.fTime.getMinutes();
      }
      else {
        this.adsForm.value.last_edit_time = null;
      }





      // console.log(data);
      if (data.id != '' && data.id != null) {
        this.fbMarketingService.UpdateFbAd(data).subscribe(res => {
          if (res.statusCode == 200) {
            this.loadSave = false;
            this.toaster.success(res.responseMessage);
            this.router.navigateByUrl("/marketing/ads-list");
          }
          else {
            this.toaster.error(res.responseMessage);
            this.loadSave = false;
          }

        });
      } else {
        this.fbMarketingService.SaveFbAd(data).subscribe(res => {
          if (res.statusCode == 200) {
            this.loadSave = false;
            this.toaster.success(res.responseMessage);
            this.router.navigateByUrl("/marketing/ads-list");
          }
          else {
            this.toaster.error(res.responseMessage);
            this.loadSave = false;
          }
        });
      }
    }
    else {
      this.commonService.validateAllFormFields(this.adsForm);
    }
  }
}
