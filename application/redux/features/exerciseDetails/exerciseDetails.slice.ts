import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DetailedExerciseDb, DetailedExerciseModel } from "./exerciseDetails.data";

const initialState: Array<DetailedExerciseModel> = DetailedExerciseDb;

export const ExerciseDetailsSlice = createSlice({
  name: "_exerciseDetails",
  initialState,
  reducers: {
    createOrUpdateExerciseDetail: (state, action: PayloadAction<DetailedExerciseModel>) => {
      const detailObj = action.payload;
      console.log({detailObj})
      if(detailObj.id){
       state[state.findIndex(i =>i.id == detailObj.id)] = detailObj;
      }else{
        detailObj.id = Math.max(...state.map(i => i.id)) + 1;
        state.push(detailObj)
      }
    },

    removeExerciseDetail: (state, action: PayloadAction<number>) => {
      state.splice(state.findIndex(i => i.id == action.payload) , 1)
    },

    // updateWorkout: (state, action: PayloadAction<WorkoutModel>) => {
    //   const updateIndex = state.value.findIndex(
    //     (i) => i.id == action.payload.id
    //   );
    //   if (updateIndex > -1) {
    //     action.payload.exerciseIdList &&
    //       (state.value[updateIndex].exerciseIdList =
    //         action.payload.exerciseIdList);
    //     action.payload.name &&
    //       (state.value[updateIndex].name = action.payload.name);
    //     action.payload.notes &&
    //       (state.value[updateIndex].notes = action.payload.notes);
    //   }
    // },

    // removeWorkout: (state, action: PayloadAction<number>) => {
    //   const deleteIndex = state.value.findIndex((i) => i.id == action.payload);
    //   state.value[deleteIndex].isDeleted = true;
    // },

    // completeExercise: (state, action: PayloadAction<number>) => {
    //   console.log("nothing to do - workout slice - complete exercise");
    // },
  },
});

// Action creators are generated for each case reducer function
export const { createOrUpdateExerciseDetail , removeExerciseDetail } =
ExerciseDetailsSlice.actions;

export default ExerciseDetailsSlice.reducer;
