import { createSlice } from "@reduxjs/toolkit";

interface InitialStateObj {
  avatar: string;
  message: string
}

let initialState: Array<InitialStateObj> = [
  {
    avatar: 'cat',
    message: 'Meow, meow! Rrrow, it\'s MeowSupport, your furry feline friend here to offer a paw of assistance. Rrrow, how can I help you today? Meow!'
  }
];

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