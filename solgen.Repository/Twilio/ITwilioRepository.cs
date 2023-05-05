using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface ITwilioRepository
    {
        Task<string> GetPhoneNumber(long primaryId, long refId, string columnName, string refTable, string refColumn);
         Task<string> statusCallBack(dynamic request, string fromNumber, long CompanyId, string userId,string AccountId);

        string  statusCallBackForCompany(dynamic request, string fromNumber, long CompanyId, string userId, string AccountId);
        Task<string> VideoCallLogHistory(string json);
    }
}
