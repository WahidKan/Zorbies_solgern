using Solgen.Core;
using Solgen.Repository.DocumentMakerRouteRule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service.DocumentMakerRouteRule
{
    public class DocumentMakerRouteRuleService : IDocumentMakerRouteRuleService
    {
        private readonly IDocumentMakerRouteRuleRepository _repository;

        public DocumentMakerRouteRuleService(IDocumentMakerRouteRuleRepository repository)
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

        public List<dynamic> GetComparisionOperatorsList(string type)
        {
            try
            {
                return _repository.GetComparisionOperatorsList(type);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public List<dynamic> GetPlaceHolderFieldsList(string documentId)
        {
            try
            {
                return _repository.GetPlaceHolderFieldsList(documentId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<long> AddRouteRuleData(string data, string userId, long companyId)
        {
            return await _repository.AddRouteRuleData(data, userId, companyId);
        }
        public async Task<long> AddNewFieldRuleData(int document_id, string name, string userId, long companyId)
        {
            return await _repository.AddNewFieldRuleData(document_id,name, userId, companyId);
        }
        public async Task<long> UpdateRouteRuleData(string data, string userId, long companyId)
        {
            return await _repository.UpdateRouteRuleData(data, userId, companyId);
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
        public async Task<string> GetDocumentMakerRoutes(long routeId,long companyId)
        {
            return await _repository.GetDocumentMakerRoutes(routeId,companyId);
        }
        public async Task<string> GetDocumentMakerRouteRules(long dataRouteId, long companyId)
        {
            return await _repository.GetDocumentMakerRouteRules(dataRouteId, companyId);
        }
        public List<dynamic> GetLogicalOperatorsList(string type)
        {
            try
            {
                return _repository.GetLogicalOperatorsList(type);
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
