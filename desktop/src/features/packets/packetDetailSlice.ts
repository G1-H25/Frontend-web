// features/packets/packetDetailSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import rawMockOrders from '../../mocks/orders.json';

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

// Typad mockdata
const mockOrders: PacketDetailType = {
  ...rawMockOrders,
  expectedTemp: {
    name: rawMockOrders.expectedTemp.name,
    min: Number(rawMockOrders.expectedTemp.min),
    max: Number(rawMockOrders.expectedTemp.max),
  },
  expectedHumidity: {
    name: rawMockOrders.expectedHumidity.name,
    min: Number(rawMockOrders.expectedHumidity.min),
    max: Number(rawMockOrders.expectedHumidity.max),
  },
  measurements: rawMockOrders.measurements.map(m => ({
    temp: Number(m.temp),
    humidity: Number(m.humidity),
    timestamp: m.timestamp,
  })),
  timeOutsideRange: Number(rawMockOrders.timeOutsideRange),
};

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

// Async thunk med fallback till mockdata
export const fetchPacketDetail = createAsyncThunk<
  PacketDetailType,
  number,
  { state: RootState }
>("packetDetail/fetchPacketDetail", async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/order/${id}`);
    if (!res.ok) throw new Error("Failed to fetch packet detail");
    const data = await res.json();
    return data as PacketDetailType;
  } catch (error) {
    console.warn("Kunde inte hämta från produktion, använder mockdata", error);
    return mockOrders;
  }
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
