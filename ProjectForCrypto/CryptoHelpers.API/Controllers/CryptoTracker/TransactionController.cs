using ApplicationService.DTOs.CryptoTracker;
using ApplicationService.implementations.CryptoTracker.TransactionManagement;
using ApplicationService.Models.CryptoTracker.TransactionModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CryptoHelpers.API.Controllers.CryptoTracker
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TransactionController : BaseContoller
    {
        private readonly ITransactionManagementService _transactionManagementService;

        public TransactionController(ITransactionManagementService transactionManagementService)
        {
            _transactionManagementService = transactionManagementService;
        }
        [HttpGet]
        public async Task<IActionResult> GetTransactions()
        {
            int id = GetUserId();

            List<TransactionDto> transactions = await _transactionManagementService.GetTransactionsAsync(id);

            return Ok(new { transactions = transactions });
        }
        [HttpGet("GetTransactionsByPortfolioId")]
        public async Task<IActionResult> GetTransactionsByPortfolioId(int portfolioId)
        {
            List<TransactionDto> transactions = await _transactionManagementService
                                                      .GetTransactionsByPortfolioAsync(portfolioId);

            return Ok(new { transactions = transactions });
        }
        [HttpPost]
        public async Task<IActionResult> CreateTransaction([FromBody] TransactionCreateModel model)
        {
            int userId = GetUserId();
            var result = await _transactionManagementService.CreateTransactionAsync(model, userId);
            if (result)
                return Ok("Transaction was created");

            return BadRequest("Transaction wasn't created");
        }
        [HttpPut]
        public async Task<IActionResult> UpdateTransaction([FromBody] TransactionUpdateModel model)
        {
            int userId = GetUserId();
            var result = await _transactionManagementService.UpdateTrasnactionAsync(model, userId);
            if (result)
                return Ok("Transaction was updated");

            return BadRequest("Transaction wasn't updated");
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteTransaction([FromBody] int id)
        {
            var result = await _transactionManagementService.DeleteTrasnactionAsync(id);
            if (result)
                return Ok("Transaction was deleted");

            return BadRequest("Transaction wasn't found");
        }
    }
}
