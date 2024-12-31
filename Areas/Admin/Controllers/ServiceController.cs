using Microsoft.AspNetCore.Mvc;
using MyWebsite.DAL.Context;
using MyWebsite.DAL.Entities;
using MyWebsite.Areas.Admin.Filters;
using Microsoft.EntityFrameworkCore;

namespace MyWebsite.Areas.Admin.Controllers
{
    [Area("Admin")]
    [AdminAuth]
    public class ServiceController : Controller
    {
        private readonly MyWebsiteContext _context;
        private readonly IWebHostEnvironment _env;

        public ServiceController(MyWebsiteContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<IActionResult> Index()
        {
            var services = await _context.Services
                .OrderBy(x => x.OrderNo)
                .ToListAsync();
            return View(services);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Service service, IFormFile icon)
        {
            if (ModelState.IsValid)
            {
                if (icon != null)
                {
                    var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "services");
                    if (!Directory.Exists(uploadsFolder))
                        Directory.CreateDirectory(uploadsFolder);

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + icon.FileName;
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await icon.CopyToAsync(fileStream);
                    }

                    service.Icon = "/uploads/services/" + uniqueFileName;
                }

                service.IsActive = true;
                _context.Services.Add(service);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(service);
        }

        public async Task<IActionResult> Edit(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null)
                return NotFound();

            return View(service);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, Service service, IFormFile icon)
        {
            if (id != service.ServiceId)
                return NotFound();

            if (ModelState.IsValid)
            {
                try
                {
                    var existingService = await _context.Services.FindAsync(id);
                    if (existingService == null)
                        return NotFound();

                    if (icon != null)
                    {
                        var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "services");
                        if (!Directory.Exists(uploadsFolder))
                            Directory.CreateDirectory(uploadsFolder);

                        // Eski ikonu sil
                        if (!string.IsNullOrEmpty(existingService.Icon))
                        {
                            var oldIconPath = Path.Combine(_env.WebRootPath, existingService.Icon.TrimStart('/'));
                            if (System.IO.File.Exists(oldIconPath))
                                System.IO.File.Delete(oldIconPath);
                        }

                        var uniqueFileName = Guid.NewGuid().ToString() + "_" + icon.FileName;
                        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await icon.CopyToAsync(fileStream);
                        }

                        existingService.Icon = "/uploads/services/" + uniqueFileName;
                    }

                    existingService.ServiceName = service.ServiceName;
                    existingService.Description = service.Description;
                    existingService.OrderNo = service.OrderNo;
                    existingService.IsActive = service.IsActive;

                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ServiceExists(service.ServiceId))
                        return NotFound();
                    else
                        throw;
                }
            }
            return View(service);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null)
                return Json(new { success = false, message = "Hizmet bulunamadı." });

            try
            {
                // İkonu sil
                if (!string.IsNullOrEmpty(service.Icon))
                {
                    var iconPath = Path.Combine(_env.WebRootPath, service.Icon.TrimStart('/'));
                    if (System.IO.File.Exists(iconPath))
                        System.IO.File.Delete(iconPath);
                }

                _context.Services.Remove(service);
                await _context.SaveChangesAsync();
                return Json(new { success = true });
            }
            catch (Exception)
            {
                return Json(new { success = false, message = "Silme işlemi sırasında bir hata oluştu." });
            }
        }

        private bool ServiceExists(int id)
        {
            return _context.Services.Any(e => e.ServiceId == id);
        }
    }
}