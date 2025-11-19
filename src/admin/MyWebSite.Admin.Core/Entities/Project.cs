using System.ComponentModel.DataAnnotations;

namespace MyWebSite.Admin.Core.Entities
{
    public class Project : BaseEntity
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;
        
        [MaxLength(1000)]
        public string? Description { get; set; }
        
        [MaxLength(500)]
        public string? ImageUrl { get; set; }
        
        [MaxLength(500)]
        [Url]
        public string? LiveUrl { get; set; }
        
        [MaxLength(500)]
        [Url]
        public string? GitHubUrl { get; set; }
        
        [MaxLength(100)]
        public string? Category { get; set; }
        
        public List<string> Technologies { get; set; } = new();
        
        public int SortOrder { get; set; } = 0;
        
        public bool IsFeatured { get; set; } = false;
    }
}
