/* eslint-disable prettier/prettier */

import { EXERCISE_HISTORY } from '../../types';
import uuid from '../../../utils/uuid';


export const addExerciseHistory = (payload) => {
    return async (dispatch) => {
        if (payload.id === undefined || payload.id === null) {
            payload.id = await uuid.v4();
        }
        dispatch({
            type: EXERCISE_HISTORY.ADD,
            payload: payload
        });
    }
};

export const updateExerciseHistory = (payload) => {
    // should already have an id
    if (payload.id === undefined || payload.id === null) {
        // TODO throw some kind of error
    }
    return {
        type: EXERCISE_HISTORY.UPDATE,
        payload: payload
    }
};

// remove by id
export const removeExerciseHistory = (payload) => {
    return {
        type: EXERCISE_HISTORY.REMOVE,
        payload: payload
    };
};
