import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Google user info
  user: null,
  accessToken: null,
  refreshToken: null,
  googleAccessToken: null,
  googleRefreshToken: null,
  googleTokenExpiry: null,

  // Microsoft user info
  microsoftUser: null,
  microsoftAccessToken: null,
  microsoftRefreshToken: null,
  microsoftTokenExpiry: null,

  // Common
  authProvider: null, // 'google' or 'microsoft'
  messages: null, // comes from backend, e.g., "Google" or "Microsoft"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Google Login
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
        messages,
      } = action.payload;

      // fallback for user object
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

      state.authProvider = "google";
      state.messages = messages || "null";
    },

    // Microsoft Login
    microsoftLoggedIn: (state, action) => {
      const {
        microsoftUser,
        microsoft_access_token,
        microsoft_refresh_token,
        microsoft_token_expiry,
        messages,
      } = action.payload;

      state.microsoftUser = microsoftUser || null;
      state.microsoftAccessToken = microsoft_access_token || null;
      state.microsoftRefreshToken = microsoft_refresh_token || null;
      state.microsoftTokenExpiry = microsoft_token_expiry || null;

      state.authProvider = "microsoft";
      state.messages = messages || "Microsoft";
    },

    // Logout
    userLoggedOut: (state) => {
      // Clear Google-related
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.googleAccessToken = null;
      state.googleRefreshToken = null;
      state.googleTokenExpiry = null;

      // Clear Microsoft-related
      state.microsoftUser = null;
      state.microsoftAccessToken = null;
      state.microsoftRefreshToken = null;
      state.microsoftTokenExpiry = null;

      // Common
      state.authProvider = null;
      state.messages = null;
    },
  },
});

export const { userLoggedIn, microsoftLoggedIn, userLoggedOut } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
