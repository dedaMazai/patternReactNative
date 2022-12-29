import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtqApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://webhook.site',
        prepareHeaders: (headers) => {
            headers.set('Header', '');
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});
