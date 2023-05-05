using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;

namespace Solgen.Repository
{
    public interface ILogRepository
    {
        Guid Save(LogModel model);
    }
}
