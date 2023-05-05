using System;
using System.Collections.Generic;

using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Solgen.WebApi.Models.Equifax.FileStatus.Response
{
    public partial class EquifaxFileStatusResponse
    {
        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("consumers")]
        public Consumers Consumers { get; set; }
    }

    public partial class Consumers
    {
        [JsonProperty("equifaxPrecheckReport")]
        public EquifaxPrecheckReport[] EquifaxPrecheckReport { get; set; }
    }

    public partial class EquifaxPrecheckReport
    {
        [JsonProperty("identifier")]
        public string Identifier { get; set; }

        [JsonProperty("customerReferenceNumber")]
        public string CustomerReferenceNumber { get; set; }

        [JsonProperty("customerNumber")]
        public string CustomerNumber { get; set; }

        [JsonProperty("ECOAInquiryType")]
        public string EcoaInquiryType { get; set; }

        [JsonProperty("hitCode")]
        public HitCode HitCode { get; set; }

        [JsonProperty("reportDate")]
        public string ReportDate { get; set; }

        [JsonProperty("subjectName")]
        public SubjectName SubjectName { get; set; }

        [JsonProperty("subjectSocialNum")]
        [JsonConverter(typeof(ParseStringConverter))]
        public long SubjectSocialNum { get; set; }
    }

    public partial class HitCode
    {
        [JsonProperty("code")]
        public string Code { get; set; }
    }

    public partial class SubjectName
    {
        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }
    }

    internal static class Converter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters =
            {
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }

    internal class ParseStringConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(long) || t == typeof(long?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            long l;
            if (Int64.TryParse(value, out l))
            {
                return l;
            }
            throw new Exception("Cannot unmarshal type long");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (long)untypedValue;
            serializer.Serialize(writer, value.ToString());
            return;
        }

        public static readonly ParseStringConverter Singleton = new ParseStringConverter();
    }
}
