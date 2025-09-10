import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// Async thunk för att hämta paket från API
export const fetchPackets = createAsyncThunk(
  "packets/fetchPackets",
  async () => {
    const response = await fetch("http://localhost:3000/orders");
    if (!response.ok) throw new Error("Failed to fetch packets");
    const data = await response.json();

    // Mappa API-data till vår interna Packet-typ
    return data.map((p: any) => ({
      id: p.OrderId.toString(),
      rutt: p.RouteCode,
      sändningsnr: p.Sändningsnr.toString(),
      expectedTemp: {
        min: parseFloat(p.ExpectedTempMin),
        max: parseFloat(p.ExpectedTempMax),
      },
      currentTemp: parseFloat(p.CurrentTemp),
      minTempMeasured: parseFloat(p.ExpectedTempMin),
      maxTempMeasured: parseFloat(p.ExpectedTempMax),
      expectedHumidity: {
        min: parseFloat(p.ExpectedHumidityMin),
        max: parseFloat(p.ExpectedHumidityMax),
      },
      currentHumidity: p.CurrentHumidity,
      minHumidityMeasured: parseFloat(p.ExpectedHumidityMin),
      maxHumidityMeasured: parseFloat(p.ExpectedHumidityMax),
      timeOutsideRange: p.TimeOutsideRange,
      status: { text: p.Status, timestamp: p.StatusTime },
    }));
  }
);

type Status = { text: string; timestamp: string };

type Packet = {
  id: string;
  rutt: string;
  sändningsnr: string;
  expectedTemp: { min: number; max: number };
  currentTemp: number;
  minTempMeasured: number;
  maxTempMeasured: number;
  expectedHumidity: { min: number; max: number };
  currentHumidity: number;
  minHumidityMeasured: number;
  maxHumidityMeasured: number;
  timeOutsideRange: number;
  status: Status;
};

interface PacketsState {
  items: Packet[];
  sortField: keyof Packet | null;
  sortAsc: boolean;
}

const initialState: PacketsState = {
  items: [],
  sortField: null,
  sortAsc: true,
};

const packetsSlice = createSlice({
  name: "packets",
  initialState,
  reducers: {
    setPackets(state, action: PayloadAction<Packet[]>) {
      state.items = action.payload;
    },
    setSortField(state, action: PayloadAction<keyof Packet>) {
      if (state.sortField === action.payload) {
        state.sortAsc = !state.sortAsc;
      } else {
        state.sortField = action.payload;
        state.sortAsc = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPackets.fulfilled, (state, action: PayloadAction<Packet[]>) => {
      state.items = action.payload;
    });
  },
});

// Memoized selector som sorterar paketen
export const selectSortedPackets = createSelector(
  (state: RootState) => state.packets.items,
  (state: RootState) => state.packets.sortField,
  (state: RootState) => state.packets.sortAsc,
  (items, sortField, sortAsc) => {
    return [...items].sort((a, b) => {
      // 1. De som är utanför temp just nu först
      const aOut = a.currentTemp < a.expectedTemp.min || a.currentTemp > a.expectedTemp.max;
      const bOut = b.currentTemp < b.expectedTemp.min || b.currentTemp > b.expectedTemp.max;
      if (aOut !== bOut) return aOut ? -1 : 1;

      // 2. De som varit utanför tidigare
      const aHistory = a.timeOutsideRange > 0;
      const bHistory = b.timeOutsideRange > 0;
      if (aHistory !== bHistory) return aHistory ? -1 : 1;

      // 3. Sortering på valt fält om det finns
      if (sortField) {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (aVal == null || bVal == null) return 0; // skyddar mot undefined
        if (aVal < bVal) return sortAsc ? -1 : 1;
        if (aVal > bVal) return sortAsc ? 1 : -1;
      }

      // 4. Fallback: sortera på rutt A–Ö
      return a.rutt.localeCompare(b.rutt, "sv");
    });
  }
);

export const { setPackets, setSortField } = packetsSlice.actions;
export default packetsSlice.reducer;
