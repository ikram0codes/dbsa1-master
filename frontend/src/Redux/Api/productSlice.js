import { PRODUCT_URL } from "../constant";
import { apiSlice } from "./ApiSlice";
import { UPLOAD_URL } from "../constant";

const productSlice = apiSlice.injectEndpoints({
  endpoints: (builders) => ({
    getProducts: builders.query({
      query: ({ keyword }) => ({
        url: PRODUCT_URL,
        params: { keyword },
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getProductById: builders.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
      keepUnusedDataFor: 5,
    }),
    getAllProducts: builders.query({
      query: () => ({
        url: `${PRODUCT_URL}/products/allProduct`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builders.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    createProduct: builders.mutation({
      query: (productData) => ({
        url: PRODUCT_URL,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builders.mutation({
      query: ({ productData, productId }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builders.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    createReview: builders.mutation({
      query: ({ data, productId }) => ({
        url: `${PRODUCT_URL}/${productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getTopData: builders.query({
      query: () => ({
        url: `${PRODUCT_URL}/top`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    getNewProduct: builders.query({
      query: () => ({
        url: `${PRODUCT_URL}/new`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    uploadProductImage: builders.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
    getByBrand: builders.query({
      query: ({ brand, category, lowPrice, highPrice, keyword, page }) => ({
        url: `${PRODUCT_URL}/filteredProducts`,
        params: { brand, category, lowPrice, highPrice, keyword, page },
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetByBrandQuery,
  useGetProductsQuery,
  useGetNewProductQuery,
  useGetTopDataQuery,
  useGetProductByIdQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateReviewMutation,
  useUploadProductImageMutation,
} = productSlice;
