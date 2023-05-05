using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
  public  class DashboardCountModel
    {
   public int      notificationCount         {get;set;}
   public int          AppointmentCount      {get;set;}
   public int          CommunicationCount    {get;set;}
   public int          LoanCount             {get;set;}
   public int DocCount { get; set; }
    }
}
