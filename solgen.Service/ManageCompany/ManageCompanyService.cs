using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Service
{
    public class ManageCompanyService : IManageCompanyService
    {
        private readonly IManageCompanyRepository _repository;
        public ManageCompanyService(IManageCompanyRepository repository)
        {
            _repository = repository;
        }

        public PagedData GetCompanyList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, long companyID)
        {
            return _repository.GetCompanyList(name, sortColumn, sortDir, page, pageSize, userId, companyID);
        }
        public PagedData GetPriceBookList(string name, string sortColumn, string sortDir, int page, int pageSize, Guid? userId, long companyID)
        {
            return _repository.GetPriceBookList(name, sortColumn, sortDir, page, pageSize, userId, companyID);
        }
        public int DeleteCompanys(string companyIds)
        {
            return _repository.DeleteCompanys(companyIds);
        }

        public List<TblCompanyModule> GetCompanyModule(long? userTypeId, Guid? userid)
        {
            return _repository.GetCompanyModule(userTypeId,userid);
        }
        public string DeleteBookPrice(string userid, long CompanyID, string dataFinal)
        {
            return _repository.DeleteBookPrice(userid, CompanyID, dataFinal);
        }
        public string addOrUpdatePriceBook(PriceBookModel model)
        {
            return _repository.addOrUpdatePriceBook(model);
        }
        public  string GetPriceBookById(string id, string CompanyID, string User_id)
        {
            return _repository.GetPriceBookById(id, CompanyID, User_id);
        }
        public PagedData  GetAssociateProductList(long priceBookId, long opportunityId, long companyID, long submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, string userId)
        {
            return _repository.GetAssociateProductList(priceBookId, opportunityId,companyID, submoduleid, objectname, nameSearch, SortColumn, SortDir, PageNo, PageSize, userId);
        }
        public List<dynamic> GetAssociateDocumentList(string userid, string companyid, string priceBookId)
        {
            return _repository.GetAssociateDocumentList(userid, companyid, priceBookId);
        }
        public string AddUpdateLineItem(PriceBookModelForProductItem model)
        {
            return _repository.AddUpdateLineItem(model);
        }
        public string DeleteAssociateProduct(string userid, string CompanyID, string pricemapId, string priceBookId)
        {
            return _repository.DeleteAssociateProduct(userid,CompanyID, pricemapId, priceBookId);
        }

    }
}
