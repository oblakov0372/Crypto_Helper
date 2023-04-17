using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CryptoCollector.API.Models
{
    public class CryptoModel
    {
        public int CmcRank { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal MarketCap { get; set; }
        public decimal PercentChange24H { get; set; }
        public decimal VolumeChange24H { get; set; }
    }
}
