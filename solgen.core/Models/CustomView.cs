using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class CustomView
    {
        public string view_name { get; set; }
        public string view_for { get; set; }
        public string display_name { get; set; }
        public string shortdisplayname { get; set; }
        public long custom_field_id { get; set; }
        public bool is_sortable { get; set; }
        public string view_searchFilter { get; set; }
        public string view_searchFilterJson { get; set; }
        public string view_orderfilterJson { get; set; }
        public string role_ids { get; set; }

    }

    public class LoanApplicationReportFilter
    {
        public long Id { get; set; }
        public string report_name { get; set; }
        public string sub_module_name { get; set; }
        public string module_id { get; set; }
        public string sub_module_id { get; set; }
        public string subModuleTableName { get; set; }
        public string description { get; set; }
        public DateTime? date_from { get; set; }
        public DateTime? date_to { get; set; }
        public string report_searchFilter { get; set; }
        public string report_searchFilterJson { get; set; }
        public string report_SelectedColumnJson { get; set; }
        public Guid? created_by { get; set; }
        public string filterType { get; set; }
        public DateTime created_on { get; set; }
        public bool? IsCountWidget { get; set; }
        public bool? IsChartView { get; set; }
        public bool? IsListView { get; set; }
        public long? chartView_Y_Axis { get; set; }
        public string ChartType { get; set; }
        public string ListViewFieldsId { get; set; }
        public string CountWidgetApplyTo { get; set; }
        public string CountWidgetRole_Ids { get; set; }
        public string ChartViewApplyTo { get; set; }
        public string ChartViewRole_Ids { get; set; }
        public string ListViewRadioBtn { get; set; }
        public string ListViewselectedRole { get; set; }
        public long? GroupByFieldId { get; set; }
    }
}
