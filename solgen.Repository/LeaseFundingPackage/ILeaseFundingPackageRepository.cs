using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;

namespace Solgen.Repository
{
    public interface ILeaseFundingPackageRepository
    {
        PagedData GetLeaseFundingPackageList(string searchText, string leaseStatus, string saleMan, DateTime? expFrom, DateTime? expTo, DateTime? commFrom, DateTime? commTo, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string contactId);
        BankApprovalModel ChangeLeaseStatusForApprove(Guid leaseId, string userId);
    }
}
