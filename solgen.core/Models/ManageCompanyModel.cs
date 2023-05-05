using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Solgen.Core.Models
{
    public class CompanyModel
    {
        
        public long? CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyType { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string CompanyLogo { get; set; }
        public string filename { get; set; }
        public Guid? CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public List<TblCompanyModule> companyModules { get; set; }
        //public bool? IsRoleAssined { get; set; }


        //public List<RoleModuleModel> RoleModuleModel { get; set; }
        ////public Guid? UserType { get; set; }
        //public long? UserType { get; set; }
        //public long? CompanyID { get; set; }
    }

    public partial class TblCompanyModule
    {
        [Key]
        public System.Guid RoleModuleId { get; set; }
        public Nullable<System.Guid> RoleModuleRoleID { get; set; }
        // public Nullable<System.Guid> RoleModuleModuleID { get; set; }
        public long? RoleModuleModuleID { get; set; }

        [NotMapped]
        public string RoleModuleModuleName { get; set; }
        public bool RoleModuleAddFlag { get; set; }
        public bool RoleModuleUpdateFlag { get; set; }
        public bool RoleModuleReadFlag { get; set; }
        public bool RoleModuleDeleteFlag { get; set; }
        public bool RoleModuleEmailFlag { get; set; }
        public bool RoleModuleNotificationFlag { get; set; }
        public bool RoleModuleSMSFlag { get; set; }
        [NotMapped]
        public int HeirarchyLevel { get; set; }
        [NotMapped]
        public string RoleModuleName { get; set; }
        [NotMapped]
        public bool IsEnableReadPermission { get; set; }
        [NotMapped]
        public bool IsEnableAddPermission { get; set; }
        [NotMapped]
        public bool IsEnableDeletePermission { get; set; }
        [NotMapped]
        public bool IsEnableEditPermission { get; set; }
        [NotMapped]
        public bool IsManageable { get; set; }
        [NotMapped]
        public long? ModuleParentModuleId { get; set; }
        // public System.Guid ModuleParentModuleId { get; set; }
        public long? RoleModuleSubModuleID { get; set; }

        public bool RoleModuleIsViewAll { get; set; }
        public bool RoleModuleIsViewShared { get; set; }
        public bool RoleModuleIsViewOwn { get; set; }

    }


    public class PriceBookModel
    {
        public long? PriceBookID { get; set; }
        public string fieldsData { get; set; }
        public long? CompanyId { get; set; }
        public string CreatedBy { get; set; }
    }
}
