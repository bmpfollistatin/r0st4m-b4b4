import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutModel, WorkoutsDb } from "./workout.data";

const initialState: Array<WorkoutModel> = WorkoutsDb;

export const WorkoutSlice = createSlice({
  name: "_workouts",
  initialState,
  reducers: {
    createOrUpdateWorkout: (state, action: PayloadAction<WorkoutModel>) => {
      const workoutObj = action.payload;
      console.log({workoutObj})
      if(workoutObj.id){
        const uindex = state.findIndex(i =>i.id == workoutObj.id)
        state[uindex] = workoutObj;
      }else{
        workoutObj.id = Math.max(...state.map(i => i.id)) + 1;
        state.push(workoutObj)
      }
    }, 

    createWorkout: (state, action: PayloadAction<WorkoutModel>) => {
      let newWorkout: WorkoutModel = {
        name: action.payload.name,
        exerciseIdList: Array.isArray(action.payload.exerciseIdList)
          ? action.payload.exerciseIdList
          : [],
        notes:
          typeof action.payload.notes == "string" ? action.payload.notes : "",
        id: Math.max(...state.map((i) => i.id)) + 1,
      };
      state.push(newWorkout);
    },

    updateWorkout: (state, action: PayloadAction<WorkoutModel>) => {
      const updateIndex = state.findIndex(
        (i) => i.id == action.payload.id
      );
      if (updateIndex > -1) {
        action.payload.exerciseIdList &&
          (state[updateIndex].exerciseIdList =
            action.payload.exerciseIdList);
        action.payload.name &&
          (state[updateIndex].name = action.payload.name);
        action.payload.notes &&
          (state[updateIndex].notes = action.payload.notes);
      }
    },

    removeWorkout: (state, action: PayloadAction<number>) => {
      const deleteIndex = state.findIndex((i) => i.id == action.payload);
      state[deleteIndex].isDeleted = true;
    },

    completeExercise: (state, action: PayloadAction<number>) => {
      console.log("nothing to do - workout slice - complete exercise");
    },
  },
});

// Action creators are generated for each case reducer function
export const { createWorkout, updateWorkout, removeWorkout , createOrUpdateWorkout} =
  WorkoutSlice.actions;

export default WorkoutSlice.reducer;
