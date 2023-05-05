using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Numerics;
using System.Text;

namespace Solgen.Core
{
    public class CampaignModel
    {
        public string CampaignId { get; set; }
        public string FormJsonData { get; set; }
        public string userId { get; set; }
        public string ModuleCode { get; set; }
        public string SubModuleCode { get; set; }
        public string companyId { get; set; }
    }
    public class FacebookCampaignViewModel
    {
        public FacebookCampaignViewModel()
        {
            data = new List<FacebookCampaign>();
        }
        public List<FacebookCampaign> data { get; set; }
        public Paging paging { get; set; }
    }
    public class Paging
    {
        public Cursors cursors { get; set; }

    }
    public class Cursors
    {
        public string before { get; set; }
        public string after { get; set; }

    }


    public class FacebookCampaign
    {
        public FacebookCampaign()
        {
            special_ad_categories = new List<string>();
        }
        public string Id { get; set; }
        public string account_id { get; set; }
        public bool? budget_rebalance_flag { get; set; }
        public string budget_remaining { get; set; }
        public string buying_type { get; set; }
        public bool? can_create_brand_lift_study { get; set; }

        public bool? can_use_spend_cap { get; set; }

        public string configured_status { get; set; }

        public DateTime? created_time { get; set; }

        public string effective_status { get; set; }

        public bool? is_skadnetwork_attribution { get; set; }

        public string name { get; set; }
        public string objective { get; set; }

        public string smart_promotion_type { get; set; }

        public string source_campaign_id { get; set; }

        public List<string> special_ad_categories { get; set; }

        public DateTime? start_time { get; set; }

        public string status { get; set; }


        public DateTime? stop_time { get; set; }

        public long? topline_id { get; set; }

        public DateTime? updated_time { get; set; }
        public string access_token { get; set; }
        public string campaign_owner { get; set; }
        public bool? isActive { get; set; }

        public DateTime? end_time { get; set; }

        public string type { get; set; }

        public string discount_name { get; set; }

        public decimal? discount_amount { get; set; }

        public string sale_group_type { get; set; }

        public string service_territory { get; set; }

        public string external_id { get; set; }
        public string campaign_status_facebook { get; set; }

       

        public string daily_budget { get; set; }
        public decimal? impressions { get; set; }

        public string facebook_account_id { get; set; }
        public decimal? spends { get; set; }

        public decimal? num_sent_in_campaign { get; set; }

        public decimal? budgeted_cost_in_campaign { get; set; }
        public decimal? expected_response { get; set; }
        public decimal? expected_revenue_in_campaign { get; set; }

        public decimal? actual_cost_in_campaign { get; set; }
        public string description { get; set; }

        public Guid? CreatedBy { get; set; }


    }

    public class FacebookCampaignInsightViewModel
    {
        public List<FacebookCampaignInsight> data { get; set; }
        public Paging paging { get; set; }
    }

    public class FacebookCampaignInsight
    {
        public string account_currency { get; set; }
        public string account_id { get; set; }
        public string account_name { get; set; }

        public List<actions> actions { get; set; }

        public string buying_type { get; set; }
        public string campaign_id { get; set; }
        public string campaign_name { get; set; }

        public long clicks { get; set; }

        public List<cost_per_action_type> cost_per_action_type { get; set; }

        public Decimal cost_per_inline_link_click { get; set; }

        public Decimal cost_per_inline_post_engagement { get; set; }

        public List<cost_per_outbound_click> cost_per_outbound_click { get; set; }
        public List<cost_per_unique_action_type> cost_per_unique_action_type { get; set; }


        public Decimal cost_per_unique_click { get; set; }

        public Decimal cpc { get; set; }

        public Decimal cpm { get; set; }

        public Decimal cpp { get; set; }

        public DateTime? created_time { get; set; }


        public Decimal ctr { get; set; }

        public DateTime? date_start { get; set; }


        public DateTime? date_stop { get; set; }

        public Decimal frequency { get; set; }

        public Decimal impressions { get; set; }

        public Decimal inline_link_click_ctr { get; set; }

        public Decimal inline_link_clicks { get; set; }

        public Decimal inline_post_engagement { get; set; }


        public List<interactive_component_tap> interactive_component_tap { get; set; }
        public string objective { get; set; }

        public string optimization_goal { get; set; }

        public List<outbound_clicks> outbound_clicks { get; set; }

        public List<outbound_clicks_ctr> outbound_clicks_ctr { get; set; }

