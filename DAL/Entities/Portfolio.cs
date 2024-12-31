using System.ComponentModel.DataAnnotations;

namespace MyWebsite.DAL.Entities
{
    public class Portfolio
    {
        [Key]
        public int PortfolioId { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [StringLength(200)]
        public string Image { get; set; }

        [StringLength(200)]
        public string? Url { get; set; }

        public string? Technology { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public bool Status { get; set; } = true;
        public string Type { get; set; } // Website, Mobile App, Game
    }
}
