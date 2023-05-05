using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public partial class TblMasterModel
    {
        public Guid? MasterId { get; set; }
        public Guid? MasterNameId { get; set; }
        public string MasterKey { get; set; }
        public string MasterValue { get; set; }
        public string MasterNameValue { get; set; }
        public string MasterNames { get; set; }
        public string Image { get; set; }
        public Guid? MasterStatusId { get; set; }
        public bool? MasterIsDeleted { get; set; }
        public DateTime? MasterCreatedOn { get; set; }
        public Guid? MasterCreatedBy { get; set; }
        public Guid? MasterModifyBy { get; set; }
        public DateTime? masterModifiedOn { get; set; }
        public bool? IsFrontEnd { get; set; }
        public string ModifiedByType { get; set; }
        public string MasterDescription { get; set; }
        public string subModuleid { get; set; }
        public long companyid{ get; set; }
        public Guid userid { get; set; }
    }

    public class tblReportDeliveryModel
    {
        public string productRequiredId  { get; set; }
        //public DateTime? deliveryDate { get; set; }
        public string deliveryDate { get; set; }
        public string UserId { get; set; }
        public long? CompanyId { get; set; }
    }
}
