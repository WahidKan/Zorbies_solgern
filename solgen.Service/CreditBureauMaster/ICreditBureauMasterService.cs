using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public interface ICreditBureauMasterService
    {
        Task<string> GetCreditBureauById(long BureauId, long CompanyId, Guid UserId);
        Task<string> GetCreditBureauList(long CompanyId, Guid UserId);
    }
}
