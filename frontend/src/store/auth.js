// store/auth.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
   name: "auth",
   initialState: {
      isLoggedIn: false,
      role: null,
   },
   reducers: {
      login(state) {
         state.isLoggedIn = true;
      },
      logout(state) {
         state.isLoggedIn = false;
         state.role = null;
      },
      changeRole(state, action) {
         state.role = action.payload;
      },
   },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
