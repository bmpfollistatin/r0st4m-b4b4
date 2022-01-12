import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { exercieses, ExerciesModel } from "./exercise.data";

export interface ExerciesState {
  value: Array<ExerciesModel>;
}

const initialState: ExerciesState = {
  value: exercieses,
};

export const ExerciesSlice = createSlice({
  name: "_exercies",
  initialState,
  reducers: {
    createExercise: (state, action: PayloadAction<ExerciesModel>) => {
      let newExercies: ExerciesModel = {
        id: Math.max(...state.value.map((i) => i.id)) + 1,
        name: action.payload.name,
        description: action.payload.description,
        equipment: action.payload.equipment,
        supersetId: action.payload.supersetId,
        sets: action.payload.sets,
        reps: action.payload.reps,
        rests: action.payload.rests,
        tags: action.payload.tags
      };
      state.value.push(newExercies);
    },

    updateExercise: (state, action: PayloadAction<ExerciesModel>) => {
      const updateIndex = state.value.findIndex(
        (i) => i.id == action.payload.id
      );

      if (updateIndex > -1) {
        const toUpdate = state.value[updateIndex];
        action.payload.description &&
          (toUpdate.description = action.payload.description);
        action.payload.name && (toUpdate.name = action.payload.name);
        action.payload.supersetId &&
          (toUpdate.supersetId = action.payload.supersetId);
        !isNaN(action.payload.sets) && (toUpdate.sets = action.payload.sets);
        !isNaN(action.payload.reps) && (toUpdate.reps = action.payload.reps);
        !isNaN(action.payload.rests) && (toUpdate.rests = action.payload.rests);
        Array.isArray(action.payload.tags) && (toUpdate.tags = action.payload.tags)
      }
    },

    removeExercise: (state, action: PayloadAction<number>) => {
      const deleteIndex = state.value.findIndex((i) => i.id == action.payload);
      state.value = state.value.splice(deleteIndex , 1)
    }
  },
});

// Action creators are generated for each case reducer function
export const { createExercise , updateExercise , removeExercise} = ExerciesSlice.actions;

export default ExerciesSlice.reducer;
