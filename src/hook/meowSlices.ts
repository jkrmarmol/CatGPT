import meowMessages from './meowIntroMessages.json'
import { createSlice } from "@reduxjs/toolkit";



type RandomNumType = () => number;

interface InitialStateObj {
  avatar: string;
  message: string
}

const randomNumber: RandomNumType = () => {
  const num = Math.floor(Math.random() * 32) + 1;
  return num;
}

let initialState: Array<InitialStateObj> = [
  meowMessages[randomNumber()],
];

const meowSlices = createSlice({
  name: 'meow',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      return [...state, action.payload]
    }
  },
  extraReducers: {}
});

export default meowSlices.reducer;
export const { sendMessage } = meowSlices.actions;