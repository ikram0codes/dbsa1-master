// import { forgetPassword } from "../../../../backend/controllers/userController";
import { user_url } from "../constant";
import { apiSlice } from "./ApiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builders) => ({
    login: builders.mutation({
      query: (data) => ({
        url: `${user_url}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builders.mutation({
      query: () => ({
        url: `${user_url}/logout`,
        method: "POST",
      }),
    }),
    register: builders.mutation({
      query: (data) => ({
        url: user_url,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builders.mutation({
      query: ({ data, token }) => ({
        url: `${user_url}/resetPassword/${token}`,
        method: "PUT",
        body: data,
      }),
    }),
    forgetPassword: builders.mutation({
      query: (data) => ({
        url: `${user_url}/forgotPassword`,
        method: "POST",
        body: data,
      }),
    }),
    profile: builders.mutation({
      query: (data) => ({
        url: `${user_url}/profile/${data._id}`,
        method: "PUT",
        body: data,
      }),
    }),
    userList: builders.query({
      query: (page) => ({
        url: `${user_url}/`,
        params: page,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    userDetails: builders.query({
      query: (id) => ({
        url: `${user_url}/${id}`,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builders.mutation({
      query: (id) => ({
        url: `${user_url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builders.mutation({
      query: (data) => ({
        url: `${user_url}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGoogleSuccessQuery,
  useLogoutMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useProfileMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUserListQuery,
  useUserDetailsQuery,
} = userApiSlice;
