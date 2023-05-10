import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PortfolioTokenType } from "../../types/PortfolioTokenType";

interface PortfolioTokenState {
  portfolioTokens: PortfolioTokenType[];
}

const initialState: PortfolioTokenState = {
  portfolioTokens: [],
};

export const PortfolioTokenSlice = createSlice({
  name: "portfolioTokens",
  initialState,
  reducers: {
    setPortfolioTokens(state, action: PayloadAction<PortfolioTokenType[]>) {
      state.portfolioTokens = action.payload;
    },
    addPortfolioToken(state, action: PayloadAction<PortfolioTokenType>) {
      state.portfolioTokens.push(action.payload);
    },
    deletePortfolioToken(state, action: PayloadAction<PortfolioTokenType>) {
      state.portfolioTokens = state.portfolioTokens.filter(
        (p) => p.id !== action.payload.id
      );
    },
    editPortfolioToken(state, action: PayloadAction<PortfolioTokenType>) {
      const portfolioTokenForEdit = state.portfolioTokens.find(
        (p) => p.id === action.payload.id
      );
      if (portfolioTokenForEdit) {
        const portfolioIndex = state.portfolioTokens.indexOf(
          portfolioTokenForEdit
        );
        state.portfolioTokens[portfolioIndex].coinSymbol =
          action.payload.coinSymbol;
        state.portfolioTokens[portfolioIndex].count = action.payload.count;
      }
    },
  },
});

export const {
  setPortfolioTokens,
  addPortfolioToken,
  editPortfolioToken,
  deletePortfolioToken,
} = PortfolioTokenSlice.actions;

export default PortfolioTokenSlice.reducer;
