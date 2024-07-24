import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  reducerPath: "api", // Name your slice path
  baseQuery,
  endpoints: () => ({}), // Define your endpoints here
  tagTypes: ["User", "Product", "Order", "Category", "Blog", "Brand"],
});
