import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    userUpdated: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("persist:root"); // remove persisted auth
      window.location.href = "/"; // or use navigate
    },
  },
});

export const { userLoggedIn, userUpdated, userLoggedOut } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;

export const authReducer = authSlice.reducer;
