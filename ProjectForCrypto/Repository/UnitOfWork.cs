using Contracts;
using Data.Context;

namespace Repository
{
    public class UnitOfWork:IUnitOfWork
    {
        private readonly ProjectDBContext _context;
        public UnitOfWork (ProjectDBContext context)
        {
            _context = context;
            TradeFutures = new TradeFutureRepository(_context);
        }
        public ITradeFutureRepository TradeFutures { get; private set; }


        public async Task SaveAsync()
        {
           await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
