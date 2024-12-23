using Microsoft.AspNetCore.Mvc;
using MyWebsite.DAL.Context;
using MyWebsite.DAL.Entities;

namespace MyWebsite.Controllers.Dashboard
{
    public class DaboutController : Controller
    {
        MyWebsiteContext context = new MyWebsiteContext();

        public IActionResult About()
        {
            // About nesnelerinin listesi
            List<About> aboutList = context.Abouts.ToList();
            return View(aboutList);

        }
        [HttpGet]
        public IActionResult Update(int id)
        {
            About about = context.Abouts.FirstOrDefault(x => x.AboutID == id);
            return View(about);
        }
        [HttpPost]
        public IActionResult Update(About about, IFormFile Image)
        {
            // 1. İlgili kaydı veritabanından getiriyoruz
            
            About updatedAbout = context.Abouts.FirstOrDefault(x => x.AboutID == about.AboutID);
            if (updatedAbout == null)
            {
                return NotFound(); // Eğer kayıt bulunamazsa 404 döndür
            }

            // 2. Gelen diğer verileri güncelliyoruz
            updatedAbout.Name = about.Name;
            updatedAbout.Description = about.Description;
            updatedAbout.Email = about.Email;
            updatedAbout.Phone = about.Phone;

            // 3. Resim dosyası yüklenmişse işlemleri başlatıyoruz
            if (Image != null && Image.Length > 0)
            {
                // Yüklenen dosyanın adını al
                string fileName = Path.GetFileName(Image.FileName);

                // Dosyanın kaydedileceği yolu oluştur
                string savePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload", "Image", "About", fileName);

                // Dosyayı belirtilen dizine kaydet
                using (var stream = new FileStream(savePath, FileMode.Create))
                {
                    Image.CopyTo(stream);
                }

                // Yeni resmin yolunu güncelliyoruz
                updatedAbout.ImageUrl = $"/Upload/Image/About/{fileName}";
            }

            // 4. Güncellenen veriyi veritabanına kaydediyoruz
            context.SaveChanges();

            // 5. Kullanıcıyı About sayfasına yönlendiriyoruz
            return RedirectToAction("About");
        }


        public IActionResult Create(About about)
        {
            context.Abouts.Add(about);
            context.SaveChanges();
            return View(about);


        }

        public IActionResult Delete(int id)
        {

            About about = context.Abouts.FirstOrDefault(x => x.AboutID == id);
            context.Abouts.Remove(about);
            context.SaveChanges();
            return RedirectToAction("About");

        }

    }
}