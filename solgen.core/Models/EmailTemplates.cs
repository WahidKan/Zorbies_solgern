using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class EmailTemplates
    {
        public Guid? EmailTemplateId { get; set; }
        public string EmailTemplateName { get; set; }
        public string EmailTemplateSubject { get; set; }
        public string Template { get; set; }
        public Guid? EmailTemplateCreatedBy { get; set; }
        public Guid EmailTemplateModifiedBy { get; set; }
        public DateTime EmailTemplateCreatedOn { get; set; }
        public DateTime EmailTemplateModifiedOn { get; set; }
        public string EmailTemplateUserType { get; set; }
        public Guid? EmailTemplateStatusId { get; set; }
        public string UserName { get; set; }
        public Guid MasterId { get; set; }
        public bool EmailTemplateIsDeleted { get; set; }
        public bool EmailTemplateIsDefault { get; set; }
        public string MasterValue { get; set; }
        public string MasterKey { get; set; }
        public int IsActive { get; set; }
        public int TotalRecord { get; set; }
        public long CompanyID { get; set; }
        public string ModuleName { get; set; }
        public string SubModuleName { get; set; }
        public string selectedValue { get; set; }
        public string selectedSubModuleValue { get; set; }

    }

    public class GrapesJsModel
    {
        public int? id { get; set; }
        public string html { get; set; }
        public string css { get; set; }
        public bool? isDefault { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool? linkWithCustomerPortal { get; set; }
        public string CreatedBy { get; set; }
        public long CompanyID { get; set; }
        public long statusId { get; set; }
    }

}
