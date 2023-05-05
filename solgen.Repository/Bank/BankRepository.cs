
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
    public class BankRepository : IBankRepository
    {
        private readonly SolgenDbContext _dbContext;
        public BankRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /*! 
        * \brief   Get the list of Bank
        * \details Fetch the list of Bank
        * \author  Kiran Bala 
        * \date    16 Sep 2019
        * \version 1.0    
        */
        public PagedData GetBankList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetBankList",
                param: new
                {
                    NameSearch = name,
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
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
        * \brief   Bank Status update
        * \details function is used to update status (active/inactive) of Bank
        * \author  Kiran Bala 
        * \date    16 Sep 2019
        * \version 1.0    
        */
        public bool UpdateBankStatus(string id, string statusId)
        {
            bool _status = false;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<bool>("sp_solgen_updateBankStatus", new { Id = id, Status = statusId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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

        /*! 
       * \brief   DeleteUser
       * \details function is used to Delete Bank
       * \author  Kiran Bala 
       * \date    16 Sep 2019
       * \version 1.0    
       */
        public bool DeleteBank(string id)
        {
            bool _status = false;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<bool>("sp_solgen_DeleteBank", new { ID = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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


        /*! 
       * \brief   Get Vendor Details
       * \details function is used to get bank detail by id
       * \author  Kiran
       * \date    16 Sep 2019
       * \version 1.0    
       */
        public BankModel GetBankDetail(string id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                BankModel dataList = new BankModel();
                connection.Open();
                var data = connection.QueryFirstOrDefault<BankModel>("sp_solgen_GetBankDetailById", new { id }, commandType: System.Data.CommandType.StoredProcedure);

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

        /*! 
          * \brief   Add Edit Bank detail
          * \details function is used to add/edit Bank
          * \author  Kiran Bala 
          * \date    16 Sep 2019
          * \version 1.0    
          */
        public string AddEditBank(BankModel model)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                Guid id = Guid.Empty;
                if (model.ID != null) { id = Guid.Parse(model.ID); }
                _status = connection.QueryFirstOrDefault<string>("sp_solgen_addUpdateBank", new
                {
                    Id = id,
                    BankName = model.BankName,
                    City = model.City,
                    StateID = model.StateID,
                    County = model.County,
                    Address = model.Address,
                    Phone = model.Phone,
                    ZipCode = model.ZipCode,
                    StatusID = model.StatusID,
                    CreatedBy = model.CreatedByID,
                    CompanyID = model.CompanyID
                }, commandType: System.Data.CommandType.StoredProcedure);

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
        public string SaveCustomManagePopup(ManageViewModelWithCompany model)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.QueryFirstOrDefault<string>("sp_solgen_AddCustomView", new
                {
                    ModuleName = model.ModuleName,
                    SubModuleName = model.SubModuleName,
                    view_name = model.select,
                    view_for = model.radiogroup,
                    searchFilter = model.customWhereCondition,
                    orderFilter = model.customOrderCondition,
                    selectedFields = model.selectedFields,
                    roles=model.Roles,
                    userid = model.CreatedByID,
                    view_id = model.Id,
                    searchFilter_Json=model.view_searchFilterJson,
                    searchOrder_Json = model.view_searchOrderJson,
                    companyid = model.CompanyID
                },
            commandType: System.Data.CommandType.StoredProcedure);

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


        public string checkDublicateViewName(ManageViewModelWithCompany model)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.QueryFirstOrDefault<string>("sp_solgen_checkDublicateViewName", new
                {
                    ModuleName = model.ModuleName,
                    SubModuleName = model.SubModuleName,
                    view_name = model.select,
                    view_for = model.radiogroup,
                    searchFilter = model.customWhereCondition,
                    selectedFields = model.selectedFields,
                    roles = model.Roles,
                    userid = model.CreatedByID,
                    view_id = model.Id,
                    searchFilter_Json = model.view_searchFilterJson,
                    companyid = model.CompanyID
                },
            commandType: System.Data.CommandType.StoredProcedure);

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
        public List<MasterItems> GetBankDropList(long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<MasterItems>("sp_solgen_GetBankDropList", new { Companyid = companyID }, commandType: CommandType.StoredProcedure).ToList();

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
        public List<RolesItems> GetRolesDropListByUserType(long id, long companyID, Guid? UserID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<RolesItems>("sp_solgen_GetRolesDropListByUserType", param: new
                {
                    UserTypeId = id,
                    CompanyID = companyID,
                    UserID = UserID
                },
                commandType: CommandType.StoredProcedure).ToList();

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

        public PagedData GetUsersBankList(int pageIndex, int pageSize, Guid? bankId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetUsersBankList",
                param: new
                {
                    PageNo = pageIndex,
                    PageSize = pageSize,
                    BankId = bankId
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
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public PagedData GetLoanApplicationList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID,long batchid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetLoanApplicationList",   
                param: new
                {
                    NameSearch = name,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageNo = pageIndex,
                    PageSize = pageSize,
                    UserId = userId,
                    CompanyID = companyID,
                    batchid=batchid
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
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public PagedData GetLoanTermList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetLoanTermList",
                param: new
                {
                    NameSearch = name,
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
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


     
    


        public PagedData GetTaskList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetTaskList",
                param: new
                {
                    NameSearch = nameSearch,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageNo = pageIndex,
                    PageSize = pageSize,
                    UserId = userId
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
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public PagedData GetDesignationList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetDesignationList",
                param: new
                {
                    NameSearch = name,
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
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public PagedData GetLocationTypeList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetLocationTypeList",
                param: new
                {
                    NameSearch = name,
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
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public PagedData GetLocationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetLocationList",
                param: new
                {
                    NameSearch = nameSearch,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageNo = pageIndex,
                    PageSize = pageSize,
                    UserId = userId
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
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }



        public PagedData GetcibilScoreList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetBureauList",
                param: new
                {
                    NameSearch = nameSearch,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageNo = pageIndex,
                    PageSize = pageSize,
                    UserId = userId,
                    // userId = userId
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
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


        public string AddEditCustomField(CustomFieldModel model)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                //Guid id = Guid.Empty;
                //if (model.Id != null) { id = Guid.Parse(model.Id); }
                _status = connection.QueryFirstOrDefault<string>("sp_solgen_addUpdateCustomField", new
                {
                    ModuleName = model.ModuleName,
                    SubModuleName = model.SubModuleName,
                    FieldName = model.FieldName,
                    CustText = model.CustText,
                    CustInteger = model.CustInteger,
                    CustDecimalLength = model.CustDecimalLength,
                    CustLogInterger = model.CustLogInterger,
                    Description = model.Description,
                    CustUrl = model.CustUrl,
                    CustSelectList = model.CustSelectList,
                    Id = model.Id,
                    IsRequired = model.IsRequired,
                    CreatedByID = model.CreatedByID,
                    CompanyID = model.CompanyID,
                    DtCode = model.DataTypeCode,
                    DecimalplaceValue = model.DecimalPlaceValue
                }, commandType: System.Data.CommandType.StoredProcedure);

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

        public PagedData GetCustomFieldList(string moduleId, string SubModuleId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, int companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (string.IsNullOrEmpty(moduleId) || moduleId == "undefined")
                { moduleId = string.Empty; }
                if (string.IsNullOrEmpty(SubModuleId) || SubModuleId == "undefined")
                { SubModuleId = string.Empty; }
                var dataList = connection.Query("sp_solgen_GetCustomFieldList",
                param: new
                {
                    moduleId = moduleId,
                    SubModuleId = SubModuleId,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageNo = pageIndex,
                    PageSize = pageSize,
                    UserId = userId,
                    companyId = companyId
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
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        
        public CustomFieldModel GetCustomFieldDetail(Int64 id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                CustomFieldModel dataList = new CustomFieldModel();
                connection.Open();
                var data = connection.QueryFirstOrDefault<CustomFieldModel>("sp_solgen_GetCustomFieldById", new {id=id }, commandType: System.Data.CommandType.StoredProcedure);

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
                    stageid= stageid,
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

        public List<opportunitystage> getopportunitystage(long opid,Guid userid, int CompanyID)
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

       


        #region dynamic listing

        public async Task<string> GetLeadlist(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id,
            string widgetType, string recordFilter, string teamID, string teamMemberID, bool isAllRecords)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_Lead_Listing",
                    new
                    {
                        VIEWER_ID = userId,
                        COMPANY_ID = companyID,
                        SORT_BY = sortDir,
                        SORT_EXP = sortColumn,
                        PAGESIZE = pageSize,
                        PAGENUMBER = pageIndex,
                        SEARCH_CONDITION = name,
                        ModuleName = moduleName,
                        subModuleName = submoduleName,
                        view_port_id = custom_view_id,
                        widgetType = widgetType,
                        recordFilter = recordFilter,
                        teamID = teamID,
                        teamMemberID = teamMemberID,
                        isAllRecords = isAllRecords

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        public async Task<string> GetLenderlist(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_Lender_Listing",
                    new
                    {
                        VIEWER_ID = userId,
                        COMPANY_ID = companyID,
                        SORT_BY = sortDir,
                        SORT_EXP = sortColumn,
                        PAGESIZE = pageSize,
                        PAGENUMBER = pageIndex,
                        SEARCH_CONDITION = name,
                        ModuleName = moduleName,
                        subModuleName = submoduleName,
                        view_port_id = custom_view_id

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        public async Task<string> GetAccountsList(bool isCustomerList, bool isSubDealerList, string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id, bool isAllRecords)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_accounts_Listing",
                    new
                    {
                        VIEWER_ID = userId,
                        COMPANY_ID = companyID,
                        SORT_BY = sortDir,
                        SORT_EXP = sortColumn,
                        PAGESIZE = pageSize,
                        PAGENUMBER = pageIndex,
                        SEARCH_CONDITION = name,
                        ModuleName = moduleName,
                        subModuleName = submoduleName,
                        view_port_id = custom_view_id,
                        isAllRecords = isAllRecords,
                        isSubDealerList = isSubDealerList,
                        isCustomerList = isCustomerList

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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
        public async Task<string> GetBankListNew(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_accounts_Listing_bybank",
                    new
                    {
                        VIEWER_ID = userId,
                        COMPANY_ID = companyID,
                        SORT_BY = sortDir,
                        SORT_EXP = sortColumn,
                        PAGESIZE = pageSize,
                        PAGENUMBER = pageIndex,
                        SEARCH_CONDITION = name,
                        ModuleName = moduleName,
                        subModuleName = submoduleName,
                        view_port_id = custom_view_id

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
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

        public string GetproductList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query<string>("sp_solgen_Custom_product_Listing", param: new
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
                     view_port_id = custom_view_id
                }
                , commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        public string GetproposalList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query<string>("sp_solgen_Custom_Proposal_Listing", param: new
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
                    view_port_id = custom_view_id
                }
                , commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        public string GetContractList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query<string>("sp_solgen_Custom_Contract_Listing", param: new
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
                    view_port_id = custom_view_id
                }
                , commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        public string GetDepartmentList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query<string>("sp_solgen_Custom_department_Listing", param: new
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
                    view_port_id = custom_view_id
                }
                , commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        public string GetOpportunityList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query<string>("sp_solgen_Custom_opportunity_Listing", param: new
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
                    view_port_id = custom_view_id
                }
                , commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        public string GetEmployeeList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query<string>("sp_solgen_Custom_employee_Listing", param: new
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
                    view_port_id = custom_view_id
                }
                , commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        public string GetSolgenContactList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query<string>("sp_solgen_Custom_Contact_Listing", param: new
                {
                    //NameSearch = nameSearch,
                    //SortDir = sortDir,
                    //SortColumn = sortColumn,
                    //PageNo = pageIndex,
                    //PageSize = pageSize,
                    //UserId = userId,
                    //VIEWER_ID = userId,
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
                , commandType: CommandType.StoredProcedure).FirstOrDefault();
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

        public async Task<string> GetEmployeeDetailById(string id, string moduleName, string submoduleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetEmployeeDetailById",
                    new
                    {
                        Id = id,
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
        public async Task<string> getProjectList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_Project_Listing", param: new
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
        public string AddEditProject(ProjectModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.Id);
                //parameters.Add("@JSON", model.FormJsonData);
                parameters.Add("@JSON", (model.FormJsonData.Replace("'", "\''")));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                parameters.Add("@COMPANY_ID", (model.companyId));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditProject_custom"
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

        #endregion


    }
}
