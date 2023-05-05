using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository.DocumentMakerRouteRule
{
    public interface IDocumentMakerRouteRuleRepository
    {
        PagedData GetList(string sortColumn, string sortDir, int pageIndex, int pageSize, string filter, long companyId);
        bool Save(string jsondata, string userid, long companyId);
        string CheckNameExist(string name, long? id, string userid, long companyId);
        string Delete(string id);
        List<dynamic> GetPlaceHolderFieldsList(string documentIdt);
        List<dynamic> GetLogicalOperatorsList(string type);
        List<dynamic> GetComparisionOperatorsList(string type);
        Task<string> GetDocumentMakerRoutes(long routeId,long companyId);
        Task<string> GetDocumentMakerRouteRules(long dataRouteId, long companyId);
        Task<long> AddRouteRuleData(string data, string userId, long companyId);
        Task<long> AddNewFieldRuleData(int document_id, string name, string userId, long companyId);
        Task<long> UpdateRouteRuleData(string data, string userId, long companyId);

        long VerifyDuplicateName(string routeName, long id, long companyId);
    }
}
