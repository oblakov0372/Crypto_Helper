using CryptoCollector.API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Web;

namespace CryptoCollector.API
{
    public static class Requests
    {
        private const string API_KEY_COINMARKETCAP = "06d7666b-c179-4097-8ee7-d52c1cde0963";
        private const string API_KEY_COINGLASS = "9946f82d2fb84dd396940f3c6f6d059b";
        //private const string API_KEY_BSC_SCAN = "2IKJ5UKMNZHNNZAZWPTX31I9H3CQ37K958";
        //private const string API_KEY_POLYGON_SCAN = "72BMYYZBMPUHEFXHNJ3PUP2XXGG8KPV7T3";
        //private const string API_KEY_ETHEREUM_SCAN = "PTUH7CHTFQ6SRAFT78RJEGN3UWG9IBICZ2";
        //private const string API_KEY_FANTOM_SCAN = "RX4MNBKF9BH28WWMV3M2P7GH5M8REDFCRR";

        internal static JObject GetRequestCoinMarketCap()
        {
            var URL = new UriBuilder("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest");

            var queryString = HttpUtility.ParseQueryString(string.Empty);
            queryString["start"] = "1";
            queryString["limit"] = "500";
            queryString["convert"] = "USD";

            URL.Query = queryString.ToString();

            var client = new WebClient();
            client.Headers.Add("X-CMC_PRO_API_KEY", API_KEY_COINMARKETCAP);
            client.Headers.Add("Accepts", "application/json");
            JObject json = JObject.Parse(client.DownloadString(URL.ToString()));
            return json;
        }
        internal static JObject GetRequestCoinGlass(string symbol)
        {
            var URL = new UriBuilder("https://open-api.coinglass.com/public/v2/perpetual_market");

            var queryString = HttpUtility.ParseQueryString(string.Empty);
            queryString["symbol"] = symbol;
            queryString["interval"] = "24H";

            URL.Query = queryString.ToString();


            var client = new WebClient();
            client.Headers.Add("X-CMC_PRO_API_KEY", API_KEY_COINGLASS);
            client.Headers.Add("Accepts", "application/json");
            JObject json = JObject.Parse(client.DownloadString(URL.ToString()));
            return json;
        }

    }
}
