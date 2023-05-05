using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
   public class ApplicantCompanyMappingModel
    {
        public string StatusId { get; set; }
        public long companystatus { get; set; }
        public string CompanyName { get; set; }
        public long CompanyId { get; set; }

    }
    public class ScheduleAppointmentModel
    {
        public string AppointmentIDAuto { get; set; }
        public long Contact_Id { get; set; }
        public string module_route { get; set; }
        public DateTime AppointmentDueDate { get; set; }

    }
   
}
