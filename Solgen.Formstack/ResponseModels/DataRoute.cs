using Newtonsoft.Json;
using Solgen.Formstack.Converters;

namespace Solgen.Formstack.ResponseModels
{
    public class DataRoute
    {
        [JsonProperty("id")]
        [JsonConverter(typeof(WriteToStringConverter))]
        public int Id { get; set; }

        [JsonProperty("key")]
        public string Key { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("folder", NullValueHandling = NullValueHandling.Ignore)]
        public string Folder { get; set; }
    }
}
