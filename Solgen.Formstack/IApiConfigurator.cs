using System;

namespace Solgen.Formstack
{
    public interface IApiConfigurator
    {
        string ApiKey { get; set; }
        string ApiSecret { get; set; }
        Uri BaseUri { get; }
    }
}
