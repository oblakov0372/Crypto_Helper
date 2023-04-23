using ApplicationService.DTOs;
using ApplicationService.Models.TradeFutureModels;
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
        public Task<List<TradeFutureDto>> GetTradesAsync (int userId);
        public Task<bool> CreateTradeAsync (TradeFutureCreateModel model);
        public Task<bool> UpdateTradeAsync (TradeFutureUpdateModel model);
        public Task<bool> DeleteTradeAsync(int tradeId);
    }
}
