using System.ComponentModel.DataAnnotations;

namespace MyWebSite.Admin.Core.Entities
{
    public class User : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Username { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(200)]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string? FirstName { get; set; }
        
        [MaxLength(100)]
        public string? LastName { get; set; }
        
        [MaxLength(20)]
        public string Role { get; set; } = "Admin";
        
        public DateTime? LastLoginAt { get; set; }
        
        public string? ProfileImageUrl { get; set; }
    }
}
