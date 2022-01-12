import {SETS_AND_REPS_ENTRY} from "../types";


export const saveSetsAndRepsLogEntry = (payload) => {
    payload.id = Date.now();
    return {
        type: SETS_AND_REPS_ENTRY.SETS_AND_REPS_SAVE_LOG_ENTRY,
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
// export const saveHours = (payload) => {
//     return {
//         type: CARDIO_LOG.SAVE_HOURS,
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
