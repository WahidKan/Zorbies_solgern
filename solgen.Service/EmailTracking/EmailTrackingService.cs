
using System;
using System.Collections.Generic;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class EmailTrackingService : IEmailTrackingService
    {
        private readonly IEmailTrackingRepository repository;

        public EmailTrackingService(IEmailTrackingRepository repository)
        {
            this.repository = repository;
        }

      
        public PagedData GetList(DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, int _type, Guid? userId)
        {
            try
            {
                if (pageSize == 0)
                    pageSize = 10;
                return repository.GetList(From, To, sortColumn, sortDir, pageIndex, pageSize,_type, userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

       
    }
}
