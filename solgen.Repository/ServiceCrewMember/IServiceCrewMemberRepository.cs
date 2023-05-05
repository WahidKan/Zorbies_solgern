using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface IServiceCrewMemberRepository
    {
        Task<string> GetServiceCrewMemberList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id);
        Task<string> ManageServiceCrewMember(ServiceCrewMemberModel model);
        Task<PagedData> GetServiceCrewMemberListByServiceCrewId(string sortColumn, string sortDir, int pageNo, int pageSize, long crewId, Guid? userId, long companyId);
        Task<PagedData> GetServiceCrewMembersWithResourceType(string searchtxt, string sortColumn, string sortDir, int pageNo, int pageSize, long crewId, Guid? userId, long companyId);
        Task<PagedData> GetServiceAppointmentListByServiceCrewId(string sortColumn, string sortDir, int pageNo, int pageSize, long crewId, Guid? userId, long companyId);
        Task<string> GetServiceResourcesByServiceCrewId(long crewId);
        Task<string> CheckResourceAvailability(ServiceResourceAvailabilityModel model);

        //Task<string> GetProductById(string id, string moduleName, string submoduleName);
        //string AddEditProduct(JsonModel model);
        //PagedData GetPriceBookList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, long productid, Guid? userId, long companyID);
        //Task<PagedData> GetProductsPriceBooksList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        //Task<PagedData> GetProductCampaignsList(long productId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
    }
}
