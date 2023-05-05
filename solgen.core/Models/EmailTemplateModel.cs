namespace Solgen.Core
{
    public class EmailTemplateModel
    {
        public long TemplateID { get; set; }
        public string EmailTemplateName { get; set; }
        public string EmailTemplateSubject { get; set; }
        public string Template { get; set; }
        public string EmailTemplateLogo { get; set; } 
        public string CompanyLogo { get; set; }
        public string companyName { get; set; }
    }
}
