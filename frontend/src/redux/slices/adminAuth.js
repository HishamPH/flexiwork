import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
};

export const logoutAdmin = createAsyncThunk(
  "adminAuth/logoutAdmin",
  async () => {
    try {
      axios.post("/api/admin/logout");
    } catch (err) {
      console.log(err);
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.adminInfo = null;
        localStorage.removeItem("adminInfo");
        state.loading = false;
      })
      .addCase(logoutAdmin.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setAdmin } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
