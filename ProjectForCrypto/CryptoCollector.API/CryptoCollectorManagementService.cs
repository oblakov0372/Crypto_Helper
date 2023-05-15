using CryptoCollector.API.Models;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json.Linq;

namespace CryptoCollector.API
{
    public class CryptoCollectorManagementService : ICryptoCollectorManagementService
    {
        private readonly IMemoryCache _memoryCache;
        public CryptoCollectorManagementService(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }
        public List<CryptoModel> GetCryptocurrencies()
        {
            if (!_memoryCache.TryGetValue("Cryptocurrencies", out List<CryptoModel> values))
            {
                // If the value is not in the cache, generate it.
                var json = Requests.GetRequestCoinMarketCap();
                values = ConvertorToListCryptocyrrency(json);

                // Store the value in the cache for 10 minutes.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromMinutes(10));

                _memoryCache.Set("Cryptocurrencies", values, cacheEntryOptions);
            }

            return values;
        }
        private List<CryptoModel> ConvertorToListCryptocyrrency(JObject json)
        {
            List<CryptoModel> cryptocurrencies = new List<CryptoModel>();
            foreach (var item in json["data"])
            {
                cryptocurrencies.Add(new CryptoModel()
                {
                    CmcRank = (int)item["cmc_rank"],
                    Name = item["name"].ToString(),
                    Symbol = item["symbol"].ToString(),
                    Price = Math.Round(Convert.ToDecimal(item["quote"]["USD"]["price"]), 5),
                    MarketCap = Convert.ToDecimal(item["total_supply"]),
                    PercentChange24H = Math.Round(Convert.ToDecimal(item["quote"]["USD"]["percent_change_24h"]), 3),
                    VolumeChange24H = Math.Round(Convert.ToDecimal(item["quote"]["USD"]["volume_change_24h"]), 3),
                });
            }
            return cryptocurrencies;
        }

    }
}
