'use client'

import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./messagesSlice";

export const store = configureStore({
    reducer: {
        messages: messagesSlice,
    },
    devTools: true,
});
