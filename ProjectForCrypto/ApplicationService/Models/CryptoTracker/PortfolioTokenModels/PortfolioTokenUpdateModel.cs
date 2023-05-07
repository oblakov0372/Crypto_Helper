using System.ComponentModel.DataAnnotations;

namespace ApplicationService.Models.CryptoTracker.PortfolioTokenModels
{
    public class PortfolioTokenUpdateModel
    {
        [Required]
        public int Id { get; set; }
        public string CoinSymbol { get; set; } = string.Empty;
        public decimal? Count { get; set; }
    }
}
