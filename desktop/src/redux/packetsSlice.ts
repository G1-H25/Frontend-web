import { createSlice, createAsyncThunk, createSelector, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// Async thunk för att hämta paket från API
export const fetchPackets = createAsyncThunk(
  "packets/fetchPackets",
  async () => {
    const response = await fetch("http://localhost:3000/orders");
    if (!response.ok) throw new Error("Failed to fetch packets");
    const data = await response.json();
    return data as ApiPacket[];
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
  sender: string;
  transport: string;
};

// Typ som matchar API-svaret
type ApiPacket = Omit<Packet, "sender" | "transport"> & {
  sender: { name: string };
  transport: { name: string };
};

interface PacketsState {
  items: Packet[];
  sortField: keyof Packet | null;
  sortAsc: boolean;
  filters: {
    rutt: string[];
    status: string[];
    sender: string[];
    transport: string[];
    timeOutsideRange: boolean;
  };
}

const initialState: PacketsState = {
  items: [],
  sortField: null,
  sortAsc: true,
  filters: {
    rutt: [],
    status: [],
    sender: [],
    transport: [],
    timeOutsideRange: false,
  },
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
    setFilterArray(
      state,
      action: PayloadAction<{ field: "rutt" | "status" | "sender" | "transport"; values: string[] }>
    ) {
      state.filters[action.payload.field] = action.payload.values;
    },
    setFilterBoolean(
      state,
      action: PayloadAction<{ field: "timeOutsideRange"; value: boolean }>
    ) {
      state.filters[action.payload.field] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPackets.fulfilled, (state, action: PayloadAction<ApiPacket[]>) => {
      // Mappa sender/transport till string direkt
      state.items = action.payload.map(p => ({
        ...p,
        sender: p.sender.name,
        transport: p.transport.name,
      }));
    });
  },
});

export const selectSortedPackets = createSelector(
  (state: RootState) => state.packets.items,
  (state: RootState) => state.packets.sortField,
  (state: RootState) => state.packets.sortAsc,
  (state: RootState) => state.packets.filters,
  (items, sortField, sortAsc, filters) => {
    let filtered = [...items];

    if (filters.rutt.length > 0) {
      filtered = filtered.filter(p => filters.rutt.includes(p.rutt));
    }
    if (filters.status.length > 0) {
      filtered = filtered.filter(p => filters.status.includes(p.status.text));
    }
    if (filters.sender.length > 0) {
      filtered = filtered.filter(p => filters.sender.includes(p.sender));
    }
    if (filters.transport.length > 0) {
      filtered = filtered.filter(p => filters.transport.includes(p.transport));
    }
    if (filters.timeOutsideRange) {
      filtered = filtered.filter(p => p.timeOutsideRange > 0);
    }

    return filtered.sort((a, b) => {
      const aOut =
        a.currentTemp < a.expectedTemp.min ||
        a.currentTemp > a.expectedTemp.max ||
        a.currentHumidity < a.expectedHumidity.min ||
        a.currentHumidity > a.expectedHumidity.max;

      const bOut =
        b.currentTemp < b.expectedTemp.min ||
        b.currentTemp > b.expectedTemp.max ||
        b.currentHumidity < b.expectedHumidity.min ||
        b.currentHumidity > b.expectedHumidity.max;

      if (aOut !== bOut) return aOut ? -1 : 1;

      const aHistory = a.timeOutsideRange > 0;
      const bHistory = b.timeOutsideRange > 0;
      if (aHistory !== bHistory) return aHistory ? -1 : 1;

      if (sortField) {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (aVal == null || bVal == null) return 0;
        if (aVal < bVal) return sortAsc ? -1 : 1;
        if (aVal > bVal) return sortAsc ? 1 : -1;
      }

      const ruttCmp = a.rutt.localeCompare(b.rutt, "sv");
      if (ruttCmp !== 0) return ruttCmp;

      return a.status.text.localeCompare(b.status.text, "sv");
    });
  }
);

export const { setPackets, setSortField, setFilterArray, setFilterBoolean } = packetsSlice.actions;
export default packetsSlice.reducer;
