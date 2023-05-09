import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PortfolioType } from "../../types/PortfolioType";
import { PathRouteProps } from "react-router-dom";

interface PortfolioState {
  portfolios: PortfolioType[];
}

const initialState: PortfolioState = {
  portfolios: [],
};

export const PortfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setPortfolios(state, action: PayloadAction<PortfolioType[]>) {
      state.portfolios = action.payload;
    },
    addPortfolio(state, action: PayloadAction<PortfolioType>) {
      state.portfolios.push(action.payload);
    },
    deletePortfolio(state, action: PayloadAction<PortfolioType>) {
      state.portfolios = state.portfolios.filter(
        (p) => p.id !== action.payload.id
      );
    },
    editPortfolio(state, action: PayloadAction<PortfolioType>) {
      const portfolioForEdit = state.portfolios.find(
        (p) => p.id === action.payload.id
      );
      if (portfolioForEdit) {
        const portfolioIndex = state.portfolios.indexOf(portfolioForEdit);
        state.portfolios[portfolioIndex].name = action.payload.name;
        state.portfolios[portfolioIndex].description =
          action.payload.description;
      }
    },
  },
});

export const { setPortfolios, addPortfolio, editPortfolio, deletePortfolio } =
  PortfolioSlice.actions;

export default PortfolioSlice.reducer;
