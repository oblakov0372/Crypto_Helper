using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationService.DTOs
{
    public class TradeFutureDto
    {
        public int Id { get; set; }
        public string CoinName { get; set; } = string.Empty;
        public decimal PositionSize { get; set; }
        public decimal StopLossPercent { get; set; }
        public decimal TakeProffitPercent { get; set; }
        public decimal EarnedMoney { get; set; }
        public string TradingViewImglink { get; set; } = string.Empty;
    }
}
