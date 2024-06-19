import { createApi } from '@reduxjs/toolkit/query/react';

import { customBaseQuery } from './prepare';
import { Product, ProductParams, ProductsByCategoryParams, SearchedProductsParams, ServerResponse } from 'src/api/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    getSearchedProducts: builder.query<ServerResponse<Product>, SearchedProductsParams>({
      query: (params) => ({ url: 'products/search', params }),
    }),
    getCategories: builder.query<string[]>({ query: () => ({ url: '/products/category-list' }) }),
    getProductsByCategory: builder.query<ServerResponse<Product>, string>({
      query: ({ category, ...params }: ProductsByCategoryParams) => ({ url: `/products/category/${category}`, params }),
    }),
    getProductById: builder.query<Product, ProductParams>({ query: ({ id }: ProductParams) => ({ url: `/products/${id}` }) }),
    getAllProducts: builder.query<Product[], void>({
      query: () => ({ url: '/products', params: { limit: 0 } }),
      transformResponse: (response: ServerResponse<Product>) => response.products as Product[],
    }),
  }),
});

export const {
  useLazyGetSearchedProductsQuery,
  useGetCategoriesQuery,
  useLazyGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useGetAllProductsQuery,
} = api;
