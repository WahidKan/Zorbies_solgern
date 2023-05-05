using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;

namespace Solgen.Service
{
    public interface ILogService
    {
        Guid Save(LogModel model);
    }
}
