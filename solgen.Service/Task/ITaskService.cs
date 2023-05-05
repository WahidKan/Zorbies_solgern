using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
  public   interface ITaskService
    {
        bool UpdateTaskData(UpdateTaskModel userModel);
        List<MasterItems> GetAssignedUsers();
        bool DelteTaskData(string TaskID);
        UpdateTaskModel GetSingleTaskData(string taskID);
        string SaveOpportunityAttachment(FileUpload objModel, int CompanyID, string docId=null);
        string SaveLeadMobileAttachment(LeadFileUpload objModel, int CompanyID);
        string SaveOpportunityAttachmentList(List<FileUploadList> objModel,long? ProductId);
        List<FileUpload> GetAttachmentList(FileUpload objModel, int CompanyID);
        String GetDocumentsDashBoardCount(string UserId, int CompanyID, int LoanApplicationID);
        string GetNotificationsforListing(Guid? userID,int CompanyID);
        DashboardCountModel GetDashboardCountForMobile(Guid? userId, int companyid);
        String GetCommunicationForCustomers(Guid? userId, int companyid);
        String GetLoanApplicationSatgeByAccountId(Guid? userId, int companyid,int AppId);
        String GetLoanApplicationsForCustomers(Guid? userId, int companyid);
        String SaveProductDeliveryDate(SaveProductDateModel model);
    }
}
