import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export interface workoutHistoryui {
  showWorkouts: boolean
  showCardio: boolean
}

export interface workoutHistoryuiState {
  value: workoutHistoryui
}

const initialState: workoutHistoryuiState = {
  value: {
      showCardio: true,
      showWorkouts: true
  }
}

export const whUiSlice = createSlice({
  name: 'whUi', //workout history ui
  initialState,
  reducers: {
    toggleWorkout: (state) => {
        state.value.showWorkouts = !state.value.showWorkouts
    },
    toggleCardio: (state) => {
        state.value.showCardio = !state.value.showCardio
    }
    // toogleSelect: (state, action: PayloadAction<workoutHistoryui>) => {
    //   let si = state.value.findIndex(i => i.ID == action.payload.ID)
    //   console.log('before' , state.value[si].selected)
    //   state.value[si].selected = !state.value[si].selected
    //   console.log('after' , state.value[si].selected)
    // },
  },
})

// Action creators are generated for each case reducer function
export const { toggleCardio , toggleWorkout } = whUiSlice.actions

export default whUiSlice.reducer