using Solgen.Core;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class ServiceCrewService : IServiceCrewService
    {
        private readonly IServiceCrewRepository _repository;
        public ServiceCrewService(IServiceCrewRepository repository)
        {
            _repository = repository;
        }
        
        public async Task<string> GetServiceCrewList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            return await _repository.GetServiceCrewList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
        }

        public async Task<string> ManageServiceCrew(ServiceCrewModel model)
        {
            return await _repository.ManageServiceCrew(model);
        }


        //public string AddEditProduct(JsonModel model)
        //{
        //    return _repository.AddEditProduct(model);
        //}

        //public PagedData GetPriceBookList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, long productid, Guid? userId, long companyID)
        //{
        //    return  _repository.GetPriceBookList(nameSearch, SortColumn, SortDir, PageNo, PageSize, productid, userId, companyID) ;
        //}

        //public async Task<PagedData> GetProductsPriceBooksList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        //{
        //    return await _repository.GetProductsPriceBooksList(productId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        //}
        //public async Task<PagedData> GetProductCampaignsList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        //{
        //    return await _repository.GetProductCampaignsList(productId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        //}
    }
}
