using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using Solgen.Core;
using Solgen.Core.Models;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    
    public class UserRepository: IUserRepository
    {
        private readonly SolgenDbContext _dbContext;

        public UserRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        /*! 
        * \brief   Get User Details
        * \details function is used to get user detail by id
        * \author  Vikrant
        * \date    6 Sep 2019
        * \version 1.0    
        */
        public GetUserDetailsModel GetUserDetails(string userid,string companyId="")
        {
            //try
            //{
            //    return _dbContext.AspNetUsers.FirstOrDefault(x => x.Id == userid);
            //}
            //catch(Exception ex)
            //{
            //    throw ex;
            //}
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                GetUserDetailsModel dataList = new GetUserDetailsModel();
                connection.Open();
                var data = connection.QueryFirstOrDefault<GetUserDetailsModel>("sp_solgen_GetUserDetailsInfoForManageUser", new { userid = userid, companyId = companyId }, commandType: System.Data.CommandType.StoredProcedure);

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
        * \brief   Get User Details
        * \details function is used to get user detail by id
        * \author  Vikrant
        * \date    13 Sep 2019
        * \version 1.0    
        */
        public UserDetailsModel GetUserInfo(string userid, string companyid = "")
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                UserDetailsModel dataList = new UserDetailsModel();
                connection.Open();
                var data = connection.QueryFirstOrDefault<UserDetailsModel>("sp_solgen_GetCurrentUserInfo", new { userid=userid,companyId=companyid }, commandType: System.Data.CommandType.StoredProcedure);

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
        * \brief   Get User Details 
        * \details function is used to get user detail by id and company id
        * \author  Naresh Saini
        * \date    26 Oct 2020
        * \version 1.0    
        */
        public UserDetailsModel GetUserInfoByUserIDCompanyID(string userid,long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                UserDetailsModel dataList = new UserDetailsModel();
                connection.Open();
                var data = connection.QueryFirstOrDefault<UserDetailsModel>("sp_solgen_Company_GetCurrentUserInfo", new { userid, companyId }, commandType: System.Data.CommandType.StoredProcedure);

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

        public string GetContactOrEmployeeById(string userId, Boolean isEmployee)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
               // UserDetailsModel dataList = new UserDetailsModel();
                connection.Open();
                var data = connection.QueryFirstOrDefault<string>("sp_solgen_GetEmployeeOrContactDettailById", new { userId= userId, isEmployee= isEmployee }, commandType: System.Data.CommandType.StoredProcedure);

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
       * \brief   Get the list of Users
       * \details Fetch the list of users
       * \author  Kiran Bala 
       * \date    10 Sep 2019
       * \version 1.0    
       */

        public PagedData GetUsersList(string name, string userType, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetUsersList",
                    param: new
                    {
                        Name = name,
                        UserType=userType,
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


        public async Task<string> GetUserlist(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id,
            bool isAllRecords)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_User_Listing",
                    new
                    {
                        UserId = userId,
                        COMPANY_ID = companyID,
                        SORT_BY = sortDir,
                        SORT_EXP = sortColumn,
                        PAGESIZE = pageSize,
                        PAGENUMBER = pageIndex,
                        SEARCH_CONDITION = name,
                        ModuleName = moduleName,
                        subModuleName = submoduleName,
                        view_port_id = custom_view_id,
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


        /*! 
        * \brief   ResetPassword
        * \details function is used to Reset Password
        * \author  Aakash Sharma
        * \date    11 Sep 2019
        * \version 1.0    
        */
        public AspNetUsers ResetPassword(string newPassword)
        {
            return _dbContext.AspNetUsers.FirstOrDefault();
        }
        /*! 
        * \brief   User Status update
        * \details function is used to update (active/inactive) of user
        * \author  Kiran Bala 
        * \date    12 Sep 2019
        * \version 1.0    
        */
        public ChangeStatusModel ChangeStatus(Guid? id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                ChangeStatusModel _status = connection.QueryFirstOrDefault<ChangeStatusModel>("sp_solgen_updateUserStatus", new { UserId = id }, commandType: System.Data.CommandType.StoredProcedure);

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
          * \details function is used to Delete User
          * \author  Kiran Bala 
          * \date    12 Sep 2019
          * \version 1.0    
          */
        public string DeleteUser(string userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
              var  _status = connection.Query<string>("sp_solgen_deleteUser", new { userID = userid, CompanyId = companyId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
        * \brief   User Profile Data update
        * \details function is used to update personal information of user
        * \author  Aakash Sharma 
        * \date    13 Sep 2019
        * \version 1.0    
        */
        public bool UpdateUserProfile(ApplicationUserModel userModel)
        {
            bool _status = false;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<bool>("sp_solgen_updateUserProfile", new { userID = userModel.Id,  Phone = userModel.PhoneNumber, Email = userModel.Email, firstName = userModel.FirstName,  lastName = userModel.LastName, profilePic = userModel.ProfilePic, Address = userModel.Address,City=userModel.City,Country=userModel.County,State=userModel.State,ZipCode=userModel.ZipCode,timeZone = userModel.TimeZoneId, timeformat = userModel.TimeFormat, emailNotification = userModel.emailNotification }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
        * \brief   Update User Profile Image
        * \details function is used to delete Profile image
        * \author  Kiran Bala
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public bool UpdateUserProfileImage(Guid? userid)
        {
            bool _status = false;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<bool>("sp_solgen_updateUserProfilePic", new { userID = userid }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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

        public string GetCustomFieldsData( )
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<string>("SERVICE_GET_FIELDS_BY_MODULE_SUB_MODULE_ID",  commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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

        public string AddUpdateUserType(TblMasterModel userTypeModel)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<string>("sp_solgen_addEditUserType", new { masterValue = userTypeModel.MasterValue, masterStatusId = userTypeModel.MasterStatusId, masterDescription = userTypeModel.MasterDescription, masterId = userTypeModel.MasterId,
                    companyid = userTypeModel.companyid,
                    userid=userTypeModel.userid,
                    submoduleids=userTypeModel.subModuleid
                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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

        public PagedData GetUserTypeList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetUserTypeList",
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

        public string DeleteUserType(string id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<string>("sp_solgen_deleteUserType", new { Id = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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

        public MasterModel GetUserTypeDetailById(string id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<MasterModel>("sp_solgen_UserTypeDetails", new { Id = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
        public List<MasterItems> GetServiceTerritoryDDL(Guid userid, long companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                
                connection.Open();
                var data = connection.Query<MasterItems>("sp_solgen_GetLocationDll", new 
                {
                    userid = userid,
                    companyid = companyid
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
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public List<MasterItems> GetDepartmentDll(Guid userid, long companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                
                var data = connection.Query<MasterItems>("[sp_solgen_GetDepartmentDll]", new
                {
                    userid= userid,
                    companyid= companyid

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
        public List<MasterItems> GetCompanyDll()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                var data = connection.Query<MasterItems>("[sp_solgen_GetCompanyDll]", commandType: CommandType.StoredProcedure).ToList();

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

        public string GetModuleSubmoduleList(Guid userid, long companyid, string Id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();

                connection.Open();
                string data = connection.QueryFirstOrDefault<string>("[SOLGEN_SP_GET_Module_SubModuleList]",
                    new { masterid = Id ,
                    userid=userid,
                    companyid=companyid}, commandType: CommandType.StoredProcedure);

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

        /*! 
   * \brief   Get User Details
   * \details function is used to get user detail by id
   * \author  Vikrant
   * \date    6 Sep 2019
   * \version 1.0    
   */
        public dynamic GetDealerAccountDetail(string userid, string companyId = "")
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.QueryFirstOrDefault("sp_solgen_GetDealerDetail",
                    param: new
                    {
                        userid = userid,
                        companyid = companyId
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
         public string GetUserByEmail(string email)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<string>("sp_solgen_getUserbyEmail", new { email = email }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
    }
}
