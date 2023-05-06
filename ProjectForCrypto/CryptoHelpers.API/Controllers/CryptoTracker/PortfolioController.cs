using ApplicationService.DTOs.CryptoTracker;
using ApplicationService.implementations.CryptoTracker.Portfolio;
using ApplicationService.Models.CryptoTracker.PortfolioModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CryptoHelpers.API.Controllers.CryptoTracker
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class PortfolioController : BaseContoller
    {
        private readonly IPortfolioManagementService _portfolioManagementService;

        public PortfolioController(IPortfolioManagementService portfolioManagementService)
        {
            _portfolioManagementService = portfolioManagementService;
        }
        [HttpGet]
        public async Task<IActionResult> GetPortfolios()
        {
            int id = GetUserId();

            List<PortfolioDto> portfolios = await _portfolioManagementService.GetPortfoliosAsync(id);

            return Ok(new { portfolios = portfolios });
        }
        [HttpPost]
        public async Task<IActionResult> CreatePortfolio([FromBody] PortfolioCreateModel model)
        {
            int userId = GetUserId();
            var result = await  _portfolioManagementService.CreatePortfolioAsync(model, userId);
            if (result)
                return Ok("Portfolio was created");

            return BadRequest("Portfolio wasn't created");
        }
        [HttpPut]
        public async Task<IActionResult> UpdatePortfolio([FromBody] PortfolioUpdateModel model)
        {
            int userId = GetUserId();
            var result = await _portfolioManagementService.UpdatePortfolioAsync(model, userId);
            if (result)
                return Ok("Portfolio was updated");

            return BadRequest("Portfolio wasn't updated");
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteTrade([FromBody] int id)
        {
            var result = await _portfolioManagementService.DeletePortfolioAsync(id);
            if (result)
                return Ok("Portfolio was deleted");

            return BadRequest("Portfolio wasn't found");
        }
    }
}
