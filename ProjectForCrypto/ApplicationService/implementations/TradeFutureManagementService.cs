using ApplicationService.DTOs;
using ApplicationService.Models.TradeFutureModels;
using Contracts;
using Data.Entities;

namespace ApplicationService.implementations
{
    public class TradeFutureManagementService : ITradeFutureManagementService
    {
        private readonly IUnitOfWork _unitOfWork;
        public TradeFutureManagementService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<TradeFutureDto>> GetTradesAsync(int userId)
        {
            var trades = new List<TradeFutureDto>();
            foreach (var trade in _unitOfWork.TradeFutures.FindAsync(t => t.UserId == userId))
            {
                trades.Add(new TradeFutureDto
                {
                    Id = trade.Id,
                    CoinName = trade.CoinName,
                    EarnedMoney = trade.EarnedMoney,
                    PositionSize = trade.PositionSize,
                    Risk = trade.Risk,
                    Reward = trade.Reward,
                    TradingViewImgLink = trade.TradingViewImgLink,
                });
            }
            return trades;
        }
        public async Task<bool> CreateTradeAsync(TradeFutureCreateModel model, int userId)
        {
            var trade = new TradeFutureEntity()
            {
                CoinName = model.CoinName,
                EarnedMoney = model.EarnedMoney,
                PositionSize = model.PositionSize,
                Risk = model.Risk,
                Reward = model.Reward,
                TradingViewImgLink = model.TradingViewImgLink,
                UserId = userId,
                CreatedBy = userId,
                CreatedOn = DateTime.Now
            };

            try
            {
                await _unitOfWork.TradeFutures.AddAsync(trade);
                await _unitOfWork.SaveAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateTradeAsync(TradeFutureUpdateModel model)
        {
            TradeFutureEntity tradeForChange = _unitOfWork.TradeFutures.FindAsync(t => t.Id == model.Id).FirstOrDefault();


            if (tradeForChange == null)
                return false;

            tradeForChange.CoinName = model.CoinName;
            tradeForChange.PositionSize = model.PositionSize;
            tradeForChange.Risk = model.Risk;
            tradeForChange.Reward = model.Reward;
            tradeForChange.EarnedMoney = model.EarnedMoney;
            tradeForChange.TradingViewImgLink = model.TradingViewImgLink;
            _unitOfWork.TradeFutures.Update(tradeForChange);
            await _unitOfWork.SaveAsync();
            return true;

        }

        public async Task<bool> DeleteTradeAsync(int id)
        {
            try
            {
                var trade = new TradeFutureEntity() { Id = id };
                _unitOfWork.TradeFutures.Remove(trade);
                await _unitOfWork.SaveAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }


    }
}
