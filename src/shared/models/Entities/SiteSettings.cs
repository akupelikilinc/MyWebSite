using System.ComponentModel.DataAnnotations;

namespace MyWebSite.Admin.Core.Entities
{
    public class SiteSettings : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Key { get; set; } = string.Empty;
        
        [MaxLength(1000)]
        public string? Value { get; set; }
        
        [MaxLength(200)]
        public string? Description { get; set; }
        
        [MaxLength(50)]
        public string? Type { get; set; } = "String"; // String, Number, Boolean, JSON
    }
}
