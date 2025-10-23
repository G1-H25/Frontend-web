// desktop\src\features\login\loginSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { isTokenExpired } from "../../utils/jwt";

// Typ för state
interface LoginState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: LoginState = {
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const API_URL =
  import.meta.env.DEV
    ? "/api"
    : "https://g1api-bgeuc6hydmg9etgt.swedencentral-01.azurewebsites.net";

// Async thunk för login
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${API_URL}/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data.token;
    } catch (err) {
      console.error("Login failed:", err);
      return rejectWithValue("Network error");
    }
  }
);

// Ny thunk: checkTokenValidity för automatisk logout
export const checkTokenValidity = createAsyncThunk(
  "login/checkTokenValidity",
  async (_, { dispatch, getState }) => {
    const state = getState() as any;
    const token = state.login.token;
    if (token && isTokenExpired(token)) {
      dispatch(logout());
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
