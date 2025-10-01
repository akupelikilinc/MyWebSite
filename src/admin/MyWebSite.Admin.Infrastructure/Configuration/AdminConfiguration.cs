using System;

namespace MyWebSite.Admin.Infrastructure.Configuration
{
    public class AdminConfiguration
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Role { get; set; }
    }

    public class YouTubeConfiguration
    {
        public required string ChannelId { get; set; }
        public required string ApiKey { get; set; }
    }
}