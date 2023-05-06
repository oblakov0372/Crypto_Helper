using Contracts;
using Data.Context;
using Data.Entities;

namespace Repository
{
    public class PortfolioRepository:GenericRepository<PortfolioEntity>,IPortfolioRepository
    {
        public PortfolioRepository(ProjectDBContext context) : base(context) { 
        }
    }
}
