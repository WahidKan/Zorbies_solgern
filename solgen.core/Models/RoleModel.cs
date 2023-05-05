using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Solgen.Core.Models;

namespace Solgen.Core
{
    public class RoleModel
    {
        public RoleModel()
        {
            this.RoleModuleModel = new List<RoleModuleModel>();
        }
        public Guid? RoleId { get; set; }
        public string RoleName { get; set; }
        public string RoleDescription { get; set; }
        public string RoleStatusName { get; set; }
        public string reportto { get; set; }
        public string reporttoid { get; set; }
        public long? RoleStatusId { get; set; }
        public Guid? CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public List<RoleModuleModelNew> RoleModules { get; set; }
        public bool? IsRoleAssined { get; set; }

       
        public  List<RoleModuleModel> RoleModuleModel { get; set; }
        //public Guid? UserType { get; set; }
        public long? UserType { get; set; }
        public long? CompanyID { get; set; }
    }

    public class RoleModelSave 
    {
        public Guid? RoleId { get; set; }
        public string RoleName { get; set; }
        public string RoleDescription { get; set; }
        public string RoleStatusName { get; set; }
        public Guid RoleStatusId { get; set; }
        public Guid? CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public List<RoleModuleModel> RoleModules { get; set; }
    }
}
