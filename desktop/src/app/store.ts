import { configureStore } from "@reduxjs/toolkit";
import packetsReducer from "../features/packets/packetsSlice";
import loginReducer from "../features/login/loginSlice";
import adminReducer from "../features/admin/adminSlice";
import detailReducer from "../features/packets/packetDetailSlice";

export const store = configureStore({
  reducer: {
    packets: packetsReducer,
    login: loginReducer,
    admin: adminReducer,
    packetDetail: detailReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
