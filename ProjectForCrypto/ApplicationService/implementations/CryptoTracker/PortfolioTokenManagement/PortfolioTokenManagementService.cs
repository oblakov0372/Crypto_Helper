using ApplicationService.DTOs.CryptoTracker;
using ApplicationService.Models.CryptoTracker.PortfolioTokenModels;
using Contracts;
using Data.Entities.CryptoTracker;

namespace ApplicationService.implementations.CryptoTracker.PortfolioTokenManagement
{
    public class PortfolioTokenManagementService : IPortfolioTokenManagementService
    {
        private readonly IUnitOfWork _unitOfWork;
        public PortfolioTokenManagementService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<PortfolioTokenDto>> GetPortfolioTokensAsync(int userId)
        {
            List<PortfolioTokenDto> portfolioTokens = new List<PortfolioTokenDto>();
            foreach (var portfolioToken in _unitOfWork.PortfolioTokens.FindAsync(p => p.UserId == userId))
            {
                portfolioTokens.Add(new PortfolioTokenDto
                {
                    Id = portfolioToken.Id,
                    CoinSymbol = portfolioToken.CoinSymbol,
                    Count = portfolioToken.Count,
                });
            }
            return portfolioTokens;
        }

        public async Task<List<PortfolioTokenDto>> GetPortfolioTokensByPortfolioAsync(int portfolioId)
        {
            List<PortfolioTokenDto> portfolioTokens = new List<PortfolioTokenDto>();
            foreach (var portfolioToken in _unitOfWork.PortfolioTokens.FindAsync(p => p.PortfolioId == portfolioId))
            {
                portfolioTokens.Add(new PortfolioTokenDto
                {
                    Id = portfolioToken.Id,
                    CoinSymbol = portfolioToken.CoinSymbol,
                    Count = portfolioToken.Count,
                });
            }
            return portfolioTokens;
        }
        public PortfolioTokenEntity GetPortfolioTokenByUserIdCoinSymbolAndPortfolioId(int userId, string coinSymbol,int portfolioId)
        {
            return _unitOfWork.PortfolioTokens.FindAsync(pt => pt.CoinSymbol == coinSymbol && pt.UserId == userId && pt.PortfolioId == portfolioId).FirstOrDefault();
        }
        public async Task<bool> CreatePortfolioTokenAsync(PortfolioTokenCreateModel model, int userId)
        {
            PortfolioTokenEntity portfolioToken = new PortfolioTokenEntity()
            {
                UserId = userId,
                CoinSymbol = model.CoinSymbol,
                PortfolioId = model.PortfolioId,
                Count = model.Count,
                CreatedOn = DateTime.Now,
                CreatedBy = userId
            };
            try
            {
                await _unitOfWork.PortfolioTokens.AddAsync(portfolioToken);
                await _unitOfWork.SaveAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> UpdatePortfolioTokenAsync(PortfolioTokenUpdateModel model, int userId)
        {
            PortfolioTokenEntity portfolioTokenForChange = await _unitOfWork.PortfolioTokens.GetByIdAsync(model.Id);
            if (portfolioTokenForChange == null)
                return false;
            if(model.Count < 0)
            {
                await DeletePortfolioTokenAsync(model.Id);
            }
            portfolioTokenForChange.CoinSymbol = model.CoinSymbol;
            portfolioTokenForChange.Count = model.Count;
            portfolioTokenForChange.UpdatedOn = DateTime.Now;
            portfolioTokenForChange.UpdateBy = userId;
            try
            {
                _unitOfWork.PortfolioTokens.Update(portfolioTokenForChange);
                await _unitOfWork.SaveAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> DeletePortfolioTokenAsync(int portfolioTokenId)
        {
            try
            {
                var portfolioToken = new PortfolioTokenEntity{ Id = portfolioTokenId };
                _unitOfWork.PortfolioTokens.Remove(portfolioToken);
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
