import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface workoutProgressModel {
  workoutPlanProgressId: any;
  workoutPlanId: any;
  workoutId: any;
  exerciseHistoryIds: Array<any>; //TODO: must changes
  startTime: number;
  endTime: number;
  notes: string;
  id: number;
}

interface exerciseProgressModel {
  id: string;
  exerciseDetailId: number;
  exerciseId: number;
  startTime: number;
  endTime: number;
  setHistoryIds: any;
  notes: string;
}

const initialState: {
  workout: workoutProgressModel;
  exercise: exerciseProgressModel;
} = {
  workout: {
    workoutPlanProgressId: null,
    workoutPlanId: null,
    workoutId: null,
    exerciseHistoryIds: null,
    startTime: null,
    endTime: null,
    notes: null,
    id: null,
  },
  exercise: {
    id: null,
    exerciseDetailId: null,
    exerciseId: null,
    startTime: null,
    endTime: null,
    setHistoryIds: null,
    notes: null,
  },
};

export const progressSlice = createSlice({
  name: "_progress",
  initialState,
  reducers: {
    startProgress: (state, action: PayloadAction<workoutProgressModel>) => {
      state.workout = action.payload;
      state.workout.startTime = Date.now();
    },
    stopProgress: (state) => {
      state.workout.endTime = Date.now();
    },
    updateProgress: (state, action: PayloadAction<workoutProgressModel>) => {
      state.workout = action.payload;
    },
    setProgressNotes: (state, action: PayloadAction<string>) => {
      state.workout.notes = action.payload;
    },
    addExerciseHistoryId: (state, action: PayloadAction<string>) => {
      Array.isArray(state.workout.exerciseHistoryIds)
        ? state.workout.exerciseHistoryIds.push(action.payload)
        : (state.workout.exerciseHistoryIds = [action.payload]);
    },

    startExercise: (state, action: PayloadAction<exerciseProgressModel>) => {
      state.exercise = action.payload;
      state.exercise.startTime = Date.now();
    },

    updateExercise: (state, action: PayloadAction<exerciseProgressModel>) => {
      state.exercise = action.payload;
    },

    stopExercise: (state) => {
      state.exercise.endTime = Date.now();
    },
  },
});

export const {
  startProgress,
  setProgressNotes,
  stopProgress,
  addExerciseHistoryId,
  updateProgress,
  startExercise,
  stopExercise,
  updateExercise,
} = progressSlice.actions;

export default progressSlice.reducer;
