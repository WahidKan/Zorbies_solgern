using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public class WorkOrderRepository : IWorkOrderRepository
    {
        private readonly SolgenDbContext _dbContext;

        public WorkOrderRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> GetDurationByWorkOrderType(int id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_get_duration_by_workOrderType",
                    new
                    {
                        id = id
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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
        public async Task<string> GetWorkOrderAccountDetail(int accountId)
        {
            //[dbo].[sp_solgen_Custom_LocationById]
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_workorder_account_detail",
                    new
                    {
                        accountId=accountId

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        public async Task<string> GetServiceResourceDetail(string UserId)
        {
            //[dbo].[sp_solgen_Custom_LocationById]
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_service_resource_detail",
                    new
                    {
                        user_id = UserId

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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
        public async Task<string> GetWorkOrderById(string id, string moduleName, string submoduleName, string companyId, string userId)
        {
            //[dbo].[sp_solgen_Custom_LocationById]
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("",
                    new
                    {
                        departmetId = id,
                        moduleName = moduleName,
                        submoduleName = submoduleName,
                        userId = userId,
                        companyId = companyId

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        public async Task<string> GetWorkOrderList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long? companyId, string custom_view_id, bool isAllRecords)
        {
            //[dbo].[sp_solgen_Custom_Location_Listing]
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_WorkOrder_Listing", param: new
                {
                    VIEWER_ID = userId,
                    COMPANY_ID = companyId,
                    SORT_BY = sortDir,
                    SORT_EXP = sortColumn,
                    PAGESIZE = pageSize,
                    PAGENUMBER = pageIndex,
                    SEARCH_CONDITION = nameSearch,
                    ModuleName = moduleName,
                    subModuleName = submoduleName,
                    view_port_id = custom_view_id,
                    isAllRecords= isAllRecords
                }
                , commandType: CommandType.StoredProcedure).FirstOrDefault());
                return dataList;
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
        public async Task<string> GetServiceResourseServiceList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_ServiceResource_Listing", param: new
                {
                    VIEWER_ID = userId,
                    COMPANY_ID = companyId,
                    SORT_BY = sortDir,
                    SORT_EXP = sortColumn,
                    PAGESIZE = pageSize,
                    PAGENUMBER = pageIndex,
                    SEARCH_CONDITION = nameSearch,
                    ModuleName = moduleName,
                    subModuleName = submoduleName,
                    view_port_id = custom_view_id,
                    isAllRecords = isAllRecords
                }
                , commandType: CommandType.StoredProcedure).FirstOrDefault());
                return dataList;
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
        public async Task<string> AddEditWorkOrder(CommanJsonModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.Id);
                //parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@JSON", (model.FormJsonData.Replace("'", "\''")));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                string data = await connection.QueryFirstOrDefaultAsync<string>("sp_solgen_AddEditWorkOrder_custom", parameters, commandType: CommandType.StoredProcedure);

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
        public async Task<string> AddOrUpdateResourceService(ResourceServiceModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.Id);
                //parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@JSON", (model.FormJsonData.Replace("'", "\''")));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                parameters.Add("@companyId", (model.companyId));
                string data = await connection.QueryFirstOrDefaultAsync<string>("sp_solgen_AddEditServiceResourse_custom"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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
        public async Task<PagedData> GetServiceTerritoryList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string CompanyId, string UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetResourceServiceByTeritorry",
                param: new
                {
                    CompanyId = CompanyId,
                    ServiceId = ServiceId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = pageSize,
                    PageNo = pageIndex
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

        public async Task<PagedData> GetServiceAppointmentList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetResourceServiceByAppointment",
                param: new
                {
                    CompanyId = CompanyId,
                    ServiceId = ServiceId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = pageSize,
                    PageNo = pageIndex
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
        public async Task<PagedData> GetServiceServiceCrewList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetResourceServiceByServiceCrew",
                param: new
                {
                    CompanyId = CompanyId,
                    ServiceId = ServiceId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = Convert.ToInt32(pageSize),
                    PageNo = Convert.ToInt32(pageIndex)
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
        public async Task<PagedData> GetServiceSkillList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetResourceServiceBySkillCrew",
                param: new
                {
                    CompanyId = CompanyId,
                    ServiceId = ServiceId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = Convert.ToInt32(pageSize),
                    PageNo = Convert.ToInt32(pageIndex)
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

        //added new
        public async Task<PagedData> GetServiceCrewSkillList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetCrewServiceBySkill",
                param: new
                {
                    CompanyId = CompanyId,
                    ServiceId = ServiceId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = Convert.ToInt32(pageSize),
                    PageNo = Convert.ToInt32(pageIndex)
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
        public async Task<PagedData> GetServiceGetAbcenseList(string ServiceId, string sortColumn, string sortDir, string pageIndex, string pageSize, string UserId, string CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("SP_Solgen_GetResourceServiceByAbcenseList",
                param: new
                {
                    CompanyId = CompanyId,
                    ServiceId = ServiceId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = Convert.ToInt32(pageSize),
                    PageNo = Convert.ToInt32(pageIndex)
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
        public async Task<int> SaveServiceSkill(ServiceResourceSkillModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@skillId", model.skillId);
                parameters.Add("@serviceResource", (model.serviceResource));
                parameters.Add("@skill", (model.skill));
                parameters.Add("@skillLevel", (model.skillLevel));
                parameters.Add("@startDate", (model.startDate));
                parameters.Add("@endDate", (model.endDate));
                parameters.Add("@startTime", model.startTime);
                parameters.Add("@endTime", model.endTime);
                parameters.Add("@ResourceId", model.ResourceId);
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@companyId", model.companyId);
                int data = connection.QueryFirstOrDefault<int>("Sp_Solgen_AddUpdateServiceResourceSkill"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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
        public async Task<int> SaveServiceCrewSkill(ServiceResourceSkillModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@skillId", model.skillId);
                parameters.Add("@serviceResource", (model.serviceResource));
                parameters.Add("@skill", (model.skill));
                parameters.Add("@skillLevel", (model.skillLevel));
                parameters.Add("@startDate", (model.startDate));
                parameters.Add("@endDate", (model.endDate));
                parameters.Add("@startTime", model.startTime);
                parameters.Add("@endTime", model.endTime);
                parameters.Add("@ResourceId", model.ResourceId);
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@companyId", model.companyId);
                int data = connection.QueryFirstOrDefault<int>("Sp_Solgen_AddUpdateServiceCrewSkill"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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

        public async Task<int> SaveServiceTerritory(ServiceTerritoryModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@territoryId", model.territoryId);
                parameters.Add("@serviceResource", (model.serviceResource));
                parameters.Add("@serviceTerritoryId", (model.serviceTerritoryId));
                parameters.Add("@territoryType", (model.territoryType));
                parameters.Add("@startDate", (model.startDate));
                parameters.Add("@endDate", (model.endDate));
                parameters.Add("@address", model.address);
                parameters.Add("@country", model.country);
                parameters.Add("@addressDes", model.addressDes);

                parameters.Add("@city", model.city);
                parameters.Add("@state", model.state);
                parameters.Add("@zipCode", model.zipCode);
                parameters.Add("@operatingHours", model.operatingHours);

                parameters.Add("@UserId", model.UserId);
                parameters.Add("@companyId", model.companyId);
                int data = connection.QueryFirstOrDefault<int>("Sp_Solgen_AddUpdateServiceResourceTerritory"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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
        public async Task<int> SaveServiceCrew(ServiceResourceCrewModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@crewMemberId", model.crewMemberId);
                parameters.Add("@serviceResource", (model.serviceResource));
                parameters.Add("@serviceCrew", (model.serviceCrew));
                parameters.Add("@isLeader", (model.isLeader));
                parameters.Add("@startDate", (model.startDate));
                parameters.Add("@endDate", (model.endDate));
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@companyId", model.CompanyId);
                int data = connection.QueryFirstOrDefault<int>("Sp_Solgen_AddUpdateServiceResourceCrew"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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
        public async Task<int> SaveServiceAbcense(ServiceAbcenseModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", model.id);
                parameters.Add("@recordType", (model.recordType));
                parameters.Add("@serviceResource", (model.serviceResource));
                parameters.Add("@type", (model.type));
                parameters.Add("@startDate", (Convert.ToDateTime(model.startDate)));
                parameters.Add("@endDate", model.endDate);

                parameters.Add("@description", (model.description));
                parameters.Add("@ganttLabel", (model.ganttLabel));
                parameters.Add("@country", (model.country));
                parameters.Add("@addressDes", (model.addressDes));
                parameters.Add("@city", (model.city));
                parameters.Add("@state", (model.state));
                parameters.Add("@zipCode", (model.zipCode));

                parameters.Add("@UserId", model.userId);
                parameters.Add("@companyId", model.CompanyId);
                int data = connection.QueryFirstOrDefault<int>("Sp_Solgen_AddUpdateServiceResourceAbcense"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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
        public async Task<int> addeditProductRequired(ProductRequiredModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", model.Id);
                parameters.Add("@ParentRecord", (model.ParentRecord));
                parameters.Add("@ProductRequired", (model.ProductRequired));
                parameters.Add("@QuantityRequired", (model.QuantityRequired));
                parameters.Add("@DateDelivered", model.DateDelivered == null ? null : (DateTime?)(Convert.ToDateTime(model.DateDelivered)));
                parameters.Add("@QuantityUnitOfMeasure", model.QuantityUnitOfMeasure);
                parameters.Add("@WorkOrderId", (model.WorkOrderId));
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@companyId", model.CompanyId);
                int data = connection.QueryFirstOrDefault<int>("Sp_Solgen_AddUpdateProductRequiredReport"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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

        public async Task<string> AddeditEngineeringQuestionData(AddeditEngineeringQuestionModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", model.workOrderId);
                parameters.Add("@MpuNeeded", (model.mpuNeeded));
                parameters.Add("@TrenchingNeeded", (model.TrenchingNeeded));
                parameters.Add("@RetrofitNeeded", (model.RetrofitNeeded));
                parameters.Add("@InterconnectionType", (model.InterconnectionType));
                parameters.Add("@NumberOfArrays", (model.NumberOfArrays));
                parameters.Add("@RoofMaterial", (model.RoofMaterial));
                parameters.Add("@RoofTilt", (model.RoofTilt));
                parameters.Add("@MidClamps", (model.MidClamps));
                parameters.Add("@EndClamps", (model.EndClamps));
                parameters.Add("@GroundingLugs", (model.GroundingLugs));
                parameters.Add("@TBolts", (model.TBolts));
                parameters.Add("@EndCovers", (model.EndCovers));
                parameters.Add("@Splice", (model.Splice));
                parameters.Add("@Flashings", (model.Flashings));
                parameters.Add("@Rail", (model.Rail));
                parameters.Add("@RailWeight", (model.RailWeight));
                parameters.Add("@ModuleWeight", (model.ModuleWeight));
                parameters.Add("@PSF", (model.PSF));
                parameters.Add("@TotalWeight", (model.TotalWeight));
                parameters.Add("@ENGFirstReviewBy", (model.ENGFirstReviewBy));
                parameters.Add("@ENGFirstReviewDate", (model.ENGFirstReviewDate));
                parameters.Add("@ENGSecondReviewBy", (model.ENGSecondReviewBy));
                parameters.Add("@ENGSecondReviewDate", model.ENGSecondReviewDate == null ? null : (DateTime?)(Convert.ToDateTime(model.ENGSecondReviewDate)));
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@companyId", model.CompanyId);
                string data = connection.QueryFirstOrDefault<string>("Sp_Solgen_AddeditEngineeringQuestionData"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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
        public async Task<string> addeditWorkOrderLineItem(workOrderLineItemModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", model.lineItem_id);
                parameters.Add("@lineItemNo", (model.lineItemNo));
                parameters.Add("@workOrder", (model.workOrder));
                parameters.Add("@status", (model.status));
                parameters.Add("@statusCategory", (model.statusText));
                parameters.Add("@completedDate", (model.completedDate));
                parameters.Add("@subject", (model.subject));
                parameters.Add("@description", (model.description));
                parameters.Add("@companyId", model.CompanyId);
                parameters.Add("@UserId", model.UserId);
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_addeUpdateWorkOrderLineItem"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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
        

            public workOrderLineItemModel getLineItemById(long id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                workOrderLineItemModel ret = connection.Query<workOrderLineItemModel>("sp_solgen_GetEditWorkOrder_LineItemById", new
                {
                    Id = id
                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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

        public async Task<PagedData> GetWorkOrderServiceAppointmentList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetServiceAppointmentByWorkOrderId",
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

        public async Task<PagedData> GetWorkOrderProductRequiredList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetWorkOrderForProductRequiredList",
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
        public async Task<PagedData> GetOpportunityList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetOpportunityByWorkOrderId",
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

        public async Task<string> GetEngineeringQuestionData(long workOrderId, long companyID, string UserId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("workOrderId", workOrderId, DbType.Int64);
                parameters.Add("company_id", companyID, DbType.Int64);
                parameters.Add("UserId", UserId, DbType.String);
                dynamic data =  connection.ExecuteScalar<string>("sp_solgen_GetEngineeringQuestionData", parameters, commandType: CommandType.StoredProcedure);
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

        public async Task<string> GetWorkOrderProposal(long workOrderId, long companyID)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("workOrderId", workOrderId, DbType.Int64);
                parameters.Add("company_id", companyID, DbType.Int64);
                dynamic data = await connection.ExecuteScalarAsync<string>("sp_solgen_WorkOrderProposal", parameters, commandType: CommandType.StoredProcedure);
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
        public async Task<int> AddEditfixOrder(FixOrderJsonModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", model.object_id);
                parameters.Add("@workOrderId", (model.object_ref_id));
                parameters.Add("@departmentId", (model.departmentId));
                parameters.Add("@deptSubCategoryId", (model.departmentSubCategoryId));
                parameters.Add("@description", (model.fixOrderDescription));
                parameters.Add("@UserId", model.userId);
                parameters.Add("@companyId", model.companyId);
                int data = connection.QueryFirstOrDefault<int>("Sp_Solgen_AddEditFixOrder"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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

        public async Task<string> GetFixOrderData(string workOrderid,  string companyId, string userId)
        {
            //[dbo].[sp_solgen_Custom_LocationById]
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetFixOrderByWorkOrder",
                    new
                    {
                        workOrderId = workOrderid,
                        UserId = userId,
                        CompanyId = companyId

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        public async Task<PagedData> GetWorkOrderLineItemList(long workorderid, string sortColumn, string sortDir, int PageNo, int pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_Get_WorkOrder_LineItem_List",
                param: new
                {
                    CompanyId = companyId,
                    workorderid = workorderid,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = Convert.ToInt32(pageSize),
                    PageNo = Convert.ToInt32(PageNo),
                    UserId=UserId
                },
                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(PageNo), Convert.ToInt32(pageSize));
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

        public async Task<string> updateStatusOrCreateLog(StartWorkOrderModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await connection.ExecuteScalarAsync<string>("sp_solgen_updateStatusOrCreateLog_WorkOrder",
                param: new
                {
                    companyId = model.companyId,
                    status = model.statusId,
                    moduleName=model.moduleName,
                    subModuleName=model.submoduleName,
                    userId = model.userId,
                    workOrderId = model.workOrderId,
                    displayType=model.displayType
                },
                commandType: CommandType.StoredProcedure); 
                return data;
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

        public async Task<PagedData> GetWorkOrderHistoryList(long workorderid, string sortColumn, string sortDir, long PageNo, long pageSize)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                    var dataList = await connection.QueryAsync("sp_solgen_Get_WorkOrder_History_List",
                param: new
                {
                    workorderid = workorderid,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = Convert.ToInt32(pageSize),
                    PageNo = Convert.ToInt32(PageNo),
                },
                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(PageNo), Convert.ToInt32(pageSize));
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

        public async Task<string> AddEditSkill(SkillModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@skillId", model.Id);
                parameters.Add("@skill", (model.Skill));
                parameters.Add("@skillLevel", (model.SkillLevel));
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@companyId", model.companyId);
                string data = connection.QueryFirstOrDefault<string>("Sp_Solgen_AddEditSkill"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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


        public async Task<string> AddEditTimezone(TimeZoneModel models)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", models.Id);
                parameters.Add("@timeZone", (models.timeZone));
                parameters.Add("@status", (models.status));
                parameters.Add("@UserId", models.UserId);
                parameters.Add("@companyId", models.companyId);
                string data = connection.QueryFirstOrDefault<string>("Sp_Solgen_AddEditTimezone"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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


        public async Task<PagedData> GetManageSkillListingData(string name,string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("Sp_Solgen_GetManageSkillListingData",
            param: new
            {
                Searchname= name,
                SortColumn = sortColumn,
                SortDir = sortDir,
                PageNo = Convert.ToInt32(PageNo),
                PageSize = Convert.ToInt32(pageSize),
                CompanyId = companyId,
                UserId = UserId
            },
            commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(PageNo), Convert.ToInt32(pageSize));
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

        public async Task<PagedData> GetTimezoneListingData(string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("Sp_Solgen_GetTimezoneListingData",
            param: new
            {
                Searchname = name,
                SortColumn = sortColumn,
                SortDir = sortDir,
                PageNo = Convert.ToInt32(PageNo),
                PageSize = Convert.ToInt32(pageSize),
                CompanyId = companyId,
                UserId = UserId
            },
            commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(PageNo), Convert.ToInt32(pageSize));
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

        public async Task<PagedData> GetRequirementListingData(string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("Sp_Solgen_GetRequirementListingData",
            param: new
            {
                Searchname = name,
                SortColumn = sortColumn,
                SortDir = sortDir,
                PageNo = Convert.ToInt32(PageNo),
                PageSize = Convert.ToInt32(pageSize),
                CompanyId = companyId,
                UserId = UserId
            },
            commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(PageNo), Convert.ToInt32(pageSize));
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


        public async Task<string> AddeditRequirement(requirementModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", model.Id);
                parameters.Add("@requirementName", (model.requirementName));
                parameters.Add("@pertainsTo", (model.pertainsTo));
                parameters.Add("@recordType", (model.recordType));
                parameters.Add("@requiredby", (model.requiredby));
                parameters.Add("@type", (model.type));
                parameters.Add("@serviceTerritory", (model.serviceTerritory));
                parameters.Add("@isActive", (model.isActive));
                parameters.Add("@description", (model.description));
                parameters.Add("@permittingCost", (model.permittingCost));
                parameters.Add("@callforInspection", (model.callforInspection));
                parameters.Add("@approvalDuration", (model.approvalDuration));
                parameters.Add("@submitforPTO", (model.submitforPTO));
                parameters.Add("@meterInstalled", (model.meterInstalled));
                parameters.Add("@approvalReceived", (model.approvalReceived));
                parameters.Add("@Notes", (model.Notes));
                parameters.Add("@externalID", (model.externalID));
                parameters.Add("@Owner", (model.Owner));
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@companyId", model.companyId);
                string data = connection.QueryFirstOrDefault<string>("Sp_Solgen_AddeditRequirement"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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

        public async Task<string> DeleteSkill(int Id, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<string>("sp_solgen_deleteSkill", new { Id = Id, CompanyId = companyId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
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

        public async Task<PagedData> GetWorkTypeListingData(string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("Sp_Solgen_GetWorkTypeListingData",
            param: new
            {
                Searchname = name,
                SortColumn = sortColumn,
                SortDir = sortDir,
                PageNo = Convert.ToInt32(PageNo),
                PageSize = Convert.ToInt32(pageSize),
                CompanyId = companyId,
                UserId = UserId
            },
            commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(PageNo), Convert.ToInt32(pageSize));
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

        public async Task<string> AddeditWorkTypeRecords(workTypeModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", model.id);
                parameters.Add("@workTypeName", (model.workTypeName));
                parameters.Add("@description", (model.description));
                parameters.Add("@serviceReportTemplate", (model.serviceReportTemplate));
                parameters.Add("@isAutoCreateServiceAppointment", (model.isAutoCreateServiceAppointment));
                parameters.Add("@dueDateOffset", (model.dueDateOffset));
                parameters.Add("@isExactAppointments", (model.isExactAppointments));
                parameters.Add("@minimumCrewSize", (model.minimumCrewSize));
                parameters.Add("@estimatedDuration", (model.estimatedDuration));
                parameters.Add("@maxDuration", (model.maxDuration));
                parameters.Add("@recommendedCrewSize", (model.recommendedCrewSize));
                parameters.Add("@durationTypeId", (model.durationTypeId));
                parameters.Add("@constructionStageId", (model.constructionStageId));
                parameters.Add("@isHoldsUpInstall", (model.isHoldsUpInstall));
                parameters.Add("@workOrderLineTemplate", (model.workOrderLineTemplate));
                parameters.Add("@createWorkOrdersOnContractClose", (model.createWorkOrdersOnContractClose));
                parameters.Add("@commissionTypeId", (model.commissionTypeId));
                parameters.Add("@commissionValue", (model.commissionValue));
                parameters.Add("@colorCode", (model.colorCode));
                parameters.Add("@isActive", (model.IsActive));
                parameters.Add("@UserId", model.Userid);
                parameters.Add("@companyId", model.CompanyId);
                parameters.Add("@duration", model.duration);
                string data = connection.QueryFirstOrDefault<string>("Sp_Solgen_AddeditWorkTypeRecords"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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

        public async Task<PagedData> GetEditWorkTypeRecordsById(string Id, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("Sp_Solgen_GetEditWorkTypeRecordById",
            param: new
            {
                Id = Id,
                CompanyId = companyId,
                UserId = UserId
            },
            commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, 10,10);
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

        public async Task<string> DeleteWorkType(int Id, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<string>("sp_solgen_DeleteWorkType", new { Id = Id, CompanyId = companyId, UserId= UserId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
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

        public async Task<string> AddEditProductRequiredData(ProductRequiredmodel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", model.productRequired_id);
                parameters.Add("@parentRecordId", (model.parentRecordId));
                parameters.Add("@productRequired", (model.productRequired));
                parameters.Add("@quantityRequired", (model.quantityRequired));
                parameters.Add("@dateDelivered", (model.dateDelivered));
                parameters.Add("@quantityUnitOfMeasureId", (model.quantityUnitOfMeasureId));
                parameters.Add("@UserId", model.Userid);
                parameters.Add("@companyId", model.CompanyId);
                string data = connection.QueryFirstOrDefault<string>("Sp_Solgen_AddEditProductRequiredData"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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

        public async Task<PagedData> GetProductRequiredGridData( string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId,int WorkOrderId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("Sp_Solgen_GetProductRequiredGridData",
            param: new
            {
                SortColumn = sortColumn,
                SortDir = sortDir,
                PageNo = Convert.ToInt32(PageNo),
                PageSize = Convert.ToInt32(pageSize),
                CompanyId = companyId,
                UserId = UserId,
                WorkOrderId = WorkOrderId
            },
            commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(PageNo), Convert.ToInt32(pageSize));
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

        public async Task<PagedData> GetSkillRequirementsGridData(string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("Sp_Solgen_GetSkillRequirementsGridData",
            param: new
            {
                SortColumn = sortColumn,
                SortDir = sortDir,
                PageNo = Convert.ToInt32(PageNo),
                PageSize = Convert.ToInt32(pageSize),
                CompanyId = companyId,
                UserId = UserId
            },
            commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(PageNo), Convert.ToInt32(pageSize));
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

        public async Task<string> AddEditskillRequirementsData(SkillRequirementModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", model.skillRequirement_id);
                parameters.Add("@RequiredForId", (model.requiredFor));
                parameters.Add("@SkillRequirementId", (model.skillRequirement));
                parameters.Add("@SkillLevel", (model.skillLevel));
                parameters.Add("@UserId", model.Userid);
                parameters.Add("@companyId", model.CompanyId);
                string data = connection.QueryFirstOrDefault<string>("Sp_Solgen_AddEditskillRequirementsData"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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


        public string WorkOrderAuditReviewData(long id, string accountId,long companyId, Guid userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<string>("Solgen_SP_GetCheckListData", new
                {
                    WorkOrderId = id,
                    CompanyId = companyId,
                    AccountId= accountId,
                    userId = userid

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


        public string GetWorkOrderSumaryData(long workOrderId, long companyID, string UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<string>("sp_solgen_GetWorkOrderSumaryByWorkorderId", new
                {
                    WorkOrderId = workOrderId,
                    CompanyId = companyID,
                    userId = UserId

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



        public async Task<string> GetZonesLocationsList(long companyID, long offset,string searchText)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data =await connection.ExecuteScalarAsync<string>("sp_solgen_getLocationsList", new
                {
                    Offset = offset,
                    CompanyId = companyID,
                    SearchText = searchText

                }, commandType: CommandType.StoredProcedure); 

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


        public async Task<PagedData> GetSiteZonePriorityList(string sortColumn, string sortDir, long pageNo, long pageSize, long primaryKey)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var dataList = await connection.QueryAsync("sp_solgen_GetSiteZonePriorityList",
                param: new
                {
                    SortColumn = sortColumn,
                    SortDir = sortDir,
                    PageNo = Convert.ToInt32(pageNo),
                    PageSize = Convert.ToInt32(pageSize),
                    PrimaryKey = Convert.ToInt32(primaryKey)
                },
                commandType: CommandType.StoredProcedure); 

                var _data = new PagedData(dataList, Convert.ToInt32(pageNo), Convert.ToInt32(pageSize));
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

        public async Task<string> GetSiteZonePriorityListForEdit(long primaryKey)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = await connection.ExecuteScalarAsync<string>("sp_solgen_GetSiteZonePriorityListForEdit", new
                {
                    primaryKey = primaryKey
                }, commandType: CommandType.StoredProcedure);

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
        
                public async Task<dynamic> GetAutoGenerateLineItemNo(long PworkOrderId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                var data = await connection.QueryAsync("sp_solgen_GetAutoGenerateLineItemNo",
                param: new
                {
                    WorkOrderId = PworkOrderId
                   
                },
                commandType: CommandType.StoredProcedure);

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
        public async Task<dynamic> getWorkOrderList(long PworkOrderId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                List<WorkOrderItems> dataList = new List<WorkOrderItems>();
                dataList = connection.Query<WorkOrderItems>("sp_solgen_GetWorkOrederListForLineItem",
                    new { PWorkOrderId = PworkOrderId }
                , commandType: System.Data.CommandType.StoredProcedure).ToList();

                return dataList;
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
        public async Task<dynamic> getlineItemStatusList(long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                List<WorkOrderStatus> dataList = new List<WorkOrderStatus>();
                dataList = connection.Query<WorkOrderStatus>("sp_solgen_GetWorkOrederStatusListForLineItem",
                    new { companyId = companyId }
                , commandType: System.Data.CommandType.StoredProcedure).ToList();

                return dataList;
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

        public async Task<string> ManagetSiteSurveyZonePriority(SiteSurveyModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = await connection.ExecuteScalarAsync<string>("sp_solgen_ManagetSiteSurveyZonePriority", new
                {
                    primaryKey = model.Id,
                    FormJson = model.FormJsonData
                }, commandType: CommandType.StoredProcedure);

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


        #region Project Requirement
        public async Task<PagedData> GetProjectRequirementListingData(string AccountNumber,string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("Sp_Solgen_GetprojectRequirementListingData",
            param: new
            {
                Searchname = name,
                AccountNumber = AccountNumber,
                SortColumn = sortColumn,
                SortDir = sortDir,
                PageNo = Convert.ToInt32(PageNo),
                PageSize = Convert.ToInt32(pageSize),
                CompanyId = companyId,
                UserId = UserId
            },
            commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(PageNo), Convert.ToInt32(pageSize));
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


        public List<MasterItems> GetRequirementDll(Guid userid, long companyid, string id, int length, string serchText)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<MasterItems>("[sp_solgen_GetRequirementDll]", new
                {
                    userid = userid,
                    companyid = companyid,
                    id = id,
                    length = length,
                    serchText = serchText

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

        public string GetRequirementById(string id, string companyId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("Sp_Solgen_GetprojectRequirement_ById",
                    new
                    {
                        Id = id,
                        CompanyId = companyId
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
        public async Task<string> AddeditProjectRequirement(requirementModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", model.Id);
                parameters.Add("@Name", (model.requirementName));
                parameters.Add("@Requirement_Type__c", (model.type));
                parameters.Add("@Type__c", (model.type));
                parameters.Add("@Required_by__c", model.UserId); 
                parameters.Add("@AccountId", (model.Account));
                parameters.Add("@Requirement_Description__c", (model.description));
                parameters.Add("@Completed_Date__c", (model.CompltedDate));
                parameters.Add("@Date_Submitted__c", (model.DateSubmitted));
                parameters.Add("@Original_Due_Date__c", (model.OrginalDueDate));
                parameters.Add("@Due_Date__c", (model.DueDate));
                parameters.Add("@RecordTypeName__c", (model.recordType));
                parameters.Add("@Status__c", (model.requirementStatus));
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@companyId", model.companyId);

                parameters.Add("@Required_By", model.Required_By1);
                parameters.Add("@TypeId", model.TypeId);
                parameters.Add("@SGStatusId", model.SGStatusId);
                parameters.Add("@RequirementId", model.RequirementId);
                
                string data = connection.QueryFirstOrDefault<string>("Sp_Solgen_AddeditprojectRequirement"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

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
        #endregion
    }
}
