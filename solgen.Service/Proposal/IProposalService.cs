using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Core.Models;

namespace Solgen.Service
{
    public interface IProposalService
    {
        Task<string> GetProposalDetailsbyid(string id, string moduleName, string submoduleName);
        Task<string> SetPrimaryProposal(string CompanyId, long ProposalId, long OpportunityId, bool value);
        Task<string> GetproposalList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords);

        string AddEditproposal(JsonModel model);
        string AddUpdateLineItem(LineItemModel model);
        int DeleteProduct(string companyIds, string companyId);
        PagedData GetAssociateProductWithProposalLineItemList(long? proposalId, long? opportunityId, long companyID, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId);
        PagedData GetAssociateProductList(long? proposalId, long? opportunityId, long companyID, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId);
        PagedData GetPriceBookListDetail(long Productid, string SortColumn, string SortDir, int PageNo, int PageSize, long companyID);

        Task<int> addOrUpdateFiles(ProposalFilesModel model);
        Task<PagedData> GetProposalLineItemList(long? proposalId, long? opportunityId, long companyID, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId);

        string ValidateUtilityAccount(long? Ids, long companyId);
        Task<PagedData> GetOpportunityList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId);
        List<DocumentMappingDetail> GetDocumentMappingByModule(string subModuleName, long companyId, long mappingId);
        List<DocumentMappingDetail> GetDocumentProposalByMappingId(string subModuleName, long companyId, long mappingId,long proposalId);
        List<dynamic> GetMappingList(string subModuleName, long companyId,long proposal);

        List<dynamic> GetTempalteList(string companyid, long ProposalId);

        string GetCustomFieldsForProposal(string companyId, string userId, string moduleName, string PrimaryId, string submoduleName);
        string GetValuesByCustomFieldIdForProposal(string companyId, string userId, string moduleName, string PrimaryId, string CustomFieldsId, string submoduleName);

        string SaveProposalMapping(long proposalId, long documentMappingId, long documentMappingDocId, string userId, string HtmlContent);
        List<dynamic> GetMappingListv1(string subModuleName, long companyId, long proposalId);

       

        int VoidGenerateDocument(long DocumentMappingId, string UserId, long ProposalId);

        Task<dynamic> GetProposalDocumentList(long Id);

        int UpdateProposalStatus(long DocumentMappingId, long DocumentMappingDocId, long ProposalId, string DocumentStatus,string sendingResource, string documentid);
        int UpdateProposalStatuswebhook( string documentid);
        dynamic GetHtmlForProposal(string proposalId);
        dynamic GetHtmlForDocument(string documentMakerId);

    }
}
