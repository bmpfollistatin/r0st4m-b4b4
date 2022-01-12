import { WORKOUT_HISTORY } from '../../types.js';
import { combineReducers } from 'redux';

//example of what should be in the state
const workoutHistoryMap = {
    // // june 12th to 8th desc
    // 'armworkout12345': {
    //     id: 'armworkout12345',
    //     // workoutPlanHistoryId: 'progress1234',
    //     startTime: 1591999999,
    //     endTime: null,
    //     workoutPlanId: 'The Arnold',
    //     workoutId: 'arms',
    //     exerciseHistoryIds: ['curls12345'],
    //     notes: 'i felt the burn',
    //     count: 4
    // },
    // 'legworkout12345': { id: 'legworkout12345', workoutPlanHistoryId: 'progress1234', startTime: 1591998314, endTime: null, workoutPlanId: 'The Arnold', workoutId: 'legs', exerciseHistoryIds: ['squat12345'], notes: 'i felt the burn', count: 4 },
    // 'chestworkout12345': { id: 'chestworkout12345', workoutPlanHistoryId: 'progress1234', startTime: 1591825514, endTime: null, workoutPlanId: 'The Arnold', workoutId: 'chest', exerciseHistoryIds: ['bench12345'], notes: 'i felt the burn', count: 4 },
    // 'backworkout12345': { id: 'backworkout12345', workoutPlanHistoryId: 'progress1234', startTime: 1591739114, endTime: null, workoutPlanId: 'The Arnold', workoutId: 'back', exerciseHistoryIds: ['pullups12345'], notes: 'i felt the burn', count: 4 },
    // // 'absworkout12345': { id: 'absworkout12345', workoutPlanHistoryId: 'progress1234', startTime: 1591652714, endTime: null, workoutPlanId: 'The Arnold', workoutId: 'abs', exerciseHistoryIds: [], notes: 'i felt the burn', count: 4 },

    // // may 27th to 24th desc
    // 'legworkout12346': { id: 'legworkout12345', workoutPlanHistoryId: 'progress1234', startTime: 1590615914, endTime: null, workoutPlanId: 'The Arnold', workoutId: 'legs', exerciseHistoryIds: [], notes: 'i felt the burn', count: 4 },
    // 'armworkout12346': { id: 'armworkout12345', workoutPlanHistoryId: 'progress1234', startTime: 1590529514, endTime: null, workoutPlanId: 'The Arnold', workoutId: 'arms', exerciseHistoryIds: [], notes: 'i felt the burn', count: 4 },
    // 'chestworkout12346': { id: 'chestworkout12345', workoutPlanHistoryId: 'progress1234', startTime: 1590443114, endTime: null, workoutPlanId: 'The Arnold', workoutId: 'chest', exerciseHistoryIds: [], notes: 'i felt the burn', count: 4 },
    // 'backworkout12346': { id: 'backworkout12345', workoutPlanHistoryId: 'progress1234', startTime: 1590356714, endTime: null, workoutPlanId: 'The Arnold', workoutId: 'back', exerciseHistoryIds: [], notes: 'i felt the burn', count: 4 },

    // 'legworkout127567': { id: 'legworkout127567', workoutPlanHistoryId: 'progress1235', startTime: 1591377751, endTime: null, workoutPlanId: 'The Arnold', workoutId: 'legs', exerciseHistoryIds: [], notes: 'i felt the burn', count: 5 },
    // 'legworkout12398': { id: 'legworkout12398', workoutPlanHistoryId: 'progress1236', startTime: 1591377751, endTime: null, workoutPlanId: 'The Arnold', workoutId: 'legs', exerciseHistoryIds: [], notes: 'i felt the burn', count: 6 }

};

const defaultState = {
    loading: false,
};

const byId = (state = workoutHistoryMap, action) => {
    switch (action.type) {
        case WORKOUT_HISTORY.UPDATE:
        case WORKOUT_HISTORY.ADD: {
            const id = action.payload.id;
            return {
                ...state,
                [id]: { ...action.payload },
            };
        }
        case WORKOUT_HISTORY.REMOVE: {
            const id = action.payload.id;
            const { [id]: _, ...filteredState } = state;
            return filteredState;
        }
        default:
            return state;
    }
}

// list of all id's
const allIds = (state = Object.keys(workoutHistoryMap), action) => {
    switch (action.type) {
        case WORKOUT_HISTORY.UPDATE:
        case WORKOUT_HISTORY.ADD: {
            // if id not already in list, then add it.
            let updatedState = state.filter(i => i !== action.payload.id);
            return [...updatedState, action.payload.id];
        }
        case WORKOUT_HISTORY.REMOVE: {
            return state.filter(i => i !== action.payload.id);
        }
        default:
            return state;
    }
}

const workoutHistory = combineReducers(
    {
        byId,
        allIds
    }
);

export default workoutHistory;

const getAllWorkoutHistory = (state) => state.allIds.map(id => state.byId[id]);

// filtered sets. This is a selector, not a reducer. Will not modify state, just return what we want to see.
export const filterWorkoutHistory = (state, filter = { type: 'all', list: [], fieldName: null, fieldValue: null }) => {
    const allWorkoutHistory = getAllWorkoutHistory(state);
    switch (filter.type) {
        case 'all': {
            // console.log('<> <> returning workout history from reducer ', allWorkoutHistory)
            return allWorkoutHistory;
        }
        case 'by_field': {
            // use fieldName like workoutPlanId or workoutId
            if (!filter.fieldName || !filter.fieldValue) {
                return [];
            }
            let workouts = allWorkoutHistory.filter(item => item[filter.fieldName] === filter.fieldValue);
            // sort by date
            workouts.sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0);

            return workouts;
        }
        case 'from_custom_list': {
            // input list should be [id, ...]
            return (filter.list || []).map(id => ({ ...state.byId[id] }));
        }
        default:
            return allWorkoutHistory;
    }
}
