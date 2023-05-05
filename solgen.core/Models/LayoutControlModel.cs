using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace Solgen.Core.Models
{

    public class GroupModel
    {

        public int id { get; set; }
        public string group_id { get; set; }
        public string table_name { get; set; }
        public string group_name { get; set; }
        public string group_display_name { get; set; }
        public string is_inserted { get; set; }
        public string is_updated { get; set; }
        public string display_order { get; set; }
        public string group_layout_type { get; set; }
        public string visibility_condition { get; set; }
        public string visibility_condition_label { get; set; }
        public string default_value { get; set; }
        public List<LayoutControls> controls { get; set; }
    }

    public class ManageCustomLayoutModel
    {
        public GroupModel[] group { get; set; }
        public string relation { get; set; }
        public string view { get; set; }
    }

    public class ManageCustomLayoutModelRevise
    {
        public dynamic group { get; set; }
        public string relation { get; set; }
        public string view { get; set; }
        public string flowAutomation { get; set; }
    }

    public class SaveUserDefinedFieldModal
     {
        public int viewId { get; set; }
        public string userDefinedControl { get; set; }
     }
    public class SelectListArrayValue
    {
        public int id { get; set; }
        public int isinserted { get; set; }
        public string value { get; set; }
        public string color { get; set; }

    }
    public class LayoutControls
    {
        public int display_order { get; set; }
        public int id { get; set; }
        public string is_readOnly { get; set; }
        public string name { get; set; }
        public string actual_data_type { get; set; }
        public List<SelectListArrayValue> selectlistvalues { get; set; }
        public string index { get; set; }
        public string label { get; set; }
        public string display_name { get; set; }
        public int custom_field_id { get; set; }
        public int group_id { get; set; }
        public string group_name { get; set; }
        public string class_name { get; set; }
        public string group_display_name { get; set; }
        public bool group_is_system_generated { get; set; }
        public int data_type_id { get; set; }
        public string data_type_name { get; set; }
        public string code { get; set; }
        public string sql_type { get; set; }
        public string form_field_visibility { get; set; }
        public string list_field_visibility { get; set; }
        public int length { get; set; }

        public bool is_required { get; set; }
        public bool required { get; set; }
        public object picklist_options { get; set; }
        public object decimal_places { get; set; }
        public string dt_code { get; set; }
        public string table_name { get; set; }
        public string ColumnName { get; set; }
        public string value { get; set; }
        public string select_value { get; set; }
        public object validation_type { get; set; }
        public object range_from { get; set; }
        public object range_to { get; set; }
        public string form_controlName { get; set; }
        public object regular_expression { get; set; }
        public int is_updated { get; set; }
        public int is_inserted { get; set; }
        public string is_include_in_post_jon { get; set; }
        public bool is_system_generated { get; set; }
        public int group_display_order { get; set; }
        public string layout_type { get; set; }
        public bool system_is_required { get; set; }
        public string field_code { get; set; }
        public object dropdown_type { get; set; }
        public object select_options { get; set; }
        public object parent_id { get; set; }
        public object dependent_type { get; set; }
        public int dependent_show_type { get; set; }
        public int has_dependent { get; set; }
        public int is_email_template { get; set; }
        public string user_guide { get; set; }
        public string cultureDetails { get; set; }
        public int field_mapping_id { get; set; }
        public bool customfield { get; set; }
    }


    public class FormControlModel
    {

        public int id { get; set; }
        public string group_id { get; set; }
        public string table_name { get; set; }
        public string group_name { get; set; }
        public string group_display_name { get; set; }
        public string is_inserted { get; set; }
        public string is_updated { get; set; }
        public string display_order { get; set; }
        public string group_layout_type { get; set; }
        public List<FormControls> controls { get; set; }
    }
    public class FormControls
    {
        public int display_order { get; set; }
        public int id { get; set; }
        public string is_readOnly { get; set; }
        public string name { get; set; }
        public string actual_data_type { get; set; }
        public List<SelectListArrayValue> selectlistvalues { get; set; }
        public string index { get; set; }
        public string label { get; set; }
        public string display_name { get; set; }
        public int form_field_id { get; set; }
        public int group_id { get; set; }
        public string group_name { get; set; }
        public string class_name { get; set; }
        public string group_display_name { get; set; }
        public bool group_is_system_generated { get; set; }
        public int data_type_id { get; set; }
        public string data_type_name { get; set; }
        public string code { get; set; }
        public string sql_type { get; set; }
        public string form_field_visibility { get; set; }
        public string list_field_visibility { get; set; }
        public int length { get; set; }

        public bool is_required { get; set; }
        public bool required { get; set; }
        public object picklist_options { get; set; }
        public object decimal_places { get; set; }
        public string dt_code { get; set; }
        public string table_name { get; set; }
        public string ColumnName { get; set; }
        public string value { get; set; }
        public string select_value { get; set; }
        public object validation_type { get; set; }
        public object range_from { get; set; }
        public object range_to { get; set; }
        public string form_controlName { get; set; }
        public object regular_expression { get; set; }
        public int is_updated { get; set; }
        public int is_inserted { get; set; }
        public string is_include_in_post_jon { get; set; }
        public bool is_system_generated { get; set; }
        public int group_display_order { get; set; }
        public string layout_type { get; set; }
        public bool system_is_required { get; set; }
        public object field_code { get; set; }
        public object dropdown_type { get; set; }
        public object select_options { get; set; }
        public object parent_id { get; set; }
        public object dependent_type { get; set; }
        public int dependent_show_type { get; set; }
        public int is_email_template { get; set; }
        public string user_guide { get; set; }
        public string cultureDetails { get; set; }
        public int field_mapping_id { get; set; }
        public bool formfield { get; set; }
        public string field_type { get; set; }
        public string default_value { get; set; }
        public string dependent_id { get; set; }
        public string dependent_value { get; set; }
        public bool is_dependent { get; set; }
    }

    public class FormModuleModel
    {
        public string moduleName { get; set; }
        public long moduleId { get; set; }
        public long subModuleId { get; set; }
        public long? Id { get; set; }

    }

    public class LayoutModuleModel
    {
        public string displayName { get; set; }
        public string layoutName { get; set; }
        public string moduleid { get; set; }
        public string submoduleid { get; set; }
        public string layoutNameDesc { get; set; }
        public string deviceid { get; set; }
        public string layoutTypeid { get; set; }

    }

    public class ManageLayoutDefaultStatusModel
    {
        public long sub_module_id { get; set; }
        public string device_type { get; set; }
        public string layout_type { get; set; }
        public long custom_view_id { get; set; }
        public bool is_remove_role { get; set; }
        public long companyID { get; set; }

    }
}

