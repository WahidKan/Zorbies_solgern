
using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using Solgen.Core;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Solgen.Core.Models;

namespace Solgen.Repository
{
    public class FacebookRepository : IFacebookRepository
    {
        private readonly SolgenDbContext _dbContext;
        public FacebookRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public string SaveCampaign(FacebookCampaign entity)
        {
            Guid id = Guid.Empty;
            string pid = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                pid = connection.ExecuteScalar<string>("Sp_Solgen_AddEditFbCampaign",
                    param: new
                    {
                        id = entity.Id ?? string.Empty,
                        accountId = entity.account_id ?? string.Empty,
                        budgetRebalanceFlag = entity.budget_rebalance_flag ?? false,
                        budgetRemaining = entity.budget_remaining ?? string.Empty,
                        buyingType = entity.buying_type ?? string.Empty,
                        canCreateBrandLiftStudy = entity.can_create_brand_lift_study ?? false,
                        canUseSpendCap = entity.can_use_spend_cap ?? false,
                        createdTime = entity.created_time ?? DateTime.UtcNow,
                        configuredStatus = entity.configured_status ?? string.Empty,
                        effectiveStatus = entity.effective_status ?? string.Empty,
                        isSkadNetworkAttribution = entity.is_skadnetwork_attribution ?? false,
                        name = entity.name ?? string.Empty,
                        objective = entity.objective ?? string.Empty,
                        smartPromotionType = entity.smart_promotion_type ?? string.Empty,
                        specialAdCategories = string.Join(",", entity.special_ad_categories.ToArray()) ?? string.Empty,
                        sourceCampaignId = entity.source_campaign_id ?? string.Empty,
                        startTime = entity.start_time ?? DateTime.UtcNow,
                        status = entity.status ?? string.Empty,
                        stoptime = entity.stop_time ?? DateTime.UtcNow,
                        toplineId = entity.topline_id ?? 0,
                        updatedTime = entity.updated_time ?? DateTime.UtcNow,
                        owner = entity.campaign_owner ?? string.Empty,
                        IsActive = entity.isActive ?? false,
                        endTime = entity.end_time ?? DateTime.UtcNow,
                        type = entity.type ?? string.Empty,
                        discount_name = entity.discount_name ?? string.Empty,
                        discount_amount = entity.discount_amount ?? 0,
                        sale_group_type = entity.sale_group_type ?? string.Empty,
                        service_territory = entity.service_territory ?? string.Empty,
                        external_id = entity.external_id ?? string.Empty,// entity.Id ?? string.Empty,
                        campaign_status_facebook = entity.campaign_status_facebook ?? string.Empty,
                        dailyBudget = !string.IsNullOrWhiteSpace(entity.daily_budget) ? Convert.ToDecimal(entity.daily_budget).ToString("#.##")   : string.Empty,
                        impressions = entity.impressions ?? 0,
                        facebook_account_id = entity.facebook_account_id ?? string.Empty,
                        spends = entity.spends ?? 0,
                        description = entity.description ?? string.Empty,
                        num_sent_in_campaign = entity.num_sent_in_campaign ?? 0,
                        budgeted_cost_in_campaign = entity.budgeted_cost_in_campaign ?? 0,
                        expected_response = entity.expected_response ?? 0,
                        actual_cost_in_campaign = entity.actual_cost_in_campaign ?? 0,
                        expected_revenue_in_campaign = entity.expected_revenue_in_campaign ?? 0,
                        CreatedBy = entity.CreatedBy

                    },
                    commandType: CommandType.StoredProcedure) ;

                return pid;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string SaveCampaignInsight(FacebookCampaignInsight entity, long comid, string CallType)
        {
            Guid id = Guid.Empty;
            string message = string.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                message = connection.ExecuteScalar<string>("Sp_Solgen_AddeditFbCampaignInsights",
                    param: new
                    {
                        campaignId = comid,
                        accountCurrency = entity.account_currency,
                        accountId = entity.account_id,
                        accountName = entity.account_name,
                        buyingType = entity.buying_type,
                        campaign_id = entity.campaign_id,
                        campaignName = entity.campaign_name,
                        clicks = entity.clicks,
                        costPerInlineLinkClick = entity.cost_per_inline_link_click,
                        costPerInlinePostEngagement = entity.cost_per_inline_post_engagement,
                        costPerUniqueClick = entity.cost_per_unique_click,
                        cpc = entity.cpc,
                        cpm = entity.cpm,
                        cpp = entity.cpp,
                        createdTime = entity.created_time,
                        ctr = entity.ctr,
                        dateStart = entity.date_start,
                        dateStop = entity.date_stop,
                        frequency = entity.frequency,
                        impressions = entity.impressions,
                        inlineLinkClickCtr = entity.inline_link_click_ctr,
                        inlineLinkClicks = entity.inline_link_clicks,
                        inlinePostEngagement = entity.inline_post_engagement,
                        optimizationGoal = entity.optimization_goal,
                        objective = entity.objective,
                        reach = entity.reach,
                        socialSpend = entity.social_spend,
                        spend = entity.spend,
                        updatedTime = entity.updated_time,
                        wishBid = entity.wish_bid,
                        callType = CallType
                    },
                    commandType: CommandType.StoredProcedure);

                return message;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public dynamic SaveAdset(FacebookAddSet entity)
        {
            Guid id = Guid.Empty;
            dynamic pid = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                pid = connection.ExecuteScalar<dynamic>("Sp_Solgen_AddeditFbAdSet",
                    param: new
                    {
                        id = entity.Id,
                        adSetId = entity.adSetId,
                        accountId = entity.account_id,
                        billingEvent = entity.billing_event,
                        campaign_id = entity.campaign_id,
                        bidAmount = entity.bid_amount,
                        configuredStatus = entity.configured_status,
                        createdTime = entity.created_time,
                        dailyBudget = entity.daily_budget,
                        attributionSpec = entity.attribution_spec != null ?
                                            string.Join<string>(" or ", entity.attribution_spec.
                                                                Select(x => x.window_days + (x.window_days == "1" ? " Day " : " Days ") + x.event_type.Replace("_", " ").ToLower()).ToArray()) : "",
                        destinationType = entity.destination_type,
                        bidStrategy = entity.bid_strategy,

                        effectiveStatus = entity.effective_status,//!string.IsNullOrWhiteSpace(entity.effective_status) ? Convert.ToDecimal(entity.effective_status).ToString("#.##") : string.Empty,

                        endTime = entity.end_time,
                        isDynamicCreative = entity.is_dynamic_creative ?? false,
                        lifeTimeBudget = entity.lifetime_budget,
                        lifeIimeImps = entity.lifetime_imps,
                        multiOptimizationGoalWeight = entity.multi_optimization_goal_weight,
                        name = entity.name,
                        optimizationGoal = entity.optimization_goal,
                        optimizationSubEvent = entity.optimization_sub_event,
                        recurringBudgetSemantics = entity.recurring_budget_semantics ?? false,
                        sourceAdSetId = entity.source_adset_id,
                        startTime = entity.start_time,
                        status = entity.status,
                        updatedTime = entity.updated_time,
                        useNewAppClick = entity.use_new_app_click ?? false,

                       /// adsetIdFb = entity.adset_id,
                        adsetIdFb = entity.Id,
                        spentAmount = entity.spent_amount,
                        costPerResult = entity.cost_per_result,
                        frequency = entity.frequency,
                        impressions = entity.impressions,
                        reach = entity.reach,
                        uniqueLinkClicks = entity.unique_link_clicks,
                        externalId = entity.external_id,
                        adsetObjective = entity.adset_objective,
                        costperUniqueClicks = entity.costper_unique_clicks,
                        CreatedBy = entity.CreatedBy,
                        cost_per_mile = entity.cost_per_mile ?? 0,
                        cost_per_pixel = entity.cost_per_pixel ?? 0,
                        click_through_rate = entity.click_through_rate ?? 0,
                        social_spend = entity.social_spend ?? 0,
                        video_view = entity.video_view ?? 0,
                        effective_status_num = entity.effective_status_num ?? string.Empty,///effective_status_num!string.IsNullOrWhiteSpace(entity.effective_status_num) ? Convert.ToDecimal(entity.effective_status_num).ToString("#.##") : string.Empty,
                        ad_objective = entity.ad_objective ?? string.Empty,

                    },
                    commandType: CommandType.StoredProcedure);

                return pid;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string SaveAdsetInsight(FacebookAdsetInsight entity, string CallType)
        {
            Guid id = Guid.Empty;
            string message = string.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                message = connection.ExecuteScalar<string>("Sp_Solgen_AddeditFbCampaignInsights",
                    param: new
                    {
                        accountCurrency = entity.account_currency,
                        accountId = entity.account_id,
                        accountName = entity.account_name,
                        buyingType = entity.buying_type,
                        campaign_id = entity.campaign_id,
                        campaignName = entity.campaign_name,
                        clicks = entity.clicks,
                        costPerInlineLinkClick = entity.cost_per_inline_link_click,
                        costPerInlinePostEngagement = entity.cost_per_inline_post_engagement,
                        costPerUniqueClick = entity.cost_per_unique_click,
                        cpc = entity.cpc,
                        cpm = entity.cpm,
                        cpp = entity.cpp,
                        createdTime = entity.created_time,
                        ctr = entity.ctr,
                        dateStart = entity.date_start,
                        dateStop = entity.date_stop,
                        frequency = entity.frequency,
                        impressions = entity.impressions,
                        inlineLinkClickCtr = entity.inline_link_click_ctr,
                        inlineLinkClicks = entity.inline_link_clicks,
                        inlinePostEngagement = entity.inline_post_engagement,
                        optimizationGoal = entity.optimization_goal,
                        objective = entity.objective,
                        reach = entity.reach,
                        socialSpend = entity.social_spend,
                        spend = entity.spend,
                        updatedTime = entity.updated_time,
                        wishBid = entity.wish_bid,
                        callType = CallType,
                        adset_Id = entity.adset_id,
                        ad_Id = entity.ad_id

                    },
                    commandType: CommandType.StoredProcedure);

                return message;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string SaveAds(FacebookAds entity)
        {
            Guid id = Guid.Empty;
            string pid = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                pid = connection.ExecuteScalar<string>("Sp_Solgen_AddEditFbAd",
                    param: new
                    {
                        AdId = string.Empty,
                        id = entity.id,///"120330000223240204",//entity.id, ///"23849780572370080",//entity.id,
                        accountId = entity.account_id,
                        adLabels = string.Empty,
                        adSetId = entity.adset_id,///"120330000223159804",//entity.adset_id, //"23849780572360080",//entity.adset_id,
                        adset_id = entity.adset_id,///"120330000223159804",//entity.adset_id,//"23849780572360080",//entity.adset_id,
                        bidAmount = entity.bid_amount,
                        campaignId = string.Empty,
                        campaign_id = entity.campaign_id,//"120330000223159604",//entity.campaign_id,//"23849780572380080",// entity.campaign_id,
                        configuredStatus = entity.effective_status,
                        conversionDomain = string.Empty,
                        createdTime = entity.created_time,
                        link_url = entity.link_url,
                        page_id = entity.page_id,
                        effectiveStatus = entity.effective_status,
                        issuesInfo = string.Empty,
                        name = entity.name,
                        previewShareableLink = entity.preview_shareable_link,
                        recommendations = string.Empty,
                        sourceAdId = entity.source_ad_id,
                        status = entity.status,
                        trackingSpecs = string.Empty,
                        updatedTime = entity.updated_time,
                        delivery = entity.delivery ?? string.Empty,
                        amount_spent = entity.amount_spent ?? 0,
                        conversion_rate_rancking = entity.conversion_rate_ranking ?? string.Empty,
                        bid_strategy = entity.bid_strategy ?? string.Empty,
                        cost_per_result = entity.cost_per_result ?? 0,
                        ends = entity.ends ?? 0,
                        frequency = entity.frequency ?? 0,
                        impressions = entity.impressions ?? 0,
                        significantdate = entity.significantdate ?? null,
                        // parameters.Add("FromTime", model.FromTime, DbType.Time);
                        last_significant_edit_time = entity.time ?? null,
                        reach = entity.reach ?? 0,
                        result = entity.result ?? 0,
                        source = entity.source ?? string.Empty,
                        unique_links_clicks = entity.unique_links_clicks ?? string.Empty,
                        external_id = entity.external_id ?? string.Empty,
                        ad_start_date = entity.ad_start_date ?? null,
                        daily_budget = entity.daily_budget ?? 0,
                        ad_objective = entity.ad_objective ?? string.Empty,
                        CreatedBy = entity.CreatedBy,

                        last_edit = entity.last_edit ?? null,
                        // parameters.Add("FromTime", model.FromTime, DbType.Time);
                        last_edit_time = entity.last_edit_time ?? null,

                    },
                    commandType: CommandType.StoredProcedure) ;

                return pid;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string SaveAdsInsight(FacebookAdsInsight entity, string CallType)
        {
            Guid id = Guid.Empty;
            string message = string.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                message = connection.ExecuteScalar<string>("Sp_Solgen_AddeditFbCampaignInsights",
                    param: new
                    {
                        campaignId = 0,
                        adset_id = entity.adset_id,
                        ad_id = entity.ad_id,
                        accountCurrency = entity.account_currency,
                        accountId = entity.account_id,
                        accountName = entity.account_name,
                        buyingType = entity.buying_type,
                        campaign_id = entity.campaign_id,
                        campaignName = entity.campaign_name,
                        clicks = entity.clicks,
                        actions = entity.actions != null ? JsonConvert.SerializeObject(entity.actions) : "",
                        outboundClicksCtr = entity.outbound_clicks_ctr != null ? JsonConvert.SerializeObject(entity.outbound_clicks_ctr) : "",
                        outboundClicks = entity.outbound_clicks != null ? JsonConvert.SerializeObject(entity.outbound_clicks) : "",
                        costPerUniqueActionType = entity.cost_per_unique_action_type != null ? JsonConvert.SerializeObject(entity.cost_per_unique_action_type) : "",
                        costPerOutboundClick = entity.cost_per_outbound_click != null ? JsonConvert.SerializeObject(entity.cost_per_outbound_click) : "",
                        costPerActionType = entity.cost_per_action_type != null ? JsonConvert.SerializeObject(entity.cost_per_action_type) : "",
                        costPerInlineLinkClick = entity.cost_per_inline_link_click,
                        costPerInlinePostEngagement = entity.cost_per_inline_post_engagement,
                        costPerUniqueClick = entity.cost_per_unique_click,
                        cpc = entity.cpc,
                        cpm = entity.cpm,
                        cpp = entity.cpp,
                        createdTime = entity.created_time?.ToString("yyyy-MM-dd"),
                        ctr = entity.ctr,
                        dateStart = entity.date_start,
                        dateStop = entity.date_stop,
                        frequency = entity.frequency,
                        impressions = entity.impressions,
                        inlineLinkClickCtr = entity.inline_link_click_ctr,
                        inlineLinkClicks = entity.inline_link_clicks,
                        inlinePostEngagement = entity.inline_post_engagement,
                        optimizationGoal = entity.optimization_goal,
                        objective = entity.objective,
                        reach = entity.reach,
                        socialSpend = entity.social_spend,
                        spend = entity.spend,
                        updatedTime = entity.updated_time,
                        wishBid = entity.wish_bid,
                        callType = CallType

                    },
                    commandType: CommandType.StoredProcedure);

                return message;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetAdById(decimal id)
        {
            string message = string.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                message = connection.ExecuteScalar<string>("sp_solgen_GetFacebookAdById",
                    param: new
                    {
                        id = id
                    },
                    commandType: CommandType.StoredProcedure);

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
            return message;
        }

        public string GetCampaignById(decimal id)
        {
            string message = string.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                message = connection.ExecuteScalar<string>("sp_solgen_GetFacebookCampaignById",
                    param: new
                    {
                        id = id
                    },
                    commandType: CommandType.StoredProcedure);

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
            return message;
        }

        public string GetAdsetById(decimal id)
        {
            string message = string.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                message = connection.ExecuteScalar<string>("sp_solgen_GetFacebookAdsetById",
                    param: new
                    {
                        id = id
                    },
                    commandType: CommandType.StoredProcedure);

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
            return message;
        }

        public dynamic GetFacebookCampaignDetails(long id, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_GetFacebookCampaignDetails",
                    new
                    {
                        RefId = id,
                        CompanyId = companyId,
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public List<dynamic> GetFacebookCampaignAdSetDetails(long id, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_GetFacebookCampaignAdSetDetails",
                    new
                    {
                        RefId = id,
                        CompanyId = companyId,
                    }, commandType: CommandType.StoredProcedure).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<PagedData> GetOpportunityList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetOpportunityByFacebookCampaignId",
                param: new
                {
                    CompanyId = companyId,
                    Id = Id,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = Convert.ToInt32(pageSize),
                    PageNo = Convert.ToInt32(pageIndex),
                },
                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize));
                return _data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<PagedData> GetLeadList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetLeadByFacebookCampaignId",
                param: new
                {
                    CompanyId = companyId,
                    Id = Id,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = Convert.ToInt32(pageSize),
                    PageNo = Convert.ToInt32(pageIndex),
                },
                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize));
                return _data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<PagedData> GetAdList(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetAdByAdSetId",
                param: new
                {
                    CompanyId = companyId,
                    Id = Id,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = Convert.ToInt32(pageSize),
                    PageNo = Convert.ToInt32(pageIndex),
                },
                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize));
                return _data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public dynamic GetFacebookAdSetDetails(long id, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_GetFacebookAdSetDetails",
                    new
                    {
                        RefId = id,
                        CompanyId = companyId,
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }


        public dynamic GetAdDetails(long id, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_GetFacebookAdDetailsById",
                    new
                    {
                        id = id,                        
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        
        public ChangeStatusModel DeleteCampaign(string id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                ChangeStatusModel ret = connection.Query<ChangeStatusModel>("Sp_Solgen_DeleteCampaign", new { CampaignId = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return ret;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


        public ChangeStatusModel DeleteAdset(string id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                ChangeStatusModel ret = connection.Query<ChangeStatusModel>("Sp_Solgen_DeleteAdset", new { AdsetId = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return ret;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public ChangeStatusModel DeleteAds(string id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                ChangeStatusModel ret = connection.Query<ChangeStatusModel>("Sp_Solgen_DeleteAds", new { AdId = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return ret;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public string SavedemoLead()
        {
            Guid id = Guid.Empty;
            string pid = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                pid = connection.ExecuteScalar<string>("Sp_Solgen_AddEditFbLead",
                  param: new
                  {
                      facebookCampaignId = "23849780572380080",
                      facebookAdSetId = "23849780572360080",
                      facebookAdId = "23849780572370080",
                      Facebook_Lead_ID = "444444444444",
                      company = "1003",
                      firstname = "Ian",
                      lastName = "F. Follett",
                      Email = "IanFFollett@mailinator.com",
                      phone = "763-212-1228",
                      module_code = "CRM",
                      submodule_code = "lead",
                  },
                  commandType: CommandType.StoredProcedure); ;

                return pid;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<PagedData> GetAdsetListByCampaignId(string Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetAdsetByFacebookCampaignId",
                param: new
                {
                    CompanyId = companyId,
                    Id = Id,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = Convert.ToInt32(pageSize),
                    PageNo = Convert.ToInt32(pageIndex),
                },
                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize));
                return _data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
    }
}