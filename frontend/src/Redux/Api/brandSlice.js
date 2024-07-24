import { brand_url } from "../constant";
import { apiSlice } from "./ApiSlice";

const brandSlice = apiSlice.injectEndpoints({
  endpoints: (builders) => ({
    createBrand: builders.mutation({
      query: (data) => ({
        url: `${brand_url}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrand: builders.mutation({
      query: ({ data, brandId }) => ({
        url: `${brand_url}/${brandId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Brand"],
    }),
    getAllBrand: builders.query({
      query: () => ({
        url: `${brand_url}`,
      }),
      providesTags: ["Brand"],
      keepUnusedDataFor: 5,
    }),
    deleteBrand: builders.mutation({
      query: (brandId) => ({
        url: `${brand_url}/${brandId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetAllBrandQuery,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} = brandSlice;
