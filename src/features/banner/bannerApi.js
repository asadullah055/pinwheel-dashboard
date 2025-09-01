import { apiSlice } from "../api/apiSlice";

export const bannerApi = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    // ✅ Create banner
    createBanner: builder.mutation({
      query: (formData) => ({
        url: "/banner/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Banner"],
    }),

  }),
});

export const {
  useCreateBannerMutation,
} = bannerApi;
