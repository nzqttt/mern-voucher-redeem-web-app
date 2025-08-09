// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  user: null,
  isLoggedIn: false,
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

// Export actions
export const { setUser, logoutUser, updateUser } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
