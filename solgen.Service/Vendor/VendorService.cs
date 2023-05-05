using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class VendorService : IVendorService
    {
        private readonly IVendorRepository _repository;
        public VendorService(IVendorRepository repository)
        {
            _repository = repository;
        }
        /*! 
         * \brief   Get the list of vendors
         * \details Fetch the list of vendors
         * \author  Kiran Bala 
         * \date    14 Sep 2019
         * \version 1.0    
         */
        public PagedData GetVendorList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            return _repository.GetVendorList(name, sortColumn, sortDir, pageIndex, pageSize, userId,companyID);
        }
        public PagedData GetVendorLeaseRequestList(string searchText, string leaseStatus, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, Guid? contactId)
        {
            return _repository.GetVendorLeaseRequestList(searchText, leaseStatus, sortColumn, sortDir, pageIndex, pageSize, userId, contactId);
        }
        /*! 
         * \brief   User Status update
         * \details function is used to update (active/inactive) of vendor
         * \author  Kiran Bala 
         * \date    14 Sep 2019
         * \version 1.0    
         */
        public bool UpdateVendorStatus(string vendorid, string userStatus)
        {
            return _repository.UpdateVendorStatus(vendorid, userStatus);
        }
        /*! 
         * \brief   Delete Vendor
         * \details function is used Delete vendor
         * \author  Kiran Bala 
         * \date    14 Sep 2019
         * \version 1.0    
         */
        public bool DeleteVendor(string vendorid)
        {
            return _repository.DeleteVendor(vendorid);
        }

        /*! 
         * \brief   Get Vendor Detail
         * \details function is used to get detail of vendor by id
         * \author  Kiran Bala 
         * \date    14 Sep 2019
         * \version 1.0    
         */
        public VendorModel GetVendorDetailById(string vendorid)
        {
            return _repository.GetVendorDetail(vendorid);
        }

        /*! 
         * \brief   Add Edit Vendor detail
         * \details function is used to add/edit Vendor
         * \author  Kiran Bala 
         * \date    16 Sep 2019
         * \version 1.0    
         */
        public string AddEditVendor(VendorModel model)
        {
            return _repository.AddEditVendor(model);
        }
        /*! 
        * \brief   Get the list of Vendor
        * \details Fetch the list of Vendor
        * \author  Dheeraj Patial
        * \date    12 Dec 2019
        * \version 1.0    
        */
        public List<MasterItems> GetVendorDropList(long companyID)
        {
            return _repository.GetVendorDropList(companyID);
        }

        /*! 
        * \brief   Check email existance 
        * \details Check if email is duplicate
        * \author  Kiran Bala 
        * \date    12 Dec 2019
        * \version 1.0    
        */
        public string IsEmailExist(string vendorid, string emailid)
        {
            return _repository.IsEmailExist(vendorid, emailid);
        }
        /*! 
    * \brief   GetVendorList
    * \details  Get Vendor List
    * \author  Kiran Bala 
    * \date    13 Sep 2019
    * \version 1.0    
    */
        public List<VendorDropDown> GetVendorList(long companyID)
        {
            return _repository.GetVendorList(companyID);
        }
        public List<GetDynamicFields> GetDynamicFields()
        {
            return _repository.GetDynamicFields();
        }
        public string GetCustomFields(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId,string RefId, string displayCode)
        {
            return _repository.GetCustomFields(companyId, userId, moduleName, Id, strType, search, isFor, isRef, PrimaryId, RefId, displayCode);
        }

        public string GetCustomFieldsManage(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode)
        {
            return _repository.GetCustomFieldsManage(companyId, userId, moduleName, Id, strType, search, isFor, isRef, PrimaryId, RefId, displayCode);
        }

        public string GetCustomFieldsManageForm(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode)
        {
            return _repository.GetCustomFieldsManageForm(companyId, userId, moduleName, Id, strType, search, isFor, isRef, PrimaryId, RefId, displayCode);
        }

        public string GetCustomFieldsSelectMasterFields(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId)
        {
            return _repository.GetCustomFieldsSelectMasterFields(companyId, userId, moduleName, Id, strType, search, isFor, isRef, PrimaryId);
        }
        public string GetLayoutCustomFieldByModuleNameAndSubModule(string companyid, string userid, string moduleName, string subModuleName)
        {
            return _repository.GetLayoutCustomFieldByModuleNameAndSubModule( companyid,  userid,  moduleName,  subModuleName);
        }

        public string GetLayoutFormFieldByModuleNameAndSubModule(string companyid, string userid, string moduleName, string subModuleName,string  formMasterId)
        {
            return _repository.GetLayoutFormFieldByModuleNameAndSubModule(companyid, userid, moduleName, subModuleName, formMasterId);
        }
        public string GetManageViewCustomFieldsList(string fieldlistFilter, string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode)
        {
            return _repository.GetManageViewCustomFieldsList(fieldlistFilter, companyId, userId, moduleName, Id, strType, search, isFor, isRef, PrimaryId, RefId, displayCode);
        }
        public async Task<string> GetRelatedObjects(string moduleName, string subModuleName, long PrimaryId, string DeviceType, string LayoutType, long companyId, string userId)
        {
            return await _repository.GetRelatedObjects(moduleName, subModuleName, PrimaryId, DeviceType, LayoutType, companyId, userId);
        }
        public async Task<string> GetRelatedObjectsCompactView(long compact_view_id, string sub_module_code, long record_id, string sortColumn, string sortDirection, long pageNo, long pageSize, long CompanyId)
        {
            return await _repository.GetRelatedObjectsCompactView(compact_view_id, sub_module_code, record_id, sortColumn, sortDirection, pageNo, pageSize, CompanyId);
        }
    }
}
