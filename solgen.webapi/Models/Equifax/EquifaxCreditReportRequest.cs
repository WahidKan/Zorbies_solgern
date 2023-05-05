using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Models.Equifax.CreditReport.Request
{    
    public partial class EquifaxCreditReportRequest
    {
        [JsonProperty("consumers")]
        public Consumers Consumers { get; set; }

        [JsonProperty("externalDataSources")]
        public ExternalDataSources ExternalDataSources { get; set; }

        [JsonProperty("customerReferenceIdentifier")]
        public string CustomerReferenceIdentifier { get; set; }

        [JsonProperty("customerConfiguration")]
        public CustomerConfiguration CustomerConfiguration { get; set; }
    }

    public partial class Consumers
    {
        [JsonProperty("name")]
        public Name[] Name { get; set; }

        [JsonProperty("socialNum")]
        public SocialNumber[] SocialNum { get; set; }

        [JsonProperty("dateOfBirth")]
        public string DateOfBirth { get; set; }

        [JsonProperty("addresses")]
        public Address[] Addresses { get; set; }

        [JsonProperty("phoneNumbers")]
        public PhoneNumber[] PhoneNumbers { get; set; }

        [JsonProperty("employments")]
        public Employments Employments { get; set; }
    }

    public partial class Address
    {
        [JsonProperty("identifier")]
        public string Identifier { get; set; }

        [JsonProperty("houseNumber")]
        [JsonConverter(typeof(ParseStringConverter))]
        public long HouseNumber { get; set; }

        [JsonProperty("streetName")]
        public string StreetName { get; set; }

        [JsonProperty("streetType")]
        public string StreetType { get; set; }

        [JsonProperty("apartmentNumber")]
        [JsonConverter(typeof(ParseStringConverter))]
        public long ApartmentNumber { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("zip")]
        [JsonConverter(typeof(ParseStringConverter))]
        public long Zip { get; set; }
    }

    public partial class Employments
    {
        [JsonProperty("occupation")]
        public string Occupation { get; set; }

        [JsonProperty("employerName")]
        public string EmployerName { get; set; }
    }

    public partial class Name
    {
        [JsonProperty("identifier")]
        public string Identifier { get; set; }

        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("middleName")]
        public string MiddleName { get; set; }

        [JsonProperty("suffix")]
        public string Suffix { get; set; }
    }

    public partial class PhoneNumber
    {
        [JsonProperty("identifier")]
        public string Identifier { get; set; }

        [JsonProperty("number")]
        public string Number { get; set; }
    }

    public partial class SocialNumber
    {
        [JsonProperty("identifier")]
        public string Identifier { get; set; }

        [JsonProperty("number")]
        public string Number { get; set; }
    }

    public partial class CustomerConfiguration
    {
        [JsonProperty("equifaxUSConsumerCreditReport")]
        public EquifaxUsConsumerCreditReport EquifaxUsConsumerCreditReport { get; set; }
    }

    public partial class EquifaxUsConsumerCreditReport
    {
        [JsonProperty("memberNumber")]
        public string MemberNumber { get; set; }

        [JsonProperty("securityCode")]
        public string SecurityCode { get; set; }

        [JsonProperty("codeDescriptionRequired")]
        public bool CodeDescriptionRequired { get; set; }

        [JsonProperty("models")]
        public Model[] Models { get; set; }

        [JsonProperty("endUserInformation")]
        public EndUserInformation EndUserInformation { get; set; }

        [JsonProperty("customerCode")]
        public string CustomerCode { get; set; }

        [JsonProperty("multipleReportIndicator")]
        public string MultipleReportIndicator { get; set; }

        [JsonProperty("ECOAInquiryType")]
        public string EcoaInquiryType { get; set; }

        [JsonProperty("optionalFeatureCode")]
        public string[] OptionalFeatureCode { get; set; }

        [JsonProperty("vendorIdentificationCode")]
        public string VendorIdentificationCode { get; set; }
    }

    public partial class EndUserInformation
    {
        [JsonProperty("endUsersName")]
        public string EndUsersName { get; set; }

        [JsonProperty("permissiblePurposeCode")]
        public string PermissiblePurposeCode { get; set; }
    }

    public partial class Model
    {
        [JsonProperty("identifier")]
        public string Identifier { get; set; }
    }

    public partial class ExternalDataSources
    {
        [JsonProperty("alternateDataSources")]
        public AlternateDataSources AlternateDataSources { get; set; }
    }

    public partial class AlternateDataSources
    {
        [JsonProperty("consumerReportIndicator")]
        public bool ConsumerReportIndicator { get; set; }
        [JsonProperty("customerOrchestrationCode", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CustomerOrchestrationCode { get; set; }
        [JsonProperty("customerOrganizationCode", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string CustomerOrganizationCode { get; set; }
        [JsonProperty("dataProviderTag", DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string DataProviderTag { get; set; }
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
