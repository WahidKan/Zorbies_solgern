using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;

namespace Solgen.Service
{
   public interface IWhatsNextService
    {
        PagedData GetCustomersWithLease(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashBoard);
        List<WhatsNext> GetById(Guid id);
    }
}
