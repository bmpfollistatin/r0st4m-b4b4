import { WORKOUT_PLAN_PROG } from '../../types.js';
import uuid from '../../../utils/uuid';

// TODO: where to we call this
export const start = (payload) => {
    return async (dispatch) => {
        payload.id = await uuid.v4();
        dispatch({
            type: WORKOUT_PLAN_PROG.START,
            payload: payload
        });
    }
}

export const stop = (payload) => {
    payload.endTime = Date.now();
    return {
        type: WORKOUT_PLAN_PROG.STOP,
        payload: payload
    };
}

export const update = (payload) => {
    return {
        type: WORKOUT_PLAN_PROG.UPDATE,
        payload: payload
    };
}