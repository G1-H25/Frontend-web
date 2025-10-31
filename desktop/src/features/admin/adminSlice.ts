import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchText } from "../../utils/api";

interface NewUser {
  username: string;
  password: string;
  role: string;
  companyId: number;
}

interface AdminState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AdminState = {
  loading: false,
  error: null,
  success: false,
};

// Async thunk för att skapa användare
export const signupUser = createAsyncThunk<
  string,          // ✅ Returntyp
  NewUser,         // ✅ Argumenttyp
  { rejectValue: string } // ✅ Typ för rejectWithValue
>(
  "admin/signupUser",
  async (newUser, { rejectWithValue }) => {
    try {
      const text = await fetchText("/Signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      return text; // t.ex. "User created successfully."
    } catch (err) {
      console.error("Signup failed:", err);
      return rejectWithValue((err as Error).message ?? "Network error");
    }
  }
);



const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Okänt fel";
      });


  },
});

export const { resetState } = adminSlice.actions;
export default adminSlice.reducer;
