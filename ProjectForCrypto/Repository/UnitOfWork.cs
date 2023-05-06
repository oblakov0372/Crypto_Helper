using Contracts;
using Contracts.CryptoTracker;
using Data.Context;
using Repository.CryptoTracker;

namespace Repository
{
    public class UnitOfWork:IUnitOfWork
    {
        private readonly ProjectDBContext _context;
        public UnitOfWork (ProjectDBContext context)
        {
            _context = context;
            TradeFutures = new TradeFutureRepository(_context);
            Users = new UserRepository(_context);
            Portfolios = new PortfolioRepository(_context);
            Transactions = new TransactionRepository(_context);
            PortfolioTokens = new PortfolioTokenRepository(_context);
        }
        public ITradeFutureRepository TradeFutures { get; private set; }
        public IUserRepository Users { get; private set; }
        public IPortfolioRepository Portfolios { get; private set; }
        public ITransactionRepository Transactions { get; private set; }
        public IPortfolioTokenRepository PortfolioTokens { get; private set; }
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
