using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public interface ILeadService
    {
        int SendBackStatus(long companyId, long LeadId);
        IEnumerable<dynamic> GetLeadAccountdata(long leadid, Guid userid, int companyid, int submoduleid, string objectname);
        IEnumerable<dynamic> GetLeadappointments(long leadid, Guid userid, int companyid, int submoduleid, string objectname);
        PagedData GetProductList(long leadid, int submoduleid, string objectname,string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID);
        Task<int> AssociteProduct(string productids, long leadid, Guid userid, int companyid, int submoduleid, string objectname, bool isLoanapp);
        int saveNotes(leadNotesModel model);
        PagedData GetAssociateProductList(long leadid, int submoduleid, string objectname, string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID);
        PagedData getNoteslist(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID);
        int DeleteAssociateProductbyid(string id, long leadid, int submoduleid, string objectname, Guid? userId, long companyID);
        int DeleteNote(string id, long leadid, int submoduleid, string objectname, Guid? userId, long companyID);
        int DeleteContact(string id, long leadid, int submoduleid, string objectname, Guid? userId, long companyID);
        string saveEmail(leadEmailModel model);
        PagedData getEmaillist(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID);
        PagedData getContactList(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID);
        long saveLeadConvert(leadConvertModel model);
  
        string saveLeadConvertproduct(leadConvertModel model);
        IEnumerable<dynamic> getLeadConvertData(long leadid, Guid userid, int companyid);
        List<leadImagesModel> getImages(long leadid, int submoduleid, Guid userid, int companyid);
        List<MasterItems> GetContactDll(long leadid, int submoduleid, Guid userid, long companyid, string objectname);
        int updateLeadStatus(long leadstatus, long leadid, Guid userid, long companyid);
        int Deleteimage(string id, Guid? userId, long companyID);
        IEnumerable<dynamic> getLeadConvertModuleWizard(Guid userid, long companyid);
        int updatecreatedBy(string ownerid, long leadid, Guid userid, long companyid);
        Task<string> GetLeadById(long leadId, long companyID, Guid userid);
        Task<string> CheckRequiredDataOnLeadConvert(long leadId, long companyID, Guid userid);
        Task<string> GetMandatoryDocumentsByLoanId(long loanId, long stageid, long companyID);
        PagedData getLeadSMSlist(long leadid, int submoduleid, string objectname, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID);
        bool CheckEmailNotExistInOthersTypeAccount(string email, int companyId);
        List<MasterItems> GetLeadConvertAccountDll(Guid userid, long companyid, string id, int length, string serchText);
        List<MasterItems> GetLeadConvertContactDll(Guid userid, long companyid, string id, int length, string serchText, bool isLead);
        long saveLeadConvertopportunity(leadConvertModelopportunity model);

        SourceDestinationResponseModel GetSourceDestinationLocations(long opportunityId, long companyId,string type);

        Task<string> UpdateAccountLocation(SourceDestinationCopmarisonModel model);
        Task<string> UpdateAccountZoneLocation(SourceDestinationCopmarisonModel model);
        int SetNearbyWarehouseAndLocation(long opportunityId, long companyId);
    }
}
