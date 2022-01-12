import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutModel } from "./workout.data";

export interface WorkoutFormState {
  value: WorkoutModel;
}

const initialState: WorkoutFormState = {
  value: {
    id: null,
    exerciseIdList: null,
    name: null,
    notes: null,
  },
};

export const WorkoutFormSlice = createSlice({
  name: "_workoutForm",
  initialState,
  reducers: {
    setWorkoutForm: (state, action: PayloadAction<WorkoutModel>) => {
      state.value.id = action.payload.id;
      state.value.name = action.payload.name;
      state.value.notes = action.payload.notes;
      state.value.exerciseIdList = action.payload.exerciseIdList;
    },

    clearWorkoutForm: (state) => {
      state.value.exerciseIdList = null;
      state.value.id = null;
      state.value.name = null;
      state.value.notes = null;
    },

    setWorkoutName: (state, action: PayloadAction<string>) => {
      state.value.name = action.payload;
    },

    setWorkoutNote: (state, action: PayloadAction<string>) => {
      state.value.notes = action.payload;
    },

    setWorkoutExerciseIdList: (state, action: PayloadAction<Array<number>>) => {
      state.value.exerciseIdList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWorkoutForm, clearWorkoutForm , setWorkoutName , setWorkoutNote , setWorkoutExerciseIdList} = WorkoutFormSlice.actions;

export default WorkoutFormSlice.reducer;
