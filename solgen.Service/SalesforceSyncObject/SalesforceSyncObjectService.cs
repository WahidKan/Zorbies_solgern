using System;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class SalesforceSyncObjectService : ISalesforceSyncObjectService
    {
        private readonly ISalesforceSyncObjectRepository _salesforceSyncObjectRepository;
        public SalesforceSyncObjectService(ISalesforceSyncObjectRepository salesforceSyncObjectRepository)
        {
            _salesforceSyncObjectRepository = salesforceSyncObjectRepository;
        }

        public PagedData GetSalesforceSyncObjectList(string objectName, string name, string createdByName, string startDate, string endDate, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyID)
        {
            try
            {
                return _salesforceSyncObjectRepository.GetSalesforceSyncObjectList(objectName, name, createdByName, startDate, endDate, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
