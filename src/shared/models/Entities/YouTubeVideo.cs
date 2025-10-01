using System.ComponentModel.DataAnnotations;

namespace MyWebSite.Admin.Core.Entities
{
    public class YouTubeVideo : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string VideoId { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [MaxLength(1000)]
        public string? Description { get; set; }
        
        [MaxLength(500)]
        public string? ThumbnailUrl { get; set; }
        
        public DateTime PublishedAt { get; set; }
        
        public int ViewCount { get; set; } = 0;
        
        public int LikeCount { get; set; } = 0;
        
        public int Duration { get; set; } = 0; // saniye cinsinden
        
        [MaxLength(100)]
        public string? Category { get; set; }
        
        public bool IsActive { get; set; } = true;
    }
}
