import {CARDIO_LOG} from "../types";
import uuid from '../../utils/uuid';

export const saveCardioLogEntry = (payload) => {
    return async (dispatch) => {
        if (payload.id === undefined || payload.id === null) {
            payload.id = await uuid.v4();
        }
        dispatch({
            type: CARDIO_LOG.CARDIO_SAVE_LOG_ENTERY,
            payload: payload
        });
    }
}

export const removeCardioLogEntry = (payload) => {
    return {
        type: CARDIO_LOG.CARDIO_REMOVE_LOG_ENTERY,
        payload: payload
    };
}



// export const saveLEVEL = (payload) => {
//     return {
//         type: CARDIO_LOG.SAVE_LEVEL,
//         payload: payload
//     };
// }
//
// export const saveSpeed = (payload) => {
//     return {
//         type: CARDIO_LOG.SAVE_SPEED,
//         payload: payload
//     };
// }
//
// export const saveMinutes = (payload) => {
//     return {
//         type: CARDIO_LOG.SAVE_MINUTES,
//         payload: payload
//     };
// }
