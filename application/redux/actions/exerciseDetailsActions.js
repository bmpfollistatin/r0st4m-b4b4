import { EXERCISE_DETAILS } from '../types.js';
import uuid from '../../utils/uuid';

export const addExerciseDetail = (payload) => {

    return async (dispatch) => {
        if (payload.id === undefined || payload.id === null) {
            payload.id = await uuid.v4();
        }

        dispatch({
            type: EXERCISE_DETAILS.ADD_EXERCISE_DETAIL,
            payload: payload
        });
    }
};


export const updateExerciseDetail = (payload) => {
    // should already have an id
    if (payload.id === undefined || payload.id === null) {
        // TODO throw some kind of error
    }
    return {
        type: EXERCISE_DETAILS.UPDATE_EXERCISE_DETAIL,
        payload: payload
    }
};
/*
PAYLOAD: {id, workoutId}
export const addToDetail = (payload) => {
    dispatch({
        type: EXERCISE_DETAILS.ADD_TO_DETAIL,
        payload: payload
    });
}
*/
// PAYLOAD: { id, workoutId }
export const addWorkoutIdToDetail = (payload) => {
    dispatch({
        type: EXERCISE_DETAILS.ADD_WORKOUTID_TO_DETAIL,
        payload: payload
    });
}
