using ApplicationService.Models.TradeFutureModels;
using CryptoHelpers.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using ApplicationService.DTOs;
using Microsoft.AspNetCore.Authorization;
using ApplicationService.implementations.TradeFututreManagement;

namespace CryptoHelpers.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TradeFutureController : BaseContoller
    {
        private readonly ITradeFutureManagementService _tradeFutureManagementService;
        private readonly IMemoryCache _memoryCache;
        public TradeFutureController(ITradeFutureManagementService tradeFutureManagementService,
                                     IMemoryCache memoryCache)
        {

            _tradeFutureManagementService = tradeFutureManagementService;
            _memoryCache = memoryCache;

        }
        [HttpGet]
        public async Task<IActionResult> GetTrades([FromQuery] TradeParameters parameters)
        {
            int id = GetUserId();

            if (!_memoryCache.TryGetValue("trades", out List<TradeFutureDto> values))
            {
                // If the value is not in the cache, generate it.
                values = await _tradeFutureManagementService.GetTradesAsync(id);

                // Store the value in the cache for 10 minutes.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromSeconds(3));

                _memoryCache.Set("trades", values, cacheEntryOptions);
            }

            var trades = values?.Skip(parameters.PageSize * (parameters.PageNumber - 1))
                                               .Take(parameters.PageSize).ToList();

            var countPages = Math.Ceiling((double)values.Count / parameters.PageSize);

            return Ok(new { trades = trades, countPages = countPages });
        }
        [HttpPost]
        public async Task<IActionResult> CreateTrade([FromBody] TradeFutureCreateModel model)
        {
            int userId = GetUserId();
            var createdDto = await _tradeFutureManagementService.CreateTradeAsync(model,userId);
            if (createdDto != null)
                return Ok(createdDto);

            return BadRequest("Trade wasn't created");
        }
        [HttpPut]
        public async Task<IActionResult> UpdateTrade([FromBody] TradeFutureUpdateModel model)
        {
            int userId = GetUserId();
            var result = await _tradeFutureManagementService.UpdateTradeAsync(model,userId);
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
