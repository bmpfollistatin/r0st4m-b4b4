import { WORKOUT_PLAN_PROG } from '../../types.js';

// where the initial workout plan is loaded in the home page (the starter)
//example of what should be in the state
const defaultState = {
    // id: 'progress1234', //workout plan in progress id, this progression has its unique id
    // workoutPlanId: 'The starter',
    // workoutProgression: ['arms', 'legs', 'back', 'abs', 'chest'],
    // // currentWorkoutId: 'chest', // history will tell us what the last wo was
    // // workoutHistoryIds: ['armworkout12345', 'legworkout12345', 'chestworkout12345', 'backworkout12345',
    // // 'legworkout12346', 'armworkout12346', 'chestworkout12346', 'backworkout12346'],
    // workoutHistoryIds: null,
    // notes: '',
    // workoutCountMax: 5,
    // startTime: null,
    // endTime: null,

// sets the default state of a workout when the user just installed and opened the app
    id: '1', //workout plan in progress id, this progression has its unique id
    workoutPlanId: '1',
    workoutProgression: ['1', '2', '3', '4', '5', '6', '7'],
    workoutHistoryIds: null,
    notes: '',
    workoutCountMax: 4,
    startTime: null,
    endTime: null,
};

// need to introduce concept of a progression. When they select a WorkoutPlan, create an ID for this progression.
const workoutPlanProgress = (state = defaultState, action) => {
    switch (action.type) {
        // be sure to save stuff in progress to history before clearing and starting new progression
        case WORKOUT_PLAN_PROG.UPDATE:
        case WORKOUT_PLAN_PROG.START: {
            return { ...action.payload };
        }
        case WORKOUT_PLAN_PROG.STOP: {
            return { ...state, endTime: action.payload.endTime };
        }
        case WORKOUT_PLAN_PROG.SET_NOTES: {
            return { ...state, notes: action.payload.notes };
        }
        default:
            return state;
    }
};


// filtered exercises. This is a selector, not a reducer. Will not modify state, just return what we want to see.
export const filterWorkoutPlanProgress = (state, filter = { type: 'from_workout', workoutId: null }) => {
    switch (filter.type) {
        case 'from_workout': {
            // workoutId should come from filtering history for last workout in mapStateToProps from home page
            return rotateWorkoutList(state.workoutProgression, filter.workoutId)
        }
        default:
            return state.workoutProgression;
    }
}

// get the workouts in order for the Home view.
const rotateWorkoutList = (workoutProgression, workoutId) => {
    if(!workoutId){
        return workoutProgression;
    }

    let formattedList = [...workoutProgression];
    let count = 0;

    while (formattedList[0] !== workoutId && count < formattedList.length) {
        count += 1;
        formattedList.push(formattedList.shift());
    }

    return formattedList;
}

export default workoutPlanProgress;
