import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { delay } from 'modules/products/utils';

const baseQuery = fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL });

export const customBaseQuery =
  () =>
  async (args, api, extraOptions): ReturnType<typeof fetchBaseQuery> => {
    await delay(2500);
    return baseQuery(args, api, extraOptions);
  };
