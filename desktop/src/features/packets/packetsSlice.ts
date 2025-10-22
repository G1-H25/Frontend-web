import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const API_URL =
  import.meta.env.DEV
    ? "/api"
    : "https://g1api-bgeuc6hydmg9etgt.swedencentral-01.azurewebsites.net";

// Typ för API-responsen (rådata innan vi mappar den)
type RawPacket = {
  deliveryId?: string | number;
  routeCode?: string;
  expectedTempMin?: number;
  expectedTempMax?: number;
  currentTemp?: number;
  tempMinMeasured?: number;
  tempMaxMeasured?: number;
  expectedHumidMin?: number;
  expectedHumidMax?: number;
  currentHumid?: number;
  humidMinMeasured?: number;
  humidMaxMeasured?: number;
  tempOutOfRange?: number;
  status?: { text: string; timestamp: string };
  sender?: string;
  carrier?: string;
};

// Async thunk för att hämta paket
export const fetchPackets = createAsyncThunk<RawPacket[]>(
  "packets/fetchPackets",
  async () => {
    const response = await fetch(`${API_URL}/Delivery/retrieve`);
    if (!response.ok) throw new Error("Failed to fetch packets");
    const data: RawPacket[] = await response.json();
    return data;
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
      action: PayloadAction<{
        field: "rutt" | "status" | "sender" | "transport";
        values: string[];
      }>
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
    builder.addCase(fetchPackets.fulfilled, (state, action) => {
      state.items = action.payload.map((p) => ({
        id: p.deliveryId?.toString() ?? "",
        sändningsnr: p.deliveryId?.toString() ?? "",
        rutt: p.routeCode ?? "",
        expectedTemp: {
          min: p.expectedTempMin ?? 0,
          max: p.expectedTempMax ?? 0,
        },
        currentTemp: p.currentTemp ?? 0,
        minTempMeasured: p.tempMinMeasured ?? 0,
        maxTempMeasured: p.tempMaxMeasured ?? 0,
        expectedHumidity: {
          min: p.expectedHumidMin ?? 0,
          max: p.expectedHumidMax ?? 0,
        },
        currentHumidity: p.currentHumid ?? 0,
        minHumidityMeasured: p.humidMinMeasured ?? 0,
        maxHumidityMeasured: p.humidMaxMeasured ?? 0,
        timeOutsideRange: p.tempOutOfRange ?? 0,
        status:
          p.status ?? {
            text: "Mottagen",
            timestamp: new Date().toISOString(),
          },
        sender: p.sender ?? "Okänd avsändare",
        transport: p.carrier ?? "Okänd transport",
      }));
    });
  },
});

// SELECTOR
export const selectSortedPackets = createSelector(
  (state: RootState) => state.packets.items,
  (state: RootState) => state.packets.sortField,
  (state: RootState) => state.packets.sortAsc,
  (state: RootState) => state.packets.filters,
  (items, sortField, sortAsc, filters) => {
    let filtered = [...items];

    if (filters.rutt.length > 0) {
      filtered = filtered.filter((p) => filters.rutt.includes(p.rutt));
    }
    if (filters.status.length > 0) {
      filtered = filtered.filter((p) => filters.status.includes(p.status.text));
    }
    if (filters.sender.length > 0) {
      filtered = filtered.filter((p) => filters.sender.includes(p.sender));
    }
    if (filters.transport.length > 0) {
      filtered = filtered.filter((p) =>
        filters.transport.includes(p.transport)
      );
    }
    if (filters.timeOutsideRange) {
      filtered = filtered.filter((p) => p.timeOutsideRange > 0);
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

export const {
  setPackets,
  setSortField,
  setFilterArray,
  setFilterBoolean,
} = packetsSlice.actions;

export default packetsSlice.reducer;
