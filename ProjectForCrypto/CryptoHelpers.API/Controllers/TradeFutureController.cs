using ApplicationService.implementations;
using ApplicationService.Models.TradeFutureModels;
using Microsoft.AspNetCore.Mvc;

namespace CryptoHelpers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TradeFutureController : ControllerBase
    {
        private readonly ITradeFutureManagementService _tradeFutureManagementService;
        public TradeFutureController(ITradeFutureManagementService tradeFutureManagementService)
        {
            _tradeFutureManagementService = tradeFutureManagementService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTrades()
        {
            var trades = await _tradeFutureManagementService.GetTradesAsync(1);
            return Ok(trades);
        }
        [HttpPost] 
        public async Task<IActionResult> CreateTrade([FromBody] TradeFutureCreateModel model)
        {
            var result = await _tradeFutureManagementService.CreateTradeAsync(model);
            if (result)
                return Ok("Trade was created");

            return BadRequest("Trade wasn't created");
        }
        [HttpPut]
        public async Task<IActionResult> UpdateTrade([FromBody] TradeFutureUpdateModel model)
        {
            var result = await _tradeFutureManagementService.UpdateTradeAsync(model);
            if (result)
                return Ok("Trade was updated");

            return BadRequest("Trade wasn't updated");
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteTrade([FromBody] int id)
        {
            var result = await _tradeFutureManagementService.DeleteTradeAsync(id);
            if (result)
                return Ok("Trade was deleted");

            return BadRequest("Trade wasn't found");
        }
    }
}
