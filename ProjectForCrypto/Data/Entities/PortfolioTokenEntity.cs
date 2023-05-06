
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities
{
    public class PortfolioTokenEntity : BaseEntity
    {
        public string TokenSymbol { get; set; } = string.Empty;
        public decimal? Count { get; set; }
        public int PordfolioId { get; set; }
        [ForeignKey(nameof(PordfolioId))]
        public PortfolioEntity Portfolio { get; set; }
    }
}
