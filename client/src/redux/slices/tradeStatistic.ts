import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CryptoType } from "../../types/CryptoType";
import { TradeFutureType } from "../../types/TradeFutureType";

interface TradeStatisticState {
  trades: TradeFutureType[];
  totalTrades: number;
  totalPositivTrades: number;
  totalEarnedMoney: number;
}

const initialState: TradeStatisticState = {
  trades: [],
  totalTrades: 0,
  totalPositivTrades: 0,
  totalEarnedMoney: 0,
};

export const TradeStatisticSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    setTrades(state, action: PayloadAction<TradeFutureType[]>) {
      state.trades = action.payload;
      state.totalTrades = action.payload.length;
      state.totalEarnedMoney = state.trades.reduce(
        (sum, trade) => sum + trade.earnedMoney,
        0
      );
      state.trades.forEach((trade) => {
        if (trade.earnedMoney > 0) {
          state.totalPositivTrades += 1;
        }
      });
    },
    addTrade(state, action: PayloadAction<TradeFutureType>) {
      state.trades.push(action.payload);
      state.totalTrades += 1;
      if (action.payload.earnedMoney > 0) {
        state.totalPositivTrades += 1;
      }
      state.totalEarnedMoney += action.payload.earnedMoney;
    },
    deleteTrade(state, action: PayloadAction<TradeFutureType>) {
      state.trades = state.trades.filter((trade) => trade !== action.payload);
      state.totalTrades -= 1;
      if (action.payload.earnedMoney > 0) {
        state.totalPositivTrades -= 1;
      }
      state.totalEarnedMoney -= action.payload.earnedMoney;
    },
    editTrade(state, action: PayloadAction<TradeFutureType>) {
      const editedTrade = state.trades.find(
        (trade) => trade === action.payload
      );
      if (editedTrade) {
        const tradeIndex = state.trades.indexOf(editedTrade);
        const oldEarnedMoney = editedTrade.earnedMoney;
        state.trades[tradeIndex] = action.payload;
        const newEarnedMoney = action.payload.earnedMoney;
        if (oldEarnedMoney > 0 && newEarnedMoney <= 0) {
          state.totalPositivTrades -= 1;
        } else if (oldEarnedMoney <= 0 && newEarnedMoney > 0) {
          state.totalPositivTrades += 1;
        }
        state.totalEarnedMoney = state.trades.reduce(
          (sum, trade) => sum + trade.earnedMoney,
          0
        );
      }
    },
  },
});

export const { setTrades, addTrade, deleteTrade, editTrade } =
  TradeStatisticSlice.actions;

export default TradeStatisticSlice.reducer;