        public Decimal reach { get; set; }

        public Decimal social_spend { get; set; }

        public Decimal spend { get; set; }

        public DateTime? updated_time { get; set; }

        public Decimal wish_bid { get; set; }


    }

    public class actions
    {
        public string action_type { get; set; }
        public string value { get; set; }

    }

    public class interactive_component_tap
    {
        public string value { get; set; }

    }


    public class cost_per_action_type
    {
        public string action_type { get; set; }
        public string value { get; set; }

    }

    public class outbound_clicks_ctr
    {
        public string action_type { get; set; }
        public string value { get; set; }

    }


    public class cost_per_outbound_click
    {
        public string action_type { get; set; }
        public string value { get; set; }

    }

    public class cost_per_unique_action_type
    {
        public string action_type { get; set; }
        public string value { get; set; }

    }

    public class outbound_clicks
    {
        public string action_type { get; set; }
        public string value { get; set; }

    }

    public class FacebookAddSetViewModel
    {
        public List<FacebookAddSet> data { get; set; }
        public Paging paging { get; set; }
    }

    public class FacebookAdsViewModel
    {
        public FacebookAdsViewModel()
        {
            data = new List<FacebookAds>();
        }
        public List<FacebookAds> data { get; set; }
        public Paging paging { get; set; }
    }
    public class FacebookCreative
    {
        public string creative_id { get; set; }
    }
    public class FacebookAds
    {
        public string link_url { get; set; }
        public string page_id { get; set; }
        public string account_id { get; set; }
        public string adset_id { get; set; }
        public string campaign_id { get; set; }
        public string id { get; set; }
        public decimal? bid_amount { get; set; }
        public string configured_status { get; set; }
        public DateTime? created_time { get; set; }
        public FacebookCreative creative { get; set; }
        public string effective_status { get; set; }
        public string last_updated_by_app_id { get; set; }
        public string name { get; set; }
        public string preview_shareable_link { get; set; }
        public string source_ad_id { get; set; }
        public string status { get; set; }
        public DateTime? updated_time { get; set; }

        public string delivery { get; set; }

        public decimal? amount_spent { get; set; }

        public string conversion_rate_ranking { get; set; }

        public string bid_strategy { get; set; }

        public decimal? cost_per_result { get; set; }
        public decimal? ends { get; set; }
        public decimal? frequency { get; set; }
        public decimal? impressions { get; set; }

        public DateTime? significantdate { get; set; }

        public TimeSpan? time { get; set; }

        public decimal? reach { get; set; }
        public decimal? result { get; set; }

        public string source { get; set; }
        public string unique_links_clicks { get; set; }
        public string external_id { get; set; }
        public DateTime? ad_start_date { get; set; }
        public decimal? daily_budget { get; set; }

        public string ad_objective { get; set; }

        public Guid? CreatedBy { get; set; }

        public DateTime? last_edit { get; set; }

        public TimeSpan? last_edit_time { get; set; }



    }
    public class FacebookAddSet
    {
        public string Id { get; set; }
        public long? adSetId { get; set; }

        public string account_id { get; set; }

        public List<attribution_spec> attribution_spec { get; set; }

        public string billing_event { get; set; }

        public string campaign_id { get; set; }

        public string configured_status { get; set; }


        public DateTime? created_time { get; set; }


        public decimal daily_budget { get; set; }
        public string destination_type { get; set; }

        public string effective_status { get; set; }

        public DateTime? end_time { get; set; }



        public Boolean? is_dynamic_creative { get; set; }

        public decimal? lifetime_budget { get; set; }
        public string lifetime_imps { get; set; }

        public string multi_optimization_goal_weight { get; set; }

        public string name { get; set; }


        public string optimization_goal { get; set; }

        public string optimization_sub_event { get; set; }

        public string[] pacing_type { get; set; }

        public promoted_object promoted_object { get; set; }

        public Boolean? recurring_budget_semantics { get; set; }

        public Boolean? use_new_app_click { get; set; }



        public source_adset source_adset { get; set; }

        public string source_adset_id { get; set; }

        public DateTime start_time { get; set; }
        public DateTime? updated_time { get; set; }

        public string status { get; set; }


        public targeting targeting { get; set; }

        public List<targeting_optimization_types> targeting_optimization_types { get; set; }

        //public DateTime? updated_time { get; set; }

