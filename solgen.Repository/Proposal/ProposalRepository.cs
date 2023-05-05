using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Solgen.Core.Models;

namespace Solgen.Repository
{
    public class ProposalRepository : IProposalRepository
    {
        private readonly SolgenDbContext _dbContext;
        public ProposalRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<string> GetproposalList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await Task.FromResult(connection.Query<string>("sp_solgen_Custom_Proposal_Listing", new
                {
                    //NameSearch = nameSearch,
                    //SortDir = sortDir,
                    //SortColumn = sortColumn,
                    //PageNo = pageIndex,
                    //PageSize = pageSize,
                    //UserId = userId,
                    VIEWER_ID = userId,
                    COMPANY_ID = companyId,
                    SORT_BY = sortDir,
                    SORT_EXP = sortColumn,
                    PAGESIZE = pageSize,
                    PAGENUMBER = pageIndex,
                    SEARCH_CONDITION = nameSearch,
                    ModuleName = moduleName,
                    subModuleName = submoduleName,
                    view_port_id = custom_view_id,
                    isAllRecords = isAllRecords
                }
                , commandType: CommandType.StoredProcedure).FirstOrDefault());
                return dataList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<string> GetProposalDetailsbyid(string id, string moduleName, string submoduleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_GetProposalById",
                    new
                    {
                        ProposalId = id,
                        moduleName = moduleName,
                        submoduleName = submoduleName

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<string> SetPrimaryProposal(string CompanyId,long ProposalId,long OpportunityId,bool value )
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await Task.FromResult(connection.Query<string>("sp_solgen_SetPrimary_Proposal",
                    new
                    {
                        ProposalId =ProposalId,
                        OpportunityId = OpportunityId,
                        CompanyId =CompanyId,
                        value =value

                    }, commandType: CommandType.StoredProcedure).FirstOrDefault());
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string AddEditproposal(JsonModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", model.Id);
                //parameters.Add("@JSON", (model.FormJsonData));
                parameters.Add("@JSON", (model.FormJsonData.Replace("'", "\''")));
                parameters.Add("@USER_ID", (model.userId));
                parameters.Add("@module_code", (model.ModuleCode));
                parameters.Add("@submodule_code", (model.SubModuleCode));
                parameters.Add("@companyId", (model.companyId));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_AddEditProposal_custom"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public string AddUpdateLineItem(LineItemModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", model.userId);
                parameters.Add("@Fields", (model.Fields));
                parameters.Add("@CompanyId", (model.CompanyId));
                parameters.Add("@ProposalId", (model.ProposalId));
                parameters.Add("@lineItemId",(model.lineItemId == "undefined" ? "0" : model.lineItemId));
                parameters.Add("@OpprotunityId", (model.opportunityId== "undefined"?"1002":model.opportunityId));
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_SaveProposalLineItem"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public int DeleteProduct(string companyIds,string companyId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var result = connection.Query<int>("sp_Solgen_DeleteLineItemProduct", new { productId = companyIds,companyId=companyId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public int VoidGenerateDocument(long DocumentMappingId, string UserId, long ProposalId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var result = connection.Query<int>("sp_DocumentMaker_DeleteProposalMapping", new { DocumentMappingId = DocumentMappingId, UserId = UserId, ProposalId = ProposalId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }



        public PagedData GetAssociateProductList(long? proposalId, long? opportunityId,long companyID, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetProposalForProductMasterList",
                param: new
                {
                    proposalId = proposalId,
                    opportunityId= opportunityId,
                    nameSearch= nameSearch,
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID
                },
                commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, PageNo, PageSize);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


        public PagedData GetPriceBookListDetail(long Productid, string SortColumn, string SortDir, int PageNo, int PageSize, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetPriceBookListDetails",
                param: new
                {
                    Productid = Productid,
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    CompanyID = companyID
                },
                commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, PageNo, PageSize);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


        public PagedData GetAssociateProductWithProposalLineItemList(long? proposalId, long? opportunityId, long companyID, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetProposalLineItemList",
                param: new
                {
                    proposalId = proposalId,
                    opportunityId = opportunityId,
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID
                },
                commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, PageNo, PageSize);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<int> addOrUpdateFiles(ProposalFilesModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", model.Id);
                parameters.Add("@FileName", (model.FileName));
                parameters.Add("@FileUrl", (model.FileUrl));
                parameters.Add("@moduleName", (model.moduleName));
                parameters.Add("@SubModuleName", model.SubModuleName);
                parameters.Add("@type", model.Type);
                parameters.Add("@UserId", model.Userid);
                parameters.Add("@companyId", model.CompanyId);
                parameters.Add("@Description", model.description);
                parameters.Add("@DoumentTitle", model.documentTitle);
                int data = connection.QueryFirstOrDefault<int>("SP_Solgen_AddServiceResourceFile"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<PagedData> GetProposalLineItemList(long? proposalId, long? opportunityId, long companyID, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetViewProposalRelatedLineItemList",
                param: new
                {
                    proposalId = proposalId,
                    opportunityId = opportunityId,
                    SortDir = SortDir,
                    SortColumn = SortColumn,
                    PageNo = PageNo,
                    PageSize = PageSize,
                    UserId = userId,
                    CompanyID = companyID
                },
                commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, PageNo, PageSize);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public string ValidateUtilityAccount(long? Ids, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Ids", Ids);
                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>("sp_solgen_Utility_Account_Validation"
                    , parameters
                    , commandType: CommandType.StoredProcedure);

                return leasenumber;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<PagedData> GetOpportunityList(long Id, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? UserId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_solgen_GetOpportunityByProposalId",
                param: new
                {
                    CompanyId = companyId,
                    Id = Id,
                    SortDir = sortDir,
                    SortColumn = sortColumn,
                    PageSize = Convert.ToInt32(pageSize),
                    PageNo = Convert.ToInt32(pageIndex),
                },
                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize));
                return _data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<string> GetDocument(string moduleName, long companyId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var filePath = await Task.FromResult(connection.Query<string>(
                    "sp_DocumentMaker_GetDocumentURL_BySubModuleName",
                    param: new
                    {
                        companyId,
                        moduleName
                    },
                    commandType: CommandType.StoredProcedure).FirstOrDefault());
                return filePath;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


        public List<DocumentMappingDetail> GetDocumentMappingByModule(string subModuleName, long companyId, long mappingId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<DocumentMappingDetail>("sp_DocumentMaker_GetMappingBySubModule",
                    new
                    {
                        subModuleName,
                        companyId,
                        mappingId
                    }, commandType: CommandType.StoredProcedure).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public List<DocumentMappingDetail> GetDocumentProposalByMappingId(string subModuleName, long companyId, long mappingId,long proposalId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<DocumentMappingDetail>("sp_DocumentMaker_GetMappedProposalDocumentById",
                    new
                    {
                        subModuleName,
                        companyId,
                        mappingId,
                        proposalId
                    }, commandType: CommandType.StoredProcedure).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public List<dynamic> GetMappingList(string subModuleName, long companyId,long proposalId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@subModuleName", subModuleName);
                parameters.Add("@companyId", companyId);
                parameters.Add("@proposalId", proposalId);
                var a = connection.Query<dynamic>("sp_DocumentMaker_GetMappingListForProposal",
                    commandType: System.Data.CommandType.StoredProcedure, param: parameters).ToList();
                return a;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public List<dynamic> GetMappingListv1(string subModuleName, long companyId,long proposalId)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@subModuleName", subModuleName);
                parameters.Add("@companyId", companyId);
                parameters.Add("@proposalId", proposalId);
                return connection.Query<dynamic>("sp_DocumentMaker_GetMappingListForProposal_v1",
                    commandType: System.Data.CommandType.StoredProcedure, param: parameters).ToList();
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        

        public string GetCustomFieldsForProposal(string companyId, string userId, string moduleName, string PrimaryId,string SubmoduleName)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (PrimaryId == "undefined")
                {
                    PrimaryId = null;
                }
                string RelatedModule = "";
                if (SubmoduleName.ToLower() == "proposal")
                {
                    RelatedModule = "proposal,loanproduct,account,opportunity,workorder,serviceterritory,contact,Products,pricebookentity,contract";
                }
                else  if (SubmoduleName.ToLower() == "contract")
                {
                    RelatedModule = "account,opportunity,workorder,contract,contact,proposal";
                }

                var data = connection.Query<string>("sp_DocumentMaker_GetProposalCustomFields",
                    param: new
                    {
                        PRIMARY_KEY_VALUE = PrimaryId,
                        COMPANY_ID = Convert.ToInt32(companyId),
                        MODULE_NAME = moduleName,                        
                        SUB_MODULE_CODE = RelatedModule,
                        OTHER_DATA = "",
                        USER_ID = userId,
                        @SUB_MODULE=SubmoduleName
                    }, commandType: CommandType.StoredProcedure,
                    commandTimeout: Int32.MaxValue).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string SaveProposalMapping(long proposalId, long documentMappingId, long documentMappingDocId, string userId, string HtmlContent)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_DocumentMaker_AddProposalMapping",
                    param: new
                    {
                        ProposalId = proposalId,
                        DocumentMappingId = documentMappingId,
                        DocumentMappingDocId = documentMappingDocId,
                        UserId = userId,
                        HtmlContent = HtmlContent
                    }, commandType: CommandType.StoredProcedure,
                    commandTimeout: Int32.MaxValue).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }


        public List<dynamic> GetTempalteList(string companyId, long ProposalId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_DocumentMapping_DeliveryOptionTemplate",
                    new
                    {
                        CompanyId = companyId,
                        proposalId = ProposalId
                    }, commandType: CommandType.StoredProcedure).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<dynamic> GetProposalDocumentList(long Id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = await connection.QueryAsync("sp_ProposalDocument_GetlistbyId",
                param: new
                {

                    Id = Id,

                },
                commandType: CommandType.StoredProcedure);

                return dataList;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        //int UpdateProposalStatus(long DocumentMappingId, long DocumentMappingDocId, long CompanyId, long ProposalId, string DocumentStatus, string sendingResource);
        public int UpdateProposalStatus(long DocumentMappingId, long DocumentMappingDocId, long ProposalId, string DocumentStatus, string sendingResource,string documentid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@documentMappingId", DocumentMappingId);
                parameters.Add("@documentMappingDocId", DocumentMappingDocId);
                parameters.Add("@proposalId", ProposalId);
                parameters.Add("@documentStatus", DocumentStatus);
                parameters.Add("@sendingResource", sendingResource);
                parameters.Add("@documentid", documentid); 
                int data = connection.QueryFirstOrDefault<int>("sp_SolgenProposalUpdateSendingSourceAndStatus"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public int UpdateProposalStatuswebhook(string documentid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();               
                parameters.Add("@documentid", documentid);
                int data = connection.QueryFirstOrDefault<int>("sp_SolgenProposalCallBackStatus"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }


        

        public string GetValuesByCustomFieldIdForProposal(string companyId, string userId, string moduleName, string PrimaryId, string CustomFieldsId, string SubmoduleName)
        {
            var connection = _dbContext.Database.GetDbConnection();
            try
            {
                string RelatedModule = "";
                if (SubmoduleName.ToLower() == "proposal")
                {
                    RelatedModule = "proposal,loanproduct,account,opportunity,workorder,serviceterritory,contact,Products,pricebookentity,contract";
                }
                else if (SubmoduleName.ToLower() == "contract")
                {                   
                    RelatedModule = "account,opportunity,workorder,contract,contact,proposal";
                }
                connection.Open();
                if (PrimaryId == "undefined")
                {
                    PrimaryId = null;
                }
                var data = connection.Query<string>("sp_DocumentMaker_GetValuesByCustomFieldId",
                    param: new
                    {
                        PRIMARY_KEY_VALUE = PrimaryId,
                        COMPANY_ID = Convert.ToInt32(companyId),
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = RelatedModule,
                        OTHER_DATA = "",
                        USER_ID = userId,
                        CustomFiledId = CustomFieldsId,
                        SUB_MODULE = SubmoduleName
                    }, commandType: CommandType.StoredProcedure,
                    commandTimeout: Int32.MaxValue).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public dynamic GetHtmlForProposal(string proposalId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                dynamic data = connection.Query<dynamic>("sp_DocumentMaker_GetHtmlForProposal",
                    new
                    {                        
                        proposalId = proposalId
                    }
                   , commandType: CommandType.StoredProcedure).ToList();
                return data;
            }
            catch (Exception ex)
            {
                //throw new Exception(ex.Message);
                return null;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }


        public dynamic GetHtmlForDocument(string documentMakerId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                dynamic data = connection.Query<dynamic>("sp_DocumentMaker_GetHtmlForDocument",
                    new
                    {
                        DocumentMakerid = documentMakerId,                        
                    }
                   , commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                //throw new Exception(ex.Message);
                return null;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

    }
}
