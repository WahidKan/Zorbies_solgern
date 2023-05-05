using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _repository;
        public RoleService(IRoleRepository repository)
        {
            this._repository = repository;
        }

        /*! 
       * \brief   Change the role status by roleId
       * \details Change role Status by roleId
       * \author  Deepak jha 
       * \date    16 oct 2019
       * \version 1.0    
       */
        public CommonStatusModel ChangedRoleStatusById(string roleId, string roleStatus)
        {
            return _repository.ChangedRoleStatusById(roleId, roleStatus);
        }
        /*! 
       * \brief   Delete the role on basis of roleId
       * \details Delete role by roleId
       * \author  Deepak jha 
       * \date    16 oct 2019
       * \version 1.0    
       */
        public ChangeStatusModel DeletedRoleById(Guid roleId)
        {
            return _repository.DeletedRoleById(roleId);
        }
        /*! 
       * \brief   Get the list of Role
       * \details Get the list of Role
       * \author  Deepak jha 
       * \date    16 oct 2019
       * \version 1.0    
       */
        public PagedData GetRoleList(string roleName, string masterNameId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId,long companyID)
        {
           return _repository.GetRoleList(roleName, masterNameId, sortColumn, sortDir, pageIndex, pageSize, userId,companyID);
        }
        /*! 
       * \brief   Get the Get Role Module
       * \details Get the Get Role Module detail
       * \author  Deepak jha 
       * \date    16 oct 2019
       * \version 1.0    
       */
        public List<TblRoleModule> GetRoleModule(long? userTypeId,Guid? userid)
        {
            try
            {
                return _repository.GetRoleModule(userTypeId, userid);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        /*! 
       * \brief   add master names
       * \details add master names
       * \author  Deepak jha 
       * \date    16 oct 2019
       * \version 1.0    
       */
        public Guid Save(RoleModel entity)
        {
            try
            {
                return _repository.Save(entity);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        /*! 
      * \brief   Check Role Name Is Exist
      * \details Check Role Name Is Exist
      * \author  Deepak jha 
      * \date    16 oct 2019
      * \version 1.0    
      */
        public bool CheckRoleNameIsExist(Guid? id, string name,long companyID)
        {
            try
            {
                return _repository.CheckRoleNameIsExist(id, name,companyID);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        /*! 
      * \brief   Get Role By Id
      * \details Get Role By Id
      * \author  Deepak jha 
      * \date    16 oct 2019
      * \version 1.0    
      */
        public RoleModel GetRoleById(Guid? id, Guid? userid)
        {
            try
            {
                return _repository.GetRoleById(id, userid);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public string GetRoleNameForTree(Guid UserId, int CompanyID,string id)
        {
            return _repository.GetRoleNameForTree(UserId, CompanyID,id);
        }

        public async Task<string> getRoletabdata(Guid ROLEID, Guid UserId, int CompanyID, long usertypeid)
        {
            return await _repository.getRoletabdata(ROLEID,UserId, CompanyID, usertypeid);
        }

        public string GetRoleDataByid(Guid UserId, int CompanyID, string id)
        {
            return _repository.GetRoleDataByid(UserId, CompanyID, id);
        }

        public string SaveRole(Guid UserId, int CompanyID, string Json)
        {
            return _repository.SaveRole(UserId, CompanyID, Json);
        }

        public async Task<PagedData> GetUserList(string searchtxt, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? roleId, long companyId)
        {
            return await _repository.GetUserList(searchtxt, sortColumn, sortDir, pageIndex, pageSize, roleId, companyId);
        }

        public string saveLayoutRoles(JsonModel model)
        {
            return _repository.saveLayoutRoles(model);
        }
        public string CheckLayoutRolesExist(JsonModel model)
        {
            return _repository.CheckLayoutRolesExist(model);
        }
    }
}
