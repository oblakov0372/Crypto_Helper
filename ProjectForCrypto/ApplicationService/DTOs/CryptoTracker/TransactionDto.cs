using Data.Entities.CryptoTracker;

namespace ApplicationService.DTOs.CryptoTracker
{
    public class TransactionDto
    {
        public int Id { get; set; }
        public string CoinSymbol { get; set; } = string.Empty;
        public TransactionType TransactionType { get; set; }
        public decimal? Count { get; set; }
        public decimal? Price { get; set; }
    }
}
