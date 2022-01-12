import { CREATING_WORKOUT_PLAN } from '../../types.js';

export const load = (payload) => {
  const { name, notes, workoutIdList, id } = payload;
  return dispatch => {
    dispatch(setName(name));
    dispatch(setNotes(notes));
    dispatch(setWorkouts(workoutIdList));
    dispatch(setId(id));
  }
}

export const clear = () => {
  return dispatch => {
    dispatch(setName(''));
    dispatch(setNotes(''));
    dispatch(setWorkouts([]));
    dispatch(setId(''));
  }
}

export const addWorkout = (payload) => {
  return {
    type: CREATING_WORKOUT_PLAN.ADD_WORKOUT,
    payload: payload
  };
}

export const updateWorkout = (payload) => {
  return {
    type: CREATING_WORKOUT_PLAN.UPDATE_WORKOUT,
    payload: payload
  };
}

export const insertWorkout = (payload) => {
  return {
    type: CREATING_WORKOUT_PLAN.INSERT_WORKOUT,
    payload: payload
  };
}

export const removeWorkout = (payload) => {
  return {
    type: CREATING_WORKOUT_PLAN.REMOVE_WORKOUT,
    payload: payload
  };
};

export const clearWorkouts = (payload) => {
  return {
    type: CREATING_WORKOUT_PLAN.CLEAR_WORKOUTS,
    payload: payload
  };
};

export const setWorkouts = (payload) => {
  return {
    type: CREATING_WORKOUT_PLAN.SET_WORKOUTS,
    payload: payload
  };
};

export const setName = (payload) => {
  return {
    type: CREATING_WORKOUT_PLAN.SET_NAME,
    payload: payload
  };
};

export const setNotes = (payload) => {
  return {
    type: CREATING_WORKOUT_PLAN.SET_NOTES,
    payload: payload
  };
};

export const setId = (payload) => {
  return {
    type: CREATING_WORKOUT_PLAN.SET_ID,
    payload: payload
  };
};
