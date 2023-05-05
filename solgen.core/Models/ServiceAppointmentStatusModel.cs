using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class ServiceAppointmentStatusModel
    {
      public Guid? UserId { get; set; }
public Int64? ServiceAppointmentID { get; set; }
public Int64?  CompanyId { get; set; }
public String Name { get; set; }
     public Int64? ID { get; set; }
		public string version { get; set; }

	}

	public class ServiceAppointmentModelForCalendar
	{
		public Guid? ServiceAppointmentID { get; set; }
		public string start { get; set; }
		public string end { get; set; }

		public TimeSpan FromTime { get; set; }
		public string title { get; set; }

		public TimeSpan ToTime { get; set; }

		public Guid CustomerID { get; set; }

		public int StatusId { get; set; }


	}
}
