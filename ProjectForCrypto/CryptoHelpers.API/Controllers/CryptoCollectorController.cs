using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CryptoCollector.API;
using CryptoCollector.API.Models;
using CryptoHelpers.API.Models;

namespace CryptoHelpers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CryptoCollectorController : ControllerBase
    {
        [HttpGet("GetCryptocurrencies")]
        public async Task<IActionResult> GetCryptocurrencies([FromQuery] CryptoParameters parameters)
        {
            List<CryptoModel> cryptocurrencies =  CryptoMethods.GetCryptocurrencies();
            cryptocurrencies = cryptocurrencies.Skip(parameters.PageSize * (parameters.PageNumber - 1))
                                               .Take(parameters.PageSize).ToList();
            if(cryptocurrencies.Count == 0)
            {
                BadRequest();
            }
            return Ok(cryptocurrencies);
        }
    }
}
