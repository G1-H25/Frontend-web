// features/packets/packetDetailSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { API_URL } from "../../config/api";

// Typ för packet detail
export interface PacketDetailType {
  id: number;
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

// 🚀 Hämtar packet details från produktions-API
export const fetchPacketDetail = createAsyncThunk<
  PacketDetailType,
  number,
  { state: RootState }
>("packetDetail/fetchPacketDetail", async (id) => {
  const res = await fetch(`${API_URL}/order/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch packet detail");
  }

  return (await res.json()) as PacketDetailType;
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
    builder.addCase(
      fetchPacketDetail.fulfilled,
      (state, action: PayloadAction<PacketDetailType>) => {
        state.loading = false;
        state.packet = action.payload;
      }
    );
    builder.addCase(fetchPacketDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Unknown error";
    });
  },
});

export const { clearPacketDetail } = packetDetailSlice.actions;
export const selectPacketDetail = (state: RootState) => state.packetDetail;
export default packetDetailSlice.reducer;
