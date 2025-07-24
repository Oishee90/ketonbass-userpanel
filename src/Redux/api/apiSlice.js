import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://server.156-67-218-177.sslip.io/",
  prepareHeaders: (headers, { getState }) => {
    // Try to get token from Redux state
    const token = getState().auth?.accessToken || null;

    // If token not in state, retrieve from local storage
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else {
      const authData = JSON.parse(localStorage.getItem("auth")); // Parse the `auth` object from local storage
      if (authData?.accessToken) {
        headers.set("authorization", `Bearer ${authData.accessToken}`); // Set Authorization header
      }
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["user", "Purchase", "Package", "Events", "Pdf"],
  endpoints: () => ({}),
});
