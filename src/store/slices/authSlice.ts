// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  nama: string;
  role: "admin" | "superadmin" | "siswa"; // role bisa disesuaikan
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  id: "",
  nama: "",
  role: "siswa", // default kalau belum login
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ id: string; nama: string; role: UserRole }>
    ) => {
      state.isLoggedIn = true;
      state.id = action.payload.id;
      state.nama = action.payload.nama;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.id = "";
      state.nama = "";
      state.role = "siswa";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
