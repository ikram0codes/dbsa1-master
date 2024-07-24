import { category_url } from "../constant";
import { apiSlice } from "./ApiSlice";

const categorySlice = apiSlice.injectEndpoints({
  endpoints: (builders) => ({
    createCategory: builders.mutation({
      query: (data) => ({
        url: category_url,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builders.mutation({
      query: ({ data, categoryId }) => ({
        url: `${category_url}/${categoryId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    getAllCategory: builders.query({
      query: () => ({
        url: category_url,
      }),
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),
    deleteCategory: builders.mutation({
      query: (categoryId) => ({
        url: `${category_url}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categorySlice;
