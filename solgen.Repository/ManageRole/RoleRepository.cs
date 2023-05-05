using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using Solgen.Core;
using Solgen.Core.Models;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly SolgenDbContext _dbContext;
        public RoleRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        /*! 
      * \brief   Role Status update
      * \details function is used to update status (active/inactive) of Role
      * \author  Deepak jha 
      * \date    16 Oct 2019
      * \version 1.0    
      */
        public CommonStatusModel ChangedRoleStatusById(string roleId, string roleStatus)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                CommonStatusModel _status = connection.Query<CommonStatusModel>("sp_solgen_ChangeRoleStatus", new { RoleId = roleId, RoleStatus = roleStatus }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
     * \brief   Delete the role on basis of roleId
     * \details Delete the role on roleId
     * \author  Deepak Jha 
     * \date    16 Oct 2019
     * \version 1.0    
     */
        public ChangeStatusModel DeletedRoleById(Guid roleId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                ChangeStatusModel result = connection.Query<ChangeStatusModel>("sp_solgen_DeleteRoleById", new { RoleId = roleId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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

        /*! 
     * \brief   Get the list of Roles
     * \details Fetch the list of Roles
     * \author  Deepak Jha 
     * \date    16 Oct 2019
     * \version 1.0    
     */
        public PagedData GetRoleList(string roleName, string masterNameId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (string.IsNullOrEmpty(masterNameId) || masterNameId == "undefined") { masterNameId = string.Empty; }
                var dataList = connection.Query("sp_solgen_GetRoleList",
                    param: new
                    {
                        RoleName = roleName,
                        UserTypeId = masterNameId,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
                        CompanyID = companyID
                    },
                    commandType: CommandType.StoredProcedure).ToList();
                var DATAA = dataList;
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
        public List<TblRoleModule> GetRoleModule(long? userTypeId, Guid? userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                List<TblRoleModule> dataList = new List<TblRoleModule>();

                connection.Open();


                dataList = connection.Query<TblRoleModule>("sp_solgen_GetRoleModule", new { UserTypeId = userTypeId, UserId= userid }, commandType: CommandType.StoredProcedure).ToList();
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
                /*! 
         *  \brief     Save API.
         *  \details   This API is used to save and update roles.
         *  \author    Anish Sharma 
         *  \version   1.0
         *  \date      17-10-2019
         *  \pre       First initialize the system.
         *  \copyright Solgen.
         */
        public Guid Save(RoleModel model)
        {
            Guid id = Guid.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("RoleID", model.RoleId == Guid.Empty ? null : (Guid?)model.RoleId, DbType.Guid);
                parameters.Add("RoleName", model.RoleName, DbType.String);
                parameters.Add("RoleDescription", model.RoleDescription, DbType.String);
                parameters.Add("RoleStatusId", model.RoleStatusId, DbType.Int32);       
                parameters.Add("reporttoid", model.reporttoid==""?string.Empty: model.reporttoid, DbType.String);
                parameters.Add("UserId", model.CreatedBy, DbType.Guid);
                parameters.Add("UserType", model.UserType, DbType.Int32);
                parameters.Add("CompanyID", model.CompanyID, DbType.Int32);


                List<RoleModuleModelNew> newrolemodule = model.RoleModules.Select(m => new RoleModuleModelNew
                { RoleModuleId = m.RoleModuleId, //primary key
                    RoleModuleRoleID = m.RoleModuleRoleID,

                    RoleModuleModuleID = m.RoleModuleModuleID,
                    RoleModuleModuleName = m.RoleModuleModuleName,

                    RoleModuleAddFlag = m.RoleModuleAddFlag,
                    RoleModuleUpdateFlag = m.RoleModuleUpdateFlag,
                    RoleModuleReadFlag = m.RoleModuleReadFlag,
                    RoleModuleDeleteFlag = m.RoleModuleDeleteFlag, 
                    RoleModuleEmailFlag = m.RoleModuleEmailFlag,// RoleModuleSubModuleID = m.RoleModuleSubModuleID,
                    RoleModuleNotificationFlag = m.RoleModuleNotificationFlag, 
                    RoleModuleSMSFlag = m.RoleModuleSMSFlag,
                    
                    ModuleParentModuleId = m.ModuleParentModuleId,
                    roleModuleIsView = m.roleModuleIsView,
                    RoleModuleIsViewAll=m.RoleModuleIsViewAll,
                    RoleModuleIsViewShared=m.RoleModuleIsViewShared,
                    RoleModuleIsViewOwn=m.RoleModuleIsViewOwn
                }).ToList();
                parameters.AddTable("RoleModules", "dbo.tblRoleModulesType1", newrolemodule);
                return connection.ExecuteScalar<Guid>("sp_solgen_AddOrUpdateRole", parameters, commandType: CommandType.StoredProcedure);

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

        /*! 
        *  \brief     CheckRoleNameIsExist API
        *  \details   This API is used to check role name is exists in database with same name.
        *  \author    Anish Sharma
        *  \version   1.0
        *  \date      17-10-2019
        *  \pre       First initialize the system.
        *  \copyright Solgen.
        */
        public bool CheckRoleNameIsExist(Guid? id, string name,long companyId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Id", id, DbType.Guid);
                parameters.Add("Name", name, DbType.String);
                parameters.Add("CompanyID", companyId, DbType.Int64);

                var count = connection.ExecuteScalar<int>("sp_solgen_CheckRoleNameIsExist",
                    param: parameters, commandType: CommandType.StoredProcedure);
                if (count > 0)
                    return true;
                else
                    return false;
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
        *  \brief     GetById API.
        *  \details   This API is used to get roles by id.
        *  \author    Anish Sharma
        *  \version   1.0
        *  \date      17-10-2019
        *  \pre       First initialize the system.
        *  \copyright Solgen.
        */
        public RoleModel GetRoleById(Guid? id, Guid? userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                RoleModel data = new RoleModel();

                connection.Open();
                using (var multi = connection.QueryMultiple("sp_solgen_GetRoleById", new { Id = id, UserId= userid }, commandType: System.Data.CommandType.StoredProcedure))
                {
                    data = multi.ReadSingleOrDefault<RoleModel>();
                    if (data != null)
                        data.RoleModuleModel = multi.Read<RoleModuleModel>().ToList();
                }
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

        public string GetRoleNameForTree(Guid UserId, int CompanyID,string id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                string dataList = connection.Query<string>("sp_solgen_GetRoleNameForTree",
                param: new
                {


                    UserId = UserId,
                    CompanyID = CompanyID,
                    id=id
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

        public async Task<string> getRoletabdata(Guid ROLEID, Guid UserId, int CompanyID, long usertypeid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                //string dataList = await connection.QueryAsync<string>("sp_solgen_GET_PRIVILEGES_ROLE_WISE",
                
                string dataList = await Task.FromResult(connection.Query<string>("sp_solgen_GET_PRIVILEGES_ROLE_WISE",
                param: new
                {

                    ROLE_ID=ROLEID,
                    USER_ID = UserId,
                    COMPANY_ID = CompanyID,
                    USER_TYPE = usertypeid
                },
                commandType: CommandType.StoredProcedure).FirstOrDefault());

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

        public string GetRoleDataByid(Guid UserId, int CompanyID, string id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                
                connection.Open();

                string dataList = connection.Query<string>("sp_solgen_GET_ROLE_DETAILS_BY_ID",
                param: new
                {


                    USER_ID = UserId,
                    COMPANY_ID = CompanyID,
                    ROLE_ID_guid = id
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

        public async Task<PagedData> GetUserList(string searchtxt, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? roleId, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetRoleListUsersCount",
                    param: new
                    {
                        SearchText = searchtxt,
                        SortDir = sortDir,
                        SortColumn = sortColumn,                        
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        RoleId = roleId,
                        CompanyID = companyId
                    },
                    commandType: CommandType.StoredProcedure);
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

        public string SaveRole(Guid UserId, int CompanyID, string Json)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                string dataList = connection.Query<string>("sp_solgen_SAVE_PRIVILEGES_ROLE_WISE",
                param: new
                {


                    User_Id = UserId,
                    COMPANY_ID = CompanyID,
                    Json= Json
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

  
        public string saveLayoutRoles(JsonModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.Id);
                parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@companyId", (model.companyId));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_SaveLayoutRoles"
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


        public string CheckLayoutRolesExist(JsonModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.Id);
                parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@companyId", (model.companyId));
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_LayoutRoles_Exist"
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
    }
}
