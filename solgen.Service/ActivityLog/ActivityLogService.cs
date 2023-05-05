using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class ActivityLogService : IActivityLogService
    {
        private readonly IActivityLogRepository _repository;
        public ActivityLogService(IActivityLogRepository repository)
        {
            _repository = repository;
        }

        /*! 
        * \brief   Get Activity Log List
        * \details Fetch Activity Log List
        * \author  Aakash Sharma
        * \date    16 Sep 2019
        * \version 1.0    
        */
        public PagedData GetActivityLogList(string name, string userType, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, DateTime? expFrom, DateTime? expTo, long companyID)
        {
            try
            {
                return _repository.GetActivityLogList(name, userType, sortColumn, sortDir, pageIndex, pageSize, userId,expFrom,expTo,companyID);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
