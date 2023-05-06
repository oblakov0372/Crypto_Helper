using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities.CryptoTracker
{
    public class PortfolioEntity : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public UserEntity User { get; set; }
    }
}
