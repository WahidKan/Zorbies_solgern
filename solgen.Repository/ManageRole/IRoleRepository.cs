using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Core;

namespace Solgen.Repository
{
    public interface IRoleRepository
    {
        Guid Save(RoleModel entity);
        PagedData GetRoleList(string roleName, string masterNameId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID);
        ChangeStatusModel DeletedRoleById(Guid roleId);
        CommonStatusModel ChangedRoleStatusById(string roleId, string roleStatus);
        List<TblRoleModule> GetRoleModule(long? userTypeId, Guid? userid);
        bool CheckRoleNameIsExist(Guid? id, string name, long companyID);
        RoleModel GetRoleById(Guid? id, Guid? userid);

        string GetRoleNameForTree( Guid UserId, int CompanyID, string id);
        string GetRoleDataByid( Guid UserId, int CompanyID, string id);
        Task<string> getRoletabdata(Guid ROLEID,Guid UserId, int CompanyID, long usertypeid);
        string SaveRole(Guid UserId, int CompanyID, string Json);
        Task<PagedData> GetUserList(string searchtxt, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? roleId, long companyId);

        string saveLayoutRoles(JsonModel model);
        string CheckLayoutRolesExist(JsonModel model);
    }
}
