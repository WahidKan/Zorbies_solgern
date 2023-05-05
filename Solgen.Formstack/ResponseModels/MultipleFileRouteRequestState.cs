using Newtonsoft.Json;
using System.Collections.Generic;

namespace Solgen.Formstack.ResponseModels
{
    public class MultipleFileRouteRequestState : ActionResponse
    {
        [JsonProperty("files")]
        public List<DataRouteFile> Files { get; set; }
    }
}
