
using System.ComponentModel.DataAnnotations;

namespace ApplicationService.Models.CryptoTracker.PortfolioModels
{
    public class PortfolioUpdateModel
    {
        [Required]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
