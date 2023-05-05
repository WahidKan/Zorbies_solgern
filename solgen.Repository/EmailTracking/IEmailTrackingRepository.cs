
using System;
using System.Collections.Generic;
using Solgen.Core;

namespace Solgen.Repository
{
    public interface IEmailTrackingRepository
    {
        PagedData GetList(DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, int _type, Guid? userId);
       
        Guid SaveSendEmailStatus(EmailSendingModel model);
    }
}
