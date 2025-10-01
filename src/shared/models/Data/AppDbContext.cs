using Microsoft.EntityFrameworkCore;
using MyWebSite.Admin.Core.Entities;

namespace MyWebSite.Admin.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<YouTubeVideo> YouTubeVideos { get; set; }
        public DbSet<SiteSettings> SiteSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Username).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
            });

            // BlogPost configuration
            modelBuilder.Entity<BlogPost>(entity =>
            {
                entity.HasIndex(e => e.Slug).IsUnique();
                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Project configuration
            modelBuilder.Entity<Project>(entity =>
            {
                entity.HasIndex(e => e.Name);
                entity.HasIndex(e => e.Category);
            });

            // YouTubeVideo configuration
            modelBuilder.Entity<YouTubeVideo>(entity =>
            {
                entity.HasIndex(e => e.VideoId).IsUnique();
                entity.HasIndex(e => e.PublishedAt);
            });

            // SiteSettings configuration
            modelBuilder.Entity<SiteSettings>(entity =>
            {
                entity.HasIndex(e => e.Key).IsUnique();
            });

            // Seed data
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Admin user
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    Email = "admin@mywebsite.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                    FirstName = "Admin",
                    LastName = "User",
                    Role = "SuperAdmin",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                }
            );

            // Site settings
            modelBuilder.Entity<SiteSettings>().HasData(
                new SiteSettings
                {
                    Id = 1,
                    Key = "SiteTitle",
                    Value = "Ahmet KÜPELİKILINÇ - Yazılım Geliştirici",
                    Description = "Site başlığı",
                    Type = "String",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                },
                new SiteSettings
                {
                    Id = 2,
                    Key = "YouTubeChannelId",
                    Value = "UCDOQkn4DWRdpjoC-obymdHA",
                    Description = "YouTube kanal ID'si",
                    Type = "String",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                },
                new SiteSettings
                {
                    Id = 3,
                    Key = "YouTubeApiKey",
                    Value = "AIzaSyDnq-5Gr4CRtyPPTvAVSqKoZ_676Ttku8Q",
                    Description = "YouTube API anahtarı",
                    Type = "String",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                }
            );
        }
    }
}
