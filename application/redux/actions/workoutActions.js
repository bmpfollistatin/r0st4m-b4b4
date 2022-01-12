import { WORKOUT } from '../types.js';
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

    dispatch({ type: WORKOUT.REQUESTING });

    return fetchUserWorkouts()
      .then(
        response => {
          dispatch({ type: WORKOUT.RECEIVED, payload: response })
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

export const addWorkout = (payload) => {
  return async (dispatch) => {
    payload.id = await uuid.v4();
    dispatch ({
      type: WORKOUT.ADD_WORKOUT,
      payload: payload
    });
  }
};

// payload form: {id: <workoutId>}
export const removeWorkout = (payload) => {
  return {
    type: WORKOUT.REMOVE_WORKOUT,
    payload: payload
  };
};


// payload form: {id: <workoutId>}, will mark currentExerciseId as complete
export const completeExercise = (payload) => {
  return {
    type: WORKOUT.COMPLETE_EXERCISE,
    payload: payload
  };
};

export const updateWorkout = (payload) => {
  // should already have an id
  if (payload.id === undefined || payload.id === null) {
    // TODO throw some kind of error
  }
  return {
    type: WORKOUT.UPDATE_WORKOUT,
    payload: payload
  }
};


