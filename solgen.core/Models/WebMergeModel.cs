using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class WebMergeModel
    {
        public string column { get; set; }
        public string value { get; set; }
    }

    public class CustomFormFieldModel
    {
        public string FormFieldId { get; set; }
        public string FormFieldName { get; set; }
        public string FormFieldValue { get; set; }
        public string TableName { get; set; }
        public string dt_code { get; set; }
        public string display_name { get; set; }
        public string data_type_id { get; set; }
        public string actual_data_type { get; set; }
        public string sql_type { get; set; }
        public string form_field_visibility { get; set; }
        public string name { get; set; }
        public string length { get; set; }
        public string form_controlName { get; set; }
        public string custom_field_id { get; set; }
    }

    public class LoanDocMappingModel
    {
        public string FormFieldId { get; set; }
        public string WebmergeField { get; set; }
        public string CustomFieldName { get; set; }
    }
    public class LoanDocMappingObject
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }

    public class UploadDocumentModel
    {
        public long BankId { get; set; }
        public string DocumentName { get; set; }
        public string olddocumentName { get; set; }
    }
}
