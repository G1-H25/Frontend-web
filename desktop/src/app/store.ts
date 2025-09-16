import { configureStore } from "@reduxjs/toolkit";
import packetsReducer from "../redux/packetsSlice";

export const store = configureStore({
  reducer: {
    packets: packetsReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
