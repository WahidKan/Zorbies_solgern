using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Repository
{
   public interface ILoanTermRepository
    {
        PagedData GetLoanTermList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID   );
        List<MasterItems> GetBankDll();
        Guid Save(LoanTermModel model);
        LoanTermModel GetLoanTermById(string Id);
        int DeleteLoanTermById(string id);
    }
}
