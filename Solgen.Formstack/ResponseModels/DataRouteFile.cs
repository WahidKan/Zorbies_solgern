using Newtonsoft.Json;
using Solgen.Formstack.Converters;

namespace Solgen.Formstack.ResponseModels
{
    public class DataRouteFile
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("file_contents")]
        [JsonConverter(typeof(Base64ByteConverter))]
        public byte[] FileContents { get; set; }
    }
}
