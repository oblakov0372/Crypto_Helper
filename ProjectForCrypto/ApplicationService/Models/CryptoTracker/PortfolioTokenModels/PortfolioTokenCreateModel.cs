
using System.ComponentModel.DataAnnotations;

namespace ApplicationService.Models.CryptoTracker.PortfolioTokenModels
{
    public class PortfolioTokenCreateModel
    {
        [Required]
        public string CoinSymbol { get; set; } = string.Empty;
        [Required]
        public decimal? Count { get; set; }
        [Required]
        public int PortfolioId { get; set; }
    }
}
