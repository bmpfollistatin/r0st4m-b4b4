/* eslint-disable prettier/prettier */
import { EXERCISE_PROG } from '../../types.js';

//example of what should be in the state
const defaultState = {
    // id: 'exerciseProg1234',
    // workoutPlanProgressId: 'progress1234', // from workoutPlanProgressReducer
    // workoutProgressId: 'workoutProg1234',
    // workoutPlanId: 'The Arnold', // from workoutPlanProgressReducer 
    // // TODO: now we have dups of all these id's across 3 reducers. Seems like bad idea, have to keep in sync.
    // // maybe we have to separate the data, then have some kind of convenience method selector that combines 
    // // it all into a more usable object for us?
    // workoutId: 'Legs',
    // exerciseId: 'Squats',
    // notes: '',
    // startTime: null,
    // endTime: null,
    // setHistoryIds: ['setProg1234'], // set progress id's. Get sets completed by counting this.


    // WE SHOULD HAVE THIS MATCH THE HISTORY
    // id: 'curls12345',
    // startTime: 1591999999,
    // endTime: null,
    // exerciseId: 'curls',
    // setHistoryIds: ['curlsset12345'],
    // order: 1, // we might not need order. This can be maintained by the workout having exerciseHistoryId's array ordering
    // notes: 'yay exercise done',
    // //adding after exercise detail been created is
    // exerciseDetailId: ''
};

// need to introduce concept of a progression. When they select a WorkoutPlan, create an ID for this progression.
const exerciseProgress = (state = defaultState, action) => {
    switch (action.type) {
        case EXERCISE_PROG.UPDATE:
        case EXERCISE_PROG.START: {
            return { ...action.payload };
        }
        // do stop once they complete the exercise. 
        // not if they skip from one to another. 
        case EXERCISE_PROG.STOP: {
            return { ...state, endTime: action.payload.endTime };
        }
        case EXERCISE_PROG.SET_NOTES: {
            return { ...state, notes: action.payload.notes };
        }
        default:
            return state;
    }
};
export default exerciseProgress;
