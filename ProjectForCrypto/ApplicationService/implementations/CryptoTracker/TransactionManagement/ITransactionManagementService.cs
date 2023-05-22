using ApplicationService.DTOs.CryptoTracker;
using ApplicationService.Models.CryptoTracker.PortfolioModels;
using ApplicationService.Models.CryptoTracker.TransactionModels;

namespace ApplicationService.implementations.CryptoTracker.TransactionManagement
{
    public interface ITransactionManagementService
    {
        public Task<List<TransactionDto>> GetTransactionsAsync(int userId);
        public Task<List<TransactionDto>> GetTransactionsByPortfolioAsync(int portfolioId);
        public Task<TransactionDto> CreateTransactionAsync(TransactionCreateModel model, int userId);
        public Task<bool> UpdateTrasnactionAsync(TransactionUpdateModel model, int userId);
        public Task<bool> DeleteTrasnactionAsync(int transactionId);
    }
}
