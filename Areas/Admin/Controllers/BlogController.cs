using Microsoft.AspNetCore.Mvc;
using MyWebsite.DAL.Context;
using MyWebsite.DAL.Entities;
using MyWebsite.Areas.Admin.Filters;
using Microsoft.EntityFrameworkCore;

namespace MyWebsite.Areas.Admin.Controllers
{
    [Area("Admin")]
    [AdminAuth]
    public class BlogController : Controller
    {
        private readonly MyWebsiteContext _context;
        private readonly IWebHostEnvironment _env;

        public BlogController(MyWebsiteContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<IActionResult> Index()
        {
            var blogs = await _context.Blogs
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
            return View(blogs);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Blog blog, IFormFile image)
        {
            if (ModelState.IsValid)
            {
                if (image != null)
                {
                    var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "blogs");
                    if (!Directory.Exists(uploadsFolder))
                        Directory.CreateDirectory(uploadsFolder);

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(fileStream);
                    }

                    blog.ImagePath = "/uploads/blogs/" + uniqueFileName;
                }

                blog.CreatedAt = DateTime.Now;
                blog.Slug = blog.Title.ToLower().Replace(" ", "-");
                _context.Blogs.Add(blog);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(blog);
        }

        public async Task<IActionResult> Edit(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
                return NotFound();

            return View(blog);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, Blog blog, IFormFile image)
        {
            if (id != blog.BlogId)
                return NotFound();

            if (ModelState.IsValid)
            {
                try
                {
                    var existingBlog = await _context.Blogs.FindAsync(id);
                    if (existingBlog == null)
                        return NotFound();

                    if (image != null)
                    {
                        var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "blogs");
                        if (!Directory.Exists(uploadsFolder))
                            Directory.CreateDirectory(uploadsFolder);

                        // Eski resmi sil
                        if (!string.IsNullOrEmpty(existingBlog.ImagePath))
                        {
                            var oldImagePath = Path.Combine(_env.WebRootPath, existingBlog.ImagePath.TrimStart('/'));
                            if (System.IO.File.Exists(oldImagePath))
                                System.IO.File.Delete(oldImagePath);
                        }

                        var uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
                        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(fileStream);
                        }

                        existingBlog.ImagePath = "/uploads/blogs/" + uniqueFileName;
                    }

                    existingBlog.Title = blog.Title;
                    existingBlog.Content = blog.Content;
                    existingBlog.Summary = blog.Summary;
                    existingBlog.Tags = blog.Tags;
                    existingBlog.IsActive = blog.IsActive;
                    existingBlog.Slug = blog.Title.ToLower().Replace(" ", "-");

                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BlogExists(blog.BlogId))
                        return NotFound();
                    else
                        throw;
                }
            }
            return View(blog);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
                return Json(new { success = false, message = "Blog yazısı bulunamadı." });

            try
            {
                // Resmi sil
                if (!string.IsNullOrEmpty(blog.ImagePath))
                {
                    var imagePath = Path.Combine(_env.WebRootPath, blog.ImagePath.TrimStart('/'));
                    if (System.IO.File.Exists(imagePath))
                        System.IO.File.Delete(imagePath);
                }

                _context.Blogs.Remove(blog);
                await _context.SaveChangesAsync();
                return Json(new { success = true });
            }
            catch (Exception)
            {
                return Json(new { success = false, message = "Silme işlemi sırasında bir hata oluştu." });
            }
        }

        private bool BlogExists(int id)
        {
            return _context.Blogs.Any(e => e.BlogId == id);
        }
    }
}