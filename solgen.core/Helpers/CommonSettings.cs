using Microsoft.Extensions.Configuration;
using System;
using System.Collections;
using System.IO;

namespace Solgen.Core
{
    public static class CommonSettings
    {
        public static IConfiguration AppSetting { get; }
        static CommonSettings()
        {
            AppSetting = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();
        }

        public static DateTime UtcToLocal(DateTime dateTime)
        {
            string timeZoneInfo = AppSetting["CommonSettings:DATE_TIMEZONE"]; 
            return TimeZoneInfo.ConvertTimeFromUtc(dateTime, TimeZoneInfo.FindSystemTimeZoneById(timeZoneInfo));
        }

        public static string GetFormattedDateOnly(DateTime dateTime)
        {
            return dateTime.ToString(AppSetting["CommonSettings:DATE_FORMAT"]);
        }

        public static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp).ToLocalTime();
            return dtDateTime;
        }

        public static string ReplaceFileVariables(Hashtable hashVars, string content)
        {
            IDictionaryEnumerator dicEn = hashVars.GetEnumerator();
            if (!string.IsNullOrEmpty(content))
            {
                while (dicEn.MoveNext())
                {
                    content = content.Replace(dicEn.Key.ToString(), Convert.ToString(dicEn.Value));
                }
            }

            return content;
        }

    }
}
