import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "admin" | "superadmin" | "siswa";

interface AuthState {
  isLoggedIn: boolean;
  role: UserRole | null;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  role: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ role: UserRole; token: string }>
    ) => {
      state.isLoggedIn = true;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
