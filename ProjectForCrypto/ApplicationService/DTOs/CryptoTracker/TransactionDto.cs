
namespace ApplicationService.DTOs.CryptoTracker
{
    public class TransactionDto
    {
        public int Id { get; set; }
        public int PortfolioId { get; set; }
        public string CoinSymbol { get; set; } = string.Empty;
        public decimal? Count { get; set; }
        public decimal? Price { get; set; }
    }
}
