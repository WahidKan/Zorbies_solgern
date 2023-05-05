using System;
using System.Collections.Generic;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{

    public class ManageInsuranceService: IManageInsuranceService
    {
        public readonly IManageInsuranceRepository _ManageInsuranceRepository;
        public ManageInsuranceService(IManageInsuranceRepository ManageInsuranceRepository)
        {
            _ManageInsuranceRepository = ManageInsuranceRepository;
        }
        
        /*! 
      * \brief   Add update insurance information
      * \details Add update insurance information
      * \author  Deepak jha 
      * \date    16 Sep 2019
      * \version 1.0    
      */
        public int AddEditInsurance(InsuranceDetailsModel model)
        {
            return _ManageInsuranceRepository.AddEditInsurance(model);
        }
        /*! 
      * \brief   Delete insurance information
      * \details Delete insurance information
      * \author  Deepak jha 
      * \date    14 Sep 2019
      * \version 1.0    
      */
        public ChangeStatusModel DeleteInsurance(string insuranceId)
        {
            return _ManageInsuranceRepository.DeleteInsurance(insuranceId);
        }
        /*! 
      * \brief   Get insurance information basis of insuranceId
      * \details Get insurance information
      * \author  Deepak jha 
      * \date    16 Sep 2019
      * \version 1.0    
      */

        public InsuranceDetailsModel GetInsuranceByInsuranceId(string insuranceId)
        {
            return _ManageInsuranceRepository.GetInsuranceByInsuranceId(insuranceId);
        }
        /*! 
      * \brief   Get Listing of insurance information 
      * \details Get Listing of insurance information
      * \author  Deepak jha 
      * \date    14 Sep 2019
      * \version 1.0    
      */
        public PagedData GetInsuranceList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId,long companyID)
        {
            try
            {
                return _ManageInsuranceRepository.GetInsuranceList(name, sortColumn, sortDir, pageIndex, pageSize, userId,companyID);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        /*! 
      * \brief   Get Listing of insurance information 
      * \details Get Listing of insurance information
      * \author  Surendra Maurya 
      * \date    03 dec 2019
      * \version 1.0    
      */
        public PagedData GetInsuranceRequestList(string name, Guid? listFilter,string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            try
            {
                return _ManageInsuranceRepository.GetInsuranceRequestList(name, listFilter, sortColumn, sortDir, page, pageSize, userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        /*! 
      * \brief   Get Listing of State 
      * \details Get Listing of State for select
      * \author  Deepak jha 
      * \date    16 Sep 2019
      * \version 1.0    
      */
        public List<SelectItemModel> GetStateList()
        {
            return _ManageInsuranceRepository.GetStateList();
        }

        public List<ReportToModel> GetReportToList(long CompanyID)
        {
            return _ManageInsuranceRepository.GetReportToList(CompanyID);
        }
        /*! 
     * \brief   Get Listing of Country 
     * \details Get Listing of Country for select
     * \author  Vikas Rao
     * \date    02 Nov 2020
     * \version 1.0    
     */
        public List<SelectItemModel> GetCountryList()
        {
            return _ManageInsuranceRepository.GetCountryList();
        }
        public List<SelectItemModelIso> GetCountryListIso()
        {
            return _ManageInsuranceRepository.GetCountryListIso();
        }
        /*! 
     * \brief   Update StatusId 
     * \details Update StatusId for active and inactive
     * \author  Deepak jha 
     * \date    14 Sep 2019
     * \version 1.0    
     */
        public CommonStatusModel ChangeStatus(Guid? id)
        {
            try
            {
                return _ManageInsuranceRepository.ChangeStatus(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        /*! 
      * \brief     GetInsurance List  .
      * \author   Surendra Maurya
      * \date     5 Dec 2019
      * \version 1.0    
      */
        public List<SelectItemModel> GetInsuranceDropList(long companyID)
        {
            return _ManageInsuranceRepository.GetInsuranceComboList(companyID);
        }
        /*! 
      * \brief   check IsEmailExist
      * \details Get  IsEmailExist or not
      * \author  deepak jha
      * \date    03 dec 2019
      * \version 1.0    
      */
        public string IsEmailExist(Guid? InsuranceId, string AgentEmail)
        {
            try
            {
                return _ManageInsuranceRepository.IsEmailExist(InsuranceId, AgentEmail);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        /*! 
    * \brief   Get insurance information basis of insuranceId
    * \details Get insurance information
    * \author  Deepak jha 
    * \date    16 Sep 2019
    * \version 1.0    
    */

        public InsuranceDetailsModel GetInsuranceDetailByInsuranceContactId(string insuranceContactId)
        {
            return _ManageInsuranceRepository.GetInsuranceDetailByInsuranceContactId(insuranceContactId);
        }
        public Guid SaveInsuranceDetail(InsuranceDetailsModel model)
        {
            try
            {
                return _ManageInsuranceRepository.SaveInsuranceDetail(model);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }


    }
}
