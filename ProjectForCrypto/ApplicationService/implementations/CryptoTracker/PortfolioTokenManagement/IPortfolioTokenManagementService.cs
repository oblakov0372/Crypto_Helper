using ApplicationService.DTOs.CryptoTracker;
using ApplicationService.Models.CryptoTracker.PortfolioTokenModels;
using ApplicationService.Models.CryptoTracker.TransactionModels;
using Data.Entities.CryptoTracker;

namespace ApplicationService.implementations.CryptoTracker.PortfolioTokenManagement
{
    public interface IPortfolioTokenManagementService
    {
        public Task<List<PortfolioTokenDto>> GetPortfolioTokensAsync(int userId);
        public Task<List<PortfolioTokenDto>> GetPortfolioTokensByPortfolioAsync(int portfolioId,int userId);
        public PortfolioTokenEntity GetPortfolioTokenByUserIdCoinSymbolAndPortfolioId(int userId, string coinSymbol,int portfolioId);
        public Task<bool> CreatePortfolioTokenAsync(PortfolioTokenCreateModel model, int userId);
        public Task<bool> UpdatePortfolioTokenAsync(PortfolioTokenUpdateModel model, int userId);
        public Task<bool> DeletePortfolioTokenAsync(int portfolioTokenId);

    }
}
