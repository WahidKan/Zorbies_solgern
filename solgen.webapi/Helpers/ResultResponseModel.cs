namespace Solgen.WebApi.Helpers
{
    public class ResultResponseModel
    {
        public int StatusCode { get; set; }
        public string ResponseMessage { get; set; }
        public object Result { get; set; }
        public string ID { get; set; }
        public string OptionalExtraParamers { get; set; }
        public string OptionalExtraParamersOne { get; set; }
    }
    
    public class ProposalResultResponseModel : ResultResponseModel
    {
        public string RouteErrorMessage { get; set; }
        public string DocumentErrorMessage { get; set; }
    }
    
}
