using Microsoft.AspNetCore.Mvc;
using MyWebsite.DAL.Context;
using MyWebsite.Areas.Admin.Filters;
using Microsoft.EntityFrameworkCore;

namespace MyWebsite.Areas.Admin.Controllers
{
    [Area("Admin")]
    [AdminAuth]
    public class DashboardController : Controller
    {
        private readonly MyWebsiteContext _context;

        public DashboardController(MyWebsiteContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            ViewBag.MessageCount = await _context.Messages.CountAsync();
            ViewBag.UnreadMessageCount = await _context.Messages.CountAsync(x => !x.IsRead);
            ViewBag.ServiceCount = await _context.Services.CountAsync();
            ViewBag.PortfolioCount = await _context.Portfolios.CountAsync();
            ViewBag.BlogCount = await _context.Blogs.CountAsync();

            var recentMessages = await _context.Messages
                .OrderByDescending(x => x.CreatedAt)
                .Take(5)
                .ToListAsync();

            return View(recentMessages);
        }
    }
}