import { apiSlice } from "../api/apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Create Category
    createCategory: builder.mutation({
      query: (formData) => ({
        url: "/category/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"], // so list refetches
    }),

    // 🔹 Get All (Paginated)
    getAllCategories: builder.query({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/category/getAllCategory?page=${page}&limit=${limit}`,
      providesTags: ["Category"],
    }),

    // 🔹 Get Dropdown Categories
    getDropdownCategories: builder.query({
      query: () => "/category/dropdownCategories",
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetDropdownCategoriesQuery,
} = categoryApi;