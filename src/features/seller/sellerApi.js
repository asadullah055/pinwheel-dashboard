import { apiSlice } from "../api/apiSlice";

export const sellerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSellers: builder.query({
      query: () => "/auth/sellers",
      providesTags: ["Seller"],
    }),
  }),
});

export const { useGetSellersQuery } = sellerApi;
