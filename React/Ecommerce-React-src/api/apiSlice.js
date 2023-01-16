import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { buildQueries } from "@testing-library/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "https://fakestoreapi.com/products",
    }),
    getCategories: builder.query({
      query: () => "https://fakestoreapi.com/products/categories",
    }),
    checkLogin: builder.query({
      query: (data) => {
        const { username, password } = data;
        return {
          url: `https://localhost:7249/api/Login/${username}/${password}`,
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useCheckLoginQuery,
} = apiSlice;
