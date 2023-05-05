using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class MasterItems
    {
        public string MasterName { get; set; }
        public string Text { get; set; }
        public string Value { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string First_value { get; set; }
        public string Second_value { get; set; }
        public string Third_value { get; set; }

        public string RecordType { get; set; }

        public string Type { get; set; }

        public string RequiredByName { get; set; }

        public string RequiredBy { get; set; }
        public Guid? ValueGuid { get; set; }

        public string Description { get; set; }
        public string AccountId { get; set; }
    }
    public class RolesItems
    {
        public string Id { get; set; }
        public string RoleName { get; set; }
        public string RoleDescription { get; set; }
    }
    public class VendorDropDown
    {
        public string Text { get; set; }
        public Guid Value { get; set; }
    }

    public class GetDynamicFields
    {
        public int ID { get; set; }
        public string Type { get; set; }
        public string ControlName { get; set; }
        public string ControlLabel { get; set; }
        public string PlaceHolder { get; set; }
        public string FieldValue { get; set; }
        public string ControlNameComputed { get; set; }
        public bool Required { get; set; }
        public List<FieldsOptions> FieldsOptions { get; set; }
    }
    public class FieldsOptions
    {
        public string Text { get; set; }
        public Guid Value { get; set; }
    }

    public class OperatorsItems
    {
        public string Expression { get; set; }
        public string Text { get; set; }
        public string Value { get; set; }
    }
    public class WorkOrderItems
    {
        public string Text { get; set; }
        public string Value { get; set; }
    }
    public class WorkOrderStatus
    {
        public string Text { get; set; }
        public string Value { get; set; }
    }

}
