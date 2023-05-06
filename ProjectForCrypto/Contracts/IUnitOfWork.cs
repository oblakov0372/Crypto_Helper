
namespace Contracts
{
    public interface IUnitOfWork: IDisposable
    {
        ITradeFutureRepository TradeFutures { get; }
        IUserRepository Users { get; }
        IPortfolioRepository Portfolios { get; }
        Task SaveAsync();
    }
}
