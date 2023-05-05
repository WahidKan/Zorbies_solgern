using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class WebmergeMapping
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string WebmergeObjectType { get; set; }
        public int WebmergeObjectId { get; set; }
        public WebmergeDocumentField[] WebmergeMappings { get; set; }
    }

    public class WebmergeDocumentField
    {
        public string WebmergeDocumentFieldName { get; set; }
        public FormField[] Mappings { get; set; }
    }

    public class FormField
    {
        public string FormFieldId { get; set; }
        public string FormFieldName { get; set; }
    }

    public class LoanDocFieldMapping
    {
        public string CustomFieldId { get; set; }
        public string CustomFieldName { get; set; }
        public string WebmergeField { get; set; }
    }
}
