import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./slices/userAuth";
import adminAuth from "./slices/adminAuth";

const store = configureStore({
  reducer: {
    user: userAuth,
    admin: adminAuth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export const dispatch = store.dispatch;

export default store;
