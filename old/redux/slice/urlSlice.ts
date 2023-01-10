import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 'http://68.183.213.224:3881/sms',
};

export const urlSlice = createSlice({
    name: 'url',
    initialState,
    reducers: {
        setUrl: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { actions: urlActions } = urlSlice;
export const { reducer: urlReducer } = urlSlice;