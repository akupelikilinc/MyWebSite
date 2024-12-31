using Microsoft.AspNetCore.Mvc;
using MyWebsite.DAL.Context;
using System.Linq;

namespace MyWebsite.ViewComponents
{
	public class PortfolioComponentPartial : ViewComponent
	{
		private readonly MyWebsiteContext _context;

		public PortfolioComponentPartial(MyWebsiteContext context)
		{
			_context = context;
		}

		public IViewComponentResult Invoke()
		{
			var portfolios = _context.Portfolios.ToList();
			return View(portfolios);
		}
	}
}
