using ApplicationService.implementations;
using ApplicationService.Models.TradeFutureModels;
using CryptoCollector.API.Models;
using CryptoCollector.API;
using CryptoHelpers.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using ApplicationService.DTOs;

namespace CryptoHelpers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TradeFutureController : ControllerBase
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
            if (!_memoryCache.TryGetValue("trades", out List<TradeFutureDto> values))
            {
                // If the value is not in the cache, generate it.
                values = await _tradeFutureManagementService.GetTradesAsync(1);

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
