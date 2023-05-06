using System.ComponentModel.DataAnnotations;

namespace ApplicationService.Models.CryptoTracker.PortfolioModels
{
    public class PortfolioCreateModel
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
