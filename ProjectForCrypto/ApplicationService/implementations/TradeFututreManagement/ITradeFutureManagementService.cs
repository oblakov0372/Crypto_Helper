using ApplicationService.DTOs;
using ApplicationService.Models.TradeFutureModels;

namespace ApplicationService.implementations.TradeFututreManagement
{
    public interface ITradeFutureManagementService
    {
        public Task<List<TradeFutureDto>> GetTradesAsync(int userId);
        public Task<TradeFutureDto> CreateTradeAsync(TradeFutureCreateModel model, int userId);
        public Task<bool> UpdateTradeAsync(TradeFutureUpdateModel model, int userId);
        public Task<bool> DeleteTradeAsync(int tradeId);
    }
}
