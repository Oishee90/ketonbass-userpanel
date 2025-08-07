import { apiSlice } from "../../api/apiSlice";

export const microauthapi = apiSlice.injectEndpoints({
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
      invalidatesTags: ["Pdf"],
    }),

    getReciepts: builder.query({
      query: () => ({
        url: "api/v1/invoice/",
        method: "GET",
      }),
      providesTags: ["Pdf"],
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
    // purchase
    updateOrder: builder.mutation({
      query: ({ orderId, formData }) => ({
        url: `api/v1/user-orders/update/${orderId}/`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Purchase"],
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `api/v1/user-delete-order/${orderId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Purchase"],
    }),
    deleteRecipts: builder.mutation({
      query: (orderId) => ({
        url: `api/v1/invoice/${orderId}/delete/`,
        method: "DELETE",
      }),
    }),
    getReceiptDetails: builder.query({
      query: (orderId) => ({
        url: `api/v1/invoice/${orderId}/`,
        method: "GET",
      }),
    }),
    // track
    postTabInteraction: builder.mutation({
      query: (tab_name) => ({
        url: "api/v1/track-interaction/", // তোমার backend API
        method: "POST",
        body: { tab_name }, // যেমন { "tab_name": "dashboard" }
      }),
    
    }),
    // replacement
     getMainProducts: builder.query({
      query: () => "/google-auth/google/main-product/",
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
  useGetRecieptsQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useDeleteReciptsMutation,
  useGetReceiptDetailsQuery,
  usePostTabInteractionMutation,
  useGetMainProductsQuery
} = microauthapi;
