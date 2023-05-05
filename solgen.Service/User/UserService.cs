using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;

namespace Solgen.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        /*! 
        * \brief   Get User Details
        * \details function is used to get user detail by id
        * \author  Vikrant
        * \date    6 Sep 2019
        * \version 1.0    
        */
        public GetUserDetailsModel GetUserDetails(string userID, string companyid = "")
        {
            return _repository.GetUserDetails(userID, companyid);
        }
        public dynamic GetDealerAccountDetail(string userID, string companyid = "")
        {
            return _repository.GetDealerAccountDetail(userID, companyid);
        }

        public  string GetContactOrEmployeeById(string userId, Boolean isEmployee)
        {
            return _repository.GetContactOrEmployeeById(userId, isEmployee);
        }
        public string GetUserByEmail(string email)
        {
            return _repository.GetUserByEmail(email);
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
            try
            {
                return _repository.GetUsersList(name, userType, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public async Task<string> GetUserlist(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id, bool isAllRecords)
        {
            return await _repository.GetUserlist(name, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyID, custom_view_id,isAllRecords);
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
            return _repository.ResetPassword(newPassword);
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
            try
            {
                return _repository.ChangeStatus(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        /*! 
       * \brief   DeleteUser
       * \details function is used Delete User
       * \author  Kiran Bala 
       * \date    12 Sep 2019
       * \version 1.0    
       */
        public string DeleteUser(string userid, long companyId)
        {
            return _repository.DeleteUser(userid, companyId);
        }

        public UserDetailsModel GetUserInfo(string userid, string companyid = "")
        {
            return _repository.GetUserInfo(userid,companyid);
        }
        public UserDetailsModel GetUserInfoByUserIDCompanyID(string userid, long companyId)
        {
            return _repository.GetUserInfoByUserIDCompanyID(userid, companyId);
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
            return _repository.UpdateUserProfile(userModel);
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
            return _repository.UpdateUserProfileImage(userid);
        }


        public string GetCustomFieldsData()
        {
            return _repository.GetCustomFieldsData();
        }

        public string AddUpdateUserType(TblMasterModel userTypeModel)
        {
            return _repository.AddUpdateUserType(userTypeModel);
        }

        public PagedData GetUserTypeList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            return _repository.GetUserTypeList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
        }

        public string DeleteUserType(string id)
        {
            return _repository.DeleteUserType(id);
        }
        public MasterModel GetUserTypeDetailById(string id)
        {
            return _repository.GetUserTypeDetailById(id);
        }
        public List<MasterItems> GetServiceTerritoryDDL(Guid userid, long companyid)
        {
            return _repository.GetServiceTerritoryDDL(userid, companyid);
        }
        public List<MasterItems> GetDepartmentDll(Guid userid, long companyid)
        {
            return _repository.GetDepartmentDll(userid, companyid);
        }

        public List<MasterItems> GetCompanyDll()
        {
            return _repository.GetCompanyDll();
        }

        public string GetModuleSubmoduleList(Guid userid, long companyid, string Id)
        {
            return _repository.GetModuleSubmoduleList(userid, companyid,Id);
        }
    }
}
