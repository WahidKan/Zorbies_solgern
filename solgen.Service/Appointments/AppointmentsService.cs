using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public class AppointmentsService : IAppointmentsService
    {
        private readonly IAppointmentsRepository _appointmentRepository;

        public AppointmentsService(IAppointmentsRepository appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
        }


        public PagedData GetAppointments(string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID, string year,
            string month, string day, bool isweek, string listFiltertext, string customerId, string appointmentStatusId, bool isMobile)
        {
            return _appointmentRepository.GetAppointments(SortColumn, SortDir, PageNo, PageSize, userId, companyID, year, month, day, isweek,  listFiltertext, customerId, appointmentStatusId, isMobile);
        }
        public dynamic GetAppointmentHistory(decimal leadId, decimal appointmentId, string submoduleCode)
        {
            return _appointmentRepository.GetAppointmentHistory(leadId, appointmentId, submoduleCode);
        }
        public dynamic GetAppointmentNotification(string userId, int companyId)
        {
            return _appointmentRepository.GetAppointmentNotification(userId, companyId);
        }

        public Guid SaveUpdateAppointment(AppointmentModel model)
        {
            return _appointmentRepository.SaveUpdateAppointment(model);
        }
        public List<AppointmentModelForCalendar> GetAppointmentsForCalendar(Guid userId, int CompanyId, String condition = null)
        {
            return _appointmentRepository.GetAppointmentsForCalendar(userId, CompanyId, condition);

        }
        List<dynamic> IAppointmentsService.GetLeadCallHistory(string leadId, string subModuleName, int CompanyId)
        {
            return _appointmentRepository.GetLeadCallHistory(leadId, subModuleName, CompanyId);

        }
        List<dynamic> IAppointmentsService.GetVideoCallHistory(string RefId, string subModuleName, int CompanyId)
        {
            return _appointmentRepository.GetVideoCallHistory(RefId, subModuleName, CompanyId);

        }

        public List<dynamic> GetSmsLogHistory(long leadId, string subModuleName, long companyId, string userId)
        {
            return _appointmentRepository.GetSmsLogHistory(leadId, subModuleName, companyId, userId);
        }
        public List<ContactsForAppointmentModel> GetContactsForAppointment(string appointmentWith, string LeadId, Guid? userId, long companyID)
        {
            return _appointmentRepository.GetContactsForAppointment(appointmentWith, LeadId, userId, companyID);
        }
        public List<ContactsForAppointmentModel> getcustomerListForCalender(Guid? userId, long companyID)
        {
            return _appointmentRepository.getcustomerListForCalender(userId, companyID);
        }
        public ChangeStatusModel Delete(Guid guid)
        {
            try
            {
                return _appointmentRepository.Delete(guid);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public AppointmentModel GetAppointmentById(AppointmentModel id)
        {
            try
            {
                return _appointmentRepository.GetAppointmentById(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public async Task<int> addOrUpdateFiles(AppointmentFiles model)
        {
            try
            {
                return await _appointmentRepository.addOrUpdateFiles(model);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public dynamic GetScheduleAppointmentAgaintstUser(int leadId, int AppId, string userid)
        {
            return _appointmentRepository.GetScheduleAppointmentAgaintstUser(leadId, AppId, userid);
        }
        public dynamic CheckScheduledAppointmentTimeAgaintstUser(string startDate, string startTime, string userid, long AppointmentIdAuto)
        {
            return _appointmentRepository.CheckScheduledAppointmentTimeAgaintstUser(startDate, startTime, userid,AppointmentIdAuto);

        }

        public async Task<PagedData> GetAppointmentsBySubmodule(decimal leadId, string submoduleCode, string sortColumn, string sortDir, string pageIndex, string pageSize, string companyId)
        {
            try
            {
                return await _appointmentRepository.GetAppointmentsBySubmodule(leadId, submoduleCode, sortColumn, sortDir, pageIndex, pageSize, companyId);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
    }
}
