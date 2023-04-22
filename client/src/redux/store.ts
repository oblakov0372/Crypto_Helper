import { configureStore } from "@reduxjs/toolkit";
import tradeStatistic from "./slices/tradeStatistic";
export const store = configureStore({
  reducer: {
    tradeStatistic,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
