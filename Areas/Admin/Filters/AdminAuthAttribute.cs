using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MyWebsite.DAL.Context;

namespace MyWebsite.Areas.Admin.Filters
{
    public class AdminAuthAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var adminId = context.HttpContext.Session.GetInt32("AdminId");
            if (!adminId.HasValue)
            {
                context.Result = new RedirectToActionResult("Login", "Auth", new { area = "Admin" });
                return;
            }

            base.OnActionExecuting(context);
        }
    }
}