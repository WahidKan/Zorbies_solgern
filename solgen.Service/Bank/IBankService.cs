using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;

namespace Solgen.Service
{
    public interface IBankService
    {
        PagedData GetBankList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId,long companyID);
        bool UpdateBankStatus(string id, string status);
        bool DeleteBank(string id);
        BankModel GetBankDetailById(string id);
        string AddEditBank(BankModel model);
        Task<string> GetBankListNew(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id);
        string AddEditCustomField(CustomFieldModel model);
        string SaveCustomManagePopup(ManageViewModelWithCompany model);
        string checkDublicateViewName(ManageViewModelWithCompany model);
        List<MasterItems> GetBankDropList(long companyID);
        List<RolesItems> GetRolesDropListByUserType(long id, long companyID,Guid? UserID);
        PagedData GetUsersBankList(int pageIndex, int pageSize, Guid? bankId);

        PagedData GetLoanApplicationList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID,long batchid);
        PagedData GetLoanTermList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID);

      
       
        PagedData GetTaskList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);
        
        PagedData GetDesignationList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID);

        PagedData GetLocationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);


        PagedData GetLocationTypeList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID);
        PagedData GetcibilScoreList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);


        PagedData GetCustomFieldList(string moduleId, string SubModuleId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, int companyId);
        CustomFieldModel GetCustomFieldDetail(Int64 id);


       IEnumerable<dynamic> GetOpportunityview(long opid, int stageid, Guid userid, int CompanyID);
        List<opportunitystage> getopportunitystage(long opid,Guid userid, int CompanyID);
 

       IEnumerable<dynamic> GetOpportunityviewTabData(long opid, Guid userid, int CompanyID);
       IEnumerable<dynamic> GetOpportunityViewProposal(long opid, Guid userid, int CompanyID);
       IEnumerable<dynamic> GetOpportunityViewTask(long opid, Guid userid, int CompanyID);
        IEnumerable<dynamic> GetOpportunityViewWorkorder(long opid, Guid userid, int CompanyID);
        IEnumerable<dynamic> GetOpportunityViewProduct(long opid, Guid userid, int CompanyID);
        IEnumerable<dynamic> GetAppointmentbyopportunityId(long opid, Guid userid, int CompanyID);
    IEnumerable<dynamic> GetOpportunityViewAccData(long opid, Guid userid, int CompanyID);

        #region dynamic listing
        Task<string> GetLeadlist(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id, string widgetType, string recordFilter, string teamID, string teamMemberID, bool isAllRecords);
        Task<string> GetLenderlist(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id);

        Task<string> GetAccountsList(bool isCustomerList,bool isSubDealerList,string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id, bool isAllRecords);

        string GetproductList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id);

        string GetproposalList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id);

        string GetContractList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id);

        string GetDepartmentList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id);

        string GetOpportunityList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id);

        string GetEmployeeList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id);

        string GetSolgenContactList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords);

        #endregion
        IEnumerable<dynamic> GetOpportunityViewcontractlist(long opid, Guid userid, int CompanyID);
        Task<string> GetEmployeeDetailById(string id, string moduleName, string submoduleName);
        IEnumerable<dynamic> GetOpportunityViewFileupload(long opid, Guid userid, int CompanyID);
        Task<string> getProjectList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords);
        string AddEditProject(ProjectModel model);
    }
}
