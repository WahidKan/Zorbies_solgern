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
    public class SolgenRuleEngineService : ISolgenRuleEngineService
    {
        private readonly ISolgenRuleEngineRepository SolgenEngineRepository;

        public SolgenRuleEngineService(ISolgenRuleEngineRepository ruleSolgenEngineRepository)
        {
            this.SolgenEngineRepository = ruleSolgenEngineRepository;
        }
       
        public PagedData GetRuleList(string name, long? ModuleId, long? SubModuleId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId)
        {
            try
            {
                return SolgenEngineRepository.GetRuleList(name, ModuleId, SubModuleId, sortColumn, sortDir, pageIndex, pageSize, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> GetRuleDetailById(Guid userid, long CompanyID, string ruleId)
        {
            return await SolgenEngineRepository.GetRuleDetailById(userid, CompanyID, ruleId);

        }

        public List<MasterItems> GetSolgenModules(string masterName, Guid uid, long CompanyID, string masterKeyText = "")
        {
            return SolgenEngineRepository.GetSolgenModules(masterName, uid, CompanyID, masterKeyText);
        }
        public bool Save(string jsondata,string ruleid, string userid, long companyId)
        {
            try
            {
                return SolgenEngineRepository.Save(jsondata,ruleid, userid, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string CheckRuleNameExist(string name, long? ruleId, string userid, long companyId)
        {
            return SolgenEngineRepository.CheckRuleNameExist(name, ruleId, userid, companyId);
        }


        public List<dynamic> GetSubModuleEventList(int subModuleId, int companyId)
        {
            try
            {
                return SolgenEngineRepository.GetSubModuleEventList(subModuleId, companyId);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }


        public string GetCustomFieldBySubModuleId(string companyid, string userid, long? moduleId, long? subModuleId)
        {
            return SolgenEngineRepository.GetCustomFieldBySubModuleId(companyid, userid, moduleId, subModuleId);
        }

        public string GetDynamicReportFieldsListBySubModuleId(string companyid, string userid, long? moduleId, long? subModuleId, string subModuleCode)
        {
            return SolgenEngineRepository.GetDynamicReportFieldsListBySubModuleId(companyid, userid, moduleId, subModuleId, subModuleCode);
        }

        public string DeleteRule(string ruleid)
        {
            return SolgenEngineRepository.DeleteRule(ruleid);
        }


        public string ChangeStatus(string id)
        {
            try
            {
                return SolgenEngineRepository.ChangeStatus(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }


        public int GetDisplayOrder(int companyId)
        {
            try
            {
                return SolgenEngineRepository.GetDisplayOrder(companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public RuleEngineAddOrEditModel GetById(long id)
        {
            try
            {
                return SolgenEngineRepository.GetById(id);
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
                return SolgenEngineRepository.GetList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
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
                return SolgenEngineRepository.GetRuleTypeList(companyID);
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
                return SolgenEngineRepository.GetSubModuleList(moduleId,companyId);
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
                return SolgenEngineRepository.GetRuleSummaryList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyId);
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
                return SolgenEngineRepository.GetRuleEngineVersionList(ruleId, companyId, userId);
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
                return SolgenEngineRepository.GetLoanApplicationRuleList(loanApplicationId, eventCode, companyId, isHistoryDelete);
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
                return SolgenEngineRepository.GetLoanApplicationRuleTargetList(ruleId, companyId);
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
                return SolgenEngineRepository.ExecuteRuleEngineTarget(ruleId,ruleTrackingId, companyId, loanApplicationId, targetId, databaseCondition, displayCondition, ruleTypeId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public dynamic ExecuteRuleEngineApplicationStatus(long loanApplicationId, int companyId)
        {
            int sleaper = 2000;
            StartAgain:
            try
            {
                

                return SolgenEngineRepository.ExecuteRuleEngineApplicationStatus(loanApplicationId, companyId);
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

        
        public PagedData GetLoanApplicationListForApplyRule(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long batchid, long ruleId, string listFor)
        {
            try
            {
                return SolgenEngineRepository.GetLoanApplicationListForApplyRule(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID, batchid, ruleId, listFor);
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
                return SolgenEngineRepository.ApplyRuleVersion(ruleId, loanApplicationIds, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetCustomFieldOptionsList(string companyid, string userid, long? moduleId, long? subModuleId, long? fieldId)
        {
            try
            {
                return SolgenEngineRepository.GetCustomFieldOptionsList(companyid, userid,moduleId, subModuleId,  fieldId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<dynamic> GetSolgenRuleEngineFormulasList(long companyId, int length, string searchText)
        {
            try
            {
                return SolgenEngineRepository.GetSolgenRuleEngineFormulasList(companyId,length, searchText);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
