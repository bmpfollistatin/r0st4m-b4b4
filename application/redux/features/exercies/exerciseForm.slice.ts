import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciesModel } from "./exercise.data";

export interface ExerciesFormState {
  value: ExerciesModel;
}

const initialState: ExerciesFormState = {
  value: {
    id: null,
    name: null,
    sets: null,
    reps: null,
    rests: null,
    muscleTargeted: null,
    description: null,
    exerciseTips: null,
    equipment: null,
  },
};

export const ExerciesFormSlice = createSlice({
  name: "_exerciesForm",
  initialState,
  reducers: {
    setExerciesForm: (state, action: PayloadAction<ExerciesModel>) => {
      !!action.payload.id && (state.value.id = action.payload.id);
      !!action.payload.name && (state.value.name = action.payload.name);
      !!action.payload.muscleTargeted &&
        (state.value.muscleTargeted = action.payload.muscleTargeted);
      !!action.payload.description &&
        (state.value.description = action.payload.description);
      !!action.payload.exerciseTips &&
        (state.value.exerciseTips = action.payload.exerciseTips);
      !!action.payload.reps && (state.value.reps = action.payload.reps);
      !!action.payload.sets && (state.value.sets = action.payload.sets);
      !!action.payload.rests && (state.value.rests = action.payload.rests);
    },

    clearExerciesForm: (state) => {
      state.value.id = null;
      state.value.name = null;
      state.value.muscleTargeted = null;
      state.value.description = null;
      state.value.exerciseTips = null;
      state.value.reps = null;
      state.value.sets = null;
      state.value.rests = null;
    },

    setExerciesName: (state, action: PayloadAction<string>) => {
      state.value.name = action.payload;
    },

    setExerciesDescription: (state, action: PayloadAction<string>) => {
      state.value.description = action.payload;
    },

    setExerciesSets: (state, action: PayloadAction<number>) => {
      state.value.sets = action.payload;
    },

    setExerciesReps: (state, action: PayloadAction<number>) => {
      state.value.reps = action.payload;
    },

    setExerciesRests: (state, action: PayloadAction<number>) => {
      state.value.rests = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setExerciesDescription,
  setExerciesForm,
  setExerciesName,
  clearExerciesForm,
  setExerciesSets,
  setExerciesReps,
  setExerciesRests
} = ExerciesFormSlice.actions;

export default ExerciesFormSlice.reducer;
