import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (role) => {
        if (role === "admin") return "/order/all";
        if (role === "seller") return "/order/seller";
        return "/order/my";
      },
      providesTags: (result) =>
        result?.orders
          ? [
              ...result.orders.map((order) => ({
                type: "Order",
                id: order._id,
              })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),
    getOrderById: builder.query({
      query: (id) => `/order/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Order", id }],
    }),
    updateOrderItemStatus: builder.mutation({
      query: ({ orderId, itemId, status }) => ({
        url: `/order/${orderId}/items/${itemId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: "Order", id: orderId },
        { type: "Order", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetOrderByIdQuery,
  useGetOrdersQuery,
  useUpdateOrderItemStatusMutation,
} = orderApi;
