using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Service
{
    public interface IMapService
    {
        Task<MapCustomResponseModel> GetDurationAsync(string source, string destination);
        MapCustomResponseModel GetDuration(string source, string destination);
    }
}
