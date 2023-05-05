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
    public class WorkFlowService:IWorkFlowService
    {
        private readonly IWorkFlowRepository workFlowRepository;

        public WorkFlowService(IWorkFlowRepository workFlowRepository)
        {
            this.workFlowRepository = workFlowRepository;
        }
        public RuleEngineAddOrEditModel GetById(long id)
        {
            try
            {
                return workFlowRepository.GetById(id);
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
                return workFlowRepository.GetList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
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
                return workFlowRepository.Save(jsondata, userid, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<MasterItems> GetCustomButtonDDL(Guid userid, long companyid, string id, int length, string serchText)
        {
            return workFlowRepository.GetCustomButtonDDL(userid, companyid, id, length, serchText);
        }

        public async Task<int> saveCustomButton(WorkFlowModel data, Guid userid, long companyid)
        {
            return await workFlowRepository.saveCustomButton(data, userid, companyid);
        }

        public WorkFlowModel GetCustomButtonDetailByFlowId(long? id, long? companyId, Guid? userId)
        {
            return workFlowRepository.GetCustomButtonDetailByFlowId(id, companyId, userId);
        }

        public string GetCustomFieldBySubModuleId(string companyid, string userid, long? moduleId, long? subModuleId, long screenid, bool isdecision)
        {
            return workFlowRepository.GetCustomFieldBySubModuleId(companyid, userid, moduleId, subModuleId,screenid,isdecision);
        }

        public string CheckRuleNameExist(string name, long? ruleId, string userid, long companyId)
        {
            return workFlowRepository.CheckRuleNameExist(name, ruleId, userid, companyId);
        }

        public PagedData GetRuleList(string name, long? loanProduct, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyId)
        {
            try
            {
                return workFlowRepository.GetRuleList(name, loanProduct, sortColumn, sortDir, pageIndex, pageSize, userId, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> GetRuleDetailById(Guid userid, long CompanyID, long ruleId)
        {
            return await workFlowRepository.GetRuleDetailById(userid, CompanyID, ruleId);

        }

        public string DeleteRule(long ruleid)
        {
            return workFlowRepository.DeleteRule(ruleid);
        }


        public string ChangeStatus(long id)
        {
            try
            {
                return workFlowRepository.ChangeStatus(id);
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
                return workFlowRepository.GetRuleTypeList(companyID);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public List<dynamic> GetSubModuleList(int moduleId, int companyId, string screenids, bool isDecision)
        {
            try
            {
                return workFlowRepository.GetSubModuleList(moduleId, companyId, screenids, isDecision);
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
                return workFlowRepository.GetSubModuleEventList(subModuleId, companyId);
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
                return workFlowRepository.GetRuleSummaryList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyId);
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
                return workFlowRepository.GetRuleEngineVersionList(ruleId, companyId, userId);
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
                return workFlowRepository.GetLoanApplicationRuleList(loanApplicationId, eventCode, companyId, isHistoryDelete);
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
                return workFlowRepository.GetLoanApplicationRuleTargetList(ruleId, companyId);
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
                return workFlowRepository.ExecuteRuleEngineTarget(ruleId, ruleTrackingId, companyId, loanApplicationId, targetId, databaseCondition, displayCondition, ruleTypeId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public dynamic ExecuteRuleEngineApplicationStatus(long loanApplicationId, int companyId,Guid userid)
        {
            int sleaper = 2000;
        StartAgain:
            try
            {


                return workFlowRepository.ExecuteRuleEngineApplicationStatus(loanApplicationId, companyId, userid);
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
                return workFlowRepository.GetDisplayOrder(companyId);
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
                return workFlowRepository.GetLoanApplicationListForApplyRule(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID, batchid, ruleId, listFor);
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
                return workFlowRepository.ApplyRuleVersion(ruleId, loanApplicationIds, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string getScreenFormField(long? moduleId, long? subModuleId, long? formid, string userid, long companyId)
        {
            try
            {
                return workFlowRepository.getScreenFormField(moduleId, subModuleId, formid, userid, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public PagedData GetScreenFormsList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long submoduleid,string usedSreenid)
        {
            try
            {
                return workFlowRepository.GetScreenFormsList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID, submoduleid, usedSreenid);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
    }
}
