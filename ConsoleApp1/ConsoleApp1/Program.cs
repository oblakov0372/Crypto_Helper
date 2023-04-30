using Binance.Net.Clients;
using Binance.Net.Objects;
using System.Net;

static void Main(string[] args)
{
    var client = new BinanceClient(new BinanceClientOptions
    {
        ApiCredentials = new BinanceApiCredentials("apiKey", "secretKey")
    });


    while (true)
    {
        var newLaunchpads = client.Spot.System.GetLaunchpadInformation();

        foreach (var launchpad in newLaunchpads)
        {
            if (!launchpads.Contains(launchpad))
            {
                Console.WriteLine($"New launchpad: {launchpad.Name}");
            }
        }

        launchpads = newLaunchpads;

        Thread.Sleep(10000);
    }
}