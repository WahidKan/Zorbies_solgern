using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Text;
using Dapper;
using Solgen.Core;
using Solgen.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public class AppointmentsRepository : IAppointmentsRepository
    {
        private readonly SolgenDbContext _dbContext;
        public AppointmentsRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public dynamic GetAppointmentNotification(string userId, int companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_GetAppointmentForLoginUsers", param: new
                {
                    UserId = userId,
                    CompanyId = companyId
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();

                return data;

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }
        public PagedData GetAppointments(string SortColumn, string SortDir,
            int PageNo, int PageSize, Guid? userId, long companyID, string year, string month, string day, bool isweek, string listFiltertext, string customerId, string appointmentStatusId, bool isMobile = false)
        {
            appointmentStatusId = (string.IsNullOrWhiteSpace(appointmentStatusId) || appointmentStatusId == "null") ? "0" : appointmentStatusId;
            customerId = (string.IsNullOrWhiteSpace(customerId) || customerId == "null") ? "0" : customerId;

            DbConnection connection = _dbContext.Database.GetDbConnection();

            int date = 0;
            bool isNumeric = int.TryParse(day, out date);
            string SP_name = "[sp_solgen_GetappointmentListV1]";
            if (isMobile == true)
            {
                SP_name = "[sp_solgen_GetappointmentListForCustomer]";
            }
            try
            {
                if (day == null || isNumeric == false)

                {


                    var data = connection.Query(SP_name, param: new
                    {

                        SortDir = SortDir,
                        SortColumn = SortColumn,
                        PageNo = PageNo,
                        PageSize = PageSize,
                        UserId = userId,
                        CompanyID = companyID,
                        month = month,
                        listFiltertext = listFiltertext,
                        year = year,
                        customerId = customerId,
                        appointmentStatusId = appointmentStatusId
                    },
                      commandType: System.Data.CommandType.StoredProcedure).ToList();

                    return new PagedData(data, PageNo, PageSize);
                }
                else
                {
                    if (isweek)
                    {
                        DateTime dateTime = new DateTime(Convert.ToInt32(year),
                        Convert.ToInt32(month),

                       Convert.ToInt32(day));

                        var data = connection.Query(SP_name, param: new
                        {

                            SortDir = SortDir,
                            SortColumn = SortColumn,
                            PageNo = PageNo,
                            PageSize = PageSize,
                            UserId = userId,
                            CompanyID = companyID,
                            month = month,
                            week = isweek,
                            day = dateTime,
                            listFiltertext = listFiltertext,
                            year = year,
                            customerId = customerId,
                            appointmentStatusId = appointmentStatusId
                        },
                              commandType: System.Data.CommandType.StoredProcedure).ToList();

                        return new PagedData(data, PageNo, PageSize);

                    }
                    else
                    {
                        DateTime dateTime = new DateTime(Convert.ToInt32(year),
                           Convert.ToInt32(month),

                          Convert.ToInt32(day));
                        var data = connection.Query(SP_name, param: new
                        {

                            SortDir = SortDir,
                            SortColumn = SortColumn,
                            PageNo = PageNo,
                            PageSize = PageSize,
                            UserId = userId,
                            CompanyID = companyID,
                            month = month,
                            day = dateTime,
                            listFiltertext= listFiltertext,
                            year = year,
                            customerId = customerId,
                            appointmentStatusId = appointmentStatusId
                        },
                       commandType: System.Data.CommandType.StoredProcedure).ToList();

                        return new PagedData(data, PageNo, PageSize);

                    }
                }

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }

        public List<AppointmentModelForCalendar> GetAppointmentsForCalendar(Guid userId, int CompanyId, String condition = null)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<AppointmentModelForCalendar>("[sp_solgen_GetappointmentListForCalendar]", param: new
                {

                    condition = condition,
                    userId = userId,
                    companyID = CompanyId
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();

                return data;

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }
        public List<dynamic> GetLeadCallHistory(string leadId, string subModuleName, int CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_GetLeadCallLogHistoryList", param: new
                {
                    subModuleName = subModuleName,
                    leadId = leadId,
                    companyId = CompanyId
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();

                return data;

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }


        public List<dynamic> GetVideoCallHistory(string RefId, string subModuleName, int CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_Solgen_getVideoCallLogHistory", param: new
                {
                    subModuleName = subModuleName,
                    RefId = RefId,
                    companyId = CompanyId
                },
                  commandType: System.Data.CommandType.StoredProcedure).ToList();

                return data;

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }



        public List<dynamic> GetSmsLogHistory(long leadId, string subModuleName, long companyId, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_GetSmsLogHistory", param: new
                {
                    leadId = leadId,
                    subModuleName = subModuleName,
                    companyId = companyId,
                    userId = userId
                },
                  commandType: CommandType.StoredProcedure).ToList();

                return data;

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }
        public List<MasterItems> GetUsersForDropDownList(int id)
        {
            List<MasterItems> masterItems;

            //[sp_solgen_AllAssignedUsersList]

            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                masterItems = connection.Query<MasterItems>("[sp_solgen_getRelatedToForCalendar]", new
                {
                    tablenumber = id
                },
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

        public Guid SaveUpdateAppointment(AppointmentModel model)
        {
            Guid id = Guid.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {


                connection.Open();
                DynamicParameters parameters = new DynamicParameters();

                Guid.TryParse(model.CustomerID, out Guid customerid);
                parameters.Add("AppointmentID", model.AppointmentID == Guid.Empty ? null : (Guid?)model.AppointmentID, DbType.Guid);
                parameters.Add("AppointmentTypeID", model.AppointmentTypeID, DbType.Guid);
                parameters.Add("AppointmentStatusID", model.appointmentStatusID, DbType.Int64);
                parameters.Add("CustomerID", customerid == Guid.Empty ? null : (Guid?)customerid, DbType.Guid);
                //parameters.Add("CustomerID", customerid, DbType.Guid);
                parameters.Add("OpportunityId", model.OpportunityId, DbType.Int64);
                parameters.Add("AppointmentDueDate", model.AppointmentDueDate, DbType.DateTime);
                parameters.Add("FromTime", model.FromTime, DbType.Time);
                parameters.Add("ToTime", model.ToTime, DbType.Time);
                parameters.Add("Description", model.Description, DbType.String);
                parameters.Add("AppointmentWith", model.AppointmentWith, DbType.Int32);
                parameters.Add("Customer", model.Customer, DbType.Int32);

                parameters.Add("CompanyID", model.CompanyId, DbType.Int64);
                parameters.Add("CreatedBy", model.CreatedBy, DbType.Guid);
                parameters.Add("CalenderId", model.CalenderId, DbType.String);
                parameters.Add("Subject", model.Subject, DbType.String);



                return connection.ExecuteScalar<Guid>("[sp_solgen_addUpdateAppointment]", parameters, commandType: CommandType.StoredProcedure);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        //public AppointmentModel GetAppointments(Guid? AppointmentId)
        //{
        //    DbConnection connection = _dbContext.Database.GetDbConnection();
        //    try
        //    {
        //        connection.Open();
        //        var retAppointmentList = connection.Query<AppointmentModel>("[sp_solgen_getAppointments]", new { AppointmentID = AppointmentId }, commandType: System.Data.CommandType.StoredProcedure).ToList(); 
        //        return retAppointmentList;
        //    }
        //    catch (Exception ex)
        //    {

        //        throw new Exception(ex.Message);
        //    }
        //    finally
        //    {
        //        if (connection.State == System.Data.ConnectionState.Open)
        //            connection.Close();
        //    }
        //}


        public List<ContactsForAppointmentModel> GetContactsForAppointment(string appointmentWith, string LeadId, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<ContactsForAppointmentModel> dataList = new List<ContactsForAppointmentModel>();
                connection.Open();

                dataList = connection.Query<ContactsForAppointmentModel>("sp_solgen_GetContactsForAppointment_V1",
                    new { AppointmentWith = appointmentWith.Replace(" ", ""), ObjectRefID = LeadId, Userid = userId, CompanyID = companyID }
                , commandType: System.Data.CommandType.StoredProcedure).ToList();

                return dataList;
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
        public List<ContactsForAppointmentModel> getcustomerListForCalender(Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<ContactsForAppointmentModel> dataList = new List<ContactsForAppointmentModel>();
                connection.Open();

                dataList = connection.Query<ContactsForAppointmentModel>("sp_solgen_GetCalenderAppointmentContacts",
                    new { Userid = userId, CompanyID = companyID }
                , commandType: System.Data.CommandType.StoredProcedure).ToList();

                return dataList;
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

        public ChangeStatusModel Delete(Guid id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                ChangeStatusModel ret = connection.Query<ChangeStatusModel>("sp_solgen_DeleteAppointmentByID", new { AppointmentId = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return ret;
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

        public AppointmentModel GetAppointmentById(AppointmentModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                AppointmentModel ret = connection.Query<AppointmentModel>("sp_solgen_GetEditAppointmentByID", new
                {
                    AppointmentId = model.AppointmentID
                    ,
                    CompanyId = model.CompanyId,
                    UserId = model.CreatedBy
                }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return ret;
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
       public dynamic CheckScheduledAppointmentTimeAgaintstUser(string startDate, string startTime, string userid,long AppointmentIdAuto)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<bool>("sp_solgen_CheckScheduledAppointmentTime", param: new
                {
                    UserId = userid,
                    DueDate = startDate,
                    StartTime = startTime,
                    appointIdAuto= AppointmentIdAuto

                },
                  commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return data;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public dynamic GetScheduleAppointmentAgaintstUser(int leadId, int AppId, string userid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<bool>("Sp_Solgen_checkAppointmentAgainstUser", param: new
                {
                    leadId = leadId,
                    appointmentId = AppId,
                    userId = userid,

                },
                  commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return data;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<int> addOrUpdateFiles(AppointmentFiles model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", model.Id);
                parameters.Add("@FileName", (model.FileName));
                parameters.Add("@FileUrl", (model.FileUrl));
                parameters.Add("@moduleName", (model.moduleName));
                parameters.Add("@SubModuleName", model.SubModuleName);
                parameters.Add("@type", model.Type);
                parameters.Add("@UserId", model.Userid);
                parameters.Add("@companyId", model.CompanyId);
                parameters.Add("@Description", model.description);
                parameters.Add("@DoumentTitle", model.documentTitle);
                int data = connection.QueryFirstOrDefault<int>("SP_Solgen_AddServiceResourceFile"
                                                                     , parameters, commandType: CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<PagedData> GetAppointmentsBySubmodule(decimal leadId, string submoduleCode, string sortColumn, string sortDir, string pageIndex, string pageSize, string companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();

                var dataList = await connection.QueryAsync("sp_solgen_GetAppointmentsBySubmodule",
                                           param: new
                                           {
                                               companyId = companyId,
                                               leadId = leadId,
                                               sortDir = sortDir,
                                               sortColumn = sortColumn,
                                               pageSize = Convert.ToInt32(pageSize),
                                               pageNo = Convert.ToInt32(pageIndex),
                                               submoduleCode = submoduleCode,
                                           },
                                commandType: CommandType.StoredProcedure);
                var _data = new PagedData(dataList, Convert.ToInt32(pageIndex), Convert.ToInt32(pageSize));
                return _data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public dynamic GetAppointmentHistory(decimal leadId, decimal appointmentId,string submoduleCode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<dynamic>("sp_solgen_Get_Appointment_History_V1", param: new
                {
                    LeadId = leadId,
                    AppointmentId = appointmentId,
                    submoduleCode= submoduleCode
                },
                  commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return data;

            }

            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                {
                    connection.Close();
                }

            }
        }
    }
}
