import { apiSlice } from "../../api/apiSlice";

export const microauthapi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    MicrosoftGetInbox: builder.query({
      query: () => ({
        url: "/microsoft-auth/warranty-sync/",
        method: "GET",
      }),
    }),

    // calender
    getMicrosoftEvents: builder.query({
      query: () => ({
        url: "api/v1/outlook-calendar/list/",
        method: "GET", // This will be a GET request
      }),
      providesTags: ["Events"],
    }),

    createMicrosoftEvent: builder.mutation({
      query: (newEvent) => ({
        url: "api/v1/outlook-calendar/create/",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: ["Events"],
    }),

    // replacement
    getMicrosoftMainProducts: builder.query({
      query: () => "/microsoft-auth/main-product/",
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
  useMicrosoftGetInboxQuery,
  useGetMicrosoftEventsQuery,
  useGetMicrosoftMainProductsQuery,
  useCreateMicrosoftEventMutation,
} = microauthapi;
