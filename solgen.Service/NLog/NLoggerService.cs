using System;
using System.Collections.Generic;
using System.Text;
using NLog;


namespace Solgen.Service.NLog
{
	public class NLoggerService : INLoggerService
	{
        private static ILogger logger = LogManager.GetCurrentClassLogger();

        public NLoggerService()
        {
        }

        public void Information(string message)
        {
            logger.Info(message);
        }

        public void Warning(string message)
        {
            logger.Warn(message);
        }

        public void Debug(string message)
        {
            logger.Debug(message);
        }

        public void Error(string message)
        {
            logger.Error(message);
        }
    }
}
