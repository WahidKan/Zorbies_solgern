using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class AppointmentModel
    {
        public Guid? AppointmentID { get; set; }
        public Guid? AppointmentTypeID { get; set; }
        public string AppointmentNumber { get; set; }
        public long? appointmentStatusID { get; set; }
        public string AppointmentType { get; set; }
        public string ModuleName { get; set; }
        public string appointmentStatus { get; set; }
        public string CustomerID { get; set; }
        public string CustomerName { get; set; }
        public long? OpportunityId { get; set; }
        public long? AppointmentIDAuto { get; set; }
        public DateTime AppointmentDueDate { get; set; }
        public TimeSpan FromTime { get; set; }
        public Guid? CreatedBy { get; set; }
        public TimeSpan ToTime { get; set; }
        public DateTime? EditDateTo { get; set; }
        public DateTime? EditDateFrom { get; set; }
        public String FromTimeString { get; set; }
        public String ToTimeString { get; set; }
        public int StatusId { get; set; }
        public string AppointmentName { get; set; }
        public string Description { get; set; }
        public long? Customer { get; set; }
        public long? AppointmentWith { get; set; }
        public long? CompanyId { get; set; }
        public string CustomerGuid { get; set; }
        public long? Module_obj { get; set; }
        public long? Contact_Id { get; set; }
        public string Email { get; set; }
        public string userEmail { get; set; }
        public string CalenderId { get; set; }
        /////////Date Time For Notification Start//////////
        public DateTime AppointmentDueDate_Notification { get; set; }
        public DateTime FromTime_Notification { get; set; }
        public DateTime ToTime_Notification { get; set; }
        public string Subject { get; set; }

        /////////End//////////
    }
    public class AppointmentModelForCalendar
    {
        public Guid? AppointmentID { get; set; }
        public string start { get; set; }
        public string end { get; set; }

        public TimeSpan FromTime { get; set; }
        public string title { get; set; }

        public TimeSpan ToTime { get; set; }

        public Guid CustomerID { get; set; }

        public int StatusId { get; set; }

    }

    public class ContactsForAppointmentModel
    {
        public string Text { get; set; }
        public long? Value { get; set; }
        public string Email { get; set; }
        public Guid? UserId { get; set; }
        public string MobilePhone { get; set; }
    }

    public class AppointmentFiles
    {
        public string Id { get; set; }
        public string FileUrl { get; set; }
        public string FileName { get; set; }
        public long? CompanyId { get; set; }
        public string Userid { get; set; }
        public string moduleName { get; set; }
        public string SubModuleName { get; set; }
        public string Type { get; set; }
        public string documentTitle { get; set; }
        public string description { get; set; }
    }
}
