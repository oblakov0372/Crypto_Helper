using ApplicationService.DTOs;
using ApplicationService.Models.CryptoTracker.PortfolioModels;
using ApplicationService.Models.TradeFutureModels;

namespace ApplicationService.implementations.CryptoTracker.Portfolio
{
    public interface IPortfolioManagementService
    {
        public Task<List<PortfolioDto>> GetPortfoliosAsync(int userId);
        public Task<bool> CreatePortfolioAsync(PortfolioCreateModel model, int userId);
        public Task<bool> UpdatePortfolioAsync(PortfolioUpdateModel model,int userId);
        public Task<bool> DeletePortfolioAsync(int portfolioId);
    }
}
