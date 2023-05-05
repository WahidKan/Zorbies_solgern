using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
  
    public class UsersConnections
    {
        public HashSet<string> ConnectionIds { get; set; }
        public Guid userId { get; set; }
    }
}
