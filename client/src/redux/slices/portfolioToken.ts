import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PortfolioTokenType } from "../../types/PortfolioTokenType";

interface PortfolioTokenState {
  portfolioTokens: PortfolioTokenType[];
  totalMoney: number;
}

const initialState: PortfolioTokenState = {
  portfolioTokens: [],
  totalMoney: 0,
};

export const PortfolioTokenSlice = createSlice({
  name: "portfolioTokens",
  initialState,
  reducers: {
    setPortfolioTokens(state, action: PayloadAction<PortfolioTokenType[]>) {
      state.portfolioTokens = action.payload;
      state.totalMoney = state.portfolioTokens.reduce(
        (sum, p) => sum + p.count * p.price,
        0
      );
    },
    addPortfolioToken(state, action: PayloadAction<PortfolioTokenType>) {
      const portfolioToken = state.portfolioTokens.find(
        (t) => t.coinSymbol == action.payload.coinSymbol
      );
      if (portfolioToken) {
        portfolioToken.count += action.payload.count * 1;
        if (portfolioToken.count <= 0) {
          state.portfolioTokens = state.portfolioTokens.filter(
            (pt) => pt.id != portfolioToken.id
          );
        }
      } else {
        state.portfolioTokens.push(action.payload);
      }
      state.totalMoney += action.payload.count * action.payload.price;
    },
  },
});

export const { setPortfolioTokens, addPortfolioToken } =
  PortfolioTokenSlice.actions;

export default PortfolioTokenSlice.reducer;
