import { apiSlice } from "../../api/apiSlice";

export const authapi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTotalPurchasePrice: builder.query({
      query: () => ({
        url: "/api/v1/user-orders/total-price/",
        method: "GET",
      }),
      providesTags: ["TotalPurchase"],
    }),
    getActiveWarranties: builder.query({
      query: () => ({
        url: "/api/v1/user-orders/active-warranty-count/",
        method: "GET",
      }),
      providesTags: ["TotalPurchase"],
    }),
    getUpcomingReminders: builder.query({
      query: () => ({
        url: "/api/v1/user-orders/total-upcoming-warranty/",
        method: "GET",
      }),
      providesTags: ["TotalPurchasePrice"],
    }),
    getInbox: builder.query({
      query: () => ({
        url: "google-auth/google/warranty/",
        method: "GET",
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
      invalidatesTags: ["TotalPurchase"],
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
} = authapi;
