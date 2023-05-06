using ApplicationService.DTOs;
using ApplicationService.Models.CryptoTracker.PortfolioModels;
using Contracts;
using Data.Entities;
using Microsoft.Identity.Client;

namespace ApplicationService.implementations.CryptoTracker.Portfolio
{
    public class PortfolioManagementService : IPortfolioManagementService
    {
        private readonly IUnitOfWork _unitOfWork;
        public PortfolioManagementService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<PortfolioDto>> GetPortfoliosAsync(int userId)
        {
            List<PortfolioDto> portfolios = new List<PortfolioDto>();
            foreach (var portfolio in _unitOfWork.Portfolios.FindAsync(p => p.UserId == userId))
            {
                portfolios.Add(new PortfolioDto
                {
                    Id = portfolio.Id,
                    Name = portfolio.Name,
                    Description = portfolio.Description,
                });
            }
            return portfolios;
        }
        public async Task<bool> CreatePortfolioAsync(PortfolioCreateModel model, int userId)
        {
            PortfolioEntity portfolio = new PortfolioEntity
            {
                Name = model.Name,
                Description = model.Description,
                UserId = userId,
                CreatedOn = DateTime.Now,
                CreatedBy = userId
            };
            try
            {
                await _unitOfWork.Portfolios.AddAsync(portfolio);
                await _unitOfWork.SaveAsync();
                return true;
            }
            catch 
            {
                return false;
            }
        }
        public async Task<bool> UpdatePortfolioAsync(PortfolioUpdateModel model,int userId) 
        {
            PortfolioEntity portfolioForChange = await _unitOfWork.Portfolios.GetByIdAsync(model.Id);
            if (portfolioForChange == null)
                return false;

            portfolioForChange.Name = model.Name;
            portfolioForChange.Description = model.Description;
            portfolioForChange.UpdatedOn = DateTime.Now;
            portfolioForChange.UpdateBy = userId;
            try
            {
                _unitOfWork.Portfolios.Update(portfolioForChange);
                await _unitOfWork.SaveAsync();
                return true;
            }
            catch 
            {
                return false;
            }
            
        }

        public async Task<bool> DeletePortfolioAsync(int portfolioId)
        {
            try
            {
                var portfolio = new PortfolioEntity { Id = portfolioId};
                _unitOfWork.Portfolios.Remove(portfolio);
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
