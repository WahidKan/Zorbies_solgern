using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Core;

namespace Solgen.Service
{
    public interface IVendorService
    {
        PagedData GetVendorList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID);
        PagedData GetVendorLeaseRequestList(string searchText, string leaseStatus, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, Guid? contactId);
        bool DeleteVendor(string vendorid);
        bool UpdateVendorStatus(string vendorid, string userStatus);
        VendorModel GetVendorDetailById(string vendorid);
        string AddEditVendor(VendorModel model);
        List<MasterItems> GetVendorDropList(long companyID);
        string IsEmailExist(string vendorid, string emailid);
        List<VendorDropDown> GetVendorList(long companyID);

        List<GetDynamicFields> GetDynamicFields();
        string GetCustomFields(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId,string RefId, string displayCode);

        string GetCustomFieldsManage(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode);

        string GetCustomFieldsManageForm(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode);

        string GetLayoutCustomFieldByModuleNameAndSubModule(string companyid, string userid, string moduleName, string subModuleName);

        string GetLayoutFormFieldByModuleNameAndSubModule(string companyid, string userid, string moduleName, string subModuleName,string formMasterId);
        string GetCustomFieldsSelectMasterFields(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId);
        string GetManageViewCustomFieldsList(string fieldlistFilter, string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode);

        Task<string> GetRelatedObjects(string moduleName, string subModuleName, long PrimaryId, string DeviceType, string LayoutType, long companyId, string userId);
        Task<string> GetRelatedObjectsCompactView(long compact_view_id, string sub_module_code, long record_id, string sortColumn, string sortDirection, long pageNo, long pageSize, long CompanyId);
    }
}
