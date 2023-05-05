using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Data.SqlClient;
using System.Net;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Service;

namespace Solgen.WebApi
{
    public class LogExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ICommonService _commonService;
        //   private readonly ILogService logService;
        private static readonly string DeletedMessage = "Unable to delete because this record is already accociated with a different module.";
        public LogExceptionMiddleware(RequestDelegate next, ICommonService commonService)
        {
            _next = next;
            _commonService = commonService;
        }

        public async Task InvokeAsync(HttpContext httpContext, ILogService logService)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                Guid guid = logService.Save(new LogModel
                {
                    LogId = Guid.NewGuid(),
                    LogType = LogTypes.Error,
                    LogShortMessage = ex.Message,
                    LogLongMessage = ex.InnerException.ToStringAsloIfNull(),
                    LogIpAddress = httpContext.Request.Host.Value,
                    LogPageUrl = Microsoft.AspNetCore.Http.Extensions.UriHelper.GetDisplayUrl(httpContext.Request),
                    LogReferrerUrl = httpContext.Request.Headers["Referer"].ToStringAsloIfNull(),
                    LogCreatedBy = Guid.NewGuid(),
                    LogCreatedOn = DateTime.Now
                });
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private  Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.OK;

            dynamic sqlException = exception.InnerException!=null? exception.InnerException.InnerException: exception as SqlException;// as SqlException;
            
            int ErrorNumber = 0;
            if (sqlException !=null) {
                ErrorNumber = sqlException.Number;
            }
            var data = _commonService.AddErrorAndException(exception.Message, context.Request.Path);
            var response = new
            {
                responseCode = context.Response.StatusCode,
                responseMessage = (context.Request.Method == HttpMethods.Delete || context.Request.Method == HttpMethods.Post) && ErrorNumber ==50000 ? exception.Message : "We are sorry for the inconvenience. Please contact your administrator for help.",
                isSucceeded = false
            };

            string jsonResponse = JsonConvert.SerializeObject(response);
            return context.Response.WriteAsync(jsonResponse);

        }

        
    }


}
