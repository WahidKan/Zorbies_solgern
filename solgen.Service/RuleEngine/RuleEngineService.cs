using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class RuleEngineService : IRuleEngineService
    {
        private readonly IRuleEngineRepository ruleEngineRepository;

        public RuleEngineService(IRuleEngineRepository ruleEngineRepository)
        {
            this.ruleEngineRepository = ruleEngineRepository;
        }
        public RuleEngineAddOrEditModel GetById(long id)
        {
            try
            {
                return ruleEngineRepository.GetById(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public PagedData GetList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            try
            {
                return ruleEngineRepository.GetList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
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
                return ruleEngineRepository.Save(jsondata, userid, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetCustomFieldBySubModuleId(string companyid, string userid, long? moduleId, long? subModuleId)
        {
            return ruleEngineRepository.GetCustomFieldBySubModuleId(companyid, userid,moduleId, subModuleId);
        }

        public string CheckRuleNameExist(string name, long? ruleId, string userid, long companyId)
        {
            return ruleEngineRepository.CheckRuleNameExist(name,ruleId, userid, companyId);
        }

        public PagedData GetRuleList(string name,long? loanProduct, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyId)
        {
            try
            {
                return ruleEngineRepository.GetRuleList(name, loanProduct,sortColumn, sortDir, pageIndex, pageSize, userId, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> GetRuleDetailById(Guid userid, long CompanyID, long ruleId)
        {
            return await ruleEngineRepository.GetRuleDetailById(userid, CompanyID, ruleId);

        }

        public string DeleteRule(long ruleid)
        {
            return ruleEngineRepository.DeleteRule(ruleid);
        }


        public string ChangeStatus(long id)
        {
            try
            {
                return ruleEngineRepository.ChangeStatus(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public List<RuleTypeModel> GetRuleTypeList(long companyID)
        {
            try
            {
                return ruleEngineRepository.GetRuleTypeList(companyID);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public List<dynamic> GetSubModuleList(int moduleId,int companyId)
        {
            try
            {
                return ruleEngineRepository.GetSubModuleList(moduleId,companyId);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }

        public List<dynamic> GetSubModuleEventList(int subModuleId, int companyId)
        {
            try
            {
                return ruleEngineRepository.GetSubModuleEventList(subModuleId, companyId);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }

        public PagedData GetRuleSummaryList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyId)
        {
            try
            {
                return ruleEngineRepository.GetRuleSummaryList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public List<dynamic> GetRuleEngineVersionList(long ruleId, int companyId, Guid userId)
        {
            try
            {
                return ruleEngineRepository.GetRuleEngineVersionList(ruleId, companyId, userId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public List<dynamic> GetLoanApplicationRuleList(long loanApplicationId, string eventCode, int companyId, bool isHistoryDelete = false)
        {
            try
            {
                return ruleEngineRepository.GetLoanApplicationRuleList(loanApplicationId, eventCode, companyId, isHistoryDelete);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public List<dynamic> GetLoanApplicationRuleTargetList(long ruleId, int companyId)
        {
            try
            {
                return ruleEngineRepository.GetLoanApplicationRuleTargetList(ruleId, companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public dynamic ExecuteRuleEngineTarget(long ruleId, long ruleTrackingId, int companyId, long loanApplicationId, long targetId, string databaseCondition, string displayCondition, int ruleTypeId)
        {
            try
            {
                return ruleEngineRepository.ExecuteRuleEngineTarget(ruleId,ruleTrackingId, companyId, loanApplicationId, targetId, databaseCondition, displayCondition, ruleTypeId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public dynamic ExecuteRuleEngineApplicationStatus(long loanApplicationId, int companyId, Guid userId)
        {
            int sleaper = 2000;
            StartAgain:
            try
            {
                

                return ruleEngineRepository.ExecuteRuleEngineApplicationStatus(loanApplicationId, companyId, userId);
            }
            catch (Exception ex)
            {
                //if throw deadlocked error then wait few second and try again
                if (ex.Message.Contains("deadlocked"))
                {
                    
                    Thread.Sleep(sleaper);
                    sleaper += 2000;
                    goto StartAgain;
                }

                throw new Exception(ex.Message);
            }
        }

        public int GetDisplayOrder(int companyId)
        {
            try
            {
                return ruleEngineRepository.GetDisplayOrder(companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public PagedData GetLoanApplicationListForApplyRule(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long batchid, long ruleId, string listFor)
        {
            try
            {
                return ruleEngineRepository.GetLoanApplicationListForApplyRule(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID, batchid, ruleId, listFor);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool ApplyRuleVersion(long ruleId, string loanApplicationIds, long companyId)
        {
            try
            {
                return ruleEngineRepository.ApplyRuleVersion(ruleId, loanApplicationIds, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
