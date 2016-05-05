using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Infrastructure;

namespace AspNetAngularTemplate.Middleware
{
    public class ModelValidationMiddleware
    {
        private readonly RequestDelegate _next;

        public ModelValidationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IActionContextAccessor actionContextAccessor)
        {
            var actionContext = actionContextAccessor.ActionContext;
            if (actionContext != null && !actionContext.ModelState.IsValid)
            {
                context.Response.StatusCode = 400;
                var jsonResult = new JsonResult(new {errors = actionContext.ModelState});
                await jsonResult.ExecuteResultAsync(actionContext);
                return;
            }

            await _next(context);
        }
    }
}