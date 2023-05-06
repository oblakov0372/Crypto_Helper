
using Contracts.CryptoTracker;
using Data.Context;

namespace Repository.CryptoTracker
{
    public class PortfolioTokenRepository : GenericRepository<PortfolioTokenRepository>, IPortfolioTokenRepository
    {
        public PortfolioTokenRepository(ProjectDBContext context) : base(context)
        {
        }
    }
}
