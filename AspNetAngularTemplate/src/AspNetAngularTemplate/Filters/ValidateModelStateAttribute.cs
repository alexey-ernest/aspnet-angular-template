﻿using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Filters;

namespace AspNetAngularTemplate.Filters
{
    public class ValidateModelStateAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext actionContext)
        {
            if (!actionContext.ModelState.IsValid)
            {
                actionContext.Result = new BadRequestObjectResult(actionContext.ModelState);
            }
        }
    }
}