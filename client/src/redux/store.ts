import { configureStore } from "@reduxjs/toolkit";
import tradeStatistic from "./slices/tradeStatistic";
import authSlice from "./slices/auth";
export const store = configureStore({
  reducer: {
    tradeStatistic,
    authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
