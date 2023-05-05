using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
  public  class TaskService : ITaskService
    {
        private readonly ITaskRepository _repository;
        public TaskService(ITaskRepository repository)
        {
            _repository = repository;
        }

        public bool DelteTaskData(string TaskID)
        {
            return _repository.DelteTaskData(TaskID);
        }

        public bool UpdateTaskData(UpdateTaskModel userModel)
        {
            return _repository.UpdateTaskData(userModel);
        }
  

        List<MasterItems> ITaskService.GetAssignedUsers()
        {
            return _repository.GetAssignedUsers();
        }


        UpdateTaskModel ITaskService.GetSingleTaskData(string taskID)
        {
            return _repository.GetSingleTaskData(taskID);
        }
     

        string ITaskService.SaveOpportunityAttachment(FileUpload objModel, int CompanyID,string docId)
        {
            return _repository.SaveOpportunityAttachment(objModel, CompanyID, docId);
        }
        List<FileUpload> ITaskService.GetAttachmentList(FileUpload objModel, int CompanyID)
        {
            return _repository.GetAttachmentList(objModel, CompanyID);

        }
       String ITaskService.GetDocumentsDashBoardCount(string UserId,   int CompanyID, int LoanApplicationID)

        {
            return _repository.GetDocumentsDashBoardCount(UserId, CompanyID,LoanApplicationID);
        }

         string ITaskService.SaveOpportunityAttachmentList(List<FileUploadList> objModel,  long? ProductId)
        {
            return _repository.SaveOpportunityAttachmentList(objModel, ProductId);
        }
        string ITaskService.GetNotificationsforListing(Guid? userID, int CompanyID)
        {
            return _repository.GetNotificationsforListing( userID, CompanyID);

        }
        string ITaskService.SaveLeadMobileAttachment(LeadFileUpload objModel, int CompanyID)
        {
            return _repository.SaveLeadMobileAttachment(objModel, CompanyID);
        }

        DashboardCountModel ITaskService.GetDashboardCountForMobile(Guid? userId, int companyid)
        {
            return _repository.GetDashboardCountForMobile(userId, companyid);

        }
        String ITaskService.GetCommunicationForCustomers(Guid? userId, int companyid)
        {
            return _repository.GetCommunicationForCustomers(userId, companyid);

        }

        String ITaskService.GetLoanApplicationSatgeByAccountId(Guid? userId, int companyid,int AppId)
        {
            return _repository.GetLoanApplicationSatgeByAccountId(userId, companyid,AppId);

        }
        String ITaskService.GetLoanApplicationsForCustomers(Guid? userId, int companyid)
        {
            return _repository.GetLoanApplicationsForCustomers(userId, companyid);
        }

        String ITaskService.SaveProductDeliveryDate(SaveProductDateModel model)
        {
            return _repository.SaveProductDeliveryDate(model);
        }
    }
}
