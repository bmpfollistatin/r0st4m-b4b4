import { WORKOUT_PLAN } from '../types.js';
import { fetchUserWorkouts } from '../../api/workoutsApi';
import uuid from '../../utils/uuid';

// async action that does multiple dispatches that tells us 
// when the data is done loading

// lets assume we have a userId saved somewhere in state from app init
// use that to get the workout. 
// Or would the userId be built into the authentication mechanism and the 
// api would only return that users info anyway?
export const getWorkouts = () => {
  // thunk is what lets us return a function, and thunk passes in dispatch to the function
  return function (dispatch) {

    dispatch({ type: WORKOUT_DAY.REQUESTING });

    return fetchUserWorkouts()
      .then(
        response => {
          dispatch({ type: WORKOUT_DAY.RECEIVED, payload: response })
        },
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occurred.', error)
      )
  }
};

export const testGetWorkouts = () => {
  return fetchUserWorkouts()
    .then(
      response => {
        dispatch(receivePosts(subreddit, response.data))
      },
      // Do not use catch, because that will also catch
      // any errors in the dispatch and resulting render,
      // causing a loop of 'Unexpected batch number' errors.
      // https://github.com/facebook/react/issues/6895
      error => console.log('An error occurred.', error)
    )
};


// payload form: {id, name, workoutList(optional)}
export const addWorkoutPlan = (payload) => {
  return async (dispatch) => {
    payload.id = await uuid.v4();
    dispatch({
      type: WORKOUT_PLAN.ADD_WORKOUT_PLAN,
      payload: payload
    });
  }
};

// payload form: {id: <workoutPlanId>}
export const removeWorkoutPlan = (payload) => {
  return {
    type: WORKOUT_PLAN.REMOVE_WORKOUT_PLAN,
    payload: payload
  };
};

// payload form: {id: <workoutPlanId>}
export const completeWorkout = (payload) => {
  return {
    type: WORKOUT_PLAN.COMPLETE_WORKOUT,
    payload: payload
  };
};

// payload form: {id: <workoutPlanId>, workoutId: <toBeAdded>}
export const addWorkout = (payload) => {
  return {
    type: WORKOUT_PLAN.ADD_WORKOUT,
    payload: payload
  };
};

// payload form: {id: <workoutPlanId>, workoutId: <toBeRemoved>}
export const removeWorkout = (payload) => {
  return {
    type: WORKOUT_PLAN.REMOVE_WORKOUT,
    payload: payload
  };
};

export const updateWorkoutPlan = (payload) => {
  // should already have an id
  if (payload.id === undefined || payload.id === null) {
    // TODO throw some kind of error
  }
  return {
    type: WORKOUT_PLAN.UPDATE_WORKOUT_PLAN,
    payload: payload
  }
};

// payload should have workout plan id: {id: <wp id>}
export const setCurrentWorkoutPlan = (payload) => {
  return {
    type: WORKOUT_PLAN.SET_CURRENT_WORKOUT_PLAN,
    payload: payload
  }
};



