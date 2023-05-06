
namespace ApplicationService.DTOs
{
    public class TradeFutureDto
    {
        public int Id { get; set; }
        public string CoinName { get; set; } = string.Empty;
        public decimal PositionSize { get; set; }
        public decimal Risk { get; set; }
        public decimal Reward { get; set; }
        public decimal EarnedMoney { get; set; }
        public string TradingViewImgLink { get; set; } = string.Empty;
    }
}
