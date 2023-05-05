using System;
using System.Configuration;

namespace Solgen.Formstack
{
    public class WebMergeConfiguration : IApiConfigurator
    {
        public string ApiKey { get; set; }//= ConfigurationManager.AppSettings["WebMerge.ApiKey"];
        //public string ApiSecret { get; } = Environment.GetEnvironmentVariable("WebMerge.ApiSecret");
        public string ApiSecret { get; set; }//= ConfigurationManager.AppSettings["WebMerge.ApiSecret"];
        public Uri BaseUri { get; } = new Uri("https://www.webmerge.me");
    }
}
