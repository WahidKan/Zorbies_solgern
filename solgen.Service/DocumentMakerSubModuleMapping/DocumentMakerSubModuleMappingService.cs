using Solgen.Core;
using Solgen.Repository.DocumentMakerSubModuleMapping;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service.DocumentMakerSubModuleMapping
{
    public class DocumentMakerSubModuleMappingService : IDocumentMakerSubModuleMappingService
    {
        private readonly IDocumentMakerSubModuleMappingRepository _repository;

        public DocumentMakerSubModuleMappingService(IDocumentMakerSubModuleMappingRepository repository)
        {
            _repository = repository;
        }
        public string CheckNameExist(string name, long? id, string userid, long companyId)
        {
            return _repository.CheckNameExist(name, id, userid, companyId);
        }

        public string Delete(string id)
        {
            return _repository.Delete(id);
        }

        public PagedData GetList(string sortColumn, string sortDir, int pageIndex, int pageSize, string filter, long companyId)
        {
            try
            {
                return _repository.GetList(sortColumn, sortDir, pageIndex, pageSize, filter, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public List<dynamic> GetSubModuleList(string companyId)
        {
            try
            {
                return _repository.GetSubModuleList(companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public List<dynamic> GetDocumentList(string companyId)
        {
            try
            {
                return _repository.GetDocumentList(companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<dynamic> GetHtmlTemListForddl(string companyId)
        {
            try
            {
                return _repository.GetHtmlTemListForddl(companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public List<dynamic> GetRoutesList(string companyId)
        {
            try
            {
                return _repository.GetRoutesList(companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public List<dynamic> GetCustomFieldsList(string moduleId, string subModuleId, string companyId)
        {
            try
            {
                return _repository.GetCustomFieldsList(moduleId, subModuleId, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public dynamic GetDocumentMappingById(string id,  string companyId)
        {
            try
            {
                return _repository.GetDocumentMappingById(id, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public List<dynamic> GetRouteDocumentList(string routeId, string companyId)
        {
            try
            {
                return _repository.GetRouteDocumentList(routeId, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public List<dynamic> GetMappingFieldsList(string data, string companyId)
        {
            try
            {
                return _repository.GetMappingFieldsList(data, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<dynamic> GetHtmlMappingFieldsList(string data, string companyId)
        {
            try
            {
                return _repository.GetHtmlMappingFieldsList(data, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

      
        public bool Save(string jsondata, string userid, long companyId)
        {
            try
            {
                return _repository.Save(jsondata, userid, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public List<dynamic> GetDocumentMappingFieldsbyid(int id, long companyId)
        {
            try
            {
                return _repository.GetDocumentMappingFieldsbyid(id, companyId);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }

        }

        public string AddEditSubModuleMappingDelivery(dynamic model, string userId)
        {
            return _repository.AddEditSubModuleMappingDelivery(model, userId);
        }

        public async Task<dynamic> GetSubModuleMappingDeliveryById(long Id, long DocumentMakerMappingId)
        {
            return await _repository.GetSubModuleMappingDeliveryById(Id, DocumentMakerMappingId);

        }

        public long VerifyDuplicateName(string routeName, long id, long companyId)
        {
            try
            {
                return _repository.VerifyDuplicateName(routeName, id, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
