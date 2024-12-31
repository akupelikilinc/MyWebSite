using Microsoft.AspNetCore.Mvc;
using MyWebsite.DAL.Context;
using MyWebsite.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace MyWebsite.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class AuthController : Controller
    {
        private readonly MyWebsiteContext _context;

        public AuthController(MyWebsiteContext context)
        {
            _context = context;
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(string username, string password)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(x => x.Username == username);

            if (admin != null && BCrypt.Net.BCrypt.Verify(password, admin.Password))
            {
                admin.LastLogin = DateTime.Now;
                await _context.SaveChangesAsync();

                HttpContext.Session.SetInt32("AdminId", admin.AdminId);
                return RedirectToAction("Index", "Dashboard", new { area = "Admin" });
            }

            TempData["Error"] = "Kullanıcı adı veya şifre hatalı.";
            return View();
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction(nameof(Login));
        }
    }
}