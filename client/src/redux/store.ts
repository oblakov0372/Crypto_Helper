import { configureStore } from "@reduxjs/toolkit";
import tradeStatisticSlice from "./slices/tradeStatistic";
import authSlice from "./slices/auth";
import portfolioSlice from "./slices/portfolio";
import portfolioTokenSlice from "./slices/portfolioToken";
import transactionSlice from "./slices/transaction";
export const store = configureStore({
  reducer: {
    tradeStatisticSlice,
    authSlice,
    portfolioSlice,
    portfolioTokenSlice,
    transactionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
