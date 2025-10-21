// features/packets/packetDetailSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Typ för packet detail
export interface PacketDetailType {
  id: number;
  sändningsnr: string;
  rutt: string;
  expectedTemp: { name: string; min: number; max: number };
  expectedHumidity: { name: string; min: number; max: number };
  transport: { name: string };
  sender: { name: string; address: string; postcode: number; city: string };
  recipient: { name: string; address: string; postcode: number; city: string };
  status: { text: string; timestamp: string }[];
  measurements: { temp: number; humidity: number; timestamp: string }[];
  timeOutsideRange: number;
}

interface PacketDetailState {
  packet: PacketDetailType | null;
  loading: boolean;
  error: string | null;
}

const initialState: PacketDetailState = {
  packet: null,
  loading: false,
  error: null,
};

// Async thunk
export const fetchPacketDetail = createAsyncThunk<
  PacketDetailType,
  string,
  { state: RootState }
>("packetDetail/fetchPacketDetail", async (sändningsnr) => {
  const res = await fetch(`http://localhost:3000/order/${sändningsnr}`);
  if (!res.ok) throw new Error("Failed to fetch packet detail");
  return res.json();
});

const packetDetailSlice = createSlice({
  name: "packetDetail",
  initialState,
  reducers: {
    clearPacketDetail(state) {
      state.packet = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPacketDetail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPacketDetail.fulfilled, (state, action: PayloadAction<PacketDetailType>) => {
      state.loading = false;
      state.packet = action.payload;
    });
    builder.addCase(fetchPacketDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Unknown error";
    });
  },
});

export const { clearPacketDetail } = packetDetailSlice.actions;
export const selectPacketDetail = (state: RootState) => state.packetDetail;
export default packetDetailSlice.reducer;
