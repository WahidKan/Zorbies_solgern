 
using System;
using System.Collections.Generic;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class MasterNameService : IMasterNameService
    {

        private readonly IMasterNameRepository repository;

        public MasterNameService(IMasterNameRepository repository)
        {
            this.repository = repository;
        }
        /*! 
      * \brief   Add Update Master Name
      * \details  Add Update Master Name
      * \author  Deepak jha 
      * \date    16 Sept 2019
      * \version 1.0    
      */
        public int AddUpdateMasterName(MasterNamesModel model)
        {
           return repository.AddUpdateMasterName(model);
        }
        /*! 
     * \brief   Get Master Name By Id
     * \details  Get Master Name By Id
     * \author  Deepak jha 
     * \date    16 Sept 2019
     * \version 1.0    
     */
        public MasterNamesModel GetMasterNameById(string Id)
        {
            return repository.GetMasterNameById(Id);
        }
        /*! 
    * \brief   GetMasterNameList
    * \details  Get Master Name List
    * \author  Deepak jha 
    * \date    16 Sept 2019
    * \version 1.0    
    */
        public PagedData GetMasterNameList(string masterNameValue, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                return repository.GetMasterNameList(masterNameValue, sortColumn, sortDir, pageIndex, pageSize, userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /*! 
   * \brief   GetStatuses
   * \details  Get Status
   * \author  Deepak jha 
   * \date    16 Sept 2019
   * \version 1.0    
   */
        public List<TblMasters> GetStatuses(string masterName)
        {
            return repository.GetStatuses(masterName);
        }

       
    }
}

