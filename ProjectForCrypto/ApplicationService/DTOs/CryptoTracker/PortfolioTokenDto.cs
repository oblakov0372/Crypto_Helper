
namespace ApplicationService.DTOs.CryptoTracker
{
    public class PortfolioTokenDto
    {
        public int Id { get; set; }
        public int PortfolioId { get; set; }
        public string CoinSymbol { get; set; } = string.Empty;
        public string CoinName { get; set; } = string.Empty;
        public decimal? Price { get; set; }
        public decimal? PercentChange24H { get; set; }
        public decimal? Count { get; set; }
        public decimal? CountDollars { get; set; }
    }
}
