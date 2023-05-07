
namespace ApplicationService.DTOs.CryptoTracker
{
    public class PortfolioTokenDto
    {
        public int Id { get; set; }
        public string CoinSymbol { get; set; } = string.Empty;
        public decimal? Count { get; set; }
    }
}
