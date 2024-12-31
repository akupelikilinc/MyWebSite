using Microsoft.AspNetCore.Mvc;
using MyWebsite.DAL.Context;
using MyWebsite.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace MyWebsite.Controllers
{
    public class DefaultController : Controller
    {
        private readonly MyWebsiteContext _context;

        public DefaultController(MyWebsiteContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage(Message message)
        {
            if (ModelState.IsValid)
            {
                message.CreatedAt = DateTime.Now;
                message.IsRead = false;
                _context.Messages.Add(message);
                await _context.SaveChangesAsync();
                return Json(new { success = true, message = "Mesajınız başarıyla gönderildi." });
            }

            var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
            return Json(new { success = false, message = "Lütfen tüm alanları doğru şekilde doldurun.", errors });
        }
    }
}
