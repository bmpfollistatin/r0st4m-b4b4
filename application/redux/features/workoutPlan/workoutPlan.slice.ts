import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { workoutPlanDb, workoutPlanModel } from "./workoutPlan.data";


const initialState: Array<workoutPlanModel> = workoutPlanDb;

export const WorkoutPlanSlice = createSlice({
  name: "_workoutPlan",
  initialState,
  reducers: {

  },
});

// Action creators are generated for each case reducer function
export const { } =
WorkoutPlanSlice.actions;

export default WorkoutPlanSlice.reducer;
