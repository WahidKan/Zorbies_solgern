using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Service.RuleEngineFormula
{
  public interface IRuleEngineFormulaService
    {
        bool AddEditRuleEngineFormula(string id, string json, string companyId, string userId);
        string DeleteRuleEngineFormula(string id, string companyId, string userId);
        string GetRuleEngineFormulaById(string id, string companyId, string userId);
        string CheckRuleEngineFormulaExist(string id, string name, string companyId, string userId);
        PagedData GetRuleEngineFormulaList(string filter, string sortColumn, string sortDir, int page, int pageSize, string companyId);
    }
}
