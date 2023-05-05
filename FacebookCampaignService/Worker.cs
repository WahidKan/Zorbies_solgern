using FacebookCampaignService.Services;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Solgen.Service.NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace FacebookCampaignService
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IFacebookWindowsService _facebookWindowsService;
		private readonly INLoggerService _iNLoggerService;

		public Worker(ILogger<Worker> logger, IFacebookWindowsService facebookWindowsService, INLoggerService iNLoggerService)
        {
            _logger = logger;
            _facebookWindowsService = facebookWindowsService;
			this._iNLoggerService = iNLoggerService;
		}

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var inSightInterval = CommonSettings.AppSetting["CommonSettings:InSightInterval"];
            var campaignStatuses = CommonSettings.AppSetting["CommonSettings:CampaignStatuses"];
            var adSetsStatuses = CommonSettings.AppSetting["CommonSettings:AdSetsStatuses"];
            var adsStatuses = CommonSettings.AppSetting["CommonSettings:AdsStatuses"];
            var insightsStatuses = CommonSettings.AppSetting["CommonSettings:InsightsStatuses"];

            int.TryParse(inSightInterval, out int interval);
            while (!stoppingToken.IsCancellationRequested)
            {
                _iNLoggerService.Information("Worker running");
                await _facebookWindowsService.GetFacebookCampaigns(campaignStatuses);
                await _facebookWindowsService.GetFacebookadsets(adSetsStatuses);
                await _facebookWindowsService.GetFacebookads(adsStatuses);
                await _facebookWindowsService.GetadsInsightsUpdate(insightsStatuses,DateTime.Now.ToString("yyyy-MM-dd"));
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
                
                await Task.Delay((interval < 0 ? 1 : interval) * 60 * 1000, stoppingToken);
            }
        }

    }
}
