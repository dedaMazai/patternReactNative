import { rtqApi } from './rtqApi';

const loginApi = rtqApi.injectEndpoints({
    endpoints: (build: any) => ({
        login: build.query({
            query: ({
                publicAPI,
                privateAPI,
                telegramId,
                sms,
                phoneNumber
            }: any) => ({
                url: ``,
                method: 'POST',
                body: {
                    user_api_public: publicAPI,
                    user_api_private: privateAPI,
                    user_telegram_id: telegramId,
                    message_body: sms,
                    incoming_number: phoneNumber,
                    received_time: new Date().toISOString(),
                },
            }),
        }),
    }),
});

export const sendLogin = loginApi.useLazyLoginQuery;