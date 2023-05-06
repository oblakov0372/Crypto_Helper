
using Contracts.CryptoTracker;
using Data.Context;
using Data.Entities.CryptoTracker;

namespace Repository.CryptoTracker
{
    public class PortfolioTokenRepository : GenericRepository<PortfolioTokenEntity>, IPortfolioTokenRepository
    {
        public PortfolioTokenRepository(ProjectDBContext context) : base(context)
        {
        }
    }
}
