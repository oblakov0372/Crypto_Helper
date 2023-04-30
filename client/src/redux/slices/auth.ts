import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      localStorage.setItem("jwt", action.payload);
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("jwt");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
