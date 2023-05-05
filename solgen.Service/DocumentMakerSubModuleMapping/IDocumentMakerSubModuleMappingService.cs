using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service.DocumentMakerSubModuleMapping
{
    public interface IDocumentMakerSubModuleMappingService
    {
        PagedData GetList(string sortColumn, string sortDir, int pageIndex, int pageSize, string filter, long companyId);
        bool Save(string jsondata,string userid, long companyId);
        string CheckNameExist(string name, long? id, string userid, long companyId);
        string Delete(string id);
        List<dynamic> GetSubModuleList(string companyid);
        List<dynamic> GetDocumentList(string companyId);

        List<dynamic> GetHtmlTemListForddl(string companyId);
        List<dynamic> GetRoutesList(string companyid);
        List<dynamic> GetCustomFieldsList(string moduleId,string subModuleId,string companyid);
        List<dynamic> GetRouteDocumentList(string routeId,string companyid);
        List<dynamic> GetMappingFieldsList(string data,string companyid);
        List<dynamic> GetHtmlMappingFieldsList(string data, string companyid);
        dynamic GetDocumentMappingById(string id,string companyid);
         List<dynamic> GetDocumentMappingFieldsbyid(int id, long companyId);

        string AddEditSubModuleMappingDelivery(dynamic entity, string userId);

        Task<dynamic> GetSubModuleMappingDeliveryById(long Id, long DocumentMakerMappingId);

        long VerifyDuplicateName(string routeName, long id, long companyId);
    }
}
