import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../../store";
export interface Counter {
  sec: number;
  stop: boolean;
  timer: any
}

export interface CounterState {
  value: Counter;
}

const initialState: CounterState = {
  value: {
    sec: 0,
    stop: true,
    timer: null
  },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increase: (state) => {
      state.value.sec = state.value.sec + 1;
    },
    start: (state , action: PayloadAction<{timer: any}>) => {
      console.log('start---')
      state.value.stop = false;
      state.value.timer = action.payload.timer
    },
    pause: (state) => {
      state.value.stop = true;
      clearInterval(state.value.timer);
    },
    stop: (state) => {
      console.log('=---stop---')
      state.value.stop = true;
      clearInterval(state.value.timer);
      state.value.sec = 0;
    },
  },
});

export const { start, pause, stop , increase } = counterSlice.actions;

export default counterSlice.reducer;
