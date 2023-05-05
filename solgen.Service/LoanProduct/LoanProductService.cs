using Solgen.Core.Models;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class LoanProductService : ILoanProductService
    {
        private readonly ILoanProductRepository _repository;
        public LoanProductService(ILoanProductRepository repository)
        {
            _repository = repository;
        }

        public List<LoanProductModel> GetCreditBureauMaster(string userid, string companyid)
        {
            return _repository.GetCreditBureauMaster(userid, companyid);
        }

        public List<PrerequisiteLoanProductDocumentTypeModel> GetPrerequisiteLoanProductDocumentTypeNames(string userid, string companyid, string masterName)
        {
            return _repository.GetPrerequisiteLoanProductDocumentTypeNames(userid, companyid, masterName);
        }
        public List<LoanProductDocumentTypeNamesModel> GetGetLoanProductDiscountCategoryNames(string userid, string companyid, string masterName)
        {
            return _repository.GetGetLoanProductDiscountCategoryNames(userid, companyid, masterName);
        }
        public List<LoanProductModel> GetCreditBureauMasterEdit(string userid, string companyid, string productId)
        {
            return _repository.GetCreditBureauMasterEdit(userid, companyid, productId);
        }
        public List<LoanProductPrerequisiteDocumentModel> GetPrerequisiteLoanProductEdit(string userid, string companyid, string productId)
        {
            return _repository.GetPrerequisiteLoanProductEdit(userid, companyid, productId);
        }
        public List<LoanLoanProductDiscounCategoryModel> GetLoanProductDiscountCategoryEdit(string userid, string companyid, string productId)
        {
            return _repository.GetLoanProductDiscountCategoryEdit(userid, companyid, productId);
        }
        public string AddUpdateLoanProduct(LoanApplicationProductModel model)
        {
            return _repository.AddUpdateLoanProduct(model);
        }

        public async Task<string> GetLoanProductlist(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id)
        {
            return await _repository.GetLoanProductlist(name, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyID, custom_view_id);
        }
        public async Task<string> GetLoanProductById(string id, string moduleName, string submoduleName, Guid userid, long CompanyID)
        {
            return await _repository.GetLoanProductById(id, moduleName, submoduleName, userid, CompanyID);
        }
        public async Task<string> GetLoanProductDetailById(long? id, long CompanyID, long loanid)
        {
            return await _repository.GetLoanProductDetailById(id, CompanyID, loanid);
        }
        public Boolean DeleteRecords(string tableName, string primaryKey)
        {
            return _repository.DeleteRecords(tableName, primaryKey);
        }
        public List<ComapanyModel> GetSolgenUser(string userid, string companyid)
        {
            return _repository.GetSolgenUser(userid, companyid);
        }
        public string SaveLoanproductPresiteDocument(PresiteDocumentModel model)
        {
            return _repository.SaveLoanproductPresiteDocument(model);
        }
        public string UpdateLoanproductPresiteDocumentById(UpdatePresiteDocumentModel model)
        {
            return _repository.UpdateLoanproductPresiteDocumentById(model);
        }
        public string AddEditDiscountDocument(PresiteDocumentModel model)
        {
            return _repository.AddEditDiscountDocument(model);
        }
        public string DeletePrerequisite(DeletePresiteDocumentModel model)
        {
            return _repository.DeletePrerequisite(model);
        }
        public string DeleteDiscountCategory(PresiteDocumentModel model)
        {
            return _repository.DeleteDiscountCategory(model);
        }
        public List<dynamic> GetLoanProductList(long companyId,string bankIds)
        {
            try
            {
                return _repository.GetLoanProductList(companyId,bankIds);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public Int32 UpdateLoanPrerequisiteDocumentName(string documentName, long documentTypeId,string UserId)
        {
            return _repository.UpdateLoanPrerequisiteDocumentName(documentName, documentTypeId, UserId);
        }
        public async Task<Int32> GetLoanProductPresiteDocumentByDocumentType(long CompanyId, long productId, string documentType)
        {
            return await _repository.GetLoanProductPresiteDocumentByDocumentType(CompanyId,productId, documentType);
        }

    }
}
