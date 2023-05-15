using Data.Entities.CryptoTracker;
using System.ComponentModel.DataAnnotations;

namespace ApplicationService.Models.CryptoTracker.TransactionModels
{
    public class TransactionUpdateModel
    {
        [Required]
        public int Id { get; set; }
        public string CoinSymbol { get; set; } = string.Empty;
        public decimal? Count { get; set; }
        public decimal? Price { get; set; }
        public int PortfolioId { get; set; }

    }
}
