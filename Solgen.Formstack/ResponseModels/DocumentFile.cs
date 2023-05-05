using Newtonsoft.Json;
using Solgen.Formstack.Converters;
using Solgen.Formstack.Enums;
using System;

namespace Solgen.Formstack.ResponseModels
{
    public class DocumentFile
    {
        [JsonProperty("type")]
        [JsonConverter(typeof(EnumConverter))]
        public DocumentType DocumentType { get; set; }

        [JsonProperty("last_update")]
        public DateTime LastUpdated { get; set; }

        [JsonProperty("contents")]
        [JsonConverter(typeof(Base64ByteConverter))]
        public byte[] FileContents { get; set; }
    }
}
