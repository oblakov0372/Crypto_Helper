using Data.Entities.CryptoTracker;
using System.ComponentModel.DataAnnotations;

namespace ApplicationService.Models.CryptoTracker.TransactionModels
{
    public class TransactionCreateModel
    {
        [Required]
        public string CoinSymbol { get; set; } = string.Empty;
        [Required]
        public decimal? Count { get; set; }
        [Required]
        public decimal? Price { get; set; }
        [Required]
        public int PortfolioId { get; set; }
    }
}
