using Solgen.Core;
using Solgen.Repository.RuleEngineFormula;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Service.RuleEngineFormula
{
    public class RuleEngineFormulaService : IRuleEngineFormulaService
    {
        private readonly IRuleEngineFormulaRepository _repository;

        public RuleEngineFormulaService(IRuleEngineFormulaRepository repository)
        {
            this._repository = repository;
        }
        public bool AddEditRuleEngineFormula(string id, string json, string companyId, string userId)
        {
            return _repository.AddRuleEngineFormula(id, json, companyId, userId);
        }

        public string CheckRuleEngineFormulaExist(string id, string name, string companyId, string userId)
        {
            throw new NotImplementedException();
        }

        public string DeleteRuleEngineFormula(string id, string companyId, string userId)
        {
            return _repository.DeleteRuleEngineFormula(id, companyId, userId);
        }

        public string GetRuleEngineFormulaById(string id, string companyId, string userId)
        {
            throw new NotImplementedException();
        }

        public PagedData GetRuleEngineFormulaList(string filter, string sortColumn, string sortDir, int page, int pageSize, string companyId)
        {
            return _repository.GetRuleEngineFormulaList(filter, sortColumn, sortDir, page, pageSize, companyId);
        }
    }
}
