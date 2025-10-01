using System.ComponentModel.DataAnnotations;

namespace MyWebSite.Admin.Core.Entities
{
    public class BlogPost : BaseEntity
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Content { get; set; } = string.Empty;
        
        [MaxLength(500)]
        public string? Summary { get; set; }
        
        [MaxLength(200)]
        public string? Slug { get; set; }
        
        [MaxLength(500)]
        public string? FeaturedImageUrl { get; set; }
        
        [MaxLength(100)]
        public string? Category { get; set; }
        
        public List<string> Tags { get; set; } = new();
        
        public bool IsPublished { get; set; } = false;
        
        public DateTime? PublishedAt { get; set; }
        
        public int ViewCount { get; set; } = 0;
        
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
