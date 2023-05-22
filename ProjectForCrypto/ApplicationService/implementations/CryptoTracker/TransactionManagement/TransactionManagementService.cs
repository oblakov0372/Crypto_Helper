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
                    PortfolioId = transaction.PortfolioId,
                    CoinSymbol = transaction.CoinSymbol,
                    Count = transaction.Count,
                    Price = transaction.Price,
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
                    PortfolioId = transaction.PortfolioId,
                    CoinSymbol = transaction.CoinSymbol,
                    Count = transaction.Count,
                    Price = transaction.Price,
                });
            }
            return transactions;
        }
        public async Task<TransactionDto> CreateTransactionAsync(TransactionCreateModel model, int userId)
        {
            PortfolioTokenEntity portfolioToken = _portfolioTokenManagementService
                                                  .GetPortfolioTokenByUserIdCoinSymbolAndPortfolioId(userId, model.CoinSymbol, model.PortfolioId);
            if (portfolioToken == null)
            {
                await _portfolioTokenManagementService.CreatePortfolioTokenAsync(new PortfolioTokenCreateModel
                {
                    CoinSymbol = model.CoinSymbol,
                    Count = model.Count,
                    PortfolioId = model.PortfolioId
                }, userId);
            }
            else
            {
                await _portfolioTokenManagementService.UpdatePortfolioTokenAsync(new PortfolioTokenUpdateModel
                {
                    Id = portfolioToken.Id,
                    CoinSymbol = model.CoinSymbol,
                    Count = portfolioToken.Count + model.Count
                }, userId);
            }
            TransactionEntity transaction = new TransactionEntity()
            {
                UserId = userId,
                CoinSymbol = model.CoinSymbol,
                PortfolioId = model.PortfolioId,
                Price = model.Price,
                Count = model.Count,
                CreatedOn = DateTime.Now,
                CreatedBy = userId
            };
            try
            {
                await _unitOfWork.Transactions.AddAsync(transaction);
                await _unitOfWork.SaveAsync();
                TransactionDto transactionDto = new TransactionDto()
                {
                    Id = transaction.Id,
                    CoinSymbol = transaction.CoinSymbol,
                    Price = transaction.Price,
                    PortfolioId = transaction.PortfolioId,
                    Count = transaction.Count
                };
                return transactionDto;
            }
            catch
            {
                return null;
            }
        }
        public async Task<bool> UpdateTrasnactionAsync(TransactionUpdateModel model, int userId)
        {
            TransactionEntity transactionForChange = await _unitOfWork.Transactions.GetByIdAsync(model.Id);
            if (transactionForChange == null)
                return false;


            PortfolioTokenEntity portfolioToken = _portfolioTokenManagementService
                                                 .GetPortfolioTokenByUserIdCoinSymbolAndPortfolioId(userId, model.CoinSymbol, model.PortfolioId);

            if (portfolioToken == null)
            {
                await _portfolioTokenManagementService.CreatePortfolioTokenAsync(new PortfolioTokenCreateModel
                {
                    CoinSymbol = model.CoinSymbol,
                    Count = model.Count,
                    PortfolioId = model.PortfolioId
                }, userId);
                if (transactionForChange.CoinSymbol != model.CoinSymbol)
                {
                    PortfolioTokenEntity oldPortfolioToken = _portfolioTokenManagementService
                                                 .GetPortfolioTokenByUserIdCoinSymbolAndPortfolioId(userId, transactionForChange.CoinSymbol, model.PortfolioId);

                    await _portfolioTokenManagementService.UpdatePortfolioTokenAsync(new PortfolioTokenUpdateModel
                    {
                        Id = oldPortfolioToken.Id,
                        CoinSymbol = oldPortfolioToken.CoinSymbol,
                        Count = oldPortfolioToken.Count - transactionForChange.Count,
                    }, userId);
                }
            }
            else
            {
                await _portfolioTokenManagementService.UpdatePortfolioTokenAsync(new PortfolioTokenUpdateModel
                {
                    Id = portfolioToken.Id,
                    CoinSymbol = model.CoinSymbol,
                    Count = portfolioToken.Count + model.Count
                }, userId);

                PortfolioTokenEntity oldPortfolioToken = _portfolioTokenManagementService
                                                 .GetPortfolioTokenByUserIdCoinSymbolAndPortfolioId(userId, transactionForChange.CoinSymbol, model.PortfolioId);
                await _portfolioTokenManagementService.UpdatePortfolioTokenAsync(new PortfolioTokenUpdateModel
                {
                    Id = oldPortfolioToken.Id,
                    CoinSymbol = oldPortfolioToken.CoinSymbol,
                    Count = oldPortfolioToken.Count - transactionForChange.Count
                }, userId);
            }

            transactionForChange.CoinSymbol = model.CoinSymbol;
            transactionForChange.Count = model.Count;
            transactionForChange.Price = model.Price;
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
            TransactionEntity transaction = await _unitOfWork.Transactions.GetByIdAsync(transactionId);

            PortfolioTokenEntity portfolioToken = _portfolioTokenManagementService
                                                .GetPortfolioTokenByUserIdCoinSymbolAndPortfolioId(transaction.UserId, transaction.CoinSymbol, transaction.PortfolioId);


            await _portfolioTokenManagementService.UpdatePortfolioTokenAsync(new PortfolioTokenUpdateModel
            {
                Id = portfolioToken.Id,
                CoinSymbol = transaction.CoinSymbol,
                Count = portfolioToken.Count - transaction.Count
            }, transaction.UserId);

            try
            {
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
