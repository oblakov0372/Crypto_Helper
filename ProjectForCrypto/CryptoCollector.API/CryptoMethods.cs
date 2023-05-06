using CryptoCollector.API.Models;
using Newtonsoft.Json.Linq;

namespace CryptoCollector.API
{
    public static class CryptoMethods
    {
        public static List<CryptoModel> GetCryptocurrencies()
        {
            var json = Requests.GetRequestCoinMarketCap();
            List<CryptoModel> cryptocurrencies;

            cryptocurrencies = ConvertorToListCryptocyrrency(json);

            return cryptocurrencies;
        }
        private static List<CryptoModel> ConvertorToListCryptocyrrency(JObject json)
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
                }) ;
            }
            return cryptocurrencies;
        }

    }
}
