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
    getAllBanners: builder.query({
      query: ({ page = 1, limit = 10, bannerType } = {}) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        if (bannerType) params.append("bannerType", bannerType);

        return {
          url: `/banner?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Banner"],
    }),

    // ✅ Get single banner by ID
    getBannerById: builder.query({
      query: (id) => ({
        url: `/banner/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Banner", id }],
    }),

    // ✅ Update banner
    updateBanner: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/banner/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Banner",
        { type: "Banner", id },
      ],
    }),

    // ✅ Delete banner
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/${id}`,
        method: "DELETE",
      }),
      // This will refetch the data after successful deletion
      invalidatesTags: ["Banner"],
    }),

    // ✅ Toggle banner status
    toggleBannerStatus: builder.mutation({
      query: (id) => ({
        url: `/banner/${id}/toggle-status`,
        method: "PATCH",
      }),
      // Optimistic update configuration
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        // Get all cached queries
        const state = getState();
        const queries = state.api.queries;

        // Update all getAllBanners caches
        const patchResults = [];

        Object.keys(queries).forEach((key) => {
          if (key.startsWith("getAllBanners")) {
            // Extract query args from the cache key
            const queryArgs = queries[key]?.originalArgs;

            if (queryArgs) {
              const patchResult = dispatch(
                bannerApi.util.updateQueryData(
                  "getAllBanners",
                  queryArgs, // Pass the exact query arguments
                  (draft) => {
                    const banner = draft.banners.find((b) => b._id === id);
                    if (banner) {
                      banner.isActive = !banner.isActive;
                    }
                  }
                )
              );
              patchResults.push(patchResult);
            }
          }
        });

        try {
          await queryFulfilled;
        } catch {
          // Revert all patches on error
          patchResults.forEach((patchResult) => patchResult.undo());
        }
      },
      invalidatesTags: (result, error, id) => [
        "Banner",
        { type: "Banner", id },
      ],
    }),

     // ✅ Update banner priorities
    updateBannerPriority: builder.mutation({
      query: (banners) => ({
        url: "/banner/update-priority",
        method: "PATCH",
        body: { banners },
      }),
      invalidatesTags: ["Banner", "ActiveBanner"],
    }),
  }),
});

export const {
  useCreateBannerMutation,
  useGetAllBannersQuery,
  useGetBannerByIdQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useToggleBannerStatusMutation,
  useUpdateBannerPriorityMutation,
} = bannerApi;
