import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { equipments } from './equipments.data'
export interface equipment {
  ID: number;
  Name: string;
  Category: string;
  EquipmentType: string;
  Subcategory: string;
  selected: boolean;
  image?: any;
}

export interface equipmentState {
  value: Array<equipment>
}

const initialState: equipmentState = {
  value: equipments,
}

export const equipmentSlice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {
    toogleSelect: (state, action: PayloadAction<equipment>) => {
      let si = state.value.findIndex(i => i.ID == action.payload.ID)
      console.log('before' , state.value[si].selected)
      state.value[si].selected = !state.value[si].selected
      console.log('after' , state.value[si].selected)
    },
  },
})

// Action creators are generated for each case reducer function
export const { toogleSelect } = equipmentSlice.actions

export default equipmentSlice.reducer