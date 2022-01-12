import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DetailedExerciseModel } from "./exerciseDetails.data";

const initialState: DetailedExerciseModel = {
  id: null,
  workoutId: null,
  exerciseId: null,
  reps: null,
  sets: null,
  tempo: null,
  rests: null,
  supersetId: null,
};

export const ExerciseDetailsSlice = createSlice({
  name: "_exerciseDetailForm",
  initialState,
  reducers: {
    setExerciseDetailForm: (
      state,
      action: PayloadAction<DetailedExerciseModel>
    ) => {
      state.id = action.payload.id;
      state.workoutId = action.payload.workoutId;
      state.exerciseId = action.payload.exerciseId;
      state.sets = action.payload.sets;
      state.reps = action.payload.reps;
      state.rests = action.payload.rests;
      state.supersetId = action.payload.supersetId;
    },

    clearExerciseDetailForm: (state) => {
      state.id = null;
      state.workoutId = null;
      state.exerciseId = null;
      state.sets = null;
      state.reps = null;
      state.rests = null;
      state.supersetId = null;
    },

    setdetailWorkoutId: (state, action: PayloadAction<number>) => {
      state.workoutId = action.payload;
    },

    setdetailExerciseId: (state, action: PayloadAction<number>) => {
      state.exerciseId = action.payload;
    },

    setdetailSets: (state, action: PayloadAction<number>) => {
      state.sets = action.payload;
    },

    setdetailReps: (state, action: PayloadAction<number | string>) => {
      state.reps = action.payload;
    },

    setdetailRests: (state, action: PayloadAction<number | string>) => {
      state.rests = action.payload;
    },

    setdetailSupersetId: (state, action: PayloadAction<string>) => {
      state.supersetId = action.payload;
    },
  },
});

export const {
  setExerciseDetailForm,
  clearExerciseDetailForm,
  setdetailExerciseId,
  setdetailReps,
  setdetailRests,
  setdetailSets,
  setdetailSupersetId,
  setdetailWorkoutId,
} = ExerciseDetailsSlice.actions;

export default ExerciseDetailsSlice.reducer;
