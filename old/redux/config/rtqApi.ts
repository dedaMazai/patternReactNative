import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const dynamicBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const state = api.getState() as {url: {value: string}}

    const rawBaseQuery = fetchBaseQuery({
        baseUrl: state.url.value,
    })
    return rawBaseQuery(args, api, extraOptions)
}

export const rtqApi = createApi({
    reducerPath: 'api',
    baseQuery: dynamicBaseQuery,
    endpoints: (builder) => ({}),
});
