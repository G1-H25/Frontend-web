// desktop\src\features\login\loginSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJson } from "../../utils/api";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getTokenExpiration, isTokenExpired } from "../../utils/jwt";
import type { RootState } from "../../app/store";

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

// Async thunk för login
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      console.debug('Login: attempting login...', { username: credentials.username });
      const data = await fetchJson("/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      console.debug('Login: received response:', data);

      // tolerate different response shapes: { token }, { accessToken }, { data: { token } }
      const token = (data && (data.token ?? data.accessToken ?? data?.data?.token)) as string | undefined;
      if (!token) {
        console.error('Login: Invalid response format - no token found:', data);
        return rejectWithValue('Invalid response format from server');
      }

      return token;
    } catch (err) {
      console.error("Login failed:", err);
      // Log the full error for debugging
      if (err instanceof Error) {
        console.debug('Login error details:', {
          message: err.message,
          stack: err.stack,
          cause: (err as any).cause
        });
      }
      return rejectWithValue((err as Error).message ?? "Network error");
    }
  }
);

// Ny thunk: checkTokenValidity för automatisk logout
export const checkTokenValidity = createAsyncThunk(
  "login/checkTokenValidity",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const token = state.login.token;

    if (token) {
      const exp = getTokenExpiration(token);
      if (!exp || isTokenExpired(exp)) {
        dispatch(logout());
      }
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
