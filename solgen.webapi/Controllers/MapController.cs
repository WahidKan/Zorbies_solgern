using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Solgen.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class MapController : ControllerBase
    {
        private readonly IMapService mapService;
        public MapController(IMapService _mapService)
        {
            mapService = _mapService;
        }


        [Route("GetDuration")]
        public async Task<ActionResult> GetDuration(string source, string destination)
        {
           var _result = await mapService.GetDurationAsync(source, destination);

            return Ok(_result);
        }



    }
}
