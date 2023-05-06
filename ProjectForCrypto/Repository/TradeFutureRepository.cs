using Contracts;
using Data.Context;
using Data.Entities;

namespace Repository
{
    public class TradeFutureRepository : GenericRepository<TradeFutureEntity>, ITradeFutureRepository
    {
        public TradeFutureRepository(ProjectDBContext context) : base(context) { }
    }
}
