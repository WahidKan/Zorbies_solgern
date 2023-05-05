using DocumentFormat.OpenXml.Bibliography;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class OpportunityService : IOpportunityService
    {
        private readonly IOpportunityRepository _repository;
        public OpportunityService(IOpportunityRepository repository)
        {
            _repository = repository;
        }
        public IEnumerable<dynamic> GetAppointmentbyopportunityId(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetAppointmentbyopportunityId(opid, userid, CompanyID);
        }

        public IEnumerable<dynamic> GetOpportunityViewProduct(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityViewProduct(opid, userid, CompanyID);
        }
        public IEnumerable<dynamic> GetOpportunityviewTabData(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityviewTabData(opid, userid, CompanyID);
        }

        public IEnumerable<dynamic> GetOpportunityViewProposal(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityViewProposal(opid, userid, CompanyID);
        }

        public IEnumerable<dynamic> GetOpportunityViewTask(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityViewTask(opid, userid, CompanyID);
        }

        public IEnumerable<dynamic> GetOpportunityViewWorkorder(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityViewWorkorder(opid, userid, CompanyID);
        }
        public IEnumerable<dynamic> GetOpportunityview(long opid, int stageid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityview(opid, stageid, userid, CompanyID);
        }

        public List<opportunitystage> getopportunitystage(long opid, Guid userid, int CompanyID)
        {
            return _repository.getopportunitystage(opid, userid, CompanyID);
        }

        public IEnumerable<dynamic> GetOpportunityViewAccData(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityViewAccData(opid, userid, CompanyID);
        }

       

        public IEnumerable<dynamic> GetOpportunityViewFileupload(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityViewFileupload(opid, userid, CompanyID);
        }

        public IEnumerable<dynamic> GetOpportunityViewcontractlist(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityViewcontractlist(opid, userid, CompanyID);
        }
        public async Task<string> GetOpportunityList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, string widgetType, string recordFilter, string teamID, string teamMemberID, string viewType, string groupBy, bool isAllRecords)
        {
            return await _repository.GetOpportunityList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, widgetType, recordFilter, teamID, teamMemberID, viewType, groupBy, isAllRecords);
        }

        public async Task<string> GetOpportunityById(string id, string moduleName, string submoduleName, Guid userid, long CompanyID)
        {
            return await _repository.GetOpportunityById(id, moduleName, submoduleName,  userid,  CompanyID);
        }
        public async Task<string> GetOppDataById(long opportunityId, long companyID, Guid userid)
        {
            return await _repository.GetOppDataById(opportunityId, companyID, userid);
        }
        public int updateStage(long opid, long substageid, Guid userid, long companyid)
        {
            return _repository.updateStage(opid, substageid, userid, companyid);
        }

        public int SaveRequestDesignOpportunity(RequestDesignModel model)
        {
            return _repository.SaveRequestDesignOpportunity(model);
        }

        public RequestDesignModel GetRequestDesignOpportunity(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetRequestDesignOpportunity(opid, userid, CompanyID);
        }

        public PagedData GetOpportunityProposalList(long id, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
            return _repository.GetOpportunityProposalList(id, submoduleid, objectname, nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID);
        }

        public int UpdateOpportunityStage(long stageId, long opportunityId, long companyId, Guid userId)
        {
            return _repository.UpdateOpportunityStage(stageId, opportunityId, companyId, userId);
        }

        public async Task<PagedData> GetOpprtunityProductsList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _repository.GetOpprtunityProductsList(Id, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }

        public async Task<PagedData> GetSendToLoanHomiDetail(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _repository.GetSendToLoanHomiDetail(Id, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }
        public async Task<PagedData> GetOpprtunityWorkOrderList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _repository.GetOpprtunityWorkOrderList(Id, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }
        public async Task<PagedData> GetOpprtunityContractList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _repository.GetOpprtunityContractList(Id, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }
        public async Task<PagedData> GetOpprtunityAccountsList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _repository.GetOpprtunityAccountsList(Id, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }

        public async Task<PagedData> GetOpprtunityProposalsList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _repository.GetOpprtunityProposalsList(Id, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }

        public List<MasterItems> GetUtilityCompanyDll(Guid userid, long companyid, string id, int length, string serchText)
        {
            return _repository.GetUtilityCompanyDll(userid, companyid, id, length, serchText);
        }
        public string SendAutomaticContract(long opid, Guid userid, int CompanyID)
        {
            return _repository.SendAutomaticContract(opid, userid, CompanyID);
        }
        public string SaveUtility_Proposal_Design_Information(SaveUtilityModel model, long companyID)
        {
            return _repository.SaveUtility_Proposal_Design_Information(model, companyID);
        }

        public async Task<PagedData> GetOpportunityviewFileList(long id, long accountid, bool isaccount, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid userid, long CompanyID)
        {
            return await _repository.GetOpportunityviewFileList(id, accountid, isaccount, sortColumn, sortDir, pageIndex, pageSize, userid, CompanyID);
        }
        public string CheckExistingEmailAddress(string email, long companyID)
        {
            return _repository.CheckExistingEmailAddress(email, companyID);
        }
        public List<MasterItems> GetInstallerRepNameList(string salesRepName,long accountId,long companyId)
        {
            return _repository.GetInstallerRepNameList(salesRepName,accountId,companyId);
        }
        public List<MasterItems> GetSalesRepNameList(string salesRepName, long accountId, long companyId)
        {
            return _repository.GetSalesRepNameList(salesRepName, accountId, companyId);
        }

        public welcomeNoteOpportunityModel GetWelcomecallNoteOpportunity(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetWelcomecallNoteOpportunity(opid, userid, CompanyID);
        }

        public string SaveWelcomecallNoteOpportunity(welcomeNoteOpportunityModel model)
        {
            return _repository.SaveWelcomecallNoteOpportunity(model);
        }

        public string GetTypeOnBaseType(long companyId, string SearchText, long length, long ID,string Type)
        {
            return _repository.GetTypeOnBaseType(companyId, SearchText, length, ID, Type);
        }
        public bool CheckLoanAssociate(long companyId,long Id)
        {
            return _repository.CheckLoanAssociate( companyId, Id);
        }
    }
}
