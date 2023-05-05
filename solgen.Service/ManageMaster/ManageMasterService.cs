using System;
using System.Collections.Generic;
using Solgen.Core;
using Solgen.Repository;
using Solgen.Core.Models;

namespace Solgen.Service
{
    public class ManageMasterService : IManageMasterService
    {
        private readonly IManageMasterRepository _repository;
        public ManageMasterService(IManageMasterRepository repository)
        {
            _repository = repository;
        }
        /*! 
      * \brief   Get By Id
      * \details Get By Id
      * \author  deepak jha
      * \date    03 dec 2019
      * \version 1.0    
      */
        public TblMasterModel GetById(Guid id)
        {
            try
            {
                return _repository.GetById(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        /*! 
      * \brief   Get Master DropDown
      * \details Get Master DropDown
      * \author  deepak jha
      * \date    03 dec 2019
      * \version 1.0    
      */
        public List<MasterItems> GetMasterDropDown()
        {
            return _repository.GetMasterDropDown();
        }
        /*! 
      * \brief   Get Master List
      * \details Get Master List
      * \author  deepak jha
      * \date    03 dec 2019
      * \version 1.0    
      */
        public PagedData GetMasterList(string masterNames,string masterNameId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                return _repository.GetMasterList(masterNames, masterNameId, sortColumn, sortDir, pageIndex, pageSize, userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //public List<MasterModel> GetMasterList(string search)
        //{
        //    return _repository.GetMasterList(search);
        //}
        /*! 
      * \brief  Add update master
      * \details Add update master
      * \author  deepak jha
      * \date    03 dec 2019
      * \version 1.0    
      */
        public int Save(TblMasterModel entity)
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
      * \brief  Changed Master Status By Id
      * \details Changed Master Status By Id
      * \author  deepak jha
      * \date    03 dec 2019
      * \version 1.0    
      */
        public int ChangedMasterStatusById(Guid masterid, bool InStatus)
        {
            return _repository.ChangedMasterStatusById(masterid, InStatus);
        }
        /*! 
     * \brief  Deleted Master By Id
     * \details Deleted Master By Id
     * \author  deepak jha
     * \date    03 dec 2019
     * \version 1.0    
     */
        public int DeletedMasterById(Guid masterid)
        {
            return _repository.DeletedMasterById(masterid);
        }
        
    }
}
