import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    loginGoogle: builder.query({
      query: () => "login/success",
    }),
  }),
});

export const { useLoginGoogleQuery } = api;

export default api;
