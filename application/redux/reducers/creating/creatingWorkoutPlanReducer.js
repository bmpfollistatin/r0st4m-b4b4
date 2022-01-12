import {CREATING_WORKOUT_PLAN} from '../../types.js';
import { combineReducers } from 'redux';

// may contain empty strings from CreateWorkout screen
const defaultState = [];

function updateItem(array, action) {
  return [
    ...array.slice(0, action.payload.index),
    action.payload.id,
    ...array.slice(action.payload.index + 1)]
}

function insertItem(array, action) {
  return [
    ...array.slice(0, action.payload.index + 1),
    action.payload.id,
    ...array.slice(action.payload.index + 1)]
}

const list = (state = defaultState, action) => {
  switch (action.type) {
    case  CREATING_WORKOUT_PLAN.ADD_WORKOUT: {
      return [...state, action.payload];
    }
    case  CREATING_WORKOUT_PLAN.UPDATE_WORKOUT: {
      return updateItem(state, action);
    }
    case  CREATING_WORKOUT_PLAN.INSERT_WORKOUT: {
      return insertItem(state, action);
    }
    case CREATING_WORKOUT_PLAN.REMOVE_WORKOUT: {
      const { index } = action.payload;
      return [...state.slice(0, index), ...state.slice(index+1)]
    }
    case CREATING_WORKOUT_PLAN.CLEAR_WORKOUTS: {
      return [];
    }
    case CREATING_WORKOUT_PLAN.SET_WORKOUTS: {
      if(Array.isArray(action.payload)){
        return action.payload;
      } else {
        console.error("Unable to set workouts");
        return state;
      }
    }
    default:
      return state;
  }
}

const name = (state = '', action) =>{
  switch(action.type){
    case CREATING_WORKOUT_PLAN.SET_NAME:
      return action.payload;
    default:
      return state;
  }
}

const notes = (state = '', action) =>{
  switch(action.type){
    case CREATING_WORKOUT_PLAN.SET_NOTES:
      return action.payload;
    default:
      return state;
  }
}

const id = (state = '', action) =>{
  switch(action.type){
    case CREATING_WORKOUT_PLAN.SET_ID:
      return action.payload;
    default:
      return state;
  }
}

const createWorkoutPlan = combineReducers({list, id, name, notes});
export default createWorkoutPlan;