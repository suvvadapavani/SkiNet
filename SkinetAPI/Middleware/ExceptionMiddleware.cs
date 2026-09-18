using System.Net;
using System.Text.Json;

namespace SkinetAPI.Middleware
{
    public class ExceptionMiddleware(IHostEnvironment env, RequestDelegate next)
    {
        public async Task InvokeAsync(HttpContext context)//must be InvokeAsync
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex,env);
                //logger.LogError(ex, ex.Message);
                //context.Response.ContentType = "application/json";
                //context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                //var response = env.IsDevelopment()
                //    ? new Errors.ApiErrorResponse(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                //    : new Errors.ApiErrorResponse(context.Response.StatusCode, "Internal Server Error", null);
                //var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                //var json = JsonSerializer.Serialize(response, options);
                //await context.Response.WriteAsync(json);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex, IHostEnvironment env)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = env.IsDevelopment()
                ? new Errors.ApiErrorResponse(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                : new Errors.ApiErrorResponse(context.Response.StatusCode, "Internal Server Error", null);
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var json = JsonSerializer.Serialize(response, options);
            return context.Response.WriteAsync(json);
        }
    }
}
