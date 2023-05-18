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
    editPortfolioToken(state, action: PayloadAction<PortfolioTokenType>) {
      const portfolioTokenForEdit = state.portfolioTokens.find(
        (p) => p.id === action.payload.id
      );
      if (portfolioTokenForEdit) {
        const portfolioTokenIndex = state.portfolioTokens.indexOf(
          portfolioTokenForEdit
        );
        state.portfolioTokens[portfolioTokenIndex].coinSymbol =
          action.payload.coinSymbol;
        state.portfolioTokens[portfolioTokenIndex].count = action.payload.count;
        state.portfolioTokens[portfolioTokenIndex].portfolioId =
          action.payload.portfolioId;
        state.portfolioTokens[portfolioTokenIndex].price = action.payload.price;
        state.portfolioTokens[portfolioTokenIndex].coinName =
          action.payload.coinName;
        state.portfolioTokens[portfolioTokenIndex].percentChange24H =
          action.payload.percentChange24H;
      }
    },
  },
});

export const { setPortfolioTokens, addPortfolioToken, editPortfolioToken } =
  PortfolioTokenSlice.actions;

export default PortfolioTokenSlice.reducer;
