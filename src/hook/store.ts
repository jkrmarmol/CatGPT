import { configureStore } from '@reduxjs/toolkit';
import meowReducer from './meowSlices';

const store = configureStore({
  reducer: {
    meow: meowReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch

export default store