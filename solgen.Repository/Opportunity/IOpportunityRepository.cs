using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface IOpportunityRepository
    {
        IEnumerable<dynamic> GetOpportunityview(long opid, int stageid, Guid userid, int CompanyID);
        List<opportunitystage> getopportunitystage(long opid, Guid userid, int CompanyID);
        string GetTypeOnBaseType(long companyId, string SearchText, long length, long ID, string Type);

        IEnumerable<dynamic> GetOpportunityviewTabData(long opid, Guid userid, int CompanyID);
        IEnumerable<dynamic> GetOpportunityViewProposal(long opid, Guid userid, int CompanyID);
        IEnumerable<dynamic> GetOpportunityViewTask(long opid, Guid userid, int CompanyID);
        IEnumerable<dynamic> GetOpportunityViewWorkorder(long opid, Guid userid, int CompanyID);
        IEnumerable<dynamic> GetOpportunityViewProduct(long opid, Guid userid, int CompanyID);
        IEnumerable<dynamic> GetAppointmentbyopportunityId(long opid, Guid userid, int CompanyID);
        IEnumerable<dynamic> GetOpportunityViewAccData(long opid, Guid userid, int CompanyID);
        IEnumerable<dynamic> GetOpportunityViewFileupload(long opid, Guid userid, int CompanyID);
        IEnumerable<dynamic> GetOpportunityViewcontractlist(long opid, Guid userid, int CompanyID);
        Task<string> GetOpportunityList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, string widgetType, string recordFilter, string teamID, string teamMemberID, string viewType, string groupBy, bool isAllRecords);
        Task<string> GetOpportunityById(string id, string moduleName, string submoduleName, Guid userid, long CompanyID);
        Task<string> GetOppDataById(long opportunityId, long companyID, Guid userid);
        int updateStage(long opid, long substageid, Guid userid, long companyid);
        int SaveRequestDesignOpportunity(RequestDesignModel model);
        RequestDesignModel GetRequestDesignOpportunity(long opid, Guid userid, int CompanyID);

        PagedData GetOpportunityProposalList(long id, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID);
        int UpdateOpportunityStage(long stageId, long opportunityId, long companyId, Guid userId);
        Task<PagedData> GetOpprtunityProductsList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);

        Task<PagedData> GetSendToLoanHomiDetail(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        Task<PagedData> GetOpprtunityProposalsList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        Task<PagedData> GetOpprtunityWorkOrderList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        Task<PagedData> GetOpprtunityContractList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        Task<PagedData> GetOpprtunityAccountsList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        List<MasterItems> GetUtilityCompanyDll(Guid userid, long companyid, string id, int length, string serchText);
        string SendAutomaticContract(long opid, Guid userid, int CompanyID);

        string SaveUtility_Proposal_Design_Information(SaveUtilityModel model, long companyID);
        Task<PagedData> GetOpportunityviewFileList(long id, long accountid,bool isaccount, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid userid, long CompanyID);
        string CheckExistingEmailAddress(string email, long companyID);
        List<MasterItems> GetInstallerRepNameList(string salesRepName, long accountId, long companyId);
        List<MasterItems> GetSalesRepNameList(string salesRepName, long accountId, long companyId);

        welcomeNoteOpportunityModel GetWelcomecallNoteOpportunity(long opid, Guid userid, int CompanyID);
        string SaveWelcomecallNoteOpportunity(welcomeNoteOpportunityModel model);
        bool CheckLoanAssociate(long companyID, long id);
    }
}
