import { rtqApi } from './rtqApi';

const loginApi = rtqApi.injectEndpoints({
    endpoints: (build: any) => ({
        login: build.query({
            query: ({ articleId, userId }: any) => ({
                url: '/84b4aff1-bb1f-4660-8165-39082433e721',
                method: 'GET',
                params: {
                    userId,
                    articleId,
                },
            }),
        }),
    }),
});

export const sendLogin = loginApi.useLazyLoginQuery;
