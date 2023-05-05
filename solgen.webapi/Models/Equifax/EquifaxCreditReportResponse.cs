using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Models.Equifax.CreditReport.Response
{    
    public partial class EquifaxCreditReportResponse
    {
        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("consumers")]
        public Consumers Consumers { get; set; }
    }

    public partial class Consumers
    {
        [JsonProperty("equifaxUSConsumerCreditReport")]
        public EquifaxUsConsumerCreditReport[] EquifaxUsConsumerCreditReport { get; set; }
    }

    public partial class EquifaxUsConsumerCreditReport
    {
        [JsonProperty("identifier")]
        public string Identifier { get; set; }

        [JsonProperty("customerReferenceNumber")]
        public string CustomerReferenceNumber { get; set; }

        [JsonProperty("customerNumber")]
        public string CustomerNumber { get; set; }

        [JsonProperty("consumerReferralCode")]
        public string ConsumerReferralCode { get; set; }

        [JsonProperty("multipleReportIndicator")]
        public string MultipleReportIndicator { get; set; }

        [JsonProperty("ECOAInquiryType")]
        public string EcoaInquiryType { get; set; }

        [JsonProperty("hitCode")]
        public IndicatorCode HitCode { get; set; }

        [JsonProperty("fileSinceDate")]
        public string FileSinceDate { get; set; }

        [JsonProperty("lastActivityDate")]
        public string LastActivityDate { get; set; }

        [JsonProperty("reportDate")]
        public string ReportDate { get; set; }

        [JsonProperty("subjectName")]
        public SubjectName SubjectName { get; set; }

        [JsonProperty("subjectSocialNum")]
        public string SubjectSocialNum { get; set; }

        [JsonProperty("birthDate")]
        public string BirthDate { get; set; }

        [JsonProperty("nameMatchFlags")]
        public NameMatchFlags NameMatchFlags { get; set; }

        [JsonProperty("doNotCombineIndicator")]
        public string DoNotCombineIndicator { get; set; }

        [JsonProperty("addressDiscrepancyIndicator")]
        public string AddressDiscrepancyIndicator { get; set; }

        [JsonProperty("fraudIDScanAlertCodes")]
        public IndicatorCode[] FraudIdScanAlertCodes { get; set; }

        [JsonProperty("fraudVictimIndicator")]
        public IndicatorCode FraudVictimIndicator { get; set; }

        [JsonProperty("addresses")]
        public AddressElement[] Addresses { get; set; }

        [JsonProperty("formerNames")]
        public FormerName[] FormerNames { get; set; }

        [JsonProperty("employments")]
        public Employment[] Employments { get; set; }

        [JsonProperty("bankruptcies")]
        public Bankruptcy[] Bankruptcies { get; set; }

        [JsonProperty("collections")]
        public Collection[] Collections { get; set; }

        [JsonProperty("alertContacts")]
        public AlertContact[] AlertContacts { get; set; }

        [JsonProperty("trades")]
        public Trade[] Trades { get; set; }

        [JsonProperty("inquiries")]
        public Inquiry[] Inquiries { get; set; }

        [JsonProperty("models")]
        public Model[] Models { get; set; }

        [JsonProperty("identification")]
        public Identification Identification { get; set; }

        [JsonProperty("attributes")]
        public EquifaxUsConsumerCreditReportAttribute[] Attributes { get; set; }

        [JsonProperty("onlineGeoCode")]
        public OnlineGeoCode[] OnlineGeoCode { get; set; }

        [JsonProperty("OFACAlerts")]
        public OfacAlert[] OfacAlerts { get; set; }

        [JsonProperty("consumerReferralLocation")]
        public ConsumerReferralLocation ConsumerReferralLocation { get; set; }

        [JsonProperty("alternateDataSources")]
        public AlternateDataSources AlternateDataSources { get; set; }
    }

    public partial class AddressElement
    {
        [JsonProperty("addressType")]
        public string AddressType { get; set; }

        [JsonProperty("houseNumber")]
        public string HouseNumber { get; set; }

        [JsonProperty("streetName")]
        public string StreetName { get; set; }

        [JsonProperty("streetType")]
        public string StreetType { get; set; }

        [JsonProperty("cityName")]
        public string CityName { get; set; }

        [JsonProperty("stateAbbreviation")]
        public string StateAbbreviation { get; set; }

        [JsonProperty("zipCode")]
        public string ZipCode { get; set; }

        [JsonProperty("sourceOfAddress")]
        public IndicatorCode SourceOfAddress { get; set; }

        [JsonProperty("dateFirstReported")]
        public string DateFirstReported { get; set; }

        [JsonProperty("dateLastReported")]
        public string DateLastReported { get; set; }

        [JsonProperty("addressLine1")]
        public string AddressLine1 { get; set; }
    }

    public partial class IndicatorCode
    {
        [JsonProperty("code")]
        public string Code { get; set; }

        [JsonProperty("description", NullValueHandling = NullValueHandling.Ignore)]
        public string Description { get; set; }
    }

    public partial class AlertContact
    {
        [JsonProperty("alertType")]
        public IndicatorCode AlertType { get; set; }

        [JsonProperty("dateReported")]
        public string DateReported { get; set; }

        [JsonProperty("effectiveDate")]
        public string EffectiveDate { get; set; }

        [JsonProperty("telephoneNumbers")]
        public TelephoneNumberElement[] TelephoneNumbers { get; set; }
    }

    public partial class TelephoneNumberElement
    {
        [JsonProperty("telephoneNumberType")]
        public IndicatorCode TelephoneNumberType { get; set; }

        [JsonProperty("telephoneNumber")]
        public string TelephoneNumber { get; set; }
    }

    public partial class AlternateDataSources
    {
        [JsonProperty("militaryLendingCoveredBorrower")]
        public MilitaryLendingCoveredBorrower MilitaryLendingCoveredBorrower { get; set; }
    }

    public partial class MilitaryLendingCoveredBorrower
    {
        [JsonProperty("regulatedIdentifier")]
        public string RegulatedIdentifier { get; set; }

        [JsonProperty("disclaimer")]
        public string Disclaimer { get; set; }

        [JsonProperty("coveredBorrowerStatus")]
        public string CoveredBorrowerStatus { get; set; }

        [JsonProperty("referralContactNumber")]
        public string ReferralContactNumber { get; set; }
    }

    public partial class EquifaxUsConsumerCreditReportAttribute
    {
        [JsonProperty("modelNumber")]
        public string ModelNumber { get; set; }

        [JsonProperty("attributes")]
        public AttributeAttribute[] Attributes { get; set; }
    }

    public partial class AttributeAttribute
    {
        [JsonProperty("identifier")]
        public string Identifier { get; set; }
    }

    public partial class Bankruptcy
    {
        [JsonProperty("customerNumber")]
        public string CustomerNumber { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("filer")]
        public string Filer { get; set; }

        [JsonProperty("industryCode")]
        public string IndustryCode { get; set; }

        [JsonProperty("currentIntentOrDispositionCode")]
        public IndicatorCode CurrentIntentOrDispositionCode { get; set; }

        [JsonProperty("dispositionDate")]
        public string DispositionDate { get; set; }

        [JsonProperty("dateFiled")]
        public string DateFiled { get; set; }

        [JsonProperty("currentDispositionDate")]
        public string CurrentDispositionDate { get; set; }

        [JsonProperty("dateReported")]
        public string DateReported { get; set; }
    }

    public partial class Collection
    {
        [JsonProperty("customerNumber")]
        public string CustomerNumber { get; set; }

        [JsonProperty("clientNameOrNumber")]
        public string ClientNameOrNumber { get; set; }

        [JsonProperty("statusCode")]
        public IndicatorCode StatusCode { get; set; }

        [JsonProperty("narrativeCodes", NullValueHandling = NullValueHandling.Ignore)]
        public IndicatorCode[] NarrativeCodes { get; set; }

        [JsonProperty("rawNarrativeCodes", NullValueHandling = NullValueHandling.Ignore)]
        public string[] RawNarrativeCodes { get; set; }

        [JsonProperty("indicator")]
        public string Indicator { get; set; }

        [JsonProperty("dateReported")]
        public string DateReported { get; set; }

        [JsonProperty("dateAssigned")]
        public string DateAssigned { get; set; }

        [JsonProperty("originalAmount")]
        public long OriginalAmount { get; set; }

        [JsonProperty("statusDate")]
        public string StatusDate { get; set; }

        [JsonProperty("balance")]
        public long Balance { get; set; }

        [JsonProperty("dateOfFirstDelinquency")]
        public string DateOfFirstDelinquency { get; set; }

        [JsonProperty("accountDesignatorCode")]
        public IndicatorCode AccountDesignatorCode { get; set; }

        [JsonProperty("creditorClassificationCode")]
        public IndicatorCode CreditorClassificationCode { get; set; }
    }

    public partial class ConsumerReferralLocation
    {
        [JsonProperty("bureauCode")]
        public string BureauCode { get; set; }

        [JsonProperty("bureauName")]
        public string BureauName { get; set; }

        [JsonProperty("address")]
        public ConsumerReferralLocationAddress Address { get; set; }

        [JsonProperty("telephoneNumber")]
        public ConsumerReferralLocationTelephoneNumber TelephoneNumber { get; set; }
    }

    public partial class ConsumerReferralLocationAddress
    {
        [JsonProperty("cityName")]
        public string CityName { get; set; }

        [JsonProperty("stateAbbreviation")]
        public string StateAbbreviation { get; set; }

        [JsonProperty("zipCode")]
        public string ZipCode { get; set; }
    }

    public partial class ConsumerReferralLocationTelephoneNumber
    {
        [JsonProperty("telephoneNumber")]
        public string TelephoneNumber { get; set; }
    }

    public partial class Employment
    {
        [JsonProperty("identifier")]
        public string Identifier { get; set; }

        [JsonProperty("occupation")]
        public string Occupation { get; set; }

        [JsonProperty("employer")]
        public string Employer { get; set; }

        [JsonProperty("dateLastReported")]
        public string DateLastReported { get; set; }

        [JsonProperty("dateFirstReported")]
        public string DateFirstReported { get; set; }
    }

    public partial class FormerName
    {
        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("firstName")]
        public string FirstName { get; set; }
    }

    public partial class Identification
    {
        [JsonProperty("subjectSocialNum")]
        public string SubjectSocialNum { get; set; }

        [JsonProperty("socialNumConfirmed")]
        public string SocialNumConfirmed { get; set; }

        [JsonProperty("socialMatchFlags")]
        public string SocialMatchFlags { get; set; }

        [JsonProperty("inquirySocialNum")]
        public string InquirySocialNum { get; set; }

        [JsonProperty("inquirySocialNumStateIssued")]
        public string InquirySocialNumStateIssued { get; set; }

        [JsonProperty("inquirySocialNumYearIssued")]
        public string InquirySocialNumYearIssued { get; set; }

        [JsonProperty("socialNumMatch")]
        public string SocialNumMatch { get; set; }
    }

    public partial class Inquiry
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("industryCode")]
        public string IndustryCode { get; set; }

        [JsonProperty("inquiryDate")]
        public string InquiryDate { get; set; }

        [JsonProperty("customerNumber")]
        public string CustomerNumber { get; set; }

        [JsonProperty("customerName")]
        public string CustomerName { get; set; }
    }

    public partial class Model
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("FICOScoreIndicatorCode", NullValueHandling = NullValueHandling.Ignore)]
        public IndicatorCode FicoScoreIndicatorCode { get; set; }

        [JsonProperty("score")]
        [JsonConverter(typeof(DecodingChoiceConverter))]
        public long? Score { get; set; }

        [JsonProperty("rejects", NullValueHandling = NullValueHandling.Ignore)]
        public IndicatorCode[] Rejects { get; set; }

        [JsonProperty("reasons", NullValueHandling = NullValueHandling.Ignore)]
        public ScoreNumberOrMarketMaxIndustryCode[] Reasons { get; set; }

        [JsonProperty("inquiryKeyFactor", NullValueHandling = NullValueHandling.Ignore)]
        public IndicatorCode InquiryKeyFactor { get; set; }

        [JsonProperty("riskBasedPricingOrModel", NullValueHandling = NullValueHandling.Ignore)]
        public RiskBasedPricingOrModel RiskBasedPricingOrModel { get; set; }

        [JsonProperty("modelNumber", NullValueHandling = NullValueHandling.Ignore)]
        public string ModelNumber { get; set; }

        [JsonProperty("modelIDOrScorecard", NullValueHandling = NullValueHandling.Ignore)]
        public string ModelIdOrScorecard { get; set; }

        [JsonProperty("scoreNumberOrMarketMaxIndustryCode", NullValueHandling = NullValueHandling.Ignore)]
        public ScoreNumberOrMarketMaxIndustryCode ScoreNumberOrMarketMaxIndustryCode { get; set; }
    }

    public partial class ScoreNumberOrMarketMaxIndustryCode
    {
        [JsonProperty("code")]
        public string Code { get; set; }
    }

    public partial class RiskBasedPricingOrModel
    {
        [JsonProperty("percentage")]
        public string Percentage { get; set; }

        [JsonProperty("lowRange")]
        public string LowRange { get; set; }

        [JsonProperty("highRange")]
        public string HighRange { get; set; }
    }

    public partial class NameMatchFlags
    {
        [JsonProperty("firstNameMatchFlag")]
        public string FirstNameMatchFlag { get; set; }

        [JsonProperty("lastNameMatchFlag")]
        public string LastNameMatchFlag { get; set; }

        [JsonProperty("middleNameMatchFlag")]
        public string MiddleNameMatchFlag { get; set; }
    }

    public partial class OfacAlert
    {
        [JsonProperty("revisedLegalVerbiageIndicator")]
        public string RevisedLegalVerbiageIndicator { get; set; }

        [JsonProperty("memberFirmCode")]
        public string MemberFirmCode { get; set; }

        [JsonProperty("cdcTransactionDate")]
        public string CdcTransactionDate { get; set; }

        [JsonProperty("cdcTransactionTime")]
        public string CdcTransactionTime { get; set; }

        [JsonProperty("transactionType")]
        public string TransactionType { get; set; }

        [JsonProperty("cdcResponseCode")]
        public string CdcResponseCode { get; set; }

        [JsonProperty("legalVerbiage")]
        public string LegalVerbiage { get; set; }

        [JsonProperty("dataSegmentRegulated")]
        public string DataSegmentRegulated { get; set; }
    }

    public partial class OnlineGeoCode
    {
        [JsonProperty("streetNumber")]
        public string StreetNumber { get; set; }

        [JsonProperty("streetName")]
        public string StreetName { get; set; }

        [JsonProperty("streetTypeOrDirection")]
        public string StreetTypeOrDirection { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("stateAbbreviation")]
        public string StateAbbreviation { get; set; }

        [JsonProperty("zipCode")]
        public string ZipCode { get; set; }

        [JsonProperty("typeOfAddress")]
        public IndicatorCode TypeOfAddress { get; set; }

        [JsonProperty("returnCode1")]
        public IndicatorCode ReturnCode1 { get; set; }

        [JsonProperty("returnCode2")]
        public IndicatorCode ReturnCode2 { get; set; }

        [JsonProperty("returnCode3")]
        public IndicatorCode ReturnCode3 { get; set; }

        [JsonProperty("returnCode4")]
        public IndicatorCode ReturnCode4 { get; set; }
    }

    public partial class SubjectName
    {
        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("middleName")]
        public string MiddleName { get; set; }
    }

    public partial class Trade
    {
        [JsonProperty("customerNumber")]
        public string CustomerNumber { get; set; }

        [JsonProperty("automatedUpdateIndicator", NullValueHandling = NullValueHandling.Ignore)]
        public string AutomatedUpdateIndicator { get; set; }

        [JsonProperty("monthsReviewed", NullValueHandling = NullValueHandling.Ignore)]
        public string MonthsReviewed { get; set; }

        [JsonProperty("accountDesignator", NullValueHandling = NullValueHandling.Ignore)]
        public IndicatorCode AccountDesignator { get; set; }

        [JsonProperty("accountNumber", NullValueHandling = NullValueHandling.Ignore)]
        public string AccountNumber { get; set; }

        [JsonProperty("customerName")]
        public string CustomerName { get; set; }

        [JsonProperty("dateReported")]
        public string DateReported { get; set; }

        [JsonProperty("dateOpened")]
        public string DateOpened { get; set; }

        [JsonProperty("highCredit", NullValueHandling = NullValueHandling.Ignore)]
        public long? HighCredit { get; set; }

        [JsonProperty("balance", NullValueHandling = NullValueHandling.Ignore)]
        public long? Balance { get; set; }

        [JsonProperty("pastDueAmount", NullValueHandling = NullValueHandling.Ignore)]
        public long? PastDueAmount { get; set; }

        [JsonProperty("portfolioTypeCode", NullValueHandling = NullValueHandling.Ignore)]
        public IndicatorCode PortfolioTypeCode { get; set; }

        [JsonProperty("rate")]
        public Rate Rate { get; set; }

        [JsonProperty("narrativeCodes")]
        public IndicatorCode[] NarrativeCodes { get; set; }

        [JsonProperty("rawNarrativeCodes")]
        public string[] RawNarrativeCodes { get; set; }

        [JsonProperty("accountTypeCode")]
        public IndicatorCode AccountTypeCode { get; set; }

        [JsonProperty("lastPaymentDate", NullValueHandling = NullValueHandling.Ignore)]
        public string LastPaymentDate { get; set; }

        [JsonProperty("scheduledPaymentAmount", NullValueHandling = NullValueHandling.Ignore)]
        public long? ScheduledPaymentAmount { get; set; }

        [JsonProperty("termsDurationCode", NullValueHandling = NullValueHandling.Ignore)]
        public IndicatorCode TermsDurationCode { get; set; }

        [JsonProperty("termsFrequencyCode", NullValueHandling = NullValueHandling.Ignore)]
        public IndicatorCode TermsFrequencyCode { get; set; }

        [JsonProperty("paymentHistory1to24", NullValueHandling = NullValueHandling.Ignore)]
        public IndicatorCode[] PaymentHistory1To24 { get; set; }

        [JsonProperty("thirtyDayCounter", NullValueHandling = NullValueHandling.Ignore)]
        public long? ThirtyDayCounter { get; set; }

        [JsonProperty("sixtyDayCounter", NullValueHandling = NullValueHandling.Ignore)]
        public long? SixtyDayCounter { get; set; }

        [JsonProperty("ninetyDayCounter", NullValueHandling = NullValueHandling.Ignore)]
        public long? NinetyDayCounter { get; set; }

        [JsonProperty("previousHighRate1", NullValueHandling = NullValueHandling.Ignore)]
        public long? PreviousHighRate1 { get; set; }

        [JsonProperty("previousHighDate1", NullValueHandling = NullValueHandling.Ignore)]
        public PreviousHighDate1? PreviousHighDate1 { get; set; }

        [JsonProperty("previousHighRate2", NullValueHandling = NullValueHandling.Ignore)]
        public long? PreviousHighRate2 { get; set; }

        [JsonProperty("previousHighDate2", NullValueHandling = NullValueHandling.Ignore)]
        public string PreviousHighDate2 { get; set; }

        [JsonProperty("previousHighRate3", NullValueHandling = NullValueHandling.Ignore)]
        public long? PreviousHighRate3 { get; set; }

        [JsonProperty("previousHighDate3", NullValueHandling = NullValueHandling.Ignore)]
        public string PreviousHighDate3 { get; set; }

        [JsonProperty("24MonthPaymentHistory", NullValueHandling = NullValueHandling.Ignore)]
        public IndicatorCode[] The24MonthPaymentHistory { get; set; }

        [JsonProperty("dateMajorDelinquencyFirstReported", NullValueHandling = NullValueHandling.Ignore)]
        public string DateMajorDelinquencyFirstReported { get; set; }

        [JsonProperty("originalChargeOffAmount", NullValueHandling = NullValueHandling.Ignore)]
        public long? OriginalChargeOffAmount { get; set; }

        [JsonProperty("previousHighRatePaymentHistory", NullValueHandling = NullValueHandling.Ignore)]
        public string PreviousHighRatePaymentHistory { get; set; }

        [JsonProperty("previousHighDatePaymentHistory", NullValueHandling = NullValueHandling.Ignore)]
        public string PreviousHighDatePaymentHistory { get; set; }

        [JsonProperty("closedDate", NullValueHandling = NullValueHandling.Ignore)]
        public string ClosedDate { get; set; }

        [JsonProperty("activityDesignatorCode", NullValueHandling = NullValueHandling.Ignore)]
        public IndicatorCode ActivityDesignatorCode { get; set; }

        [JsonProperty("purchasedFromOrSoldCreditorIndicator", NullValueHandling = NullValueHandling.Ignore)]
        public IndicatorCode PurchasedFromOrSoldCreditorIndicator { get; set; }

        [JsonProperty("purchasedFromOrSoldCreditorName", NullValueHandling = NullValueHandling.Ignore)]
        public string PurchasedFromOrSoldCreditorName { get; set; }

        [JsonProperty("creditorClassificationCode", NullValueHandling = NullValueHandling.Ignore)]
        public IndicatorCode CreditorClassificationCode { get; set; }

        [JsonProperty("actualPaymentAmount", NullValueHandling = NullValueHandling.Ignore)]
        public long? ActualPaymentAmount { get; set; }
    }

    public partial class Rate
    {
        [JsonProperty("code")]
        public long Code { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }
    }

    public enum IndicatorEnum { Empty };

    public enum TypeEnum { Inquiry };

    public partial struct PreviousHighDate1
    {
        public double? Double;
        public string String;

        public static implicit operator PreviousHighDate1(double Double) => new PreviousHighDate1 { Double = Double };
        public static implicit operator PreviousHighDate1(string String) => new PreviousHighDate1 { String = String };
    }

    public partial class CreditReportResponse
    {
        public static CreditReportResponse FromJson(string json) => JsonConvert.DeserializeObject<CreditReportResponse>(json);
    }

    public static class Serialize
    {
        public static string ToJson(this CreditReportResponse self) => JsonConvert.SerializeObject(self);
    }

    internal static class Converter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters =
            {
                IndicatorConverter.Singleton,
                TypeEnumConverter.Singleton,
                PreviousHighDate1Converter.Singleton,
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }

    //internal class ParseStringConverter : JsonConverter
    //{
    //    public override bool CanConvert(Type t) => t == typeof(long) || t == typeof(long?);

    //    public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
    //    {
    //        if (reader.TokenType == JsonToken.Null) return null;
    //        var value = serializer.Deserialize<string>(reader);
    //        long l;
    //        if (Int64.TryParse(value, out l))
    //        {
    //            return l;
    //        }
    //        throw new Exception("Cannot unmarshal type long");
    //    }

    //    public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
    //    {
    //        if (untypedValue == null)
    //        {
    //            serializer.Serialize(writer, null);
    //            return;
    //        }
    //        var value = (long)untypedValue;
    //        serializer.Serialize(writer, value.ToString());
    //        return;
    //    }

    //    public static readonly ParseStringConverter Singleton = new ParseStringConverter();
    //}

    internal class IndicatorConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(IndicatorEnum) || t == typeof(IndicatorEnum?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            if (value == "*")
            {
                return IndicatorEnum.Empty;
            }
            throw new Exception("Cannot unmarshal type Indicator");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (IndicatorEnum)untypedValue;
            if (value == IndicatorEnum.Empty)
            {
                serializer.Serialize(writer, "*");
                return;
            }
            throw new Exception("Cannot marshal type Indicator");
        }

        public static readonly IndicatorConverter Singleton = new IndicatorConverter();
    }

    internal class TypeEnumConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(TypeEnum) || t == typeof(TypeEnum?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            var value = serializer.Deserialize<string>(reader);
            if (value == "inquiry")
            {
                return TypeEnum.Inquiry;
            }
            throw new Exception("Cannot unmarshal type TypeEnum");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            if (untypedValue == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            var value = (TypeEnum)untypedValue;
            if (value == TypeEnum.Inquiry)
            {
                serializer.Serialize(writer, "inquiry");
                return;
            }
            throw new Exception("Cannot marshal type TypeEnum");
        }

        public static readonly TypeEnumConverter Singleton = new TypeEnumConverter();
    }

    internal class DecodingChoiceConverter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(long) || t == typeof(long?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null) return null;
            switch (reader.TokenType)
            {
                case JsonToken.Integer:
                    var integerValue = serializer.Deserialize<long>(reader);
                    return integerValue;
                case JsonToken.String:
                case JsonToken.Date:
                    var stringValue = serializer.Deserialize<string>(reader);
                    long l;
                    if (Int64.TryParse(stringValue, out l))
                    {
                        return l;
                    }
                    break;
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
            serializer.Serialize(writer, value);
            return;
        }

        public static readonly DecodingChoiceConverter Singleton = new DecodingChoiceConverter();
    }

    internal class PreviousHighDate1Converter : JsonConverter
    {
        public override bool CanConvert(Type t) => t == typeof(PreviousHighDate1) || t == typeof(PreviousHighDate1?);

        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
        {
            switch (reader.TokenType)
            {
                case JsonToken.Integer:
                case JsonToken.Float:
                    var doubleValue = serializer.Deserialize<double>(reader);
                    return new PreviousHighDate1 { Double = doubleValue };
                case JsonToken.String:
                case JsonToken.Date:
                    var stringValue = serializer.Deserialize<string>(reader);
                    return new PreviousHighDate1 { String = stringValue };
            }
            throw new Exception("Cannot unmarshal type PreviousHighDate1");
        }

        public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
        {
            var value = (PreviousHighDate1)untypedValue;
            if (value.Double != null)
            {
                serializer.Serialize(writer, value.Double.Value);
                return;
            }
            if (value.String != null)
            {
                serializer.Serialize(writer, value.String);
                return;
            }
            throw new Exception("Cannot marshal type PreviousHighDate1");
        }

        public static readonly PreviousHighDate1Converter Singleton = new PreviousHighDate1Converter();
    }
}
