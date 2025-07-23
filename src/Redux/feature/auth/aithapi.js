import { apiSlice } from "../../api/apiSlice";

export const authapi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTotalPurchasePrice: builder.query({
      query: () => ({
        url: "/api/v1/user-orders/total-price/",
        method: "GET",
      }),
      providesTags: ["Purchase,"],
    }),
    getActiveWarranties: builder.query({
      query: () => ({
        url: "/api/v1/user-orders/active-warranty-count/",
        method: "GET",
      }),
      providesTags: ["Purchase"],
    }),
    getUpcomingReminders: builder.query({
      query: () => ({
        url: "/api/v1/user-orders/total-upcoming-warranty/",
        method: "GET",
      }),
      providesTags: ["Purchase"],
    }),
    getInbox: builder.query({
      query: () => ({
        url: "google-auth/google/sync/",
        method: "GET",
      }),
    }),
    getPurchase: builder.query({
      query: () => ({
        url: "/api/v1/user-orders/",
        method: "GET",
      }),
      providesTags: ["Purchase"],
    }),

    syncGoogleData: builder.query({
      query: () => ({
        url: "google-auth/google/sync/",
        method: "GET", // This will be a GET request
      }),
    }),

    // updateProfile: builder.mutation({
    //   query: (updatedata) => ({
    //     url: "/profile/update_me/",
    //     method: "PATCH",
    //     body: updatedata,
    //   }),
    //   invalidatesTags: ["Profile"],
    // }),
    // package
    createPurchase: builder.mutation({
      query: (newPackage) => ({
        url: "api/v1/orders/create/",
        method: "POST",
        body: newPackage,
      }),
      invalidatesTags: ["Purchase"],
    }),
    // upload pdf
    uploadFile: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "api/v1/ai-order-extract/", // Your endpoint
          method: "POST",
          body: formData,
        };
      },
    }),
    // calender
    createEvent: builder.mutation({
      query: (newEvent) => ({
        url: "api/v1/calendar/create/",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: ["Events"],
    }),

    getEvents: builder.query({
      query: () => ({
        url: "api/v1/calendar/list/",
        method: "GET", // This will be a GET request
      }),
      providesTags: ["Events"],
    }),

    // updatePackage: builder.mutation({
    //   query: ({ id, ...patchData }) => ({
    //     url: `/adminapi/packages/${id}/`,
    //     method: "PATCH",
    //     body: patchData,
    //   }),
    //   invalidatesTags: ["Package"],
    // }),
    // deletePackage: builder.mutation({
    //   query: (id) => ({
    //     url: `/adminapi/packages/${id}/`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Package"],
    // }),

    // getPackageById: builder.query({
    //   query: (id) => `/adminapi/packages/${id}/`,
    //   providesTags: ["Package"],

    //   reciepe
  }),
});

export const {
  useGetTotalPurchasePriceQuery,
  useGetInboxQuery,
  useGetActiveWarrantiesQuery,
  useGetUpcomingRemindersQuery,
  useCreatePurchaseMutation,
  useUploadFileMutation,
  useGetPurchaseQuery,
  useSyncGoogleDataQuery,
  useGetEventsQuery,
  useCreateEventMutation,
} = authapi;
