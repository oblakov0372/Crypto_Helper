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
        private readonly ICryptoCollectorManagementService _cryptoCollectorManagementService;
        public CryptoCollectorController(IMemoryCache memoryCache, ICryptoCollectorManagementService cryptoCollectorManagementService)
        {
            _cryptoCollectorManagementService = cryptoCollectorManagementService;
        }
        [HttpGet]
        public async Task<IActionResult> GetCryptocurrencies([FromQuery] CryptoParameters parameters)
        {
            var tokens = _cryptoCollectorManagementService.GetCryptocurrencies();

            switch (parameters.OrderBy)
            {
                case "name":
                    tokens = tokens.OrderBy(o => o.Name).ToList();
                    break;
                case "price":
                    tokens = tokens.OrderBy(o => o.Price).ToList();
                    break;
                case "marketCap":
                    tokens = tokens.OrderBy(o => o.MarketCap).ToList();
                    break;
                case "volumeChange24H":
                    tokens = tokens.OrderBy(o => o.VolumeChange24H).ToList();
                    break;
                case "priceChange24H":
                    tokens = tokens.OrderBy(o => o.PercentChange24H).ToList();
                    break;
                default:
                    tokens = tokens.OrderBy(o => o.CmcRank).ToList();
                    break;
            }

            var cryptocurrencies = tokens?.Skip(parameters.PageSize * (parameters.PageNumber - 1))
                                               .Take(parameters.PageSize).ToList();

            var countPages = Math.Ceiling((double)tokens.Count / parameters.PageSize);


            if (cryptocurrencies?.Count == 0)
            {
                BadRequest();
            }
            return Ok(new { cryptocurrencies = cryptocurrencies, countPages = countPages });
        }
        [HttpGet("GetAllCryptocurrencies")]
        public  IActionResult GetAllCryptocurrencies()
        {
            var cryptocurrencies = _cryptoCollectorManagementService.GetCryptocurrencies();
            return Ok(new { cryptocurrencies = cryptocurrencies });
        }
    }
}
