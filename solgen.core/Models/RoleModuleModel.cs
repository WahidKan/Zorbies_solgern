using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Solgen.Core.Models
{
    public class RoleModuleModel
    {
        public System.Guid RoleModuleId { get; set; }
        public System.Guid? RoleModuleRoleID { get; set; }
        public long? RoleModuleModuleID { get; set; }
        public string RoleModuleModuleName { get; set; }
        public bool RoleModuleAddFlag { get; set; }
        public bool RoleModuleUpdateFlag { get; set; }
        public bool RoleModuleReadFlag { get; set; }
        public bool RoleModuleDeleteFlag { get; set; }
       public int HeirarchyLevel { get; set; }
        public bool RoleModuleNotificationFlag { get; set; }
        public bool RoleModuleEmailFlag { get; set; }
        public bool RoleModuleSMSFlag { get; set; }
        public bool IsEnableReadPermission { get; set; }
        public bool IsEnableAddPermission { get; set; }
        public bool IsEnableDeletePermission { get; set; }
        public bool IsEnableEditPermission { get; set; }
        
        public bool IsManageable { get; set; }
        
        public long? ModuleParentModuleId { get; set; }
        public string RoleModuleName { get; set; }
        public long? RoleModuleSubModuleID { get; set; }
        public string roleModuleIsView { get; set; }
        public bool RoleModuleIsViewAll { get; set; }
        public bool RoleModuleIsViewShared { get; set; }
        public bool RoleModuleIsViewOwn { get; set; }
    }
    public class RoleModuleModelNew
    {
        public System.Guid RoleModuleId { get; set; }
        public System.Guid? RoleModuleRoleID { get; set; }
        public System.Guid? ParentFirstChild { get; set; }
        public System.Guid? ParentSecondChild { get; set; }
        public int Counts { get; set; }
        public string ThirdModuleName { get; set; }
        public string SecondModuleName { get; set; }
        public int HeirarchyLevel { get; set; }
        public string RoleModuleName { get; set; }
        public long? RoleModuleModuleID { get; set; }
        public string RoleModuleModuleName { get; set; }
        public bool RoleModuleAddFlag { get; set; }
        public bool RoleModuleUpdateFlag { get; set; }
        public bool RoleModuleReadFlag { get; set; }
        public bool RoleModuleDeleteFlag { get; set; }
        public bool RoleModuleNotificationFlag { get; set; }
        public bool RoleModuleEmailFlag { get; set; }
        public bool RoleModuleSMSFlag { get; set; }
      //  public long? RoleModuleSubModuleID { get; set; }

       public long? ModuleParentModuleId { get; set; }
        public string roleModuleIsView { get; set; }
        public bool RoleModuleIsViewAll { get; set; }
        public bool RoleModuleIsViewShared { get; set; }
        public bool RoleModuleIsViewOwn { get; set; }
    }
}
