using Solgen.Core;
using Solgen.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface IAppointmentsRepository
    {
        dynamic GetAppointmentHistory(decimal leadId, decimal appointmentId,string submoduleCode);
        Guid SaveUpdateAppointment(AppointmentModel model);
        List<ContactsForAppointmentModel> getcustomerListForCalender(Guid? userId, long companyID);
        dynamic GetAppointmentNotification(string userId, int companyId);
        List<AppointmentModelForCalendar> GetAppointmentsForCalendar(Guid userId,int CompanyId, String condition = null);

        List<dynamic> GetLeadCallHistory(string leadId, string subModuleName, int CompanyId);
        List<dynamic> GetVideoCallHistory(string RefId, string subModuleName, int CompanyId);
        List<dynamic> GetSmsLogHistory(long leadId, string subModuleName, long companyId, string userId);
        PagedData GetAppointments(string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID, string year, string month, 
            string day,bool isweek, string listFiltertext, string customerId, string appointmentStatusId, bool isMobile);
        // AppointmentModel GetAppointments(Guid? AppointmentId);
        List<ContactsForAppointmentModel> GetContactsForAppointment(string appointmentWith, string LeadId, Guid? userId, long companyID);
        ChangeStatusModel Delete(Guid guid);
        AppointmentModel GetAppointmentById(AppointmentModel id);

        Task<int> addOrUpdateFiles(AppointmentFiles model);
        dynamic GetScheduleAppointmentAgaintstUser(int leadId, int AppId, string userid);

        dynamic CheckScheduledAppointmentTimeAgaintstUser(string startDate, string startTime, string userid,long AppointmentIdAuto);
        Task<PagedData> GetAppointmentsBySubmodule(decimal leadId, string submoduleCode, string sortColumn, string sortDir, string pageIndex, string pageSize, string companyId);

    }
}
