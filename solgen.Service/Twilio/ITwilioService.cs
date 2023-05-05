using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Repository;
namespace Solgen.Service
{
    public interface ITwilioService
    {
        Task<string> GetPhoneNumber(long primaryId, long refId, string columnName, string refTable, string refColumn);
         Task<string> statusCallBack(dynamic request, string fromNumber ,long CompanyId, string userId,string AccountId);

        string statusCallBackForCompany(dynamic request,string fromNumber, long CompanyId, string userId, string AccountId);
    }
}
