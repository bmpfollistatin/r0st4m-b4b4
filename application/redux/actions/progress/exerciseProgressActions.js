import { EXERCISE_PROG } from '../../types.js';

export const start = (payload) => {
    return {
        type: EXERCISE_PROG.START,
        payload: payload
    };
}

export const update = (payload) => {
    return {
        type: EXERCISE_PROG.UPDATE,
        payload: payload
    };
}

export const stop = (payload) => {
    payload.endTime = Date.now();
    return {
        type: EXERCISE_PROG.STOP,
        payload: payload
    };
}