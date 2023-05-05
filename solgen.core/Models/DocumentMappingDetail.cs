namespace Solgen.Core.Models
{
    public class DocumentMappingDetail
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsMappedDocumentMakerRouteRule { get; set; }
        public long DocumentMakerRouteRuleId { get; set; }
        public long DocumentMakerId { get; set; }
        public string RouteRules { get; set; }
        public long DocumentMakerSubModuleMappingId { get; set; }
        public string FileUrl { get; set; }
        public string FileName { get; set; }

        public string DocumentType { get; set; }

        public string HtmlContent { get; set; }
        
        public string Fields { get; set; }
        public string DeliveryOption { get; set; }
    }

    public class DeliveryOption
    {
        public long Id { get; set; }
        public long DocumentMakerMappingId { get; set; }
        public bool IsEmail { get; set; }
        public bool IsSignNow { get; set; }
        public string SendToEmail { get; set; }
        public string SendToOption { get; set; }
        public string FromToEmail { get; set; }
        public string FromToOption { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int StatusId { get; set; }
        public string Signer1Option { get; set; }
        public string Signer1Email { get; set; }
        public string Signer2Option { get; set; }
        public string Signer2Email { get; set; }
        public string ccEmail { get; set; }
        public string ccEmailOption { get; set; }
    }
}