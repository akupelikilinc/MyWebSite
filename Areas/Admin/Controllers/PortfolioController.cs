using Microsoft.AspNetCore.Mvc;
using MyWebsite.DAL.Context;
using MyWebsite.DAL.Entities;
using MyWebsite.Areas.Admin.Filters;
using Microsoft.EntityFrameworkCore;

namespace MyWebsite.Areas.Admin.Controllers
{
    [Area("Admin")]
    [AdminAuth]
    public class PortfolioController : Controller
    {
        private readonly MyWebsiteContext _context;
        private readonly IWebHostEnvironment _env;

        public PortfolioController(MyWebsiteContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<IActionResult> Index()
        {
            var portfolios = await _context.Portfolios
                .OrderByDescending(x => x.Date)
                .ToListAsync();
            return View(portfolios);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Portfolio portfolio, IFormFile image)
        {
            if (ModelState.IsValid)
            {
                if (image != null)
                {
                    var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "portfolio");
                    if (!Directory.Exists(uploadsFolder))
                        Directory.CreateDirectory(uploadsFolder);

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(fileStream);
                    }

                    portfolio.Image = "/uploads/portfolio/" + uniqueFileName;
                }

                portfolio.Date = DateTime.Now;
                portfolio.Status = true;

                _context.Portfolios.Add(portfolio);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(portfolio);
        }

        public async Task<IActionResult> Edit(int id)
        {
            var portfolio = await _context.Portfolios.FindAsync(id);
            if (portfolio == null)
                return NotFound();

            return View(portfolio);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, Portfolio portfolio, IFormFile image)
        {
            if (id != portfolio.PortfolioId)
                return NotFound();

            if (ModelState.IsValid)
            {
                try
                {
                    var existingPortfolio = await _context.Portfolios.FindAsync(id);
                    if (existingPortfolio == null)
                        return NotFound();

                    if (image != null)
                    {
                        var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "portfolio");
                        if (!Directory.Exists(uploadsFolder))
                            Directory.CreateDirectory(uploadsFolder);

                        // Eski resmi sil
                        if (!string.IsNullOrEmpty(existingPortfolio.Image))
                        {
                            var oldImagePath = Path.Combine(_env.WebRootPath, existingPortfolio.Image.TrimStart('/'));
                            if (System.IO.File.Exists(oldImagePath))
                                System.IO.File.Delete(oldImagePath);
                        }

                        var uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
                        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(fileStream);
                        }

                        existingPortfolio.Image = "/uploads/portfolio/" + uniqueFileName;
                    }

                    existingPortfolio.Title = portfolio.Title;
                    existingPortfolio.Description = portfolio.Description;
                    existingPortfolio.Url = portfolio.Url;
                    existingPortfolio.Technology = portfolio.Technology;
                    existingPortfolio.Type = portfolio.Type;
                    existingPortfolio.Status = portfolio.Status;

                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PortfolioExists(portfolio.PortfolioId))
                        return NotFound();
                    else
                        throw;
                }
            }
            return View(portfolio);
        }

        private bool PortfolioExists(int id)
        {
            return _context.Portfolios.Any(e => e.PortfolioId == id);
        }
    }
}