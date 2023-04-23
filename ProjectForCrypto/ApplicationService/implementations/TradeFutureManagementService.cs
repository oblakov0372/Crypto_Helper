using ApplicationService.DTOs;
using Data.Context;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ApplicationService.implementations
{
    public class TradeFutureManagementService:ITradeFutureManagementService
    {
        private readonly ProjectDBContext _context;
        public TradeFutureManagementService(ProjectDBContext context)
        {
            _context = context;
        }
        public async Task<List<TradeFutureDto>> GetTradesAsync(int userId)
        {
            var trades = new List<TradeFutureDto>();
            foreach (var trade in await _context.Trades.ToListAsync())
            {
                trades.Add(new TradeFutureDto
                {
                    Id = trade.Id,
                    CoinName = trade.CoinName,
                    EarnedMoney = trade.EarnedMoney,
                    PositionSize = trade.PositionSize,
                    StopLossPercent = trade.StopLossPercent,
                    TakeProffitPercent = trade.TakeProffitPercent,
                    TradingViewImglink = trade.TradingViewImglink,
                });
            }
            return trades;
        }
        public async Task<bool> CreateTradeAsync(TradeFutureDto tradeFuture)
        {
            var trade = new TradeFutureEntity()
            {
                Id = tradeFuture.Id,
                CoinName = tradeFuture.CoinName,
                EarnedMoney = tradeFuture.EarnedMoney,
                PositionSize = tradeFuture.PositionSize,
                StopLossPercent = tradeFuture.StopLossPercent,
                TakeProffitPercent = tradeFuture.TakeProffitPercent,
                TradingViewImglink = tradeFuture.TradingViewImglink,
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

        public async Task<bool> UpdateTradeAsync(TradeFutureDto tradeFuture)
        {
            var tradeForChange = _context.Trades.Where(t => t.Id == tradeFuture.Id).FirstOrDefault();

            if(tradeForChange == null)
                return false;

            tradeForChange.CoinName = tradeFuture.CoinName;
            tradeForChange.PositionSize = tradeFuture.PositionSize;
            tradeForChange.StopLossPercent = tradeFuture.StopLossPercent;
            tradeForChange.TakeProffitPercent = tradeFuture.TakeProffitPercent;
            tradeForChange.EarnedMoney = tradeFuture.EarnedMoney;
            tradeForChange.TradingViewImglink = tradeFuture.TradingViewImglink;
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
