using System;
using System.Collections.Generic;
using Solgen.Core;

namespace Solgen.Service
{
    public interface IContactService
    {
        ContactFormModel GetContactDetailsById(Guid id);
        Guid AddOrUpdateContactDetails(ContactFormModel model, long companyId);
        Guid DeleteGuarantor(Guid guarantorID);
        string GetContactIdByUserId(Guid? id);
        PagedData GetContactList(string name, DateTime? from, DateTime? to, string sortColumn,  string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashBoard,long companyId);
        List<MasterItems> GetSearchResult(string searchType,long companyId);
        string IsEmailExist(Guid? contactid, string emailid);
        object IsValueDuplicate(int type, string refString);
        string ContactAccountMapping(int accountid, string email, int comapanyid, string userId, int opportunityid);
        bool IsWelcomePackageSend(Guid contactId,string userid);
        BulkUploadResult SaveBulkUpload(BulkUploadModel entity);
        PagedData WelcomePackageTrackingReport(string searchText, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId);
        BankInformationModel GetBankInformationByContactBankId(string contactBankId);
        Guid SaveContactBankInformation(BankInformationModel model);
        string AddContactSaleFinance(ApplicationUserModel model, long companyID, Guid? userID);

        string AddEditContact(JsonModel model, int leadid, int accountid, int opportunityid,int Isenable);
        string CheckUserDuplicateORAssociateContact(string UserID, string CompanyID, string emailID);
        PagedData GetOpportuniryByContact(string contId, string sortColumn, string sortDir,int pageIndex,int pageSize,long companyId);
        PagedData GetRelatedAccountForContactList(string contId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId);
        PagedData GetProposalsListByContactId(string contId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId);
        PagedData GetLeadByContactId(string contId, string sortColumn, string sortDir, int pageIndex, int pageSize, long companyId);
        int SetPrimaryContact(long contactId, long accoundId, string userId);

    }
}
