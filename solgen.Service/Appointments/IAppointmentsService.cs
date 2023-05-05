using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
   public interface IAppointmentsService
    {
        dynamic GetAppointmentHistory(decimal leadId, decimal appointmentId, string submoduleCode);
        dynamic GetAppointmentNotification(string userId, int companyId);
        Guid SaveUpdateAppointment(AppointmentModel model);
        List<ContactsForAppointmentModel> getcustomerListForCalender(Guid? userId, long companyID);
        List<AppointmentModelForCalendar> GetAppointmentsForCalendar(Guid userId,int CompanyId, String condition = null);
        List<dynamic> GetLeadCallHistory(string leadId,string subModuleName,int CompanyId);
        List<dynamic> GetSmsLogHistory(long leadId, string subModuleName, long companyId,string userId);
        PagedData GetAppointments(string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID, string year, string month, string day, bool isweek, string listFiltertext, string customerId, string appointmentStatusId, bool isMobile);
        List<ContactsForAppointmentModel> GetContactsForAppointment(string appointmentWith, string LeadId, Guid? userId, long companyID);
        ChangeStatusModel Delete(Guid guid);
         AppointmentModel GetAppointmentById(AppointmentModel id);
        Task<int> addOrUpdateFiles(AppointmentFiles model);

        dynamic GetScheduleAppointmentAgaintstUser(int leadId,int AppId,string userid);
        dynamic CheckScheduledAppointmentTimeAgaintstUser(string startDate, string startTime, string userid,long AppointmentIdAuto);
        
        Task<PagedData> GetAppointmentsBySubmodule(decimal leadId, string submoduleCode, string sortColumn, string sortDir, string pageIndex, string pageSize, string companyId);
        List<dynamic> GetVideoCallHistory(string RefId, string subModuleName, int CompanyId);
    }
}
