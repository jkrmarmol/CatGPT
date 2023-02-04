import { createSlice } from "@reduxjs/toolkit";

interface InitialStateObj {
  avatar: string;
  message: string
}

let initialState: Array<InitialStateObj> = [];

const meowSlices = createSlice({
  name: 'meow',
  initialState,
  reducers: {
    sendMessage: (state, action?) => {
      return [...state, action.payload]
    }
  },
  extraReducers: {}
});

export default meowSlices.reducer;
export const { sendMessage } = meowSlices.actions;