import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CryptoType } from "../../types/CryptoType";

interface CoinState {
  coins: CryptoType[];
}

const initialState: CoinState = {
  coins: [],
};

export const CoinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    setCoins(state, action: PayloadAction<CryptoType[]>) {
      state.coins = action.payload;
    },
  },
});

export const { setCoins } = CoinSlice.actions;

export default CoinSlice.reducer;
