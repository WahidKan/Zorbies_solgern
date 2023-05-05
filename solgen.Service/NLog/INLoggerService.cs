using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Service.NLog
{
	public interface INLoggerService
	{

		void Information(string message);
		void Warning(string message);
		void Debug(string message);
		void Error(string message);
	}
}
