import { SET_HISTORY } from '../../types.js';
import { combineReducers } from 'redux';

//example of what should be in the state
const setHistoryMap = {
    // 'squatset12345': { id: 'squatset12345', exerciseHistoryId: 'squats123', date: 1591377751, order: 1, weight: 300, reps: 10, tempo: [4, 4, 4, 4] }, //Id's to be replaced with database Id's
    // 'squatset12345': { 
    //     id: 'squatset12345', 
    //     startTime: 1591377751, 
    //     endTime: 1591377751,
    //     // order: 1, 
    //     weight: 300, 
    //     reps: 10, 
    //     tempo: '4 4 4 4',
    //     notes: 'Im fat',
    //     injury: 'I broke my nose',
    // },

    // 'curlsset12345': { 
    //     id: 'curlsset12345', 
    //     startTime: 1591377751, 
    //     endTime: 1591377751,
    //     // order: 1, 
    //     weight: 300, 
    //     reps: 10, 
    //     tempo: '4 4 4 4',
    //     notes: 'Im fat',
    //     injury: 'I broke my nose',
    // },
    // 'benchset12345': { 
    //     id: 'benchset12345', 
    //     startTime: 1591377751, 
    //     endTime: 1591377751,
    //     // order: 1, 
    //     weight: 300, 
    //     reps: 10, 
    //     tempo: '4 4 4 4',
    //     notes: 'Im fat',
    //     injury: 'I broke my nose',
    // },
    // 'pullupset12345': { 
    //     id: 'pullupset12345', 
    //     startTime: 1591377751, 
    //     endTime: 1591377751,
    //     // order: 1, 
    //     weight: 300, 
    //     reps: 10, 
    //     tempo: '4 4 4 4',
    //     notes: 'Im fat',
    //     injury: 'I broke my nose',
    // },
};

const defaultState = {
    loading: false,
};

const byId = (state = setHistoryMap, action) => {
    switch (action.type) {
        case SET_HISTORY.UPDATE:
        case SET_HISTORY.ADD: {
            const id = action.payload.id;
            return {
                ...state,
                [id]: { ...action.payload },
            };
        }
        case SET_HISTORY.REMOVE: {
            const id = action.payload.id;
            const { [id]: trash, ...filteredState } = state;
            return filteredState;
        }
        default:
            return state;
    }
}

// list of all id's
const allIds = (state = Object.keys(setHistoryMap), action) => {
    switch (action.type) {
        case SET_HISTORY.ADD: {
            return [...state, action.payload.id];
        }
        case SET_HISTORY.REMOVE: {
            return state.filter(i => i !== action.payload.id);
        }
        case SET_HISTORY.UPDATE:
        default:
            return state;
    }
}

const setHistory = combineReducers(
    {
        byId,
        allIds
    }
);

export default setHistory;

const getAllSetHistory = (state) => state.allIds.map(id => state.byId[id]);

// filtered sets. This is a selector, not a reducer. Will not modify state, just return what we want to see.
export const filterSetHistory = (state, filter = { type: 'all', list: [], exerciseHistoryId: null }) => {
    const allSetHistory = getAllSetHistory(state);
    switch (filter.type) {
        case 'all': {
            return allSetHistory;
        }
        case 'by_exerciseHistoryId': {
            if (!filter.exerciseHistoryId) {
                return [];
            }
            return allSetHistory.filter(item => item.exerciseHistoryId === filter.exerciseHistoryId);
        }
        case 'from_custom_list': {
            // input list should be [id, ...]
            return (filter.list || []).map(id => ({ ...state.byId[id] }));
        }
        default:
            return allSetHistory;
    }
}
