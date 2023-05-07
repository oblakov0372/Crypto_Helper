using ApplicationService.DTOs.CryptoTracker;
using ApplicationService.implementations.CryptoTracker.PortfolioTokenManagement;
using ApplicationService.Models.CryptoTracker.PortfolioTokenModels;
using ApplicationService.Models.CryptoTracker.TransactionModels;
using Contracts;
using Data.Entities.CryptoTracker;

namespace ApplicationService.implementations.CryptoTracker.TransactionManagement
{
    public class TransactionManagementService : ITransactionManagementService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPortfolioTokenManagementService _portfolioTokenManagementService;
        public TransactionManagementService(IUnitOfWork unitOfWork,
                                            IPortfolioTokenManagementService portfolioTokenManagementService) 
        {
            _unitOfWork = unitOfWork;
            _portfolioTokenManagementService = portfolioTokenManagementService;
        }

        public async Task<List<TransactionDto>> GetTransactionsAsync(int userId)
        {
            List<TransactionDto> transactions = new List<TransactionDto>();
            foreach (var transaction in _unitOfWork.Transactions.FindAsync(p => p.UserId == userId))
            {
                transactions.Add(new TransactionDto
                {
                    Id = transaction.Id,
                    CoinSymbol = transaction.CoinSymbol,
                    Count = transaction.Count,
                    Price = transaction.Price,
                    TransactionType = transaction.TransactionType
                });
            }
            return transactions;
        }
        public async Task<List<TransactionDto>> GetTransactionsByPortfolioAsync(int portfolioId)
        {
            List<TransactionDto> transactions = new List<TransactionDto>();
            foreach (var transaction in _unitOfWork.Transactions.FindAsync(p => p.PortfolioId == portfolioId))
            {
                transactions.Add(new TransactionDto
                {
                    Id = transaction.Id,
                    CoinSymbol = transaction.CoinSymbol,
                    Count = transaction.Count,
                    Price = transaction.Price,
                    TransactionType = transaction.TransactionType
                });
            }
            return transactions;
        }
        public async Task<bool> CreateTransactionAsync(TransactionCreateModel model, int userId)
        {
            PortfolioTokenEntity portfolioToken = _portfolioTokenManagementService
                                                  .GetPortfolioTokenByUserIdCoinSymbolAndPortfolioId(userId, model.CoinSymbol,model.PortfolioId);
            if (portfolioToken == null)
            {
                await _portfolioTokenManagementService.CreatePortfolioTokenAsync(new PortfolioTokenCreateModel
                {
                    CoinSymbol = model.CoinSymbol,
                    Count = model.Count,
                    PortfolioId = model.PortfolioId
                },userId);
            }
            else
            {
                await _portfolioTokenManagementService.UpdatePortfolioTokenAsync(new PortfolioTokenUpdateModel
                {
                    Id = portfolioToken.Id,
                    CoinSymbol = model.CoinSymbol,
                    Count = portfolioToken.Count + model.Count
                },userId);
            }
            TransactionEntity transaction = new TransactionEntity()
            {
                UserId = userId,
                CoinSymbol = model.CoinSymbol,
                PortfolioId = model.PortfolioId,
                Price = model.Price,
                TransactionType = model.TransactionType,
                Count= model.Count,
                CreatedOn = DateTime.Now,
                CreatedBy = userId
            };
            try
            {
                await _unitOfWork.Transactions.AddAsync(transaction);
                await _unitOfWork.SaveAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> UpdateTrasnactionAsync(TransactionUpdateModel model, int userId)
        {
            TransactionEntity transactionForChange = await _unitOfWork.Transactions.GetByIdAsync(model.Id);
            if (transactionForChange == null)
                return false;
            transactionForChange.CoinSymbol = model.CoinSymbol;
            transactionForChange.Count = model.Count;
            transactionForChange.Price = model.Price;
            transactionForChange.TransactionType = model.TransactionType;
            transactionForChange.UpdatedOn = DateTime.Now;
            transactionForChange.UpdateBy = userId;
            try
            {
                _unitOfWork.Transactions.Update(transactionForChange);
                await _unitOfWork.SaveAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> DeleteTrasnactionAsync(int transactionId)
        {
            try
            {
                var transaction = new TransactionEntity{ Id = transactionId};
                _unitOfWork.Transactions.Remove(transaction);
                await _unitOfWork.SaveAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
