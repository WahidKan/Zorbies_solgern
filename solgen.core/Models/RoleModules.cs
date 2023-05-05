using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class RoleModules
    {
        //  public Guid ModuleId { get; set; }
        public long? ModuleId { get; set; }
        public long? ModuleParentModuleId { get; set; }
        public string ModuleCode { get; set; }
        public string ModuleName { get; set; }
        public string ModuleRoute { get; set; }
        public string ModuleUserType { get; set; }
        public string RoleName { get; set; }
        public string RoleID { get; set; }
        public string RoleDescription { get; set; }
        public bool RoleModuleAddFlag { get; set; }
        public bool RoleModuleUpdateFlag { get; set; }
        public bool RoleModuleReadFlag { get; set; }
        public bool RoleModuleDeleteFlag { get; set; }
        public bool RoleModuleEmailFlag { get; set; }
        public bool RoleModuleSMSFlag { get; set; }
        public bool RoleModuleNotificationFlag { get; set; }
    }
}
