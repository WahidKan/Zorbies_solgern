using System;
using System.Collections.Generic;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;
        public ContactService(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        /*! 
        * \brief   Add update contact detail.
        * \details function is used to Add update contact detail.
        * \author  Vikrant verma.
        * \date    16 August 2019
        * \version 1.0    
        */
    public Guid AddOrUpdateContactDetails(ContactFormModel model, long companyId)
        {
            return _contactRepository.AddOrUpdateContactDetails(model,companyId);
        }
        /*! 
         * \brief   Delete guranter by gauranter Id.
         * \details function is used to  Delete guranter by gauranter Id.
         * \author  deepak kumar
         * \date    16 Oct 2019
         * \version 1.0    
         */
        public Guid DeleteGuarantor(Guid guarantorID)
        {
            return _contactRepository.DeleteGuarantor(guarantorID);
        }

        /*! 
         * \brief   Get the Contact detail by Id.
         * \details function is used to Get the Contact detail by Id.
         * \author  deepak kumar
         * \date    16 Oct 2019
         * \version 1.0    
         */
        public ContactFormModel GetContactDetailsById(Guid id)
        {
            return _contactRepository.GetContactDetailsById(id);
        }

        /*! 
* \brief   Get the list of Contact
* \details Get the list of Contact
* \author  Kiran Bala 
* \date    17 Sep 2019
* \version 1.0    
*/
        public PagedData GetContactList(string name, DateTime? from, DateTime? to, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashBoard, long companyId)
        {
            try
            {
                return _contactRepository.GetContactList(name, from, to, sortColumn, sortDir, pageIndex, pageSize, userId, isDashBoard,companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        /*! 
         * \brief   Get the search result.
         * \details function is used to  Get the search result.
         * \author  Dhiraj patyal
         * \date    16 dec 2019
         * \version 1.0    
         */
        public List<MasterItems> GetSearchResult(string searchType, long companyId)
        {
            return _contactRepository.GetSearchResult(searchType,companyId);
        }

        /*! 
        * \brief   Get the Contactid
        * \details Get the Contactid by user id
        * \author  Rahul Sharma 
        * \date    24 oct 2019
        * \version 1.0    
        */
        public string GetContactIdByUserId(Guid? id)
        {
            try
            {
                return _contactRepository.GetContactIdByUserId(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        /*! 
       * \brief   Check is Email Id Exist
       * \details Check is Email Id Exist
       * \author  Rahul Sharma 
       * \date    09 NOV 2019
       * \version 1.0    
       */
        public string IsEmailExist(Guid? contactid, string emailid)
        {
            try
            {
                return _contactRepository.IsEmailExist(contactid, emailid);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public string ContactAccountMapping(int accountid, string email, int comapanyid, string userId, int opportunityid)
        {
            try
            {
                return _contactRepository.ContactAccountMapping(accountid, email,comapanyid,userId,opportunityid);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        /*! 
         * \brief   update status for well come package send.
         * \details function is used to update status for well come package send.
         * \author  Dhiraj patyal
         * \date    16 dec 2019
         * \version 1.0    
         */
        public object IsValueDuplicate(int type, string refString)
        {
            try
            {
                return _contactRepository.IsValueDuplicate(type, refString);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public bool IsWelcomePackageSend(Guid contactId, string userid)
        {
            try
            {
                return _contactRepository.IsWelcomePackageSend(contactId, userid);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        /*! 
         * \brief   Insert data into bulk upload on excel sheet
         * \details function is used to Inserted data into bulk upload on excel sheet
         * \author  Dhiraj patyal
         * \date    16 dec 2019
         * \version 1.0    
         */
        public BulkUploadResult SaveBulkUpload(BulkUploadModel entity)
        {
            try
            {
                return _contactRepository.SaveBulkUpload(entity);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        /*! 
* \brief   Get the list of Lease Request
* \details Get the list of Lease Request
* \author  Surendra Maurya
* \date    19 Dec 2019
* \version 1.0    
*/
        public PagedData WelcomePackageTrackingReport(string searchText, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                if (pageSize == 0)
                    pageSize = 10;
                return _contactRepository.WelcomePackageTrackingReport(searchText, From, To, sortColumn, sortDir, pageIndex, pageSize, userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public BankInformationModel GetBankInformationByContactBankId(string contactBankId)
        {
            return _contactRepository.GetBankInformationByContactBankId(contactBankId);
        }

        public Guid SaveContactBankInformation(BankInformationModel model)
        {
            try
            {
                return _contactRepository.SaveContactBankInformation(model);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public string AddEditContact(JsonModel model, int leadid, int accountid, int opportunityid,int Isenable)
        {
            return _contactRepository.AddEditContact(model,leadid,accountid, opportunityid,Isenable);
        }
        public string CheckUserDuplicateORAssociateContact(string UserID, string CompanyID, string emailID)
        {
            return _contactRepository.CheckUserDuplicateORAssociateContact(UserID, CompanyID, emailID);
        }
        public PagedData GetOpportuniryByContact(string contId, string sortColumn, string sortDir, int pageIndex, int pageSize,long companyId)
        {
            return _contactRepository.GetOpportuniryByContact(contId, sortColumn, sortDir, pageIndex, pageSize, companyId);
        }

        public PagedData GetRelatedAccountForContactList(string contId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId)
        {
            return _contactRepository.GetRelatedAccountForContactList(contId, sortColumn, sortDir, pageIndex, pageSize, companyId);
        }
        public PagedData GetProposalsListByContactId(string contId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId)
        {
            return _contactRepository.GetProposalsListByContactId(contId, sortColumn, sortDir, pageIndex, pageSize, companyId);
        }
        public PagedData GetLeadByContactId(string contId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId)
        {
            return _contactRepository.GetLeadByContactId(contId, sortColumn, sortDir, pageIndex, pageSize, companyId);
        }

        public string AddContactSaleFinance(ApplicationUserModel model, long companyID, Guid? userID)
        {
            return _contactRepository.AddContactSaleFinance(model, companyID,userID);
        }

        public int SetPrimaryContact(long contactId, long accoundId, string userId)
        {
            return _contactRepository.SetPrimaryContact(contactId, accoundId, userId);
        }
    }


}
