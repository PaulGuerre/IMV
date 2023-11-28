'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    participants: [],
    showedMessages: [],
    fileID: ''
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setParticipants: (state, action) => {
            state.participants = action.payload;
        },
        setShowedMessages: (state, action) => {
            state.showedMessages = action.payload;
        },
        setFileID: (state, action) => {
            state.fileID = action.payload;
        }
    },
});

export const { setMessages, setParticipants, setShowedMessages, setFileID } = messagesSlice.actions;
export default messagesSlice.reducer;
