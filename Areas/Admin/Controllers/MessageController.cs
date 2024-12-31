using Microsoft.AspNetCore.Mvc;
using MyWebsite.DAL.Context;
using MyWebsite.DAL.Entities;
using MyWebsite.Areas.Admin.Filters;
using Microsoft.EntityFrameworkCore;

namespace MyWebsite.Areas.Admin.Controllers
{
    [Area("Admin")]
    [AdminAuth]
    public class MessageController : Controller
    {
        private readonly MyWebsiteContext _context;

        public MessageController(MyWebsiteContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var messages = await _context.Messages
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
            return View(messages);
        }

        public async Task<IActionResult> Details(int id)
        {
            var message = await _context.Messages.FindAsync(id);
            if (message == null)
                return NotFound();

            return View(message);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var message = await _context.Messages.FindAsync(id);
            if (message == null)
                return Json(new { success = false, message = "Mesaj bulunamadı." });

            try
            {
                _context.Messages.Remove(message);
                await _context.SaveChangesAsync();
                return Json(new { success = true });
            }
            catch (Exception)
            {
                return Json(new { success = false, message = "Silme işlemi sırasında bir hata oluştu." });
            }
        }

        [HttpPost]
        public async Task<IActionResult> ToggleRead(int id)
        {
            var message = await _context.Messages.FindAsync(id);
            if (message == null)
                return Json(new { success = false, message = "Mesaj bulunamadı." });

            try
            {
                message.IsRead = !message.IsRead;
                await _context.SaveChangesAsync();
                return Json(new { success = true, isRead = message.IsRead });
            }
            catch (Exception)
            {
                return Json(new { success = false, message = "İşlem sırasında bir hata oluştu." });
            }
        }
    }
}