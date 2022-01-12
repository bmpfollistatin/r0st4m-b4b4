import { CREATING_CARDIO } from '../../types.js';

const defaultState = {
  id: null,
  name: '',
  description: '',
}

const creatingExerciseReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CREATING_CARDIO.SET_ID:
      return { ...state, id: action.payload, };
    case CREATING_CARDIO.SET_NAME:
      return { ...state, name: action.payload, };
    case CREATING_CARDIO.SET_DESCRIPTION:
      return { ...state, description: action.payload, };
    default:
      return state;
  }
}

export default creatingExerciseReducer;