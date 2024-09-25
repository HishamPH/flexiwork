import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  otpToken: null,
};

export const logoutUser = createAsyncThunk("userAuth/logoutUser", async () => {
  try {
    axios.post("/api/user/logout");
  } catch (error) {
    console.log(error);
  }
});

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    storeOTP: (state, action) => {
      state.otpToken = action.payload;
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userInfo = null;
        state.otpToken = null;
        localStorage.removeItem("userInfo");
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { storeOTP, setUser } = userAuthSlice.actions;

export default userAuthSlice.reducer;
