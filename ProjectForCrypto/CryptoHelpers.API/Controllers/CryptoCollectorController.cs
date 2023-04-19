using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CryptoCollector.API;
using CryptoCollector.API.Models;
using CryptoHelpers.API.Models;
using Microsoft.Extensions.Caching.Memory;
namespace CryptoHelpers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CryptoCollectorController : ControllerBase
    {
        private readonly IMemoryCache _memoryCache;
        public CryptoCollectorController(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }
        [HttpGet("GetCryptocurrencies")]
        public async Task<IActionResult> GetCryptocurrencies([FromQuery] CryptoParameters parameters)
        {
            if (!_memoryCache.TryGetValue("Cryptocurrencies", out List<CryptoModel> values))
            {
                // If the value is not in the cache, generate it.
                values = CryptoMethods.GetCryptocurrencies();

                // Store the value in the cache for 10 minutes.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromMinutes(10));

                _memoryCache.Set("Cryptocurrencies", values, cacheEntryOptions);
            }

            var cryptocurrencies = values.Skip(parameters.PageSize * (parameters.PageNumber - 1))
                                               .Take(parameters.PageSize).ToList();
            if (cryptocurrencies.Count == 0)
            {
                BadRequest();
            }
            return Ok(cryptocurrencies);
        }
    }
}
