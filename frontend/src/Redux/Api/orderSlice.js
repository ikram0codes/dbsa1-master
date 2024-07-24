import { apiSlice } from "./ApiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constant";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutations
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
      invalidatesTags: ["Order"],
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
      invalidatesTags: ["Order"],
    }),

    updateDeliveryStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `${ORDERS_URL}/${id}/status`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    // Queries
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      providesTags: ["Order"],
    }),

    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      providesTags: ["Order"],
    }),

    getMyOrders: builder.query({
      query: (page) => ({
        url: `${ORDERS_URL}/mine`,
        params: page,
      }),
      providesTags: ["Order"],
      keepUnusedDataFor: 5,
    }),

    getOrders: builder.query({
      query: (page) => ({
        url: ORDERS_URL,
        params: page,
      }),
      providesTags: ["Order"],
    }),

    getTotalOrders: builder.query({
      query: () => `${ORDERS_URL}/total-orders`,
      providesTags: ["Order"],
    }),

    getTotalSales: builder.query({
      query: () => `${ORDERS_URL}/total-sales`,
      providesTags: ["Order"],
    }),

    getTotalSalesByDate: builder.query({
      query: () => `${ORDERS_URL}/total-sales-by-date`,
      providesTags: ["Order"],
    }),
  }),
});

export const {
  // Mutations
  useCreateOrderMutation,
  usePayOrderMutation,
  useDeliverOrderMutation,
  useUpdateDeliveryStatusMutation,

  // Queries
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,
} = orderApiSlice;
