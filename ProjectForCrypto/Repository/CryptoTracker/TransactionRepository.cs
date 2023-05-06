using Contracts.CryptoTracker;
using Data.Context;
using Data.Entities.CryptoTracker;

namespace Repository.CryptoTracker
{
    public class TransactionRepository : GenericRepository<TransactionEntity>, ITransactionRepository
    {
        public TransactionRepository(ProjectDBContext context) : base(context)
        {
        }
    }
}
