using ApplicationService.DTOs;
using ApplicationService.Models.TradeFutureModels;
using Data.Context;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ApplicationService.implementations
{
    public class TradeFutureManagementService : ITradeFutureManagementService
    {
        private readonly ProjectDBContext _context;
        public TradeFutureManagementService(ProjectDBContext context)
        {
            _context = context;
        }
        public async Task<List<TradeFutureDto>> GetTradesAsync(int userId)
        {
            var trades = new List<TradeFutureDto>();
            foreach (var trade in await _context.Trades.Where(t => t.UserId == 1).ToListAsync())
            {
                trades.Add(new TradeFutureDto
                {
                    Id = trade.Id,
                    CoinName = trade.CoinName,
                    EarnedMoney = trade.EarnedMoney,
                    PositionSize = trade.PositionSize,
                    StopLossPercent = trade.StopLossPercent,
                    TakeProfitPercent = trade.TakeProfitPercent,
                    TradingViewImgLink = trade.TradingViewImgLink,
                });
            }
            return trades;
        }
        public async Task<bool> CreateTradeAsync(TradeFutureCreateModel model)
        {
            var trade = new TradeFutureEntity()
            {
                CoinName = model.CoinName,
                EarnedMoney = model.EarnedMoney,
                PositionSize = model.PositionSize,
                StopLossPercent = model.StopLossPercent,
                TakeProfitPercent = model.TakeProfitPercent,
                TradingViewImgLink = model.TradingViewImgLink,
                UserId = 1,
                CreatedBy = 1,
                CreatedOn = DateTime.Now
            };

            try
            {
                await _context.Trades.AddAsync(trade);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateTradeAsync(TradeFutureUpdateModel model)
        {
            var tradeForChange = _context.Trades.Where(t => t.Id == model.Id).FirstOrDefault();

            if (tradeForChange == null)
                return false;

            tradeForChange.CoinName = model.CoinName;
            tradeForChange.PositionSize = model.PositionSize;
            tradeForChange.StopLossPercent = model.StopLossPercent;
            tradeForChange.TakeProfitPercent = model.TakeProfitPercent;
            tradeForChange.EarnedMoney = model.EarnedMoney;
            tradeForChange.TradingViewImgLink = model.TradingViewImgLink;
            _context.Trades.Update(tradeForChange);
            await _context.SaveChangesAsync();
            return true;

        }

        public async Task<bool> DeleteTradeAsync(int id)
        {
            try
            {
                var trade = new TradeFutureEntity() { Id = id };
                _context.Trades.Remove(trade);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }


    }
}
