using Microsoft.EntityFrameworkCore;
using MyWebsite.DAL.Entities;

namespace MyWebsite.DAL.Context
{
    public class MyWebsiteContext:DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=DESKTOP-21A7SAV;initial Catalog=MyWebsite; integrated security=True;TrustServerCertificate=True;");
        }

        public DbSet<About> Abouts { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Portfolio> Portfolio { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<SocialMedia> SocialMedias { get; set; }
    }
}
