import { SET_PROG } from '../../types.js';

//example of what should be in the state
const defaultState = {
    // id: 'setProg1234',
    // workoutPlanProgressId: 'progress1234', // from workoutPlanProgressReducer
    // workoutProgressId: 'workoutProg1234',
    // exerciseProgressId: 'exerciseProg1234',
    // workoutPlanId: 'The Arnold', // from workoutPlanProgressReducer 
    // TODO: now we have dups of all these id's across 3 reducers. Seems like bad idea, have to keep in sync.
    // maybe we have to separate the data, then have some kind of convenience method selector that combines 
    // it all into a more usable object for us?
    // workoutId: 'Legs',
    // exerciseId: 'Squats',

    // notes: '',
    // startTime: null,
    // endTime: null,
    // reps: null,
    // weight: null, // TODO add option to choose weight format? Store that in top level, workoutPlanProgressReducer.
};

// need to introduce concept of a progression. When they select a WorkoutPlan, create an ID for this progression.
const setProgress = (state = defaultState, action) => {
    switch (action.type) {
        case SET_PROG.UPDATE:
        case SET_PROG.START: {
            return { ...action.payload };
        }
        case SET_PROG.STOP: {
            return { ...state, endTime: action.payload.endTime };
        }
        case SET_PROG.SET_NOTES: {
            return { ...state, notes: action.payload.notes };
        }
        default:
            return state;
    }
};
export default setProgress;
