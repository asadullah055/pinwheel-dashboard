import toast from "react-hot-toast";
import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create product
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // ✅ Get all products (with pagination)
    getAllProducts: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/product/getAllProducts?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map((prod) => ({
                type: "Product",
                id: prod._id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    // ✅ Get single product
    getSingleProduct: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: (_res, _err, id) => [{ type: "Product", id }],
    }),

    // ✅ Update product by id
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["Product"],
    }),

    // ✅ Update product price & stock
    updatePriceAndStock: builder.mutation({
      query: (data) => ({
        url: `/product/updatePrice`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted({ id, ...rest }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productApi.util.updateQueryData(
            "getAllProducts",
            { page: 1, limit: 10 },
            (draft) => {
              const updatedProduct = draft?.products?.find(
                (prod) => prod._id === id
              );
              if (updatedProduct) {
                if (rest.stock !== undefined) updatedProduct.stock = rest.stock;
                if (rest.regularPrice !== undefined)
                  updatedProduct.regularPrice = rest.regularPrice;
                if (rest.discountPrice !== undefined)
                  updatedProduct.discountPrice = rest.discountPrice;
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          toast.error("Price/stock update failed");
        }
      },
    }),

    // ✅ Update product status
    updateStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/updateStatus/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(
        { id, data, queryArg },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          productApi.util.updateQueryData(
            "getAllProducts",
            queryArg, // 👈 dynamically apply pagination
            (draft) => {
              const product = draft?.products?.find((prod) => prod._id === id);
              if (product) {
                product.status = data.status;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          toast.error("Failed to update status");
        }
      },
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useUpdatePriceAndStockMutation,
  useUpdateStatusMutation,
} = productApi;
