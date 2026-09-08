import { apiSlice } from "../api/apiSlice";

export const brandApi = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    // ✅ Create brand
    createBrand: builder.mutation({
      query: (formData) => ({
        url: "/brand/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Brand"],
    }),

    // ✅ Get all brands with pagination
    getAllBrands: builder.query({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/brand/getAllBrands?page=${page}&limit=${limit}`,
      providesTags: ["Brand"],
    }),

    // ✅ Dropdown brand list
    getDropdownBrands: builder.query({
      query: () => "/brand/dropdownBrands",
      providesTags: ["Brand"],
    }),

    getBrandById: builder.query({
      query: (id) => `/brand/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Brand", id }],
    }),

    updateBrand: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/brand/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetAllBrandsQuery,
  useGetDropdownBrandsQuery,
  useGetBrandByIdQuery,
  useUpdateBrandMutation,
} = brandApi;
