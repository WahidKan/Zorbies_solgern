using Solgen.Core;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class QueueService:IQueueService
    {
        private readonly IQueueRepository _repository;

        public QueueService(IQueueRepository repository)
        {
            _repository = repository;
        }

        public string AddEditqueue(JsonModel model)
        {
            return _repository.AddEditqueue(model);
        }

        public string GetQueueList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            return _repository.GetQueueList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
        }

        public string GetUsersList(string companyId, string PrimaryId)
        {
            return _repository.GetUsersList(companyId, PrimaryId);
        }

        public PagedData GetQueueUserList(string listFilter, string sortColumn, string sortDir, int pageIndex, int pageSize, string primaryKey)
        {
            return _repository.GetQueueUserList(listFilter,  sortColumn,  sortDir,  pageIndex,  pageSize,  primaryKey);
        }


    }
}
