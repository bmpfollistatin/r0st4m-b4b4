import { CARDIO } from '../types.js';
import uuid from '../../utils/uuid';


export const addCardio = (payload) => {
    return async (dispatch) => {
        if (payload.id === undefined || payload.id === null) {
            payload.id = await uuid.v4();
        }

        dispatch({
            type: CARDIO.ADD_CARDIO,
            payload: payload
        });
    }
};

// remove cardio by id
export const removeCardio = (payload) => {
    return {
        type: CARDIO.REMOVE_CARDIO,
        payload: payload
    };
};
