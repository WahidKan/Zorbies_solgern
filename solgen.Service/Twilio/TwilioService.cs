using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Repository;

namespace Solgen.Service
{
    public class TwilioService:ITwilioService
    {
        private ITwilioRepository _twilioRepository;
        public TwilioService(ITwilioRepository twilioRepository)
        {
            _twilioRepository = twilioRepository;
        }

        public async Task<string> GetPhoneNumber(long primaryId, long refId, string columnName, string refTable, string refColumn)
        {
            return await _twilioRepository.GetPhoneNumber(primaryId, refId, columnName, refTable, refColumn);
        }
        public async Task<string> statusCallBack(dynamic request, string fromNumber, long CompanyId, string userId, string AccountId)
        {
            return await _twilioRepository.statusCallBack(request,fromNumber,CompanyId,userId, AccountId);
        }
        public string  statusCallBackForCompany(dynamic request, string fromNumber, long CompanyId, string userId, string AccountId)
        {
            return  _twilioRepository.statusCallBackForCompany(request, fromNumber, CompanyId, userId, AccountId);
        }
    }
}
