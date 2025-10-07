using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MyWebSite.Admin.Core.Entities;
using MyWebSite.Admin.Infrastructure.Configuration;

namespace MyWebSite.Admin.Infrastructure.Data
{
    public class AppDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        private readonly AdminConfiguration _adminConfig;
        private readonly YouTubeConfiguration _youtubeConfig;

        public AppDbContext(DbContextOptions<AppDbContext> options, 
            IOptions<AdminConfiguration> adminConfig,
            IOptions<YouTubeConfiguration> youtubeConfig) : base(options)
        {
            _adminConfig = adminConfig.Value;
            _youtubeConfig = youtubeConfig.Value;
        }

        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<YouTubeVideo> YouTubeVideos { get; set; }
        public DbSet<SiteSettings> SiteSettings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(warnings => warnings.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.PendingModelChangesWarning));
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.UserName).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
            });

            // BlogPost configuration
            modelBuilder.Entity<BlogPost>(entity =>
            {
                entity.HasIndex(e => e.Slug).IsUnique();
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
                    UserName = _adminConfig.Username,
                    Email = _adminConfig.Email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(_adminConfig.Password),
                    FirstName = _adminConfig.FirstName,
                    LastName = _adminConfig.LastName,
                    Role = _adminConfig.Role,
                    CreatedAt = new DateTime(2025, 1, 1),
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
                    CreatedAt = new DateTime(2025, 1, 1),
                    IsActive = true
                },
                new SiteSettings
                {
                    Id = 2,
                    Key = "YouTubeChannelId",
                    Value = _youtubeConfig.ChannelId,
                    Description = "YouTube kanal ID'si",
                    Type = "String",
                    CreatedAt = new DateTime(2025, 1, 1),
                    IsActive = true
                },
                new SiteSettings
                {
                    Id = 3,
                    Key = "YouTubeApiKey",
                    Value = _youtubeConfig.ApiKey,
                    Description = "YouTube API anahtarı",
                    Type = "String",
                    CreatedAt = new DateTime(2025, 1, 1),
                    IsActive = true
                }
            );
        }
    }
}
