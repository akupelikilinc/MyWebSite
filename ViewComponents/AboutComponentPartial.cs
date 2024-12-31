using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWebsite.DAL.Context;
using MyWebsite.DAL.Entities;

namespace MyWebsite.ViewComponents
{
    public class AboutComponentPartial : ViewComponent
    {
        private readonly MyWebsiteContext _context;

        public AboutComponentPartial(MyWebsiteContext context)
        {
            _context = context;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var about = await _context.Abouts.FirstOrDefaultAsync();
            return View(about);
        }
    }
}
