using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MyWebSite.Admin.Infrastructure.Configuration;

namespace MyWebSite.Admin.Infrastructure.Data
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            var connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("DefaultConnection connection string is missing in appsettings.json");

            optionsBuilder.UseSqlServer(connectionString);

            var adminConfig = new AdminConfiguration
            {
                Username = configuration["AdminConfiguration:Username"] ?? "admin",
                Email = configuration["AdminConfiguration:Email"] ?? "admin@example.com",
                Password = configuration["AdminConfiguration:Password"] ?? "Admin123!",
                FirstName = configuration["AdminConfiguration:FirstName"] ?? "Admin",
                LastName = configuration["AdminConfiguration:LastName"] ?? "User",
                Role = configuration["AdminConfiguration:Role"] ?? "Admin"
            };

            var youtubeConfig = new YouTubeConfiguration
            {
                ApiKey = configuration["YouTubeConfiguration:ApiKey"] ?? "your-youtube-api-key",
                ChannelId = configuration["YouTubeConfiguration:ChannelId"] ?? "your-channel-id"
            };

            var adminOptions = Options.Create(adminConfig);
            var youtubeOptions = Options.Create(youtubeConfig);

            return new AppDbContext(optionsBuilder.Options, adminOptions, youtubeOptions);
        }
    }
}