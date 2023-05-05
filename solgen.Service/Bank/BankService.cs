using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;

namespace Solgen.Service
{
    public class BankService : IBankService
    {
        private readonly IBankRepository _repository;
        public BankService(IBankRepository repository)
        {
            _repository = repository;
        }
        /*! 
        * \brief   Get the list of Bank
        * \details Fetch the list of Bank
        * \author  Kiran Bala 
        * \date    16 Sep 2019
        * \version 1.0    
        */
        public PagedData GetBankList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            return _repository.GetBankList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
        }
        /*! 
         * \brief   Bank Status update
         * \details function is used to update (active/inactive) of Bank
         * \author  Kiran Bala 
         * \date    16 Sep 2019
         * \version 1.0    
         */
        public bool UpdateBankStatus(string id, string status)
        {
            return _repository.UpdateBankStatus(id, status);
        }
        /*! 
         * \brief   Delete Bank
         * \details function is used Delete Bank
         * \author  Kiran Bala 
         * \date    16 Sep 2019
         * \version 1.0    
         */
        public bool DeleteBank(string id)
        {
            return _repository.DeleteBank(id);
        }

        /*! 
         * \brief   Get Bank Detail
         * \details function is used to get detail of Bank by id
         * \author  Kiran Bala 
         * \date    16 Sep 2019
         * \version 1.0    
         */
        public BankModel GetBankDetailById(string id)
        {
            return _repository.GetBankDetail(id);
        }

        /*! 
         * \brief   Add Edit Bank detail
         * \details function is used to add/edit Vendor
         * \author  Kiran Bala 
         * \date    16 Sep 2019
         * \version 1.0    
         */
        public string AddEditBank(BankModel model)
        {
            return _repository.AddEditBank(model);
        }

        public string AddEditCustomField(CustomFieldModel model)
        {
            return _repository.AddEditCustomField(model);
        }

        public string SaveCustomManagePopup(ManageViewModelWithCompany model)
        {
            return _repository.SaveCustomManagePopup(model);
        }
        public string checkDublicateViewName(ManageViewModelWithCompany model)
        {
            return _repository.checkDublicateViewName(model);
        }

        /*! 
         * \brief   get bak dropdown list
         * \details function is used to get bak dropdown list
         * \author  Kiran Bala 
         * \date    16 dec 2019
         * \version 1.0    
         */
        public List<MasterItems> GetBankDropList(long companyID)
        {
            return _repository.GetBankDropList(companyID);
        }
        /*! 
         * \brief   Get Roles List By User Type
         * \details function get roles list by user type
         * \author  Rahul 
         * \date    16 oct 2019
         * \version 1.0    
         */
        public List<RolesItems> GetRolesDropListByUserType(long id, long companyID, Guid? UserID)
        {
            return _repository.GetRolesDropListByUserType(id, companyID,UserID);
        }

        public PagedData GetUsersBankList(int pageIndex, int pageSize, Guid? bankId)
        {
            return _repository.GetUsersBankList(pageIndex, pageSize, bankId);
        }

        public PagedData GetLoanApplicationList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID, long batchid)
        {
            return _repository.GetLoanApplicationList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID,batchid);
        }

        public PagedData GetLoanTermList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            return _repository.GetLoanTermList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
        }


        public PagedData GetTaskList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            return _repository.GetTaskList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId);
        }

        public PagedData GetDesignationList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            return _repository.GetDesignationList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
        }
        public PagedData GetLocationList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            return _repository.GetLocationList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId);
        }

        public PagedData GetLocationTypeList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            return _repository.GetLocationTypeList(name, sortColumn, sortDir, pageIndex, pageSize, userId, companyID);
        }


        public PagedData GetcibilScoreList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            return _repository.GetcibilScoreList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId);
        }

        public PagedData GetCustomFieldList(string moduleId, string SubModuleId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, int companyId)
        {
            return _repository.GetCustomFieldList(moduleId, SubModuleId, sortColumn, sortDir, pageIndex, pageSize, userId, companyId);
        }
        public CustomFieldModel GetCustomFieldDetail(Int64 id)
        {
            return _repository.GetCustomFieldDetail(id);
        }


        #region dynamic listing

        public async Task<string> GetLeadlist(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id, string widgetType, string recordFilter, string teamID, string teamMemberID, bool isAllRecords)
        {
            return await _repository.GetLeadlist(name, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyID, custom_view_id, widgetType, recordFilter, teamID, teamMemberID, isAllRecords);
        }

        public async Task<string> GetLenderlist(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id)
        {
            return await _repository.GetLenderlist(name, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyID, custom_view_id);
        }

        public async Task<string> GetAccountsList(bool isCustomerList,bool isSubDealerList,string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id, bool isAllRecords)
        {
            return await _repository.GetAccountsList(isCustomerList,isSubDealerList, name, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyID, custom_view_id, isAllRecords);
        }

        public async Task<string> GetBankListNew(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyID, string custom_view_id)
        {
            return await _repository.GetBankListNew(name, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyID, custom_view_id);
        }

        public string GetproductList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            return _repository.GetproductList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
        }

        public string GetproposalList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            return _repository.GetproposalList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
        }

        public string GetContractList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            return _repository.GetContractList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
        }

        public string GetDepartmentList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            return _repository.GetDepartmentList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
        }

        public string GetOpportunityList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            return _repository.GetOpportunityList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
        }

        public string GetEmployeeList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id)
        {
            return _repository.GetEmployeeList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id);
        }

        public string GetSolgenContactList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            return _repository.GetSolgenContactList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
        }



        #endregion
        public IEnumerable<dynamic> GetAppointmentbyopportunityId(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetAppointmentbyopportunityId(opid, userid, CompanyID);
        }

        public IEnumerable<dynamic> GetOpportunityViewProduct(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityViewProduct(opid, userid, CompanyID);
        }
        public IEnumerable<dynamic> GetOpportunityviewTabData(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityviewTabData(opid, userid, CompanyID);
        }

        public IEnumerable<dynamic> GetOpportunityViewProposal(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityViewProposal(opid, userid, CompanyID);
        }

        public IEnumerable<dynamic> GetOpportunityViewTask(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityViewTask(opid, userid, CompanyID);
        }

        public IEnumerable<dynamic> GetOpportunityViewWorkorder(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityViewWorkorder(opid, userid, CompanyID);
        }
        public IEnumerable<dynamic> GetOpportunityview(long opid, int stageid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityview(opid, stageid, userid, CompanyID);
        }

        public List<opportunitystage> getopportunitystage(long opid,Guid userid, int CompanyID)
        {
            return _repository.getopportunitystage(opid,userid, CompanyID);
        }

        public IEnumerable<dynamic> GetOpportunityViewAccData(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityViewAccData(opid, userid, CompanyID);
        }

        public Task<string> GetEmployeeDetailById(string id, string moduleName, string submoduleName)
        {
            return _repository.GetEmployeeDetailById(id, moduleName, submoduleName);
        }

        public IEnumerable<dynamic> GetOpportunityViewFileupload(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityViewFileupload(opid, userid, CompanyID);
        }

        public IEnumerable<dynamic> GetOpportunityViewcontractlist(long opid, Guid userid, int CompanyID)
        {
            return _repository.GetOpportunityViewcontractlist(opid, userid, CompanyID);
        }
        public async Task<string> getProjectList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords)
        {
            return await _repository.getProjectList(nameSearch, sortColumn, sortDir, pageIndex, pageSize, userId, moduleName, submoduleName, companyId, custom_view_id, isAllRecords);
        }
        public string AddEditProject(ProjectModel model)
        {
            return _repository.AddEditProject(model);
        }
    }
}