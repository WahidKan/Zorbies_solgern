using System;
using System.Collections.Generic;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class ModuleService : IModuleService
    {
        private readonly IModuleRepository _moduleRepository;
        public ModuleService(IModuleRepository moduleRepository)
        {
            _moduleRepository = moduleRepository;
        }
        /*! 
  * \brief   Get Module List
  * \details  Get Module List
  * \author  Deepak jha 
  * \date    16 Sept 2019
  * \version 1.0    
  */
        public List<ModuleModel> GetModuleList(string userId,string companyid)
        {
            return _moduleRepository.GetModuleList(userId, companyid);
        }

        public string getRoleModuleList(long companyId, Guid userId, bool isApplyRole, bool fromMobil)
        {
            return _moduleRepository.getRoleModuleList(companyId, userId,isApplyRole,fromMobil);
        }

        public string GetSubModuleDetails(int companyId, string subModuleCode, string userId)
        {
            try
            {
                return _moduleRepository.GetSubModuleDetails(companyId,subModuleCode,userId);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }

      
    }
}
