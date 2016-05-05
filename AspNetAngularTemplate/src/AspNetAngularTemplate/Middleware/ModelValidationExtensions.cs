using Microsoft.AspNet.Builder;

namespace AspNetAngularTemplate.Middleware
{
    public static class ModelValidationExtensions
    {
        public static IApplicationBuilder UseModelValidation(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ModelValidationMiddleware>();
        }
    }
}