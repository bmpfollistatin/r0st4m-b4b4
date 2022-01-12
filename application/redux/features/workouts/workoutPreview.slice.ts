import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutModel } from "./workout.data";


const initialState: WorkoutModel = {
  id: null,
  exerciseIdList: null,
  name: null,
  notes: null,
  isDeleted: null,
  workoutPlanId: null,
};

export const WorkoutPlanSlice = createSlice({
  name: "_workoutPreview",
  initialState: initialState,
  reducers: {
    setWorkoutPreview: (state, action: PayloadAction<WorkoutModel>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.notes = action.payload.notes;
      state.exerciseIdList = action.payload.exerciseIdList;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWorkoutPreview } =
WorkoutPlanSlice.actions;

export default WorkoutPlanSlice.reducer;
