import { WORKOUT_PLAN_HISTORY } from '../../types.js';
import { combineReducers } from 'redux';

//example of what should be in the state
const workoutPlanHistoryMap = {
    // june 12th to 8th desc
    // 'arnoldhistory1234': {
    //     id: 'arnoldhistory1234',
    //     startTime: 1591999999,
    //     endTime: null,
    //     workoutPlanId: 'The Arnold',
    //     workoutHistoryIds: ['armworkout12345', 'legworkout12345', 'chestworkout12345', 'backworkout12345',
    //         'legworkout12346', 'armworkout12346', 'chestworkout12346', 'backworkout12346'],
    //     notes: 'i felt the burn',
    //     count: 4
    // },
};

const byId = (state = workoutPlanHistoryMap, action) => {
    switch (action.type) {
        case WORKOUT_PLAN_HISTORY.UPDATE:
        case WORKOUT_PLAN_HISTORY.ADD: {
            const id = action.payload.id;
            return {
                ...state,
                [id]: { ...action.payload },
            };
        }
        case WORKOUT_PLAN_HISTORY.REMOVE: {
            const id = action.payload.id;
            const { [id]: _, ...filteredState } = state;
            return filteredState;
        }
        default:
            return state;
    }
}

// list of all id's
const allIds = (state = Object.keys(workoutPlanHistoryMap), action) => {
    switch (action.type) {
        case WORKOUT_PLAN_HISTORY.ADD: {
            return [...state, action.payload.id];
        }
        case WORKOUT_PLAN_HISTORY.REMOVE: {
            return state.filter(i => i !== action.payload.id);
        }
        case WORKOUT_PLAN_HISTORY.UPDATE:
        default:
            return state;
    }
}

const workoutPlanHistory = combineReducers(
    {
        byId,
        allIds
    }
);

export default workoutPlanHistory;

const getAllWorkoutPlanHistory = (state) => state.allIds.map(id => state.byId[id]);

// filtered sets. This is a selector, not a reducer. Will not modify state, just return what we want to see.
export const filterWorkoutPlanHistory = (state, filter = { type: 'all', list: [], fieldName: null, fieldValue: null }) => {
    const allWorkoutPlanHistory = getAllWorkoutPlanHistory(state);
    switch (filter.type) {
        case 'all': {
            return allWorkoutPlanHistory;
        }
        case 'by_field': {
            // use fieldName like workoutPlanId or workoutId
            if (!filter.fieldName || !filter.fieldValue) {
                return [];
            }
            let workouts = allWorkoutPlanHistory.filter(item => item[filter.fieldName] === filter.fieldValue);
            // sort by date
            workouts.sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0);

            return workouts;
        }
        case 'from_custom_list': {
            // input list should be [id, ...]
            return (filter.list || []).map(id => ({ ...state.byId[id] }));
        }
        default:
            return allWorkoutPlanHistory;
    }
}
