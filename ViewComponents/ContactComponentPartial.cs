using Microsoft.AspNetCore.Mvc;

namespace MyWebsite.ViewComponents
{
	public class ContactComponentPartial : ViewComponent
	{
		public IViewComponentResult Invoke()
		{
			return View();
		}
	}
}