        //public Boolean use_new_app_click { get; set; }
        public string adlabels { get; set; }
        public string adset_schedule { get; set; }
        public string asset_feed_id { get; set; }
        public decimal? bid_amount { get; set; }
        public string bid_strategy { get; set; }
        public decimal? budget_remaining { get; set; }
        public string campaignId { get; set; }
        public string creative_sequence { get; set; }

        public decimal? daily_min_spend_target { get; set; }
        public string daily_spend_cap { get; set; }
        public string frequency_control_specs { get; set; }
        public string instagram_actor_id { get; set; }
        public string issues_info { get; set; }
        public string lifetime_min_spend_target { get; set; }
        public string lifetime_spend_cap { get; set; }
        public string recommendations { get; set; }
        public string review_feedback { get; set; }
        public string time_based_ad_rotation_id_blocks { get; set; }
        public string time_based_ad_rotation_intervals { get; set; }
        public string adset_id { get; set; }
        public decimal? spent_amount { get; set; }
        public decimal? cost_per_result { get; set; }
        public decimal? frequency { get; set; }
        public decimal? impressions { get; set; }
        public decimal? reach { get; set; }
        public decimal? unique_link_clicks { get; set; }
        public string external_id { get; set; }
        public string adset_objective { get; set; }
        public decimal? costper_unique_clicks { get; set; }
        public Guid? CreatedBy { get; set; }

        public decimal? cost_per_mile { get; set; }

        public decimal? cost_per_pixel { get; set; }
        public decimal? click_through_rate { get; set; }
        public decimal? social_spend { get; set; }
        public decimal? video_view { get; set; }

        public string effective_status_num { get; set; }
        public string ad_objective { get; set; }
    }

    public class targeting
    {
        public string age_max { get; set; }
        public string age_min { get; set; }
        public List<flexible_spec> flexible_spec { get; set; }

        public geo_locations geo_locations { get; set; }

        public List<string> brand_safety_content_filter_levels { get; set; }


    }

    public class targeting_optimization_types
    {

        public string key { get; set; }

        public string value { get; set; }
    }

    public class flexible_spec
    {

        public List<interests> interests { get; set; }
    }

    public class geo_locations
    {

        public List<cities> cities { get; set; }

        public List<string> location_types { get; set; }


    }

    public class cities
    {
        public string country { get; set; }
        public string distance_unit { get; set; }

        public string key { get; set; }

        public string name { get; set; }

        public string radius { get; set; }
        public string region { get; set; }

        public string region_id { get; set; }



    }

    public class interests
    {
        public string id { get; set; }
        public string name { get; set; }



    }

    public class source_adset
    {
        public string id { get; set; }


    }



    public class promoted_object
    {
        public string pixel_id { get; set; }
        public string custom_event_type { get; set; }

    }

    public class attribution_spec
    {
        public string event_type { get; set; }
        public string window_days { get; set; }

    }


    public class FacebookAdsetInsightViewModel
    {
        public List<FacebookAdsetInsight> data { get; set; }
        public Paging paging { get; set; }
    }

    public class FacebookAdsInsightViewModel
    {
        public List<FacebookAdsInsight> data { get; set; }
        public Paging paging { get; set; }
    }

    public class FacebookAdsInsight
    {

        public string ad_id { get; set; }
        public string adset_id { get; set; }

        public string ad_name { get; set; }

        public string account_currency { get; set; }
        public string account_id { get; set; }

        public string account_name { get; set; }

        public List<actions> actions { get; set; }


        public string buying_type { get; set; }

        public string campaign_id { get; set; }

        public string campaign_name { get; set; }


        public string clicks { get; set; }

        public List<cost_per_action_type> cost_per_action_type { get; set; }

        public Decimal cost_per_inline_link_click { get; set; }

        public Decimal cost_per_inline_post_engagement { get; set; }


        public List<cost_per_outbound_click> cost_per_outbound_click { get; set; }
        public List<cost_per_unique_action_type> cost_per_unique_action_type { get; set; }












        public Decimal cost_per_unique_click { get; set; }

        public Decimal cpc { get; set; }

        public Decimal cpm { get; set; }

        public Decimal cpp { get; set; }


        public DateTime? created_time { get; set; }

        public Decimal ctr { get; set; }

        public DateTime? date_start { get; set; }


        public DateTime? date_stop { get; set; }

        public Decimal frequency { get; set; }

        public Decimal impressions { get; set; }

        public Decimal inline_link_click_ctr { get; set; }

        public Decimal inline_link_clicks { get; set; }

        public Decimal inline_post_engagement { get; set; }


