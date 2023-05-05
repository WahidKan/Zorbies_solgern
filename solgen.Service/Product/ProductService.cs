using Solgen.Core;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }
        public async Task<string> GetProductById(string id, string moduleName, string submoduleName)
        {
            return await _repository.GetProductById(id, moduleName, submoduleName);
        }

        public async Task<string> GetproductList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            return await _repository.GetproductList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
        }
        public string AddEditProduct(JsonModel model)
        {
            return _repository.AddEditProduct(model);
        }

        public PagedData GetPriceBookList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, long productid, Guid? userId, long companyID)
        {
            return  _repository.GetPriceBookList(nameSearch, SortColumn, SortDir, PageNo, PageSize, productid, userId, companyID) ;
        }

        public async Task<PagedData> GetProductsPriceBooksList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _repository.GetProductsPriceBooksList(productId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }
        public async Task<PagedData> GetProductCampaignsList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _repository.GetProductCampaignsList(productId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }
        public async Task<PagedData> GetProductRequiredList(string pNameAndNumber, string sortColumn, string sortDir, int page, int pageSize, DateTime? From, DateTime? To, int workTypeId, long companyId, string userId)
        {
            return await _repository.GetProductRequiredList(pNameAndNumber, sortColumn, sortDir, page, pageSize, From, To, workTypeId,  companyId,  userId);
        }
        public async Task<string> GetProductRequiredDetailById(string Id, string userId, string CompanyId)
        {
            return await _repository.GetProductRequiredDetailById( Id,  userId, CompanyId);
        }
    }
}
