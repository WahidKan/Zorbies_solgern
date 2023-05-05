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
    public class ServiceAppointmentRepository : IServiceAppointmentRepository
    {

        private readonly SolgenDbContext _dbContext;

        public ServiceAppointmentRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<string> GetProductById(string id, string moduleName, string submoduleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_ProductListingById",
                    new
                    {
                        productId = id,
                        moduleName = moduleName,
                        submoduleName = submoduleName

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
        public async Task<string> GetServiceAppointmentList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, string form_type, string date, bool isDaySelected, string searchColumn, bool isWeekSelected,bool isAllRecords)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_Service_Appointment_Listing_map", param: new
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
                    screen_type= form_type,
                    display_date = date,
                    IsDaySelected = isDaySelected,
                    searchColumn = searchColumn,
                    isAllRecords = isAllRecords
                }
                , commandTimeout: 0, commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        public string AddEditProduct(JsonModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.Id);
                parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                parameters.Add("@companyId", (model.companyId));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditProduct_custom"
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

        public PagedData GetPriceBookList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, long productid, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (string.IsNullOrEmpty(nameSearch) || nameSearch == "undefined") { nameSearch = ""; }
                connection.Open();
                var data = connection.Query("sp_solgen_GetPriceBookListforProduct", param: new
                {
                    NameSearch = nameSearch,
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID,
                    productid = productid
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();
                return new PagedData(data, PageNo, PageSize);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }

        public async Task<PagedData> GetProductsPriceBooksList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_ProductPriceBooks_Listing",
                param: new
                {
                    CompanyId = companyId,
                    ProductId = productId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = pageSize,
                    PageNo = pageIndex
                },
                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, pageIndex, pageSize);
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

        public async Task<PagedData> GetProductCampaignsList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_ProductCampaign_Listing",
                param: new
                {
                    CompanyId = companyId,
                    ProductId = productId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = pageSize,
                    PageNo = pageIndex
                },
                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, pageIndex, pageSize);
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
        public string GetserviceAppointmentListCountForMobile(Guid guid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                string dataList = connection.QueryFirstOrDefault<string>("sp_solgen_GetServiceAppointmentsListCount",
                param: new
                {


                    UserId = guid,
                    CompanyId = companyId,

                },
                commandType: CommandType.StoredProcedure);
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
        public PagedData GetserviceAppointmentListForMobile(string SortDir, string SortColumn, int PageNo, int PageSize, DateTime currentDate, Guid UserId, long CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetServiceAppointmentsList",
                param: new
                {
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    currentDate = currentDate,
                    UserId = UserId,
                    CompanyId = CompanyID,

                },
                commandType: CommandType.StoredProcedure).ToList();
                var _data = new PagedData(dataList, PageNo, PageSize);
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

        public string GetCheckListListing(Guid UserId, long CompanyID, long questionId, long serviceAppointmentId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query<String>("solgen_GetChecklistAnswerlisting",
                param: new
                {
                    CompanyId = CompanyID,
                    userid = UserId,
                    QuestionId = questionId,
                    ServiceAppointmentId = serviceAppointmentId,

                    //SortDir = SortDir,
                    //SortColumn = SortColumn,
                    //PageNo = PageNo,
                    //PageSize = PageSize,
                    //currentDate = currentDate,
                    //UserId = UserId,
                    //CompanyId = CompanyID,

                },
                commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        public string GetserviceAppointmentWorkOrderForMobile(int WorkOrderId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                string dataList = connection.QueryFirstOrDefault<string>("SOLGEN_SP_Get_WorkOrderDetails",
                param: new
                {
                    WorkOrderID = WorkOrderId



                },
                commandType: CommandType.StoredProcedure);
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
        public string GetWorkOrderAccountDetailForMobile(int accountid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                string dataList = connection.QueryFirstOrDefault<string>("SOLGEN_SP_Get_AccountDetails",
                param: new
                {
                    AccountID = accountid
                },
                commandType: CommandType.StoredProcedure);
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
        
        public string GetserviceAppointmentStatusForMobile()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                string dataList = connection.QueryFirstOrDefault<string>("SOLGEN_SP_Get_ServiceAppointment_Status",
                param: new
                {



                },
                commandType: CommandType.StoredProcedure);
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
        public string UpdateAppointmentStatusForMobile(ServiceAppointmentStatusModel model)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                string dataList = connection.QueryFirstOrDefault<string>("SOLGEN_SP_Update_ServiceAppointment_Status",
                param: new
                {

                    UserId = model.UserId,
                    ServiceAppointmentID = model.ServiceAppointmentID,
                    CompanyId = model.CompanyId,
                    Name = model.Name,
                    id = model.ID

                },
                commandType: CommandType.StoredProcedure);
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
        public string GetCurrentAppointmentStatusForMobile(ServiceAppointmentStatusModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                string dataList = connection.QueryFirstOrDefault<string>("SOLGEN_SP_Get_ServiceAppointment_Status_ByAppointmentId",
                param: new
                {

                    UserId = model.UserId,
                    ServiceAppointmentID = model.ServiceAppointmentID,
                    CompanyId = model.CompanyId,


                },
                commandType: CommandType.StoredProcedure);
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
        public string GetQuestionairForMobile(ServiceAppointmentStatusModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (model.version != "2.7")
                {


                    string dataList = connection.QueryFirstOrDefault<string>("sp_solgen_Get_Questionair",
                    param: new
                    {
                        SERVICE_APPT_ID = model.ServiceAppointmentID,
                        LOGGEDIN_USER_ID = model.UserId,
                        VISIBLE_TO = model.Name,
                        COMPANY_ID = model.CompanyId,
                        CHECKLIST_ID = model.ID
                    },
                    commandType: CommandType.StoredProcedure);
                    return dataList;
                }
                else
                {
                    string dataList = connection.QueryFirstOrDefault<string>("sp_solgen_Get_Questionair_version",
                    param: new
                    {
                        SERVICE_APPT_ID = model.ServiceAppointmentID,
                        LOGGEDIN_USER_ID = model.UserId,
                        VISIBLE_TO = model.Name,
                        COMPANY_ID = model.CompanyId,
                        CHECKLIST_ID = model.ID,
                        Version=model.version
                    },
                    commandType: CommandType.StoredProcedure);
                    return dataList;
                }
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


        public string SaveQuestionFile(SaveQuestionFileModel model)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                string dataList = connection.QueryFirstOrDefault<string>("SOLGEN_SP_SAVE_ServiceAppointment_Question_Image",
                param: new
                {
                    sectionId = model.sectionId,
                    questionId = model.questionId,
                    note = model.note,
                    imgId = model.imgId,
                    userId = model.userId,
                    companyid = model.companyid,
                    ServiceApptId = model.ServiceApptId

                },
                commandType: CommandType.StoredProcedure);
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
        public string DeleteAnswerForMobile(Guid userId, int companyId, int AnswerId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                string dataList = connection.QueryFirstOrDefault<string>("SOLGEN_sp_DeleteAnswer",
                param: new
                {
                    answerId = AnswerId,
                    userId = userId,
                    companyId = companyId

                },
                commandType: CommandType.StoredProcedure);
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
        public string SaveQuestionairForMobile(Guid userId, int companyId, string JsonData)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                string dataList = connection.QueryFirstOrDefault<string>("SP_solgen_save_questionair",
                param: new
                {
                    jsonData = JsonData,
                    userId = userId,
                    companyId = companyId

                },
                commandType: CommandType.StoredProcedure);
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

        public string AddEditServiceAppointment(ServiceAppointmentModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.ServiceAppointmentId);
                //parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@JSON", (model.FormJsonData.Replace("'", "\''")));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditServiceAppointment_custom"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

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
        //addEditAudit

        public string CreateDublicateServiceAppt(string serviceApptId, string userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", serviceApptId);
                //parameters.Add("@JSON", (model.FormJsonData));
                //parameters.Add("@JSON", (model.FormJsonData.Replace("'", "\''")));
                parameters.Add("@USER_ID", (userid));
                //parameters.Add("@module_code", (model.ModuleCode));
                //parameters.Add("@submodule_code", (model.SubModuleCode));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_CreateDublicateServiceAppt"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

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

        public string addEditAudit(ServiceAppointmentModel model,Int64 CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@jsonData", (model.FormJsonData));
                parameters.Add("@jsonAnswerData", (model.SubModuleCode));
                parameters.Add("@USER_ID", (model.userId)); 
                parameters.Add("@companyId", (CompanyId));
                string data = connection.QueryFirstOrDefault<string>("SP_solgen_AddEditAudit_v1"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);


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


        public List<MasterItems> GetServiceResourceDll(Guid userid, long companyid, string id,int length, string serchText, long departmentid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<MasterItems>("[sp_solgen_GetServiceResourceDll]", new
                {
                    userid = userid,
                    companyid = companyid,
                    id= id,
                    length=length,
                    serchText= serchText,
                    departmentid=departmentid

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

        public List<MasterItems> GetServiceCrewDll(Guid userid, long companyid, string id, int length, string serchText)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                     
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<MasterItems>("[sp_solgen_GetServiceCrewDll]", new
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

        public List<MasterItems> GetEstimatedTravelTimeFromAndToSourceDll(Guid userid, long companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<MasterItems>("[GetEstimatedTravelTimeFromAndToSourceDll]", new
                {
                    userid = userid,
                    companyid = companyid

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
        public string GetServiceapoointDetails(string id, string companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();


                var data = connection.Query<string>("Sp_SolgenAppointmentDetailById", new
                {
                    id = id,
                    companyId = companyId 

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
        public string SaveAssignedResources(AssignedResourcesModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.Id);
                parameters.Add("@ServiceAppointment", (model.serviceAppointment));
                parameters.Add("@ServiceResource", (model.serviceResourceId));
                parameters.Add("@EstimatedTravelTime", (model.estimatedTravelTime));
                parameters.Add("@ActualTravelTime", (model.actualTravelTime));
                parameters.Add("@ServiceCrewId", (model.serviceCrewId));
                parameters.Add("@EstimatedTravelTimeFromSourceId", (model.estimatedTravelTimeFromSourceId));
                parameters.Add("@ApproximateTravelDistanceForm", (model.approximateTravelDistanceForm));
                parameters.Add("@EstimatedTravelTimeToSourceId", (model.estimatedTravelTimeToSourceId));
                parameters.Add("@ApproximateTravelDistanceTo", (model.approximateTravelDistanceTo));
                parameters.Add("@LastUpdatedEpoch", (model.lastUpdatedEpoch));
                parameters.Add("@ApproximateTravelTimeForm", (model.approximateTravelTimeForm));
                parameters.Add("@IsUpdatedByOptimization", (model.isUpdatedByOptimization));
                parameters.Add("@CalculatedDurationMinutes", (model.calculatedDurationMinutes));
                parameters.Add("@isServiceResource", (model.isServiceResource));
                parameters.Add("@CompanyId", model.CompanyId);
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddAssignedResources"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

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
        public string SaveShuduleAppointAndResources(AssignedSacheduleResourcesModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.Id);
                parameters.Add("@ServiceAppointment", (model.serviceAppointment));
                parameters.Add("@ServiceResource", (model.serviceResourceId));
                parameters.Add("@EstimatedTravelTime", (model.estimatedTravelTime));
                parameters.Add("@ActualTravelTime", (model.actualTravelTime));
                parameters.Add("@ServiceCrewId", (model.serviceCrewId));
                parameters.Add("@EstimatedTravelTimeFromSourceId", (model.estimatedTravelTimeFromSourceId));
                parameters.Add("@ApproximateTravelDistanceForm", (model.approximateTravelDistanceForm));
                parameters.Add("@EstimatedTravelTimeToSourceId", (model.estimatedTravelTimeToSourceId));
                parameters.Add("@ApproximateTravelDistanceTo", (model.approximateTravelDistanceTo));
                parameters.Add("@LastUpdatedEpoch", (model.lastUpdatedEpoch));
                parameters.Add("@ApproximateTravelTimeForm", (model.approximateTravelTimeForm));
                parameters.Add("@IsUpdatedByOptimization", (model.isUpdatedByOptimization));
                parameters.Add("@CalculatedDurationMinutes", (model.calculatedDurationMinutes));
                parameters.Add("@isServiceResource", (model.isServiceResource));
                parameters.Add("@CompanyId", model.CompanyId);

                parameters.Add("@description", model.description);
                parameters.Add("@accountId", model.accountId);
                parameters.Add("@statusId", model.statusId);
                parameters.Add("@subject", model.subject);
                parameters.Add("@workType", model.workType);
                parameters.Add("@WorkOrder", model.WorkOrder);
                parameters.Add("@arrivalWindowStartTime", model.arrivalWindowStartTime);
                parameters.Add("@arrivalWindowEndTime", model.arrivalWindowEndTime);
                parameters.Add("@scheduledStartTime", model.scheduledStartTime);
                parameters.Add("@scheduledEndTime", model.scheduledEndTime);
                parameters.Add("@equipmentResourceId", model.equipmentResourceId);
                parameters.Add("@userId", model.userId);
                string data = connection.QueryFirstOrDefault<string>("[sp_solgen_AddAssignedResourcesSachudleAppoinment]"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

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
        public async Task<PagedData> GetAssignedResourcesList(long servicesappointmentid, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_AssignedResources_Listing",
                param: new
                {
                    CompanyId = companyId,
                    Servicesappointmentid = servicesappointmentid,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = pageSize,
                    PageNo = pageIndex
                },
                commandType: CommandType.StoredProcedure);

                var _data = new PagedData(dataList, pageIndex, pageSize);
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

   public     string GetSiteSurveyForm(string WoNUm, string userID, Int64 CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();


                var data = connection.Query<string>("Solgen_SP_GetSiteSurveyDetailsForMobile", new
                {
                    UserID = userID,
                    CompanyId = CompanyId,
                    WoNUm = WoNUm

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
        public string SaveSiteSurveyForm(string json, string userID, Int64 CompanyId)



        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();


                var data = connection.Query<string>("Solgen_Sp_SaveSiteSurvey", new
                {
                    UserID = userID,
                    CompanyId = CompanyId,
                    JSONAnswer = json

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


        public string GetCheckListForMobile(string ServiceAppointmentNumber, string userID, Int64 CompanyId, string version)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                if (version != "2.7")
                {
                    var data = connection.Query<string>("Solgen_SP_GetCheckListForMobile", new
                    {
                        ServiceAppointment = ServiceAppointmentNumber,
                        CompanyId = CompanyId,
                        userId = userID,

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    return data;
                }
                else
                {
                    var data = connection.Query<string>("Solgen_SP_GetCheckListForMobile_version", new
                    {
                        ServiceAppointment = ServiceAppointmentNumber,
                        CompanyId = CompanyId,
                        userId = userID,

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    return data;
                }
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


     
        public List<ServiceAppointmentModelForCalendar> GetServiceAppointmentsForCalendar(Guid userId, int CompanyId, String condition = null,string manageviewcond=null)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<ServiceAppointmentModelForCalendar>("sp_solgen_GetServiceAppointmentListForCalendar", param: new
                {

                    condition = condition,
                    userId = userId,
                    companyID = CompanyId,
                    manageviewcond= manageviewcond
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();

                return data;

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }
        public string AuditReviewData(long id, long companyId,Guid userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<string>("Solgen_SP_GetCheckListForMobile", new
                {
                    ServiceAppointment = id,
                    CompanyId = companyId,
                    userId= userid

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

        public string AuditChecklistDetail(long checkList_Id, long id, long companyId, Guid userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<string>("sp_solgen_Get_Questionair_Auditor", new
                {
                    SERVICE_APPT_ID = id,
                    COMPANY_ID = companyId,
                    LOGGEDIN_USER_ID = userid,
                    CHECKLIST_ID= checkList_Id

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

        public string AttendanceData(long Said, long companyId, Guid userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<string>("sp_solgen_Get_AssignedResources_List", new
                {
                    SAId = Said,
                    CompanyId = companyId,
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

        public string saveAttendanceData(ServiceAppointmentAttendanceModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@jsonData", (model.jsondata));
                parameters.Add("@id", (model.serviceappointmentid));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@companyId", (model.companyid));
                string data = connection.QueryFirstOrDefault<string>("SP_solgen_AddEdit_Service_attendace"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);


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


        public string GetContactsFromAccountsForMobile(long Said, long companyId, Guid userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<string>("sp_solgen_GetContactsFromAccountsForMobile", new
                {
                    AccountId = Said,
                    CompanyId = companyId,
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


        public string GetChecklistForOfflineForMobile(Guid? userId, long? companyID, string version)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                if (version != null)
                {
                    var data = connection.Query<string>("Solgen_SP_GetChecklistForOfflineForMobile_version", param: new
                    {
                        companyId=companyID,
                        USER_ID=userId

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    return data;
                }
                else
                {
                    var data = connection.Query<string>("Solgen_SP_GetChecklistForOfflineForMobile", param: new
                    {

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    return data;

                }

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

        public async Task<string> GetCheckListOfflineForMobileAsync( DateTime? SAScheduledDate,long CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var data = await connection.ExecuteScalarAsync<string>("Solgen_SP_GetCheckListOfflineForMobileAsync", new
                {
                    ScheduledDate = SAScheduledDate,
                    CompanyId=CompanyId
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

        public string AddEditAuditCheckList(string model,string compayId,string userId,int CheckListId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<string>("Solgen_SP_AddEditCheckListQuestionAndAnswer_v1", new
                {
                    Json = model,
                    CompanyId = compayId,
                    userId = userId,
                    CheckListId= CheckListId

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
        public string GetCustomFieldBySubModuleNameCode(string companyid, string userid, string moduleCode, string subModuleCode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Checklist_GetCustomFields",
                    new
                    {
                        COMPANY_ID = companyid,
                        MODULE_NAME_CODE = moduleCode,
                        SUB_MODULE_NAME_CODE = subModuleCode,
                        OTHER_DATA = "",
                        USER_ID = userid
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
        public async Task<string> GetCheckListDetail(string Id, string userid, string companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetCheckListDetailById_v1",
                    new
                    {
                        Id = Id,
                        userid = userid,
                        companyid = companyid

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

        public PagedData GetListingGridData(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetQuestionnaireListing_Data_Update",
                    param: new
                    {
                        Name = name,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
                        CompanyID = companyID
                    },
                    commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageIndex, pageSize);
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

        public string DeleteQuestionnaire(string Id, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<string>("sp_solgen_DeleteQuestionnaire", new { Id = Id, CompanyId = companyId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
        public async Task<string> GetUnscheduledApptList(long companyId, Guid? UserId, string filterId, string filtersearch)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if(filtersearch== "null")
                {
                    filtersearch = "";
                }
                connection.Open();
                var result = await connection.ExecuteScalarAsync<string>("Sp_Solgen_GetUnscheduledApptList",
                param: new
                {
                    CompanyId = companyId,
                    UserId = UserId,
                    filterId = filterId,
                    filtersearch= filtersearch
                },
                commandType: CommandType.StoredProcedure);

                return result;
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

        public async Task<string> GetCrewResourceList(long companyId, Guid? UserId,string viewType, DateTime starttime, DateTime endtime, string filterId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (viewType == "Resource Type View") { 
                    var result = await connection.ExecuteScalarAsync<string>("[Sp_Solgen_GetCrewResourceList]",
                    param: new
                    {
                        CompanyId = companyId,
                        UserId = UserId,
                        filterId = filterId
                    },
                    commandType: CommandType.StoredProcedure);

                    return result;
            }
                else if(viewType == "Crew Type View")
                        {
                              var result = await connection.ExecuteScalarAsync<string>("[Sp_Solgen_GetCrewResourceList_crew]",
                            param: new
                            {
                                CompanyId = companyId,
                                UserId = UserId,
                                filterId = filterId
                            },
                            commandType: CommandType.StoredProcedure);

                                return result;
                      }
                else if(viewType == "Customer Type View")
                {
                        var result = await connection.ExecuteScalarAsync<string>("[Sp_Solgen_GetcustomerList_ganttview]",
                   param: new
                   {
                       CompanyId = companyId,
                       UserId = UserId,
                       filterId = filterId,
                       starttime=starttime,
                       endtime=endtime
                   },
                   commandType: CommandType.StoredProcedure);

                        return result;
                }
                else
                {
                    return null;
                }
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

        public async     Task<string> GetCrewResourceCalenderList(long companyId, Guid? UserId, string viewType, DateTime cuurentdate, DateTime lastdate, bool isFirstTime, string filters)
        {
            
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (filters == "null")
                {
                    filters = null;
                }
                connection.Open();
                if (viewType == "Resource Type View")
                    {
                        var result = await connection.ExecuteScalarAsync<string>("[Sp_Solgen_GetServiceAppointment_List_For_Calender]",
                    param: new
                    {
                        CompanyId = companyId,
                        UserId = UserId,

                        cuurentdate = cuurentdate,
                        lastdate = lastdate,
                        isFirstTime = isFirstTime,
                        filters = filters
                    },
                    commandType: CommandType.StoredProcedure);

                        return result;

                    }
                else if(viewType== "Crew Type View")
                {
                     var result = await connection.ExecuteScalarAsync<string>("[Sp_Solgen_GetServiceAppointment_List_For_Calender_forCrew_bk]",
                    param: new
                    {
                        CompanyId = companyId,
                        UserId = UserId,

                        cuurentdate = cuurentdate,
                        lastdate = lastdate,
                        isFirstTime = isFirstTime,
                        filters = filters
                    },
                    commandType: CommandType.StoredProcedure);

                        return result;

                }
                else if (viewType=="Customer Type View")
                {
                    var result = await connection.ExecuteScalarAsync<string>("[Sp_Solgen_GetServiceAppointment_List_For_Calender_Customer]",
                  param: new
                  {
                      CompanyId = companyId,
                      UserId = UserId,

                      cuurentdate = cuurentdate,
                      lastdate = lastdate,
                      isFirstTime = isFirstTime,
                      filters = filters
                  },
                  commandType: CommandType.StoredProcedure);

                    return result;
                }
                else
                {
                    return null;
                }
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

        public string AddUpdateAssignedServiceAppointment(ServiceAppointmentAssignedCalenderModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
               
                 parameters.Add("@jsondata", (model.jsondata));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@companyId", (model.companyid));
                parameters.Add("@viewtype", (model.viewtype));
                string data =connection.QueryFirstOrDefault<string>("Sp_Solgen_Save_Assigned_ServiceAppointment", parameters, commandType: CommandType.StoredProcedure);

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

        public List<MasterItems> GetServiceCrewAndResourceDll(Guid userid, long companyid, string id, int length, string serchText, string isCrew)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
        {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<MasterItems>("[sp_solgen_GetServiceCrewAndResourcewDll]", new
                {
                    userid = userid,
                    companyid = companyid,
                    id = id,
                    length = length,
                    serchText = serchText,
                    isCrew = isCrew

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
        public string auditChecklistCheckBox(long checkListId, long companyId, Guid userid, long serviceAppointmentId, bool checkBox)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<string>("Solgen_SP_updateAuditCheckListCheckBox", new
                {
                    ServiceAppointment = serviceAppointmentId,
                    checkListId = checkListId,
                    CompanyId = companyId,
                    checkBox = checkBox,
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

        public int GetCheckListAutoSaveInterval(string userId, long companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();

            try
            {
                connection.Open();
                int Interval = connection.Query<int>("sp_GetAutoSaveIntervalInSeconds", new { userID = Guid.Parse(userId), companyid = companyid }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();
                return (Interval);
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
        public async Task<string> GetCrewListForGanttView(long companyId, Guid? UserId, string viewType, DateTime starttime, DateTime endtime, string filterId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (viewType == "Crew Type View")
                {


                    var result = await connection.ExecuteScalarAsync<string>("[Sp_Solgen_GetCrewList_For_GhantView]",
                    param: new
                    {
                        CompanyId = companyId,
                        UserId = UserId,
                        filterId = filterId
                    },
                    commandType: CommandType.StoredProcedure);

                    return result;
                }
                else if (viewType == "Customer Type View")
                {
                    var result = await connection.ExecuteScalarAsync<string>("[Sp_Solgen_GetCustomerList_For_GhantView_bk]",
                   param: new
                   {
                       CompanyId = companyId,
                       UserId = UserId,
                       filterId = filterId,
                       starttime=starttime,
                       endtime=endtime
                   },
                   commandType: CommandType.StoredProcedure);

                    return result;
                }
                else
                {
                    return null;
                }
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

        public async Task<string> SaveGhantViewFilter(saveSa_Data model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var result = await connection.ExecuteScalarAsync<string>("[Sp_Solgen_SaveGhantViewFilter]",
                param: new
                {
                    CompanyId = model.companyid,
                    UserId = model.userId,
                    filterJson = model.filterdata,
                    Sa_viewtype = model.Sa_viewtype,
                    ghantviewtype = model.ghantviewtype
                },
                commandType: CommandType.StoredProcedure);

                return result;
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

        public async Task<string> getGhantViewFilter(long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var result = await connection.ExecuteScalarAsync<string>("[Sp_Solgen_getGhantViewFilter]",
                param: new
                {
                    CompanyId = companyId,
                    UserId = UserId
                },
                commandType: CommandType.StoredProcedure);

                return result;
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

        public async Task<string> GetMapGhantviewData(long companyId, Guid? UserId, string viewType, DateTime starttime, DateTime endtime, string filterId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
               

                if(filterId == "null")
                {
                    filterId = null;
                }
                    var result = await connection.ExecuteScalarAsync<string>("[Sp_Solgen_GetServiceAppointment_List_For_Mapview_Ghant]",
                    param: new
                    {
                        CompanyId = companyId,
                        UserId = UserId,
                        filters = filterId,
                        from=starttime,
                        to=endtime

                    },
                    commandType: CommandType.StoredProcedure);

                    return result;
               
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
        public async Task<string> saveTimeZone(long companyId, Guid? UserId, string timezoneId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
               

                    var result = await connection.ExecuteScalarAsync<string>("[Sp_Solgen_SaveTimezone]",
                    param: new
                    {
                        CompanyId = companyId,
                        UserId = UserId,
                        timezoneId = timezoneId,
                    },
                    commandType: CommandType.StoredProcedure);

                    return result;
               
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
        public PagedData GetSchdeuleSaListOnAccountId(long accountid, Guid? userId, long companyID, string SANo)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
               
                connection.Open();
                var data = connection.Query("Sp_SolgenScheduleAppointmentByAccountId", param: new
                {
                    UserId = userId,
                    CompanyID = companyID,
                    accountid = accountid,
                    SANo= SANo
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();
                return new PagedData(data, 0, 50);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }

        public timezoneModel GetGhantViewTimeZone(string userid, long companyid, int teritoryid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
               // teritoryid = int.Parse(teritoryid);
                timezoneModel dataList = new timezoneModel();
                connection.Open();
                var data = connection.QueryFirstOrDefault<timezoneModel>("sp_solgen_GetGhantViewTimeZone_new", new { userid = userid, companyId = companyid , teritoryid = teritoryid }, commandType: System.Data.CommandType.StoredProcedure);

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
        public List<MasterItems> GetTimeZoneGhantView(Guid userid, long companyid, string id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<MasterItems>("[GetGhantViewTomezoneOn_ServiceTeritoryId]", new
                {
                    userid = userid,
                    companyid = companyid,
                    id = id,

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

        public async Task<string> GetWorkorderDetailById(string workorderId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_Workorder_ServiceAppointment_detail",
                    new
                    {
                        workorderId = workorderId
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


    }
}