        public List<interactive_component_tap> interactive_component_tap { get; set; }
        public string objective { get; set; }

        public string optimization_goal { get; set; }

        public DateTime? updated_time { get; set; }

        public List<outbound_clicks> outbound_clicks { get; set; }

        public List<outbound_clicks_ctr> outbound_clicks_ctr { get; set; }

        public Decimal reach { get; set; }

        public Decimal social_spend { get; set; }

        public Decimal spend { get; set; }

        public Decimal wish_bid { get; set; }


    }

    public class FacebookAdsetInsight
    {
        public string adset_id { get; set; }
        public string ad_id { get; set; }
        public string account_currency { get; set; }
        public string account_id { get; set; }
        public string account_name { get; set; }

        public List<actions> actions { get; set; }

        public string buying_type { get; set; }
        public string campaign_id { get; set; }
        public string campaign_name { get; set; }

        public long clicks { get; set; }

        public List<cost_per_action_type> cost_per_action_type { get; set; }

        public Decimal cost_per_inline_link_click { get; set; }

        public Decimal cost_per_inline_post_engagement { get; set; }

        public List<cost_per_outbound_click> cost_per_outbound_click { get; set; }
        public List<cost_per_unique_action_type> cost_per_unique_action_type { get; set; }


        public Decimal cost_per_unique_click { get; set; }

        public Decimal cpc { get; set; }

        public Decimal cpm { get; set; }

        public Decimal cpp { get; set; }

        public DateTime? created_time { get; set; }


        public Decimal ctr { get; set; }

        public DateTime? date_start { get; set; }


        public DateTime? date_stop { get; set; }

        public Decimal frequency { get; set; }

        public Decimal impressions { get; set; }

        public Decimal inline_link_click_ctr { get; set; }

        public Decimal inline_link_clicks { get; set; }

        public Decimal inline_post_engagement { get; set; }


        public List<interactive_component_tap> interactive_component_tap { get; set; }
        public string objective { get; set; }

        public string optimization_goal { get; set; }



        public Decimal reach { get; set; }

        public Decimal social_spend { get; set; }

        public Decimal spend { get; set; }

        public DateTime? updated_time { get; set; }

        public Decimal wish_bid { get; set; }


    }

    //public class FacebookAdsViewModel
    //{
    //    public List<FacebookAdsView> data { get; set; }
    //    public Paging paging { get; set; }
    //}
    public class FacebookAdsView
    {

        public string id { get; set; }

        public string name { get; set; }

        public string account_id { get; set; }

        public adset adset { get; set; }
        public string adset_id { get; set; }

        public campaign campaign { get; set; }

        public string campaign_id { get; set; }

        public string configured_status { get; set; }

        public DateTime? created_time { get; set; }

        public creative creative { get; set; }
        public string effective_status { get; set; }
        public string last_updated_by_app_id { get; set; }
        public string preview_shareable_link { get; set; }

        public source_ad source_ad { get; set; }

        public string source_ad_id { get; set; }

        public DateTime? updated_time { get; set; }


    }



    public class tracking_specs
    {
        public List<interests> interests { get; set; }
    }
    public class source_ad
    {
        public string id { get; set; }
    }

    public class campaign
    {
        public string id { get; set; }
    }

    public class adset
    {
        public string id { get; set; }
    }

    public class creative
    {
        public string id { get; set; }
    }








    public class ResourceServiceModel
    {
        public string Id { get; set; }
        public string FormJsonData { get; set; }
        public string userId { get; set; }
        public string ModuleCode { get; set; }
        public string SubModuleCode { get; set; }
        public string companyId { get; set; }
    }

    public class ServiceResourceSkillModel
    {
        public string skillId { get; set; }
        public string serviceResource { get; set; }
        public string skill { get; set; }
        public string skillLevel { get; set; }
        public string startDate { get; set; }
        public string startTime { get; set; }
        public string endDate { get; set; }
        public string endTime { get; set; }
        public string ResourceId { get; set; }
        public string UserId { get; set; }
        public long? companyId { get; set; }
    }


    #region skillModel
    public class SkillModel
    {
        public string Id { get; set; }
        public string Skill { get; set; }
        public string SkillLevel { get; set; }
        public string UserId { get; set; }
        public long? companyId { get; set; }
    }
    #endregion


    #region timezoneModel
    public class TimeZoneModel
    {
        public string Id { get; set; }
        public string timeZone { get; set; }
        public string status { get; set; }
        public string UserId { get; set; }
        public long? companyId { get; set; }
    }
    #endregion



