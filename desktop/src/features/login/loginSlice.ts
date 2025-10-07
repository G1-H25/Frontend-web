// src/redux/loginSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Typ för state
interface LoginState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: LoginState = {
  token: localStorage.getItem("token") || null, // läser från localStorage om redan inloggad
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
      const response = await fetch(
        "https://g1api-bgeuc6hydmg9etgt.swedencentral-01.azurewebsites.net/Login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data.token; // JWT från backend
    } catch (err) {
      return rejectWithValue("Network error");
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
        localStorage.setItem("token", action.payload); // spara token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
