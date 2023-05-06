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
        [HttpGet]
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

            switch (parameters.OrderBy)
            {    
                case "name":
                    values = values.OrderBy(o => o.Name).ToList();
                    break;
                case "price":
                    values = values.OrderBy(o => o.Price).ToList();
                    break;
                case "marketCap":
                    values = values.OrderBy(o => o.MarketCap).ToList();
                    break;
                case "volumeChange24H":
                    values = values.OrderBy(o => o.VolumeChange24H).ToList();
                    break;
                case "priceChange24H":
                    values = values.OrderBy(o => o.PercentChange24H).ToList();
                    break;
                default:
                    values = values.OrderBy(o => o.CmcRank).ToList();
                    break;
            }

            var cryptocurrencies = values?.Skip(parameters.PageSize * (parameters.PageNumber - 1))
                                               .Take(parameters.PageSize).ToList();

            var countPages = Math.Ceiling((double)values.Count / parameters.PageSize);


            if (cryptocurrencies?.Count == 0)
            {
                BadRequest();
            }
            return Ok(new { cryptocurrencies = cryptocurrencies, countPages = countPages });
        }

    }
}
