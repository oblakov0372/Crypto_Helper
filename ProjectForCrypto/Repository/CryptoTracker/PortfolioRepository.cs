using Contracts.CryptoTracker;
using Data.Context;
using Data.Entities.CryptoTracker;

namespace Repository.CryptoTracker
{
    public class PortfolioRepository : GenericRepository<PortfolioEntity>, IPortfolioRepository
    {
        public PortfolioRepository(ProjectDBContext context) : base(context)
        {
        }
    }
}
