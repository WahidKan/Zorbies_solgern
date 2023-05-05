using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Repository
{
    public interface IManageCompanyRepository
    {
        PagedData GetCompanyList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, long companyID);
        PagedData GetPriceBookList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, long companyID);
        int DeleteCompanys(string companyIds);
        List<TblCompanyModule> GetCompanyModule(long? userTypeId, Guid? userid);
        string DeleteBookPrice(string userid, long CompanyID, string dataFinal);
        string addOrUpdatePriceBook(PriceBookModel model);
        string GetPriceBookById(string id, string CompanyID, string User_id);
        string AddUpdateLineItem(PriceBookModelForProductItem model);
        string DeleteAssociateProduct(string userid, string CompanyID, string pricemapId, string priceBookId);
        List<dynamic> GetAssociateDocumentList(string userid, string companyid, string priceBookId);
        PagedData GetAssociateProductList(long priceBookId, long opportunityId, long companyID, long submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, string userId);
    }
}
