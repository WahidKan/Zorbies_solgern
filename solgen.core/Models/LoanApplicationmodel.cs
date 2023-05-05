using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class LoanApplicationmodel
    {
       
    }
    public class substage
    {        public List<substagedata> fields { get; set; }
        public long companyid { get; set; }
        public Guid? userid { get; set; }

    }
    public class substagedata
    {      
        public long? id { get; set; }
        public long substageid { get; set; }
        public string stagename { get; set; }
        public bool mandatory { get; set; }
        public int duedays { get; set; }
        public List<string> usertype { get; set; }
       
        public long pages { get; set; }
    }
    public class AutomaticNotificationModel
    {
        public string templateId { get; set; }
        public string fromName { get; set; }
        public string toemail { get; set; }
        public string toUser { get; set; }
        public string ccUser { get; set; }
        public string subject { get; set; }
        public string subjectBody { get; set; }
        public string CreatedBy { get; set; }
        public string CompanyId { get; set; }
        public string objectId { get; set; }
    }
    public class loanAppReasonModel
    {
        
        public int id { get; set; }
        public string email {
            get; set;
        }
        public string reason_description { get; set; }
        public string requestdate { get; set; }
       
        public string closedate { get; set; }
        public Guid created_by { get; set; }
        public long company_id { get; set; }
        public bool? isverified { get; set; }
        public string type { get; set; }

    }
        public class SendMaualNotificationModel
    {
        public string templateId { get; set; }
        public string fromName { get; set; }
        public string toemail { get; set; }
        public string toUser { get; set; }
        public string ccEmail { get; set; }
        public string[] ccUser { get; set; }
        public string subject { get; set; }
        public string subjectBody { get; set; }
        public string CreatedBy { get; set; }
        public string CompanyId { get; set; }
        public string objectId { get; set; }
        public string objectName { get; set; }
        public string RouteUrl { get; set; }
    }
}

//
