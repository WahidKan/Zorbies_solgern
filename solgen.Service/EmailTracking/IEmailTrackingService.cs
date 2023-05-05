

using System;
using System.Collections.Generic;
using Solgen.Core;

namespace Solgen.Service
{
    public interface IEmailTrackingService
    {
       
        
        PagedData GetList(DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, int _type, Guid? userId);
        
    }
}
