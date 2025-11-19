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

        public int ViewCount { get; set; }

        public int LikeCount { get; set; }

        public int CommentCount { get; set; }

        [MaxLength(100)]
        public string? Duration { get; set; }

        [MaxLength(100)]
        public string? Category { get; set; }

        public List<string> Tags { get; set; } = new();

        public bool IsFeatured { get; set; } = false;

        public int SortOrder { get; set; } = 0;
    }
}
