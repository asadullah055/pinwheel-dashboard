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

    getCategoryById: builder.query({
      query: (id) => `/category/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Category", id }],
    }),

    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetDropdownCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} = categoryApi;
