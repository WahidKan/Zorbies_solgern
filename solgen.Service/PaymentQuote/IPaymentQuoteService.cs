using System;
using Solgen.Core;

namespace Solgen.Service
{
    public interface IPaymentQuoteService
    {
        Guid Save(PaymentQuote entity);
        PagedData GetPaymentQuoteList(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);

        Guid GetContactId(string email);
       
    }

}
