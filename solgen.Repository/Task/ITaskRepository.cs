using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface ITaskRepository
    {
        bool UpdateTaskData(UpdateTaskModel userModel);
        UpdateTaskModel GetSingleTaskData(string TaskId);

        List<MasterItems> GetAssignedUsers();
         bool DelteTaskData(string TaskID);
        string SaveOpportunityAttachment(FileUpload objModel, int CompanyID, string docId);


        List<FileUpload> GetAttachmentList(FileUpload objModel, int CompanyID);
        String GetDocumentsDashBoardCount(string UserId, int CompanyID, int LoanApplicationID);

        string SaveOpportunityAttachmentList(List<FileUploadList> objModel, long? productId);
        string GetNotificationsforListing( Guid? userID, int CompanyID);
        string SaveLeadMobileAttachment(LeadFileUpload objModel, int CompanyID);
        DashboardCountModel GetDashboardCountForMobile(Guid? userId, int companyid);

        String GetCommunicationForCustomers(Guid? userId, int companyid);
        String GetLoanApplicationSatgeByAccountId(Guid? userId, int companyid,int AppId);
        String GetLoanApplicationsForCustomers(Guid? userId, int companyid);
        String SaveProductDeliveryDate(SaveProductDateModel model);
    }

}
