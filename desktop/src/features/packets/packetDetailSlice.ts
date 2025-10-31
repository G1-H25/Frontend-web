// features/packets/packetDetailSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import rawMockOrders from '../../mocks/orders.json';
import { fetchOrder } from '../../utils/api';

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
    const data: any = await fetchOrder(id);
    console.debug("PacketDetail: received data from API:", data);

    // Map backend shape to PacketDetailType expected by the UI
    const mapped: PacketDetailType = {
      id: Number(data.deliveryId ?? data.DeliveryId ?? 0),
      rutt: data.routeCode ?? data.RouteCode ?? "",
      expectedTemp: {
        name: data.expectedTempName ?? data.expectedTemp?.name ?? "Temperatur",
        min: Number(data.expectedTempMin ?? data.ExpectedTempMin ?? 0),
        max: Number(data.expectedTempMax ?? data.ExpectedTempMax ?? 0),
      },
      expectedHumidity: {
        name: data.expectedHumidName ?? data.expectedHumidity?.name ?? "Luftfuktighet",
        min: Number(data.expectedHumidMin ?? data.ExpectedHumidMin ?? 0),
        max: Number(data.expectedHumidMax ?? data.ExpectedHumidMax ?? 0),
      },
      transport: { name: data.carrier ?? data.Carrier ?? data.transport ?? "Okänd transport" },
      sender: {
        name: data.sender ?? data.Sender ?? data.SenderName ?? "Okänd avsändare",
        address: data.senderAddress ?? "",
        postcode: Number(data.senderPostcode ?? 0),
        city: data.senderCity ?? "",
      },
      recipient: {
        name: data.recipient ?? data.Recipient ?? data.RecipientName ?? "Okänd mottagare",
        address: data.recipientAddress ?? "",
        postcode: Number(data.recipientPostcode ?? 0),
        city: data.recipientCity ?? "",
      },
      status: [
        {
          text: data.currentState ?? data.CurrentState ?? data.statusText ?? "Mottagen",
          timestamp: data.statusUpdated ?? data.StatusUpdated ?? new Date().toISOString(),
        },
      ],
      measurements: Array.isArray(data.measurements)
        ? data.measurements.map((m: any) => ({
            temp: Number(m.temp ?? m.temperature ?? 0),
            humidity: Number(m.humidity ?? m.humdity ?? 0),
            timestamp: m.timestamp ?? m.time ?? new Date().toISOString(),
          }))
        : [],
      timeOutsideRange: Number(data.tempOutOfRange ?? data.TempOutOfRange ?? data.timeOutsideRange ?? 0),
    };

    return mapped;
  } catch (error) {
    console.warn("PacketDetail: API call failed, using mockdata:", error);
    console.debug("PacketDetail: falling back to mock:", mockOrders);
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