    #region requirementModel

    public class requirementModel
    {
        public string Id { get; set; }
        public string requirementName { get; set; }
        public string pertainsTo { get; set; }
        public string recordType { get; set; }
        public string requiredby { get; set; }
        public string type { get; set; }
        public string serviceTerritory { get; set; }
        public string isActive { get; set; }
        public string description { get; set; }
        public string permittingCost { get; set; }
        public string callforInspection { get; set; }
        public string approvalDuration { get; set; }
        public string submitforPTO { get; set; }

        public string meterInstalled { get; set; }
        public string approvalReceived { get; set; }
        public string Notes { get; set; }
        public string externalID { get; set; }
        public string Owner { get; set; }
        public string UserId { get; set; }
        public long? companyId { get; set; }

        public string Required_By1 { get; set; }
        public string TypeId { get; set; }
        public string SGStatusId { get; set; }
        public string RequirementId { get; set; }
        public DateTime? DateSubmitted { get; set; }
        public DateTime? CompltedDate { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? OrginalDueDate { get; set; }
        public string Account { get; set; }
        public string requirementStatus { get; set; }




    }
    #endregion


    #region JurisdictionModel

    public class JurisdictionModel
    {
        public string Id { get; set; }
        public string JurisdictionId { get; set; }

        public bool Update__c { get; set; }

        public string Notes__c { get; set; }


        public string Account { get; set; }

        public string Type__c { get; set; }

        public string externalID { get; set; }
        public string Owner { get; set; }
        public string UserId { get; set; }
        public long? companyId { get; set; }



    }
    #endregion


