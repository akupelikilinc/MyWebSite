using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWebsite.DAL.Context;
using MyWebsite.DAL.Entities;

namespace MyWebsite.ViewComponents
{
	public class ServicesComponentPartial : ViewComponent
	{
		private readonly MyWebsiteContext _context;

		public ServicesComponentPartial(MyWebsiteContext context)
		{
			_context = context;
		}

		public async Task<IViewComponentResult> InvokeAsync()
		{
			var services = await _context.Services
				.Where(x => x.IsActive)
				.OrderBy(x => x.OrderNo)
				.ToListAsync();
			return View(services);
		}
	}
}
