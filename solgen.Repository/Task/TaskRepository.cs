using Dapper;
using Microsoft.EntityFrameworkCore;
using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public class TaskRepository : ITaskRepository
    {
        private readonly SolgenDbContext _dbContext;
        public TaskRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public bool UpdateTaskData(UpdateTaskModel userModel)
        {
            string _status = "";





            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<string>("sp_solgen_AddEditTasks",
                    new
                    {
                        NewTask = userModel.NewTask,
                        DueDate = userModel.DueDate,
                        DueTime = userModel.DueTime,
                        AssignedUser = userModel.AssignedUser,
                        taskAutoid = userModel.TaskAutoId,
                        SendEmail = userModel.SendEmail,
                        SendSms = userModel.SendSms,
                        Status = userModel.Status,
                        userId = userModel.userId
                    }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();


                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public bool DelteTaskData(string TaskID)
        {
            string status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                status = connection.Query<string>("sp_solgen_DeleteTask", new
                {

                    taskid = TaskID
                },
                      commandType: System.Data.CommandType.StoredProcedure).ToString();


                if (status.Equals("pass"))
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                return false;
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        public List<MasterItems> GetAssignedUsers()
        {
            List<MasterItems> masterItems;

            //[sp_solgen_AllAssignedUsersList]

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                masterItems = connection.Query<MasterItems>("sp_solgen_AllAssignedUsersList", new { },
                      commandType: System.Data.CommandType.StoredProcedure).ToList()
                      ;


                return masterItems;
            }
            catch (Exception ex)
            {
                return null;
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        public UpdateTaskModel GetSingleTaskData(string TaskId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var _status = connection.Query<UpdateTaskModel>("sp_solgen_GetSingleTask",
                        new
                        {
                            taskAutoId = TaskId
                        }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();


                return _status;
            }
            catch (Exception ex)
            {
                return null;

            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }

        }
        string ITaskRepository.SaveOpportunityAttachment(FileUpload objModel, int CompanyID, string docId)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();

            int accid = 0;
            if (objModel.accountid == "undefined")
            {
                accid = 0;
            }
            else
            {
                accid = objModel.accountid == "null" ? 0 : Convert.ToInt32(objModel.accountid);
            }

            try
            {
                connection.Open();
                var data = connection.Query<string>("SOLGEN_SP_SAVE_ATTACHMENT12", new
                {
                    User = objModel.User,
                    FileUrl = objModel.FileUrl,
                    RefId = objModel.RefId,
                    Description = objModel.Description,
                    Module = objModel.module,
                    submodule = objModel.submodule,
                    CompanyId = objModel.CompanyId,
                    type = objModel.type,
                    FileSize = objModel.FileSize,
                    image = objModel.image,
                    FileName = objModel.FileName,
                    ThumbnailUrl = objModel.ThumbnailUrl,
                    Accountid = accid,
                    fileExtension = objModel.fileExtension,
                    Linkfrom = objModel.linkfrom,
                    IsMediaServer = objModel.isMediaServer,
                    docId = docId


                },
                  commandType: System.Data.CommandType.StoredProcedure);


                return data.FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }

        }



        List<FileUpload> ITaskRepository.GetAttachmentList(FileUpload objModel, int CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<FileUpload>("sp_solgen_getAttachments", new
                {
                    UserId = objModel.User,

                    companyID = objModel.CompanyId,
                    PageNo = objModel.PageNo,
                    type = objModel.type,
                    RefId = objModel.RefId

                },
                         commandType: System.Data.CommandType.StoredProcedure).ToList();
                return data;
            }
            catch (Exception ex)
            {
                return null;
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        String ITaskRepository.GetLoanApplicationSatgeByAccountId(Guid? userId, int companyid, int AppId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                string data = connection.QueryFirstOrDefault<string>
                    ("sp_solgen_GetLoanApplicationSatgeByAccountId", new
                    {
                        UserId = userId.Value,
                        CompanyId = companyid,
                        ApplicationId = AppId
                    },
                         commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                return null;
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        String ITaskRepository.GetDocumentsDashBoardCount(string UserId, int CompanyID, int LoanApplicationID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                string data = connection.QueryFirstOrDefault<string>("SOLGEN_SP_Get_Documents_Count", new
                {
                    userId = UserId,
                    CompanyId = CompanyID,
                    LoanApplicationID = LoanApplicationID



                },
                         commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                return null;
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


        string ITaskRepository.SaveOpportunityAttachmentList(List<FileUploadList> objModel, long? productId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            if (productId == null)
                productId = 0;
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@productId", productId);
                parameters.AddTable("@solgenAttachment", "dbo.SolgenAttachment", objModel);
                var leasenumber = connection.QueryFirstOrDefault<string>("SOLGEN_SP_SAVE_ATTACHMENTLIST"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return leasenumber;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }


        string ITaskRepository.GetNotificationsforListing(Guid? userID, int CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userid", userID.Value);
                parameters.Add("@companyID", CompanyID);
                string data = connection.QueryFirstOrDefault<string>("sp_solgen_GetNotificationsForCustomer"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                return "";
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        DashboardCountModel ITaskRepository.GetDashboardCountForMobile(Guid? userId, int companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userId", userId.Value);
                parameters.Add("@compnayId", companyid);

                DashboardCountModel data = connection.QueryFirstOrDefault<DashboardCountModel>("sp_solgen_GetMobileDashboar"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        String ITaskRepository.GetCommunicationForCustomers(Guid? userId, int companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userId", userId.Value);
                parameters.Add("@compnayId", companyid);

                var data = connection.QueryFirstOrDefault<String>("sp_solgen_GetCommucation"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        String ITaskRepository.GetLoanApplicationsForCustomers(Guid? userId, int companyid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@userId", userId.Value);
                parameters.Add("@companyId", companyid);

                var data = connection.QueryFirstOrDefault<String>("MobileGetLoanApplicationsForCustomer"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        string ITaskRepository.SaveLeadMobileAttachment(LeadFileUpload objModel, int CompanyID)
        {

            DbConnection connection = _dbContext.Database.GetDbConnection();

            try
            {
                connection.Open();
                var data = connection.Query<string>("SP_Solgen_AddServiceResourceFile", new
                {
                    id = objModel.Id,
                    FileName = objModel.FileName,
                    FileUrl = objModel.FileUrl,
                    Filetype = objModel.filetype,
                    moduleName = objModel.moduleName,
                    SubModuleName = objModel.SubModuleName,
                    type = objModel.Type,
                    UserId = objModel.Userid,
                    companyId = objModel.CompanyId,
                    Description = objModel.description,
                    DoumentTitle = objModel.documentTitle,
                    CategoryId = objModel.categoryId
                },
                         commandType: System.Data.CommandType.StoredProcedure);


                return data.FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }

        }


        String ITaskRepository.SaveProductDeliveryDate(SaveProductDateModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                string data = connection.QueryFirstOrDefault<string>("SP_solgen_save_ProductDeliveredDate", new
                {
                    userId = model.userId,
                    CompanyId = model.companyid,
                    ProductId = model.ProductId,
                    DateDelivered = model.DateDelivered
                },
                commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                return null;
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

    }
}
