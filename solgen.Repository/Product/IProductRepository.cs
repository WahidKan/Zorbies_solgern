using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface IProductRepository
    {
        Task<string> GetproductList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id);
        Task<string> GetProductById(string id, string moduleName, string submoduleName);
        string AddEditProduct(JsonModel model);
        PagedData GetPriceBookList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, long productid, Guid? userId, long companyID);
        Task<PagedData> GetProductsPriceBooksList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        Task<PagedData> GetProductCampaignsList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        Task<PagedData> GetProductRequiredList(string pNameAndNumber, string sortColumn, string sortDir, int page, int pageSize, DateTime? From, DateTime? To, int workTypeId, long companyId, string userId);
        Task<string> GetProductRequiredDetailById(string Id, string userId, string CompanyId);
    }
}
