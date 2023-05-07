using ApplicationService.DTOs.CryptoTracker;
using ApplicationService.implementations.CryptoTracker.PortfolioTokenManagement;
using Data.Entities.CryptoTracker;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CryptoHelpers.API.Controllers.CryptoTracker
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortfolioTokenController : BaseContoller
    {
        private readonly IPortfolioTokenManagementService _portfolioTokenManagementService;

        public PortfolioTokenController(IPortfolioTokenManagementService portfolioTokenManagementService)
        {
            _portfolioTokenManagementService = portfolioTokenManagementService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPortfolioTokens()
        {
            int userId = GetUserId();

            List<PortfolioTokenDto> portfolioTokens = await _portfolioTokenManagementService.GetPortfolioTokensAsync(userId);
            return Ok(new { portfolioTokens = portfolioTokens });
        }

        [HttpGet("GetPortfolioTokensByPortfolioId")]
        public async Task<IActionResult> GetPortfolioTokensByPortfolioId(int portfolioId)
        {
            List<PortfolioTokenDto> portfolioTokens = await _portfolioTokenManagementService
                                                      .GetPortfolioTokensByPortfolioAsync(portfolioId);

            return Ok(new { portfolioTokens = portfolioTokens });
        }
    }
}
