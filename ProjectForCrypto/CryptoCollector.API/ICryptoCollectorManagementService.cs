using CryptoCollector.API.Models;

namespace CryptoCollector.API
{
    public interface ICryptoCollectorManagementService
    {
        List<CryptoModel> GetCryptocurrencies();
    }
}
