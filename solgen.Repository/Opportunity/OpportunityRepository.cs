using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public class OpportunityRepository : IOpportunityRepository
    {
        private readonly SolgenDbContext _dbContext;
        public OpportunityRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IEnumerable<dynamic> GetOpportunityview(long opid, int stageid, Guid userid, int CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                dynamic dataList = connection.Query<dynamic>("sp_solgen_Getopportunityview",
                param: new
                {
                    opid = opid,
                    stageid = stageid,
                    userId = userid,
                    CompanyID = CompanyID
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

        public string GetTypeOnBaseType(long companyId, string SearchText, long length, long ID, string Type)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_GetAdSetDDL",
                    new
                    {
                        companyId = companyId,
                        SearchText = SearchText,
                        length = length,
                        ID = ID,
                        Type = Type
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


        public List<opportunitystage> getopportunitystage(long opid, Guid userid, int CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<opportunitystage>("sp_solgen_Getopportunitystagelist", new
                {
                    opid = opid,
                    userId = userid,
                    CompanyID = CompanyID
                }, commandType: CommandType.StoredProcedure).ToList();

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


        public IEnumerable<dynamic> GetOpportunityviewTabData(long opid, Guid userid, int CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                dynamic dataList = connection.Query<dynamic>("sp_solgen_GetOpportunityViewTabdata",
                param: new
                {
                    opid = opid,

                    userId = userid,
                    CompanyID = CompanyID
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


        public IEnumerable<dynamic> GetOpportunityViewProposal(long opid, Guid userid, int CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                dynamic dataList = connection.Query<dynamic>("sp_solgen_GetOpportunityViewProposal",
                param: new
                {
                    opid = opid,

                    userId = userid,
                    CompanyID = CompanyID
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

        public IEnumerable<dynamic> GetOpportunityViewTask(long opid, Guid userid, int CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                dynamic dataList = connection.Query<dynamic>("sp_solgen_GetOpportunityViewTask",
                param: new
                {
                    opid = opid,

                    userId = userid,
                    CompanyID = CompanyID
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

        public IEnumerable<dynamic> GetOpportunityViewWorkorder(long opid, Guid userid, int CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                dynamic dataList = connection.Query<dynamic>("sp_solgen_GetOpportunityViewWorkOrder",
                param: new
                {
                    opid = opid,

                    userId = userid,
                    CompanyID = CompanyID
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

        public IEnumerable<dynamic> GetOpportunityViewProduct(long opid, Guid userid, int CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                dynamic dataList = connection.Query<dynamic>("sp_solgen_GetOpportunityViewProduct",
                param: new
                {
                    opid = opid,

                    userId = userid,
                    CompanyID = CompanyID
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

        public IEnumerable<dynamic> GetAppointmentbyopportunityId(long opid, Guid userid, int CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                dynamic data = connection.Query<dynamic>("sp_solgen_get_opportunityviewappointmentlist", new
                {
                    opid = opid,

                    userId = userid,
                    CompanyID = CompanyID
                }, commandType: CommandType.StoredProcedure).ToList();

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

        public IEnumerable<dynamic> GetOpportunityViewAccData(long opid, Guid userid, int CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                dynamic data = connection.Query<dynamic>("sp_solgen_GetOpportunityViewAccData", new
                {
                    opid = opid,

                    userId = userid,
                    CompanyID = CompanyID
                }, commandType: CommandType.StoredProcedure).ToList();

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
        public IEnumerable<dynamic> GetOpportunityViewFileupload(long opid, Guid userid, int CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                dynamic data = connection.Query<dynamic>("sp_solgen_GetOpportunityViewFileupload", new
                {
                    opid = opid,

                    userId = userid,
                    CompanyID = CompanyID
                }, commandType: CommandType.StoredProcedure).ToList();

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

        public IEnumerable<dynamic> GetOpportunityViewcontractlist(long opid, Guid userid, int CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                dynamic data = connection.Query<dynamic>("sp_solgen_get_opportunityviewcontractlist", new
                {
                    opid = opid,

                    userId = userid,
                    CompanyID = CompanyID
                }, commandType: CommandType.StoredProcedure).ToList();

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
        public async Task<string> GetOpportunityList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, string widgetType, string recordFilter, string teamID, string teamMemberID, string viewType, string groupBy, bool isAllRecords)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_opportunity_Listing",
                new
                {
                    //NameSearch = nameSearch,
                    //SortDir = sortDir,
                    //SortColumn = sortColumn,
                    //PageNo = pageIndex,
                    //PageSize = pageSize,
                    //UserId = userId,
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
                    widgetType = widgetType,
                    recordFilter = recordFilter,
                    teamID = teamID,
                    teamMemberID = teamMemberID,
                    VIEW_TYPE = viewType,
                    GROUP_BY = groupBy,
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
        public async Task<string> GetOpportunityById(string id, string moduleName, string submoduleName, Guid userid, long CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetOpportunityById",
                    new
                    {
                        opportunityId = id,
                        moduleName = moduleName,
                        submoduleName = submoduleName,
                        userid = userid,
                        CompanyID = CompanyID

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

        public async Task<string> GetOppDataById(long oppId, long companyID, Guid userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_FetchOpportunityById",
                    new
                    {
                        oppId,
                        companyID,
                        userid
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

        public int updateStage(long opid, long substageid, Guid userid, long companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {


                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("opid", opid, DbType.Int64);

                parameters.Add("substageidbk", substageid, DbType.Int64);

                parameters.Add("userid", userid, DbType.Guid);
                parameters.Add("companyid", companyid, DbType.Int64);

                return connection.ExecuteScalar<int>("[sp_solgen_update_opportunityStages]", parameters, commandType: CommandType.StoredProcedure);

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

        public int SaveRequestDesignOpportunity(RequestDesignModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {


                connection.Open();
                DynamicParameters parameters = new DynamicParameters();



                return connection.ExecuteScalar<int>("[sp_solgen_updateOpprtuintyRequestDesign]", new
                {
                    adderNotes = model.adderNotes,
                    CompanyId = model.CompanyId,
                    CreatedBy = model.CreatedBy,
                    designNotes = model.designNotes,
                    //FromTime = model.FromTime,
                    OpportunityId = model.OpportunityId,
                    RequestDate = model.RequestDate,
                    ProposalRedesignReason = model.redisgnReason,
                    Redesign = model.isredisgn,
                    loanProduct = model.loanProduct,
                    MountingLocation = model.mountingLocation,
                    MainPanelUpgrade = model.mainPanelUpgrade,
                    ShopHasElectricalSubPanel = model.shopHasElectricalSubPanel,
                    InsulationUpgrade = model.insulationUpgrade,
                    SmartThermostatInstallation = model.smartThermostatInstallation,
                    MaxRUpgrade = model.maxRUpgrade,
                    LedLightbulbUpgrade = model.ledLightbulbUpgrade,
                    RoofMaterial = model.roofMaterial,
                    ReRoofNeeded = model.reRoofNeeded,
                    RoofType = model.roofType,

                }, commandType: CommandType.StoredProcedure);

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

        public RequestDesignModel GetRequestDesignOpportunity(long opid, Guid userid, int CompanyID)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            RequestDesignModel dataList = new RequestDesignModel();
            try
            {
                connection.Open();

                dataList = connection.Query<RequestDesignModel>("sp_solgen_GetOpprtuintyRequestDesign",
               param: new
               {
                   opid = opid,
                   userId = userid,
                   CompanyID = CompanyID
               },
               commandType: CommandType.StoredProcedure).FirstOrDefault();

                // dataList.FromTime.Hours=
                //dataList.FromTime=  TimeSpan.FromTicks(dataList.RequestDate.Ticks);
                //(dataList.RequestDate.Hour)
                dataList.FromTime = dataList.RequestDate.TimeOfDay;


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

        public PagedData GetOpportunityProposalList(long id, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (string.IsNullOrEmpty(nameSearch) || nameSearch == "undefined") { nameSearch = ""; }
                connection.Open();
                var data = connection.Query("sp_solgen_GetOpportunityProposalListView", param: new
                {
                    NameSearch = nameSearch,
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID,
                    id = id,
                    submoduleid = submoduleid,
                    objectname = objectname
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

        public int UpdateOpportunityStage(long stageId, long opportunityId, long companyId, Guid userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("stage_id", stageId, DbType.Int64);
                parameters.Add("opportunity_id", opportunityId, DbType.Int64);
                parameters.Add("company_id", companyId, DbType.Int64);
                parameters.Add("user_id", userId, DbType.Guid);
                return connection.ExecuteScalar<int>("[sp_solgen_update_opportunity_Stage]", parameters, commandType: CommandType.StoredProcedure);
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

        public async Task<PagedData> GetOpprtunityProductsList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_OpprtunityProducts_Listing",
                param: new
                {
                    CompanyId = companyId,
                    OpprtunityId = Id,
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


        public async Task<PagedData> GetSendToLoanHomiDetail(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetSendToLoanHomiDetail",
                param: new
                {
                    CompanyId = companyId,
                    OpprtunityId = Id,
                    UserId = userId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = pageSize,
                    PageNo = pageIndex
                },
                commandType: CommandType.StoredProcedure);

                var _data = new PagedData(dataList, pageSize, pageIndex);
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

        public async Task<PagedData> GetOpprtunityWorkOrderList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_OpprtunityWorkOrder_Listing",
                param: new
                {
                    CompanyId = companyId,
                    OpprtunityId = Id,
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

        public async Task<PagedData> GetOpprtunityContractList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_OpprtunityContract_Listing",
                param: new
                {
                    CompanyId = companyId,
                    OpprtunityId = Id,
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

        public async Task<PagedData> GetOpprtunityAccountsList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_OpprtunityAccounts_Listing",
                param: new
                {
                    CompanyId = companyId,
                    OpprtunityId = Id,
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

        public async Task<PagedData> GetOpprtunityProposalsList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_OpprtunityProposal_Listing",
                param: new
                {
                    CompanyId = companyId,
                    OpprtunityId = Id,
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
        public List<MasterItems> GetUtilityCompanyDll(Guid userid, long companyid, string id, int length, string serchText)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                var data = connection.Query<MasterItems>("[sp_solgen_GetUtilityCompanyDll]", new
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


        public string SendAutomaticContract(long opid, Guid userid, int CompanyID)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("opportunity_id", opid, DbType.Int64);
                parameters.Add("company_id", CompanyID, DbType.Int64);
                parameters.Add("user_id", userid, DbType.Guid);
                return connection.ExecuteScalar<string>("sp_solgen_OpportunityAutomaticContract", parameters, commandType: CommandType.StoredProcedure);
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

        //public string CheckExistingEmailAddress(string email, long companyID)
        //{

        //    DbConnection connection = _dbContext.Database.GetDbConnection();
        //    try
        //    {
        //        connection.Open();
        //        DynamicParameters parameters = new DynamicParameters();
        //        parameters.Add("Email", email, DbType.String);
        //        parameters.Add("company_id", companyID, DbType.Int64);
        //        return connection.ExecuteScalar<string>("sp_solgen_CheckExistingEmailAddress", parameters, commandType: CommandType.StoredProcedure);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //    finally
        //    {
        //        if (connection.State == ConnectionState.Open)
        //            connection.Close();
        //    }
        //}


        public string CheckExistingEmailAddress(string email, long companyID)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Email", email, DbType.String);
                parameters.Add("company_id", companyID, DbType.Int64);
                dynamic data = connection.ExecuteScalar<string>("sp_solgen_CheckExistingEmailAddress", parameters, commandType: CommandType.StoredProcedure);
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

        public List<MasterItems> GetInstallerRepNameList(string salesRepName, long accountId, long companyId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<MasterItems> dataList = new List<MasterItems>();
                connection.Open();

                dataList = connection.Query<MasterItems>("sp_solgen_GetSalesRepNameList",
                    new
                    {
                        salesRepName = salesRepName == "" ? null : salesRepName,
                        accountId = accountId,
                        companyId = companyId
                    }
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
        public List<MasterItems> GetSalesRepNameList(string salesRepName, long accountId, long companyId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<MasterItems> dataList = new List<MasterItems>();
                connection.Open();

                dataList = connection.Query<MasterItems>("sp_solgen_GetSalesRepNameList",
                    new
                    {
                        salesRepName = salesRepName == "" ? null : salesRepName,
                        accountId = accountId,
                        companyId = companyId
                    }
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

        public string SaveUtility_Proposal_Design_Information(SaveUtilityModel model, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.Utility_Proposal_Id);
                parameters.Add("@utility_Company", (model.utility_Company));
                parameters.Add("@utility_Meter_Number", (model.utility_Meter_Number));
                parameters.Add("@utility_Account_Number", (model.utility_Account_Number));
                parameters.Add("@Annual_kwh_Usage", (model.Annual_kwh_Usage));
                parameters.Add("@Last_Utility_bill_URL", (model.Last_Utility_bill_URL));
                parameters.Add("@Home_Sqft", (model.Home_Sqft));
                parameters.Add("@Sales_Tax_Rate", (model.Sales_Tax_Rate));
                parameters.Add("@FTC_Not_Eligible", (model.FTC_Not_Eligible));
                parameters.Add("@Billing_City", (model.Billing_City));
                parameters.Add("@Billing_Street", (model.Billing_Street));
                parameters.Add("@Billing_State", (model.Billing_State));
                parameters.Add("@Billing_Country", (model.Billing_Country));
                parameters.Add("@Billing_PostalCode", (model.Billing_PostalCode));
                parameters.Add("@Full_Utility_Bill", (model.Full_Utility_Bill));
                parameters.Add("@No_Utility_Account_or_Meter_Number", (model.No_Utility_Account_or_Meter_Number));
                parameters.Add("@CompanyId", companyID);
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_SaveUtility_Proposal_Design_Information"
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



        public async Task<PagedData> GetOpportunityviewFileList(long id, long accountid, bool isaccount, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid userid, long CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query("sp_solgen_GetOpportunityViewFileupload", param: new
                {
                    id = id,
                    isaccount = isaccount,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageNo = pageIndex,
                    PageSize = pageSize,
                    userid = userid,
                    CompanyID = CompanyID,

                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();
                return new PagedData(data, pageIndex, pageSize);
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

        public welcomeNoteOpportunityModel GetWelcomecallNoteOpportunity(long opid, Guid userid, int CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            welcomeNoteOpportunityModel dataList = new welcomeNoteOpportunityModel();
            try
            {
                connection.Open();

                dataList = connection.Query<welcomeNoteOpportunityModel>("sp_solgen_GetOpprtuintyWelcomeNote",
               param: new
               {
                   opid = opid,
                   userId = userid,
                   CompanyID = CompanyID
               },
               commandType: CommandType.StoredProcedure).FirstOrDefault();

                // dataList.FromTime.Hours=
                //dataList.FromTime=  TimeSpan.FromTicks(dataList.RequestDate.Ticks);
                //(dataList.RequestDate.Hour)



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
        public string SaveWelcomecallNoteOpportunity(welcomeNoteOpportunityModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@WelcomeCallNote", (model.WelcomeCallNote));
                parameters.Add("@opid", (model.opid));
                parameters.Add("@userid", (model.userid));
                parameters.Add("@CompanyId", model.companyid);
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_Save_OpprtuintyWelcomeNote"
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
        public bool CheckLoanAssociate(long companyID, long id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<bool>("sp_solgen_CheckOpportunityLoanProductAssociate",
                    new
                    {
                        CompanyId = companyID,
                        OpportunityId = id

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
    }
}
