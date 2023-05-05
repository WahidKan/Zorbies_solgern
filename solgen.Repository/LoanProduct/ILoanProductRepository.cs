using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface ILoanProductRepository
    {
        List<LoanProductModel> GetCreditBureauMaster(string userid, string companyid);
        List<PrerequisiteLoanProductDocumentTypeModel> GetPrerequisiteLoanProductDocumentTypeNames(string userid, string companyid, string masterName);
        List<LoanProductDocumentTypeNamesModel> GetGetLoanProductDiscountCategoryNames(string userid, string companyid, string masterName);
        List<LoanProductModel> GetCreditBureauMasterEdit(string userid, string companyid, string productId);
        List<LoanProductPrerequisiteDocumentModel> GetPrerequisiteLoanProductEdit(string userid, string companyid, string productId);
        List<LoanLoanProductDiscounCategoryModel> GetLoanProductDiscountCategoryEdit(string userid, string companyid, string productId);
        string AddUpdateLoanProduct(LoanApplicationProductModel model);
        Task<string> GetLoanProductlist(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id);
        Task<string> GetLoanProductById(string id, string moduleName, string submoduleName, Guid userid, long CompanyID);
        Boolean DeleteRecords(string tableName, string primaryKey);

        List<ComapanyModel> GetSolgenUser(string userid, string companyid);
        List<dynamic> GetLoanProductList(long companyId,string bankIds);
        string SaveLoanproductPresiteDocument(PresiteDocumentModel model); 
        string UpdateLoanproductPresiteDocumentById(UpdatePresiteDocumentModel model);
        
        string AddEditDiscountDocument(PresiteDocumentModel model);
        string DeletePrerequisite(DeletePresiteDocumentModel model);
        string DeleteDiscountCategory(PresiteDocumentModel model);
        Int32 UpdateLoanPrerequisiteDocumentName(string documentName, long documentTypeId,string UserId);
        Task<string> GetLoanProductDetailById(long? id, long CompanyID, long loanid);
        Task<Int32> GetLoanProductPresiteDocumentByDocumentType(long CompanyId, long productId, string documentType);
    }
}
