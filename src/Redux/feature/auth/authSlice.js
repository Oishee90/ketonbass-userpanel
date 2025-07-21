// src/Redux/feature/auth/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  googleAccessToken: null,
  googleRefreshToken: null,
  googleTokenExpiry: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      const {
        user,
        name,
        email,
        profile_picture,
        access_token,
        refresh_token,
        google_access_token,
        google_refresh_token,
        google_token_expiry,
      } = action.payload;
 console.lo
      // If `user` not sent, use fallback
      state.user = user || {
        name: name || "",
        email: email || "",
        profile_picture: profile_picture || "",
      };

      state.accessToken = access_token || null;
      state.refreshToken = refresh_token || null;
      state.googleAccessToken = google_access_token || null;
      state.googleRefreshToken = google_refresh_token || null;
      state.googleTokenExpiry = google_token_expiry || null;
    },

    userLoggedOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.googleAccessToken = null;
      state.googleRefreshToken = null;
      state.googleTokenExpiry = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
