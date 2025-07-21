import { apiSlice } from "../../api/apiSlice";



export const authapi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

  
    getTotalOrder: builder.query({
      query: () => ({
        url: "/profile/me/",
        method: "GET",
      }),
      providesTags: ["Profile"],
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
  
    // addPackage: builder.mutation({
    //   query: (newPackage) => ({
    //     url: "/adminapi/packages/",
    //     method: "POST",
    //     body: newPackage,
    //   }),
    //   invalidatesTags: ["Package"],
    // }),
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
  

} = authapi;