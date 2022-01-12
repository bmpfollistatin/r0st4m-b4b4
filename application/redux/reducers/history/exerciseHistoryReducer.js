import { EXERCISE_HISTORY } from '../../types.js';
import { combineReducers } from 'redux';

//example of what should be in the state
const exerciseHistoryMap = {
    // 'squat12345': { id: 'squat12345', startTime: 1591377751, exerciseId: 'squats', workoutHistoryId: 'legworkout12345', order: 1, notes: 'yay exercise done' }
    // 'curls12345': {
    //     id: 'curls12345',
    //     startTime: 1591999999,
    //     endTime: null,
    //     exerciseDetailId: {} // will tell us out of how many sets TODO implement this
    //     exerciseId: 'bicep curls',
    //     setHistoryIds: ['curlsset12345'], // will give count of completed sets
    //     order: 1, // we might not need order. This can be maintained by the workout having exerciseHistoryId's array ordering
    //     notes: 'yay exercise done'
    // },
    // 'squat12345': { id: 'squat12345', startTime: 1591377751, exerciseId: 'squats', setHistoryIds: ['squatset12345', 'squatset12345', 'squatset12345'], order: 1, notes: 'yay exercise done' },
    // 'bench12345': { id: 'bench12345', startTime: 1591825514, exerciseId: 'bench press', setHistoryIds: ['benchset12345'], order: 1, notes: 'yay exercise done' },
    // 'pullups12345': { id: 'pullups12345', startTime: 1591739114, exerciseId: 'bicep curls', setHistoryIds: ['pullupset12345'], order: 1, notes: 'yay exercise done' },


    // 'leg Curls': { id: 'leg Curls', startTime: 1607472077, endTime: null, order: 1, notes: 'only doing notes' },

};

const defaultState = {
    loading: false,
};

//  this is for the ...state, [id] ...note below
// {
//     1: {id: 1, name: 'derek'},
//     2: {id: 2, name: 'asap'},
//     3: {id: 3, name: 'bob'}
// }

const byId = (state = exerciseHistoryMap, action) => {
    // look for the action type with specific and execute the function inside of it.
    // If not found it goes to default: return state which basically returns state with no modification (no adding, delete, or anything...)
    switch (action.type) {      
        // since there is no function here, drop down to the next thing (this is general switch statement)
        case EXERCISE_HISTORY.UPDATE:
        case EXERCISE_HISTORY.ADD: {
            const id = action.payload.id;
            return {
                ...state,
                // adding a new key and assigning it an object. This will had the id both inside and out of the object
                // so later on we can refer to the id. 
                [id]: { ...action.payload },
            }; 
        }

        case EXERCISE_HISTORY.REMOVE: {
            const id = action.payload.id; // action.payload = {id: id3, name: 'bob'}
            const { [id]: trash_value, ...filteredState } = state;
            return filteredState;
        }

        default:
            return state;
    }
}

// array or list of all id's
const allIds = (state = Object.keys(exerciseHistoryMap), action) => {
    switch (action.type) {
        case EXERCISE_HISTORY.ADD: {
            return [...state, action.payload.id];
        }
        case EXERCISE_HISTORY.REMOVE: {
            // .filter for filtering arrays and this takes in a function that returns true or false
            // if true it stays, if false, gets deleted...
            // id !== action.payload.id this is a one line true or false statement
            return state.filter(id => id !== action.payload.id);
        }
        case EXERCISE_HISTORY.UPDATE:
        default:
            return state;
    }
}

const exerciseHistory = combineReducers(
    {
        byId,
        allIds
    }
);

export default exerciseHistory;

const getAllExerciseHistory = (state) => state.allIds.map(id => state.byId[id]);

// filtered sets. This is a selector, not a reducer. Will not modify state, just return what we want to see.
export const filterExerciseHistory = (state, filter = { type: 'all', list: [], fieldName: null, fieldValue: null }) => {
    const allExerciseHistory = getAllExerciseHistory(state);
    switch (filter.type) {
        case 'all': {
            return allExerciseHistory;
        }
        case 'by_field': {
            // use fieldName like exerciseId or workoutHistoryId
            if (!filter.fieldName || !filter.fieldValue) {
                return [];
            }
            return allExerciseHistory.filter(item => item[fieldName] === filter.fieldValue);
        }
        case 'from_custom_list': {
            // input list should be [id,id, ...]
            return (filter.list || []).map(id => ({ ...state.byId[id] }));
        }
        default:
            return allExerciseHistory;
    }
}
