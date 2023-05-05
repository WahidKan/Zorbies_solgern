using Newtonsoft.Json;
using Solgen.Formstack.Converters;

namespace Solgen.Formstack.ResponseModels
{
    public class ActionResponse
    {
        [JsonProperty("success")]
        [JsonConverter(typeof(BitBooleanConverter))]
        public bool Success { get; set; }
    }
}
