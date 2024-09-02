import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null,
  otpToken:null
}


const userAuthSlice = createSlice({
  name:'userAuth',
  initialState,
  reducers:{
    storeOTP:(state,action)=>{
      state.otpToken = action.payload;
      
    },
    setUser:(state,action)=>{
      state.userInfo = action.payload;
      localStorage.setItem('userInfo',JSON.stringify(action.payload));
    },
    logoutUser:(state,action)=>{
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    }
  }
})

export const {
  storeOTP,
  setUser,
  logoutUser
} = userAuthSlice.actions;

export default userAuthSlice.reducer;