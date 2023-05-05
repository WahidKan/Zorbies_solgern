using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
   public class LeadsModel
    {

    }
    public class leadNotesModel
    {
        public int? note_id { get; set; }
        public string note_name { get; set; }
        public string note_description { get; set; }
        public string object_name { get; set; }
        public long object_id { get; set; }
        public long object_ref_id { get; set; }
        public Guid  created_by { get; set; }
        public long company_id { get; set; }
        public string IsPrivate { get; set; }
        public bool IsPrivateBool
        {
            get
            {
                return IsPrivate.Equals("1") ? true : false;

            }
        }
    }
    public class leadEmailModel
    {
        public int contactid { get; set; }
        public int templateid { get; set; }
        public string description { get; set; }
        public string sent_to { get; set; }
        public string subject { get; set; }
        public string object_name { get; set; }
        public long object_id { get; set; }
        public long object_ref_id { get; set; }
        public Guid created_by { get; set; }
        public long company_id { get; set; }
    }
    public class leadImagesModel
    {
        public long Id { get; set; }

        public string FileUrl { get; set; }
        public string MasterValue { get; set; }
        public string FileName { get; set; }
        public string Description { get; set; }
        public string FileExtension { get; set; }
        public DateTime CreateOn { get; set; }
        public string UrlLink { get; set; }

    }
    public class leadConvertModel
    {
        public string account_name { get; set; }
        public string account_type_id { get; set; }
        public string opportunity_name { get; set; }
        public string contactid { get; set; }
        public string productid { get; set; }
        public string object_name { get; set; }
        public long object_id { get; set; }
        public long object_ref_id { get; set; }
        public Guid created_by { get; set; }
        public long company_id { get; set; }
        public long loanid { get; set; }
    }
    public class leadConvertModelopportunity
    {
        public string Account { get; set; }
        public string accountName { get; set; }
        public string accountid { get; set; }
        public string accounttypeid { get; set; }
        public string contact { get; set; }
        public string product { get; set; }
        public string productFamily { get; set; }
        public string isApplicableForLoan { get; set; }
        public string contactidform { get; set; }
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string opportunityname { get; set; }
        public string phone { get; set; }
        public string object_name { get; set; }
        public string object_id { get; set; }

        public long object_ref_id { get; set; }
        public Guid created_by { get; set; }
        public long company_id { get; set; }
        public int state { get; set; }

    }

}
