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
    public class Layoutrepository : ILayoutrepository
    {
        private readonly SolgenDbContext _dbContext;
        public Layoutrepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public string AddOrUpdateCustomeFields(string jsondata,string modulecode,string submodulecode, Guid? userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@modulecode", modulecode);
                parameters.Add("@submodulecode", submodulecode);
                parameters.Add("@userID", userid);
               
                parameters.Add("@JSON", jsondata);
             
                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>("SOLGEN_SERVICE_SAVE_FIELDS_AND_GROUP_PAGE_LAYOUT"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return leasenumber;
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
        public PagedData GetLayoutList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID, int modulecode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query("[sp_solgen_Getmanagelayoutlist]", param: new
                {
                    modulecode = modulecode,
                    NameSearch = nameSearch,
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID
                   
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

        public string AddOrUpdateFormFields(string jsondata, string modulecode, string submodulecode, string formMasterId, Guid? userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@modulecode", modulecode);
                parameters.Add("@submodulecode", submodulecode);
                parameters.Add("@formMasterId", formMasterId);
                parameters.Add("@userID", userid);

                parameters.Add("@JSON", jsondata.Replace("''", "'"));

                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>("SOLGEN_SERVICE_SAVE_FORM_FIELDS_AND_GROUP_PAGE_LAYOUT"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return leasenumber;
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

        public PagedData GetFormList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID, long moduleId, long subModuleId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query("sp_solgen_Getmanageformlist", param: new
                {
                    NameSearch = nameSearch,
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID,
                    ModuleId = moduleId,
                    SubModuleId = subModuleId

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
        public PagedData GetFormList_finance(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query("sp_solgen_GetFormListing_financeOnly", param: new
                {
                    NameSearch = nameSearch,
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID,
                   

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

        public string AddNewSubModule(FormModuleModel formSubModuleModel, Guid? userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userID", userid);
                parameters.Add("@subModuleName", formSubModuleModel.moduleName);
                parameters.Add("@CompanyID", companyId);
                parameters.Add("@ModuleID", formSubModuleModel.moduleId);
                parameters.Add("@SubModuleID", formSubModuleModel.subModuleId);
                parameters.Add("@FormFieldId", formSubModuleModel.Id??0);

                var formnumber = connection.QueryFirstOrDefault<string>("sp_solgen_SAVE_FORM_NEW_SUB_MODULE"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return formnumber;
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
        public async Task<string> GetModuleSubModuleByCompany(long moduleId, long companyId, Guid? Userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ModuleID", moduleId);
                parameters.Add("@Userid", Userid);
                parameters.Add("@companyId", companyId);

                var formnumber = await connection.ExecuteScalarAsync<string>("sp_solgen_GetModuleSubmodule", parameters, commandType: CommandType.StoredProcedure);
                return formnumber;
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
        public async Task<string> GetfinanceModuleSubModuleByCompany(long moduleId, long companyId, Guid? Userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ModuleID", moduleId);
                parameters.Add("@Userid", Userid);
                parameters.Add("@companyId", companyId);

                var formnumber = await connection.ExecuteScalarAsync<string>("sp_solgen_GetModuleSubmodule_finance", parameters, commandType: CommandType.StoredProcedure);
                return formnumber;
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
        public async Task<string> GetFormEditData(long formMasterId, long companyId, Guid? Userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@FormMasterId", formMasterId);
                parameters.Add("@Userid", Userid);
                parameters.Add("@companyId", companyId);

                var formnumber = await connection.ExecuteScalarAsync<string>("sp_solgen_getFormMasterByIdV1", parameters, commandType: CommandType.StoredProcedure);
                return formnumber;
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
        public async Task<string> deleteForm(string module, string submodule, long formMasterId, long companyId, Guid? userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@module", module);
                parameters.Add("@submodule", submodule);
                parameters.Add("@form_master_id", formMasterId);
                parameters.Add("@Userid", userid);
                parameters.Add("@companyId", companyId);

                var formnumber = await connection.ExecuteScalarAsync<string>("sp_delete_form_and_mapping", parameters, commandType: CommandType.StoredProcedure);
                return formnumber;
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
        public async Task<string> deleteFormMultiple(string formMasterId, long companyId, Guid? userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@delete_for_ids", formMasterId);
                parameters.Add("@Userid", userid);
                parameters.Add("@companyId", companyId);

                var formnumber = await connection.ExecuteScalarAsync<string>("sp_delete_form_and_mapping_multiple", parameters, commandType: CommandType.StoredProcedure);
                return formnumber;
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

        public async Task<string> UpdateCustomLayoutDefaultStatus(ManageLayoutDefaultStatusModel model,string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@sub_module_id", model.sub_module_id);
                parameters.Add("@device_type", model.device_type);
                parameters.Add("@layout_type", model.layout_type);
                parameters.Add("@custom_view_id", model.custom_view_id);
                parameters.Add("@is_remove_role", model.is_remove_role);
                parameters.Add("@user_Id", userId);
                parameters.Add("@company_id", model.companyID);

                var formnumber = await connection.ExecuteScalarAsync<string>("sp_solgen_UpdateCustomLayoutDefaultStatus_v1", parameters, commandType: CommandType.StoredProcedure);
                return formnumber;
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

		public async Task<string> isFlowExistInLayout(int flowId, string automationFlowName, int customViewId)
		{
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@flowId", flowId);
                parameters.Add("@automationFlowName", automationFlowName);
                parameters.Add("@customViewId", customViewId);

                var result = await connection.ExecuteScalarAsync<string>("sp_solgen_isFlowExistInLayout", parameters, commandType: CommandType.StoredProcedure);
                return result;
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
