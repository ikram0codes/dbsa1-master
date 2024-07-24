import { apiSlice } from "./ApiSlice";
import { blog_url } from "../constant";

const blogSlice = apiSlice.injectEndpoints({
  endpoints: (builders) => ({
    createBlog: builders.mutation({
      query: (data) => ({
        url: blog_url,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builders.mutation({
      query: (data) => ({
        url: `${blog_url}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: builders.mutation({
      query: (blogId) => ({
        url: `${blog_url}/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
    getBlog: builders.query({
      query: (blogId) => ({
        url: `${blog_url}/${blogId}`,
      }),
      providesTags: ["Blog"],
      keepUnusedDataFor: 5,
    }),
    allBlog: builders.query({
      query: () => ({
        url: `${blog_url}/allBlogs`,
      }),
      providesTags: ["Blog"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAllBlogQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogSlice;
