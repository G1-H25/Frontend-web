import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type Status = { text: string; timestamp: string };

type Packet = {
  id: string;
  rutt: string;
  sändningsnr: string;
  expectedTemp: { min: number; max: number };
  currentTemp: number;
  minTempMeasured: number;
  maxTempMeasured: number;
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
});

export const selectSortedPackets = (state: RootState) => {
  const { items, sortField, sortAsc } = state.packets;

  return [...items].sort((a, b) => {
    // 1. Utanför intervall just nu först
    const aOut = a.currentTemp < a.expectedTemp.min || a.currentTemp > a.expectedTemp.max;
    const bOut = b.currentTemp < b.expectedTemp.min || b.currentTemp > b.expectedTemp.max;
    if (aOut !== bOut) return aOut ? -1 : 1;

    // 2. De som varit utanför men nu inne
    const aHistory = a.timeOutsideRange > 0;
    const bHistory = b.timeOutsideRange > 0;
    if (aHistory !== bHistory) return aHistory ? -1 : 1;

    // 3. Sortering A–Ö eller Ö–A på valt fält
    if (sortField) {
      const aVal = (a as any)[sortField];
      const bVal = (b as any)[sortField];

      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
    }
    return 0;
  });
};

export const { setPackets, setSortField } = packetsSlice.actions;
export default packetsSlice.reducer;
