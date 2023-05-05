using System;
using System.Collections.Generic;
using Solgen.Core;
using Solgen.Repository;
using Solgen.Core.Models;

namespace Solgen.Service
{
    public class ManageformService : IManageFormService
    {
        private readonly IManageFormRepository _repository;
        public ManageformService(IManageFormRepository repository)
        {
            _repository = repository;
        }
        /*! 
      * \brief   Get By Id
      * \details Get By Id
      * \author  Dheeraj
      * \date    03 dec 2019
      * \version 1.0    
      */
        public TblFormMasterModel GetById(long id)
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
      * \author  Dheeraj
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
      * \author  Dheeraj
      * \date    03 dec 2019
      * \version 1.0    
      */
        public PagedData GetFormMasterList(string name, string formmasterid, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                return _repository.GetFormMasterList(name, formmasterid, sortColumn, sortDir, pageIndex, pageSize, userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public string GetLayoutCustomFieldByModuleNameAndSubModule(string companyid, string userid, long? formid)
        {
            return _repository.GetLayoutCustomFieldByModuleNameAndSubModule(companyid, userid, formid);
        }
        public string AddOrUpdateCustomeFields(string jsondata, long? formid, Guid? userid, long companyId)
        {
            return _repository.AddOrUpdateCustomeFields(jsondata, formid, userid, companyId);
        }
        /*! 
      * \brief  Add update master
      * \details Add update master
      * \author  Dheeraj
      * \date    03 dec 2019
      * \version 1.0    
      */
        public int Save(TblFormMasterModel entity)
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

        public List<dynamic> GetAll(int companyId)
        {
            try
            {
                return _repository.GetAll(companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
    }
}
