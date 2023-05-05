using System.Collections.Generic;

namespace Solgen.Core.Models
{
    public class ProposalMapping
    {
        public List<Data> Data { get; set; }
        public List<Languages> Languages { get; set; }
    }

    public class Data
    {
        public long custom_field_id { get; set; }
        public string value { get; set; }
        public string FormFieldName { get; set; }
        public string ColumnName { get; set; }
        public string dt_code { get; set; }
        public List<select_options> select_options { get; set; }
    }

    public class Languages
    {

    }

    public class select_options
    {
        public string name { get; set; }
        public string value { get; set; }
    }

    public class ProposalFieldMapping
    {
        public List<Data> proposal { get; set; }
        public List<Data> loanproduct { get; set; }
        public List<Data> account { get; set; }
        public List<Data> opportunity { get; set; }
        public List<Data> workorder { get; set; }
        public List<Data> serviceterritory { get; set; }
        public List<Data> contact { get; set; }
        public List<Data> contract { get; set; }
        public List<Data> Products { get; set; }
        public List<Data> pricebookentity { get; set; }

        public List<Data> All { get; set; }
    }
}