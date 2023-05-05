using Solgen.Core;

namespace Solgen.Service
{
    public interface ISalesforceSyncObjectService
    {
        PagedData GetSalesforceSyncObjectList(string objectName, string name, string createdByName, string startDate, string endDate, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyID);
    }
}
