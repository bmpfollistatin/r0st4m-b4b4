import { WORKOUT_HISTORY } from '../../types';
import uuid from '../../../utils/uuid';


export const addWorkoutHistory = (payload) => {
    return async (dispatch) => {
        if (payload.id === undefined || payload.id === null) { // id should be generated at workout progress creation
            payload.id = await uuid.v4();
        }
        dispatch({
            type: WORKOUT_HISTORY.ADD,
            payload: payload
        });
    }
};

export const updateWorkoutHistory = (payload) => {
    // should already have an id
    if (payload.id === undefined || payload.id === null) {
        // TODO throw some kind of error
    }
    return {
        type: WORKOUT_HISTORY.UPDATE,
        payload: payload
    }
};

// remove by id
export const removeWorkoutHistory = (payload) => {
    return {
        type: WORKOUT_HISTORY.REMOVE,
        payload: payload
    };
};
