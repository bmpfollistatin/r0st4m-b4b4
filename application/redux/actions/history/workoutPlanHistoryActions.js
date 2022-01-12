import { WORKOUT_PLAN_HISTORY } from '../../types';
import uuid from '../../../utils/uuid';


export const addWorkoutPlan = (payload) => {
    return async (dispatch) => {
        if (payload.id === undefined || payload.id === null) {
            payload.id = await uuid.v4();
        }
        dispatch({
            type: WORKOUT_PLAN_HISTORY.ADD,
            payload: payload
        });
    }
};

export const updateWorkoutPlan = (payload) => {
    // should already have an id
    if (payload.id === undefined || payload.id === null) {
        // TODO throw some kind of error
    }
    return {
        type: WORKOUT_PLAN_HISTORY.UPDATE,
        payload: payload
    }
};

// remove by id
export const removeWorkoutPlan = (payload) => {
    return {
        type: WORKOUT_PLAN_HISTORY.REMOVE,
        payload: payload
    };
};
