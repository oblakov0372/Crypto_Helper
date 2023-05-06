using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities
{
    public enum TransactionType
    {
        sell,
        buy
    }
    public class TrasnactionEntity:BaseEntity
    {
        public string CoinSymbol { get; set; } = string.Empty;
        public TransactionType TransactionType { get; set; }
        public decimal? Count { get; set; }
        public decimal? Price { get; set; }
        public int PortfolioId { get; set; }
        [ForeignKey(nameof(PortfolioId))]
        public PortfolioEntity Portfolio { get; set; }
    }
}
