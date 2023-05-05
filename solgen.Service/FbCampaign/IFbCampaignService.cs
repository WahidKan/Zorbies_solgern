using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service.FbCampaign
{
    public interface IFbCampaignService
    {

        Task<string> GetCampaignDetailsbyid(string id, string moduleName, string submoduleName);
        Task<PagedData> GetCampaignList(string name, DateTime? fromDate, DateTime? toDate, string sortColumn, string sortDir, int pageIndex, string pageSize,long companyID);
        Task<PagedData> GetAddsList(string name, DateTime? fromDate, DateTime? toDate, string sortColumn, string sortDir, string pageIndex, string pageSize, long companyID);
        Task<PagedData> GetAddSetsList(string name, DateTime? fromDate, DateTime? toDate, string sortColumn, string sortDir, string pageIndex, string pageSize, long companyID);

        

        string AddEditCampaign(JsonModel model);

        
    }
}
