import { WORKOUT_PROG } from '../../types.js';
import uuid from '../../../utils/uuid';

export const start = (payload) => {
    return async (dispatch) => {
        payload.id = await uuid.v4();
        dispatch({
            type: WORKOUT_PROG.START,
            payload: payload
        });
    }
}

export const stop = (payload) => {
    payload.endTime = Date.now();
    return {
        type: WORKOUT_PROG.STOP,
        payload: payload
    };
}

export const update = (payload) => {
    return {
        type: WORKOUT_PROG.UPDATE,
        payload: payload
    };
}

export const setNotes = (payload) => {
    return {
        type: WORKOUT_PROG.SET_NOTES,
        payload: payload
    };
}

export const addExerciseHistory = (payload) => {
    return {
        type: WORKOUT_PROG.ADD_EXERCISE_HISTORY,
        payload: payload
    };
}