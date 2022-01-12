import { SET_PROG } from '../../types.js';

export const start = (payload) => {
    return {
        type: SET_PROG.START,
        payload: payload
    };
}

export const update = (payload) => {
    return {
        type: SET_PROG.UPDATE,
        payload: payload
    };
}

export const stop = (payload) => {
    payload.endTime = Date.now();
    return {
        type: SET_PROG.STOP,
        payload: payload
    };
}