using Newtonsoft.Json;
using Solgen.Formstack.Converters;
using Solgen.Formstack.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Formstack.RequestModels
{
    public class DataRouteRequest
    {
        [JsonProperty("id", NullValueHandling = NullValueHandling.Ignore)]
        public string Id { get; set; }

        [JsonProperty("name", NullValueHandling = NullValueHandling.Ignore)]
        public string Name { get; set; }

        [JsonProperty("rules", NullValueHandling = NullValueHandling.Ignore)]
        public Rule[] Rules { get; set; }

        [JsonProperty("output_name", NullValueHandling = NullValueHandling.Ignore)]
        public string OutputName { get; set; }

        [JsonProperty("folder", NullValueHandling = NullValueHandling.Ignore)]
        public string Folder { get; set; }
    }

    public class Rule
    {
        [JsonProperty("id", NullValueHandling = NullValueHandling.Ignore)]
        public string Id { get; set; }

        [JsonProperty("document_id", NullValueHandling = NullValueHandling.Ignore)]
        public string DocumentId { get; set; }

        [JsonProperty("document_name", NullValueHandling = NullValueHandling.Ignore)]
        public string DocumentName { get; set; }

        [JsonProperty("key", NullValueHandling = NullValueHandling.Ignore)]
        public string DocumentKey { get; set; }

        [JsonProperty("file", NullValueHandling = NullValueHandling.Ignore)]
        public string File { get; set; }

        [JsonProperty("sort", NullValueHandling = NullValueHandling.Ignore)]
        public int Sort { get; set; }

        [JsonProperty("combine", NullValueHandling = NullValueHandling.Ignore)]
        public int Combine { get; set; }

        [JsonProperty("conditions", NullValueHandling = NullValueHandling.Ignore)]
        public Condition[] Conditions { get; set; }
    }

    public class Condition
    {
        [JsonProperty("field", NullValueHandling = NullValueHandling.Ignore)]
        public string Field { get; set; }

        [JsonProperty("exp", NullValueHandling = NullValueHandling.Ignore)]
        public string Exp { get; set; }

        [JsonProperty("value", NullValueHandling = NullValueHandling.Ignore)]
        public string Value { get; set; }

        [JsonProperty("operator", NullValueHandling = NullValueHandling.Ignore)]
        public string Operator { get; set; }
    }
}
