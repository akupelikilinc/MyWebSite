using Microsoft.AspNetCore.Mvc;

namespace MyWebsite.Controllers.Dashboard
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
