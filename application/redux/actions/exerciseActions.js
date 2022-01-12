// import { EXERCISE } from '../types.js';
// import uuid from '../../utils/uuid';

// export const addExercise = (payload) => {
//     console.log('payload in exerciseAction' , {payload})
//     return async (dispatch) => {
//         if (payload.id === undefined || payload.id === null) {
//             payload.id = await uuid.v4();
//         }

//         dispatch({
//             type: EXERCISE.ADD_EXERCISE,
//             payload: payload
//         });
//     }
// };

// // all exercises in list must have id present
// // payload: {exercises: [{id, name}, {id, name}, ...]}
// export const addExercises = (payload) => {
//     return async (dispatch) => {
//         dispatch({
//             type: EXERCISE.ADD_EXERCISES,
//             payload: payload
//         });
//     }
// };

// export const updateExercise = (payload) => {
//     // should already have an id
//     if (payload.id === undefined || payload.id === null) {
//         // TODO throw some kind of error
//     }
//     return {
//         type: EXERCISE.UPDATE_EXERCISE,
//         payload: payload
//     }
// };

// // remove exercise by id
// export const removeExercise = (payload) => {
//     return {
//         type: EXERCISE.REMOVE_EXERCISE,
//         payload: payload
//     };
// };

// export const requestExercises = () => {
//     return {
//         type: EXERCISE.REQUESTING,
//     };
// }

// export const receivedExercises = () => {
//     return {
//         type: EXERCISE.RECEIVED,
//     };
// }