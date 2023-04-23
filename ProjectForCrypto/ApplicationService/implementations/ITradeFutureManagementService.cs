using ApplicationService.DTOs;
using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationService.implementations
{
    public interface ITradeFutureManagementService
    {
        Task<List<TradeFutureDto>> GetTradesAsync (int userId);
        Task<bool> CreateTradeAsync (TradeFutureDto tradeFuture);
        Task<bool> UpdateTradeAsync (TradeFutureDto tradeFuture);
        Task<bool> DeleteTradeAsync(int tradeId);
    }
}
