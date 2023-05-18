import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionType } from "../../types/TransactionType";

interface TransactionState {
  transactions: TransactionType[];
}

const initialState: TransactionState = {
  transactions: [],
};

export const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions(state, action: PayloadAction<TransactionType[]>) {
      state.transactions = action.payload;
    },
    addTransaction(state, action: PayloadAction<TransactionType>) {
      state.transactions.push(action.payload);
    },
    deleteTransaction(state, action: PayloadAction<TransactionType>) {
      state.transactions = state.transactions.filter(
        (p) => p.id !== action.payload.id
      );
    },
    editTransaction(state, action: PayloadAction<TransactionType>) {
      const transactionForEdit = state.transactions.find(
        (p) => p.id === action.payload.id
      );
      if (transactionForEdit) {
        const transactionIndex = state.transactions.indexOf(transactionForEdit);
        state.transactions[transactionIndex].coinSymbol =
          action.payload.coinSymbol;
        state.transactions[transactionIndex].count = action.payload.count;
        state.transactions[transactionIndex].portfolioId =
          action.payload.portfolioId;
        state.transactions[transactionIndex].price = action.payload.price;
      }
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
} = TransactionSlice.actions;

export default TransactionSlice.reducer;
