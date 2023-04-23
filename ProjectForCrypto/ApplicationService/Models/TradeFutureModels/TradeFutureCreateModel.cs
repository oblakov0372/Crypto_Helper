using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationService.Models.TradeFutureModels
{
    public class TradeFutureCreateModel
    {
        [Required]
        public string CoinName { get; set; } = string.Empty;
        [Required]
        public decimal PositionSize { get; set; }
        public decimal StopLossPercent { get; set; }
        public decimal TakeProffitPercent { get; set; }
        public decimal EarnedMoney { get; set; }
        [Required]
        public string TradingViewImglink { get; set; } = string.Empty;
    }
}
