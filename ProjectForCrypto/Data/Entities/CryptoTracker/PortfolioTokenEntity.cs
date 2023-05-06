
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities.CryptoTracker
{
    public class PortfolioTokenEntity : BaseEntity
    {
        public string TokenSymbol { get; set; } = string.Empty;
        public decimal? Count { get; set; }
        public int PordfolioId { get; set; }
        [ForeignKey(nameof(PordfolioId))]
        public PortfolioEntity Portfolio { get; set; }
        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public UserEntity User { get; set; }
    }
}
