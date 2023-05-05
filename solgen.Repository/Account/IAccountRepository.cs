using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface IAccountRepository
    {
        Task<PagedData> GetAccountOppoutunitiesList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        Task<PagedData> GetAccountContractsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        Task<PagedData> GetAccountContactsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        Task<PagedData> GetAccountProposalsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        Task<PagedData> GetAccountWorkOrdersList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        Task<PagedData> GetAccountServiceAppointmentsList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        Task<PagedData> GetAccountsJurisdictionList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        string GetSiteURl(string url);
        string GetCompanyCount(string userid);
        Task<PagedData> GetAccountsCommunicationList(long accountId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId, Guid? userId);
        IEnumerable<dynamic> GetRequiredCustomerFileList(string accountId, string companyId);

        #region Jurisdiction Account 

        Task<string> AddeditJurisdictionAccount(JurisdictionModel model);

        string GetJurisdictionById(string id, string companyId);
        #endregion
        IEnumerable<dynamic> GetFundingStageCityData(Guid userid, long CompanyID, long accountId);

        Boolean check_company_lisence_limit(int companyId);
    }
}
