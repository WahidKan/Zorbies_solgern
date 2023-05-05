using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class LeaseFundingPackageService : ILeaseFundingPackageService
    {
        private readonly ILeaseFundingPackageRepository _repository;
        public LeaseFundingPackageService(ILeaseFundingPackageRepository repository)
        {
            _repository = repository;
        }

        /*! 
     * \brief   Get the GetLeaseFundingPackageList
     * \details Get the  GetLeaseFundingPackageList
     * \author  deepak jha
     * \date    11 Dec 2019
     * \version 1.0    
     */
        public PagedData GetLeaseFundingPackageList(string searchText, string leaseStatus, string saleMan, DateTime? expFrom, DateTime? expTo, DateTime? commFrom, DateTime? commTo, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string contactId)
        {
            return _repository.GetLeaseFundingPackageList(searchText, leaseStatus, saleMan, expFrom, expTo, commFrom, commTo, sortColumn, sortDir, pageIndex, pageSize, userId, contactId);
        }
        /*! 
     * \brief   Get the Change Lease Status For Approve
     * \details Get the Change Lease Status For Approve
     * \author  deepak jha
     * \date    11 Dec 2019
     * \version 1.0    
     */
        public BankApprovalModel ChangeLeaseStatusForApprove(Guid leaseId, string userId)
        {
            return _repository.ChangeLeaseStatusForApprove(leaseId,userId);
        }
    }
}
