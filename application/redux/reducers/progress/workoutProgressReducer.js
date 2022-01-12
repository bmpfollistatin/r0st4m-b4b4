import { WORKOUT_PROG } from '../../types.js';

//example of what should be in the state
const defaultState = {
    // id: 'workoutProg1234',
    // workoutPlanProgressId: 'progress1234', // from workoutPlanProgressReducer
    // workoutPlanId: 'The Arnold', // from workoutPlanProgressReducer
    // workoutId: 'Legs',
    // // exerciseProgression: ['squats', 'bicep curls', 'bench press', 'dumbell rows', 'side raises'],
    // exerciseHistoryIds: [], // exerciseHistoryId's

    // notes: '',
    // startTime: null,
    // endTime: null,
};

// need to introduce concept of a progression. When they select a WorkoutPlan, create an ID for this progression.
const workoutProgress = (state = defaultState, action) => {
    switch (action.type) {
        case WORKOUT_PROG.UPDATE:
        case WORKOUT_PROG.START: {
            return { ...action.payload };
        }
        case WORKOUT_PROG.STOP: {
            return { ...state, endTime: action.payload.endTime };
        }
        case WORKOUT_PROG.SET_NOTES: {
            return { ...state, notes: action.payload.notes };
        }
        case WORKOUT_PROG.ADD_EXERCISE_HISTORY: {
            return { ...state, exerciseHistoryIds: [...state.exerciseHistoryIds, action.payload] };
            // this is doing a copy and modify...not mutating
        }
        default:
            return state;
    }
};

export default workoutProgress;
