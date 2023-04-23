using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    public class TradeFutureEntity:BaseEntity
    {
        public string CoinName { get; set; } = string.Empty;
        public decimal PositionSize { get; set; }
        public decimal StopLossPercent { get; set; }
        public decimal TakeProfitPercent { get; set; }
        public decimal EarnedMoney { get; set; }
        public string TradingViewImgLink { get; set; } = string.Empty;
        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public UserEntity User { get; set; }

    }
}
