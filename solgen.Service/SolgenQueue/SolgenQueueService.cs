using Solgen.Core;
using Solgen.Repository.SolgenQueue;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Solgen.Service.SolgenQueue
{
    public class SolgenQueueService : ISolgenQueueService
    {
        private readonly ISolgenQueueRepository SolgenQueueRepository;

        public SolgenQueueService(ISolgenQueueRepository solgenQueueRepository)
        {
            this.SolgenQueueRepository = solgenQueueRepository;
        }

        public PagedData GetQueueList(string filter, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId)
        {
            try
            {
                return SolgenQueueRepository.GetQueueList(filter, sortColumn, sortDir, pageIndex, pageSize, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> GetQueueDetailById(Guid userid, long CompanyID, string queueId)
        {
            return await SolgenQueueRepository.GetQueueDetailById(userid, CompanyID, queueId);

        }

        public List<MasterItems> GetSolgenModules(string masterName, Guid uid, long CompanyID, string masterKeyText = "")
        {
            return SolgenQueueRepository.GetSolgenModules(masterName, uid, CompanyID, masterKeyText);
        }
        public bool Save(string jsondata, string queueid, string userid, long companyId)
        {
            try
            {
                return SolgenQueueRepository.Save(jsondata, queueid, userid, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string CheckQueueNameExist(string name, long? queueId, string userid, long companyId)
        {
            return SolgenQueueRepository.CheckQueueNameExist(name, queueId, userid, companyId);
        }


        public List<dynamic> GetSubModuleEventList(int subModuleId, int companyId)
        {
            try
            {
                return SolgenQueueRepository.GetSubModuleEventList(subModuleId, companyId);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }


        public string GetCustomFieldBySubModuleId(string companyid, string userid, long? moduleId, long? subModuleId)
        {
            return SolgenQueueRepository.GetCustomFieldBySubModuleId(companyid, userid, moduleId, subModuleId);
        }

        public string DeleteQueue(string queueid)
        {
            return SolgenQueueRepository.DeleteQueue(queueid);
        }


        public string ChangeStatus(string id)
        {
            try
            {
                return SolgenQueueRepository.ChangeStatus(id);
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
                return SolgenQueueRepository.GetDisplayOrder(companyId);
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
                return SolgenQueueRepository.GetList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public List<dynamic> GetSubModuleList(int companyId)
        {
            try
            {
                return SolgenQueueRepository.GetSubModuleList( companyId);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }


        public PagedData GetQueueSummaryList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, string userId, long companyId)
        {
            try
            {
                return SolgenQueueRepository.GetQueueSummaryList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public List<dynamic> GetQueueVersionList(long queueId, int companyId, Guid userId)
        {
            try
            {
                return SolgenQueueRepository.GetQueueVersionList(queueId, companyId, userId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public List<dynamic> GetLoanApplicationQueueList(long loanApplicationId, string eventCode, int companyId, bool isHistoryDelete = false)
        {
            try
            {
                return SolgenQueueRepository.GetLoanApplicationQueueList(loanApplicationId, eventCode, companyId, isHistoryDelete);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public List<dynamic> GetLoanApplicationQueueTargetList(long queueId, int companyId)
        {
            try
            {
                return SolgenQueueRepository.GetLoanApplicationQueueTargetList(queueId, companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public dynamic ExecuteQueueTarget(long queueId, long queueTrackingId, int companyId, long loanApplicationId, long targetId, string databaseCondition, string displayCondition, int queueTypeId)
        {
            try
            {
                return SolgenQueueRepository.ExecuteQueueTarget(queueId, queueTrackingId, companyId, loanApplicationId, targetId, databaseCondition, displayCondition, queueTypeId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public dynamic ExecuteQueueApplicationStatus(long loanApplicationId, int companyId)
        {
            int sleaper = 2000;
            StartAgain:
            try
            {


                return SolgenQueueRepository.ExecuteQueueApplicationStatus(loanApplicationId, companyId);
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


        public PagedData GetLoanApplicationListForApplyQueue(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long batchid, long queueId, string listFor)
        {
            try
            {
                return SolgenQueueRepository.GetLoanApplicationListForApplyQueue(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID, batchid, queueId, listFor);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool ApplyQueueVersion(long queueId, string loanApplicationIds, long companyId)
        {
            try
            {
                return SolgenQueueRepository.ApplyQueueVersion(queueId, loanApplicationIds, companyId);
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
                return SolgenQueueRepository.GetCustomFieldOptionsList(companyid, userid, moduleId, subModuleId, fieldId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<dynamic> GetSolgenQueueFormulasList(long companyId, int length, string searchText)
        {
            try
            {
                return SolgenQueueRepository.GetSolgenQueueFormulasList(companyId, length, searchText);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
