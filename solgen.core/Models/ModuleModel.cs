using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Solgen.Core
{
    public class ModuleModel
    {
        public long? ModuleId { get; set; }
        public int? ModuleCode { get; set; }
        public int? ModuleLinkCode { get; set; }
        public string ModuleName { get; set; }
        public string ModuleRoute { get; set; }
        public string ModuleCssClass { get; set; }
        public long? ModuleParentModuleId { get; set; }
        public Guid? ModuleCreatedBy { get; set; }
        public DateTime? ModuleCreatedOn { get; set; }
        public string ModuleDisplayOrder { get; set; }
        public string CompanyLogo { get; set; }
        public List<ModuleModel> SubModules { get; set; }
    }
    public partial class TblRoleModule
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
}
