using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class AccountService:IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        public AccountService(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

      
        public async Task<PagedData> GetAccountOppoutunitiesList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _accountRepository.GetAccountOppoutunitiesList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }
        public async Task<PagedData> GetAccountContractsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _accountRepository.GetAccountContractsList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }

        public async Task<PagedData> GetAccountContactsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _accountRepository.GetAccountContactsList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }
        public async Task<PagedData> GetAccountProposalsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _accountRepository.GetAccountProposalsList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }
        public async Task<PagedData> GetAccountWorkOrdersList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _accountRepository.GetAccountWorkOrdersList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }

        public async Task<PagedData> GetAccountServiceAppointmentsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _accountRepository.GetAccountServiceAppointmentsList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }
        public async Task<PagedData> GetAccountsJurisdictionList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _accountRepository.GetAccountsJurisdictionList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }

        public async Task<PagedData> GetAccountsCommunicationList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId)
        {
            return await _accountRepository.GetAccountsCommunicationList(accountId, sortColumn, sortDir, pageIndex, pageSize, companyId, userId);
        }
        public string GetSiteURl(string url)
        {
            return _accountRepository.GetSiteURl(url);
        }
        public string GetCompanyCount(string userid)
        {
            return _accountRepository.GetCompanyCount(userid);
        }

        public IEnumerable<dynamic> GetRequiredCustomerFileList(string accountId, string companyId)
        {
            return _accountRepository.GetRequiredCustomerFileList(accountId, companyId);
        }


        #region Jurisdiction Account 
        //public async Task<PagedData> GetProjectRequirementListingData(string AccountNumber, string name, string sortColumn, string sortDir, long PageNo, long pageSize, long companyId, Guid? UserId)
        //{
        //    return await _repository.GetProjectRequirementListingData(AccountNumber, name, sortColumn, sortDir, PageNo, pageSize, companyId, UserId);
        //}
        //public List<MasterItems> GetRequirementDll(Guid userid, long companyid, string id, int length, string serchText)
        //{
        //    return _repository.GetRequirementDll(userid, companyid, id, length, serchText);
        //}
        public async Task<string> AddeditJurisdictionAccount(JurisdictionModel model)
        {
            return await _accountRepository.AddeditJurisdictionAccount(model);
        }

        public string GetJurisdictionById(string id, string companyId)
        {
            return _accountRepository.GetJurisdictionById(id, companyId);
        }

        #endregion

        public IEnumerable<dynamic> GetFundingStageCityData(Guid userid, long CompanyID, long accountId)
        {
            return _accountRepository.GetFundingStageCityData(userid, CompanyID, accountId);
        }

        public Boolean check_company_lisence_limit(int companyId)
        {
            return _accountRepository.check_company_lisence_limit(companyId);
        }
    }
}
