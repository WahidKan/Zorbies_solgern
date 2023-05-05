using Solgen.Core;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Solgen.Core.Models;

namespace Solgen.Service
{
    public class ProposalService : IProposalService
    {
        private readonly IProposalRepository _repository;
        public ProposalService(IProposalRepository repository)
        {
            _repository = repository;
        }
        public async Task<string> GetProposalDetailsbyid(string id, string moduleName, string submoduleName)
        {
            return await _repository.GetProposalDetailsbyid(id, moduleName, submoduleName);
        }
        public async Task<string> SetPrimaryProposal(string CompanyId, long ProposalId, long OpportunityId, bool value)
        {
            return await _repository.SetPrimaryProposal(CompanyId, ProposalId, OpportunityId, value);
        }
        public async Task<string> GetproposalList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            return await _repository.GetproposalList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
        }

        public string AddEditproposal(JsonModel model)
        {
            return _repository.AddEditproposal(model);
        }
        public string AddUpdateLineItem(LineItemModel model)
        {
            return _repository.AddUpdateLineItem(model);
        }
        public int DeleteProduct(string companyIds, string companyId)
        {
            return _repository.DeleteProduct(companyIds, companyId);
        }
        public PagedData GetAssociateProductList(long? proposalId, long? opportunityId, long companyID, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            return _repository.GetAssociateProductList(proposalId, opportunityId, companyID, submoduleid, objectname, nameSearch, SortColumn, SortDir, PageNo, PageSize, userId);
        }
        public PagedData GetAssociateProductWithProposalLineItemList(long? proposalId, long? opportunityId, long companyID, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            return _repository.GetAssociateProductWithProposalLineItemList(proposalId, opportunityId, companyID, submoduleid, objectname, nameSearch, SortColumn, SortDir, PageNo, PageSize, userId);
        }

        public PagedData GetPriceBookListDetail(long Productid, string SortColumn, string SortDir, int PageNo, int PageSize, long companyID)
        {
            return _repository.GetPriceBookListDetail(Productid, SortColumn, SortDir, PageNo, PageSize, companyID);
        }
        public async Task<int> addOrUpdateFiles(ProposalFilesModel model)
        {
            return await _repository.addOrUpdateFiles(model);
        }
        public async Task<PagedData> GetProposalLineItemList(long? proposalId, long? opportunityId, long companyID, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            return await _repository.GetProposalLineItemList(proposalId, opportunityId, companyID, submoduleid, objectname, nameSearch, SortColumn, SortDir, PageNo, PageSize, userId);
        }

        public string ValidateUtilityAccount(long? Ids, long companyId)
        {
            return _repository.ValidateUtilityAccount(Ids, companyId);
        }

        public int VoidGenerateDocument(long DocumentMappingId, string UserId, long ProposalId)
        {
            return _repository.VoidGenerateDocument(DocumentMappingId, UserId, ProposalId);
        }


        public async Task<PagedData> GetOpportunityList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            return await _repository.GetOpportunityList(Id, sortColumn, sortDir, pageIndex, pageSize, companyId, UserId);
        }



        public List<DocumentMappingDetail> GetDocumentMappingByModule(string subModuleName, long companyId, long mappingId)
        {

            return _repository.GetDocumentMappingByModule(subModuleName, companyId, mappingId);
        }
        public List<DocumentMappingDetail> GetDocumentProposalByMappingId(string subModuleName, long companyId, long mappingId, long proposalId)
        {

            return _repository.GetDocumentProposalByMappingId(subModuleName, companyId, mappingId, proposalId);
        }

        public List<dynamic> GetMappingList(string subModuleName, long companyId, long proposalId)
        {
            try
            {
                return _repository.GetMappingList(subModuleName, companyId, proposalId);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }

        public List<dynamic> GetTempalteList(string companyId, long ProposalId)
        {
            try
            {
                return _repository.GetTempalteList(companyId, ProposalId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<dynamic> GetMappingListv1(string subModuleName, long companyId, long proposalId)
        {
            try
            {
                return _repository.GetMappingListv1(subModuleName, companyId, proposalId);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }



        public string GetCustomFieldsForProposal(string companyId, string userId, string moduleName, string PrimaryId, string SubmoduleName)
        {
            try
            {
                return _repository.GetCustomFieldsForProposal(companyId, userId, moduleName, PrimaryId, SubmoduleName);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }
        public string GetValuesByCustomFieldIdForProposal(string companyId, string userId, string moduleName, string PrimaryId, string CustomFieldsId, string SubmoduleName)
        {
            try
            {
                return _repository.GetValuesByCustomFieldIdForProposal(companyId, userId, moduleName, PrimaryId, CustomFieldsId, SubmoduleName);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }

        public string SaveProposalMapping(long proposalId, long documentMappingId, long documentMappingDocId, string userId, string HtmlContent)
        {
            try
            {
                return _repository.SaveProposalMapping(proposalId, documentMappingId, documentMappingDocId, userId, HtmlContent);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }




        public async Task<dynamic> GetProposalDocumentList(long Id)
        {
            return await _repository.GetProposalDocumentList(Id);
        }
        public int UpdateProposalStatus(long DocumentMappingId, long DocumentMappingDocId, long ProposalId, string DocumentStatus, string sendingResource, string documentid)
        {
            return _repository.UpdateProposalStatus(DocumentMappingId, DocumentMappingDocId, ProposalId, DocumentStatus, sendingResource, documentid);
        }
        public int UpdateProposalStatuswebhook(string documentid)
        {
            return _repository.UpdateProposalStatuswebhook(documentid);
        }
        
        public dynamic GetHtmlForProposal(string proposalId)
        {
            return _repository.GetHtmlForProposal(proposalId);
        }

        public dynamic GetHtmlForDocument(string documentMakerId)
        {
            return _repository.GetHtmlForDocument(documentMakerId);
        }
    }

}
