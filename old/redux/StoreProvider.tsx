import { configureStore } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { rtqApi } from './config/rtqApi';
import { counterReducer } from './slice/counterSlice';
import { urlReducer } from './slice/urlSlice';

interface StoreProviderProps {
    children?: ReactNode;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children,
    } = props;

    const store = configureStore({
        reducer: {
            counter: counterReducer,
            url: urlReducer,

            [rtqApi.reducerPath]: rtqApi.reducer,
        },
        middleware: (gDM) => gDM().concat([
            rtqApi.middleware,
        ]),
    })

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