    public class ServiceTerritoryModel
    {
        public string territoryId { get; set; }
        public string serviceResource { get; set; }
        public string serviceTerritoryId { get; set; }
        public string territoryType { get; set; }
        public string address { get; set; }
        public string country { get; set; }
        public string addressDes { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zipCode { get; set; }
        public string operatingHours { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        public string UserId { get; set; }
        public long? companyId { get; set; }
    }
    public class ServiceResourceCrewModel
    {
        public string crewMemberId { get; set; }
        public string serviceResource { get; set; }
        public string serviceCrew { get; set; }
        public bool? isLeader { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        public string UserId { get; set; }
        public long? CompanyId { get; set; }
    }

    public class ServiceAbcenseModel
    {
        public string id { get; set; }
        public string recordType { get; set; }
        public string serviceResource { get; set; }
        public string type { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }
        public string description { get; set; }
        public string ganttLabel { get; set; }
        public string country { get; set; }
        public string addressDes { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zipCode { get; set; }

        public string userId { get; set; }
        public long? CompanyId { get; set; }
    }
    public class ServiceResourceFiles
    {
        public string Id { get; set; }
        public string FileUrl { get; set; }
        public string FileName { get; set; }
        public long? CompanyId { get; set; }
        public string Userid { get; set; }
        public string moduleName { get; set; }
        public string SubModuleName { get; set; }
        public string Type { get; set; }
        public bool isLead { get; set; }
        public string documentTitle { get; set; }
        public string description { get; set; }
        public Boolean isWorkorder { get; set; }
        public bool isServicecrew { get; set; }
        public bool isOpportunity { get; set; }
        public bool isaccount { get; set; }
        public string filetype { get; set; }
        public string categoryId { get; set; }
        public long accountid { get; set; }

        public bool isDocumentModule { get; set; }

        public bool isMediaServer { get; set; }

        public bool IsFinalized { get; set; }
        public bool isRequired { get; set; }

    }
    public class ProposalFilesModel
    {
        public string Id { get; set; }
        public string FileUrl { get; set; }
        public string FileName { get; set; }
        public long? CompanyId { get; set; }
        public string Userid { get; set; }
        public string moduleName { get; set; }
        public string SubModuleName { get; set; }
        public string Type { get; set; }
        public bool isLead { get; set; }
        public string documentTitle { get; set; }
        public string description { get; set; }
        public Boolean isWorkorder { get; set; }
        public bool isProposal { get; set; }
    }

    #region WorkType

    public class workTypeModel
    {
        public string id { get; set; }
        public string workTypeName { get; set; }
        public string description { get; set; }
        public string serviceReportTemplate { get; set; }
        public bool? isAutoCreateServiceAppointment { get; set; }
        public decimal? dueDateOffset { get; set; }
        public bool? isExactAppointments { get; set; }
        public int? minimumCrewSize { get; set; }
        public decimal? estimatedDuration { get; set; }
        public decimal? maxDuration { get; set; }
        public int? recommendedCrewSize { get; set; }
        public string durationTypeId { get; set; }

        public string constructionStageId { get; set; }
        public bool? isHoldsUpInstall { get; set; }
        public string workOrderLineTemplate { get; set; }
        public bool? createWorkOrdersOnContractClose { get; set; }
        public string commissionTypeId { get; set; }
        public decimal? commissionValue { get; set; }
        public long? CompanyId { get; set; }
        public string Userid { get; set; }
        public string colorCode { get; set; }
        public Boolean? IsActive { get; set; }
        public DateTime duration { get; set; }
    }

    public class ProductRequiredmodel
    {
        public string productRequired_id { get; set; }
        public long? parentRecordId { get; set; }
        public string productRequired { get; set; }
        public decimal? quantityRequired { get; set; }
        public DateTime? dateDelivered { get; set; }
        public string quantityUnitOfMeasureId { get; set; }
        public long? CompanyId { get; set; }
        public string Userid { get; set; }
    }

    public class SkillRequirementModel
    {
        public long? skillRequirement_id { get; set; }
        public long? requiredFor { get; set; }
        public long? skillRequirement { get; set; }
        public decimal? skillLevel { get; set; }
        public long? CompanyId { get; set; }
        public string Userid { get; set; }
    }

    #endregion


    public class ProductRequiredModel
    {
        public string ParentRecord { get; set; }
        public string ProductRequired { get; set; }
        public string QuantityRequired { get; set; }
        public string DateDelivered { get; set; }
        public string QuantityUnitOfMeasure { get; set; }
        public string Id { get; set; }
        public string WorkOrderId { get; set; }
        public string UserId { get; set; }
        public long? CompanyId { get; set; }
    }

    public class AddeditEngineeringQuestionModel
    {
        public string workOrderId { get; set; }
        public string mpuNeeded { get; set; }
        public string TrenchingNeeded { get; set; }
        public string RetrofitNeeded { get; set; }
        public string InterconnectionType { get; set; }
        public string NumberOfArrays { get; set; }
        public string RoofMaterial { get; set; }
        public string RoofTilt { get; set; }
        public string MidClamps { get; set; }
        public string EndClamps { get; set; }
        public string GroundingLugs { get; set; }
        public string TBolts { get; set; }

        public string EndCovers { get; set; }
        public string Splice { get; set; }
        public string Flashings { get; set; }
        public string Rail { get; set; }
        public string RailWeight { get; set; }
        public string ModuleWeight { get; set; }
        public string PSF { get; set; }
        public string TotalWeight { get; set; }
        public string ENGFirstReviewBy { get; set; }
        public DateTime? ENGFirstReviewDate { get; set; }
        public string ENGSecondReviewBy { get; set; }
        public DateTime? ENGSecondReviewDate { get; set; }
        //public string QuantityRequired { get; set; }
        //public string DateDelivered { get; set; }
        //public string QuantityUnitOfMeasure { get; set; }
        //public string Id { get; set; }
        //public string WorkOrderId { get; set; }
        public string UserId { get; set; }
        public long? CompanyId { get; set; }
    }

    public class leadViewModel
    {
        public List<entry> entry { get; set; }
      
        // public string object1 { get; set; }
    }

    public class entry
    {
        public string Id { get; set; }
        public string time { get; set; }

        public List<changes> changes { get; set; }


    }

    public class changes
    {
        public string field { get; set; }
        public value value { get; set; }


    }

    public class value
    {
        public string ad_id { get; set; }
        public string form_id { get; set; }
        public string leadgen_id { get; set; }
        public string created_time { get; set; }
        public string page_id { get; set; }
        public string adgroup_id { get; set; }

    }

}
public class workOrderLineItemModel
{
    public long lineItem_id { get; set; }
    public string lineItemNo { get; set; }
    public long workOrder { get; set; }
    public string status { get; set; }
    public string statusText { get; set; }
    public DateTime? completedDate { get; set; }
    public string subject { get; set; }
    public string description { get; set; }

    public string UserId { get; set; }
    public long? CompanyId { get; set; }

    public DateTime? UpdatedDate { get; set; }
    public DateTime? CreatedDate { get; set; }
    public string CreatedBy { get; set; }
    public string UpdatedBy { get; set; }
}

