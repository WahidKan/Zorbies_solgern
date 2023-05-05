using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class MapCustomResponseModel
    {
        public string Time { get; set; }
        public long TotalSeconds { get; set; }
        public long Steps { get; set; }
        public string Distance { get; set; }
    }

    public class SourceDestinationModel {
        public long Id { get; set; }
        public string Address { get; set; }
    }
    public class SourceDestinationResponseModel
    {
        public List<SourceDestinationModel> source { get; set; }
        public SourceDestinationModel destination { get; set; }
    }

    public class SourceDestinationCopmarisonModel
    {
        public string Time { get; set; }
        public long TotalSeconds { get; set; }
        public long Steps { get; set; }
        public string Distance { get; set; }
        public long AccountId { get; set; }
        public string AccountAddress { get; set; }
        public long LocationId{get; set; }
        public string LocationAddress { get; set; }
    }


}
