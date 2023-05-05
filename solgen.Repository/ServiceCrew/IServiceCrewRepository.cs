using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface IServiceCrewRepository
    {
        Task<string> GetServiceCrewList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords);
        Task<string> ManageServiceCrew(ServiceCrewModel model);
       
        //Task<string> GetProductById(string id, string moduleName, string submoduleName);
        //string AddEditProduct(JsonModel model);
        //PagedData GetPriceBookList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, long productid, Guid? userId, long companyID);
        //Task<PagedData> GetProductsPriceBooksList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        //Task<PagedData> GetProductCampaignsList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
    }
}
