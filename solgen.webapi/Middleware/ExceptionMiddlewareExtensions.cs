using Microsoft.AspNetCore.Builder;

namespace Solgen.WebApi
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureLogExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<LogExceptionMiddleware>();
        }
    }
}
