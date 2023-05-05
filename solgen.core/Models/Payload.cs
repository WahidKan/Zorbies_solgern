using System.Collections.Generic;

namespace Solgen.Core.Models
{
    public class Payload
    {
        public string url { get; set; }
        public List<KeyValuePair> keyValueList { get; set; }
    }

    public class KeyValuePair
    {
        public string FieldName { get; set; }
        public string FieldValue { get; set; }
        public bool  IsImage { get; set; }

        public int PageNumber { get; set; }

        public int Width { get; set; }

        public int height { get; set; }

        public int top { get; set; }
        public int left { get; set; }

    }
}