using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FacebookCampaignService.Services
{
    public interface IFacebookWindowsService
    {
        Task<string> GetFacebookCampaigns(string status = "ACTIVE");
        Task<string> GetFacebookadsets(string status = "ACTIVE");
        Task<string> GetFacebookads(string status = "ACTIVE");
        Task<string> GetadsInsightsUpdate(string status, string date);
    }
}
