using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;

namespace Solgen.Service
{
    public interface IUserService
    {
        GetUserDetailsModel GetUserDetails(string userID,string companyid="");
       string GetContactOrEmployeeById(string userId, Boolean isEmployee);
        string GetUserByEmail(string email);
        
        UserDetailsModel GetUserInfo(string userid,string companyid="");
        UserDetailsModel GetUserInfoByUserIDCompanyID(string userid, long companyId);
        PagedData GetUsersList(string name, string userType, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID);
        AspNetUsers ResetPassword(string newPassword);
        ChangeStatusModel ChangeStatus(Guid? id);
        string DeleteUser(string userid,long companyId);
        bool UpdateUserProfile(ApplicationUserModel userModel);
        bool UpdateUserProfileImage(Guid? userid);

        string GetCustomFieldsData();

        string AddUpdateUserType(TblMasterModel userTypeModel);

        PagedData GetUserTypeList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID);

        string DeleteUserType(string id);

        MasterModel GetUserTypeDetailById(string id);
        List<MasterItems> GetServiceTerritoryDDL(Guid userid, long companyid);
        List<MasterItems> GetDepartmentDll(Guid userid, long companyid);
        List<MasterItems> GetCompanyDll();
        string GetModuleSubmoduleList(Guid userid, long companyid, string Id);

        dynamic GetDealerAccountDetail(string userID, string companyid = "");

        Task<string> GetUserlist(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id,  bool isAllRecords);
    }
}
