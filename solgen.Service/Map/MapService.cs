using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GoogleApi.Entities.Maps.Common;
using GoogleApi.Entities.Maps.Directions.Request;
using GoogleApi.Entities.Maps.Directions.Response;
using Microsoft.Extensions.Configuration;
using Solgen.Core;

namespace Solgen.Service
{
    public class MapService:IMapService
    {
        private readonly IConfiguration config;
        private readonly string ApiKey;
        public MapService(IConfiguration _configuration)
        {
            config = _configuration;
            ApiKey = config.GetValue<string>("CommonSettings:MapApiKey");
        }

        public async Task<MapCustomResponseModel> GetDurationAsync(string source,string destination)
        {
            var _result = string.Empty;

            MapCustomResponseModel responseModel = new MapCustomResponseModel();
            DirectionsRequest request = new DirectionsRequest();

            request.Key = ApiKey;
            request.Origin = new Location(source);
            request.Destination = new Location(destination);


           var response = await GoogleApi.GoogleMaps.Directions.QueryAsync(request);

            if(response.Status == GoogleApi.Entities.Common.Enums.Status.Ok)
            {
                var duration = response.Routes.First().Legs.First().Duration;
                var distance = response.Routes.First().Legs.First().Distance;

                responseModel.Time = duration.Text;
                responseModel.TotalSeconds = duration.Value;
                responseModel.Steps = distance.Value;
                responseModel.Distance = distance.Text;
            }

            return responseModel;
        }

        public MapCustomResponseModel GetDuration(string source, string destination)
        {
            var _result = string.Empty;

            MapCustomResponseModel responseModel = new MapCustomResponseModel();
            DirectionsRequest request = new DirectionsRequest();

            request.Key = ApiKey;
            request.Origin = new Location(source);
            request.Destination = new Location(destination);


            var response = GoogleApi.GoogleMaps.Directions.Query(request);

            if (response.Status == GoogleApi.Entities.Common.Enums.Status.Ok)
            {
                var duration = response.Routes.First().Legs.First().Duration;
                var distance = response.Routes.First().Legs.First().Distance;

                responseModel.Time = duration.Text;
                responseModel.TotalSeconds = duration.Value;
                responseModel.Steps = distance.Value;
                responseModel.Distance = distance.Text;
            }

            return responseModel;
        }
    }
}
