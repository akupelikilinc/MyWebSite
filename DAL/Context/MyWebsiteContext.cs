using Microsoft.EntityFrameworkCore;
using MyWebsite.DAL.Entities;

namespace MyWebsite.DAL.Context
{
    public class MyWebsiteContext : DbContext
    {
        public MyWebsiteContext(DbContextOptions<MyWebsiteContext> options) : base(options)
        {
        }

        public DbSet<About> Abouts { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<SocialMedia> SocialMedias { get; set; }
        public DbSet<Blog> Blogs { get; set; }
    }
}
