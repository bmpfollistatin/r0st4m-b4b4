import {CARDIO_LOG} from '../types.js';
import {combineReducers} from "redux";

const cardioLogMap = {

}

const byId = (state = cardioLogMap, action) => {
    switch (action.type) {
        case CARDIO_LOG.CARDIO_SAVE_LOG_ENTERY: {
            const id = action.payload.id;
            return {
                ...state,
                [id]: {
                    ...action.payload
                }
            };
        }
        case CARDIO_LOG.CARDIO_REMOVE_LOG_ENTERY: {
            const id = action.payload.id;
            const { [id]: _, ...filteredState } = state;
            return filteredState;
        }
        default:
            return state;
    }
}

// just a list of all the cardio id's
const allIds = (state = Object.keys(cardioLogMap), action) => {
    switch (action.type) {
        case CARDIO_LOG.CARDIO_SAVE_LOG_ENTERY: {
            // console.log(action.payload)
            return [...state, action.payload.id];
        }
        case CARDIO_LOG.CARDIO_REMOVE_LOG_ENTERY: {
            return state.filter(i => i !== action.payload.id);
        }
        default:
            return state;
    }
}

const cardioLogs = combineReducers(
    {
        byId,
        allIds
    }
);

export default cardioLogs;

const getAllCardioLogs = (state) => state.allIds.map(id => state.byId[id]);

// filtered sets. This is a selector, not a reducer. Will not modify state, just return what we want to see.
export const filterCardioLogs = (state, filter = { type: 'all', list: [], fieldName: null, fieldValue: null }) => {
    const allCardioLogs = getAllCardioLogs(state);
    switch (filter.type) {
        case 'all': {
            return allCardioLogs;
        }
        case 'by_field': {
            // use fieldName like exerciseId or workoutHistoryId
            // if returns without filed name or field value then  reutnr an empty array 
            // this is error checking
            if (!filter.fieldName || !filter.fieldValue) {
                return [];
            }
// this is for a case of a single item...i'd probably need to loop over with map
            // {
            //     id: 1,
            //     notes: 'stuff',
            //     desc: 'asdf',
            //     tips:'adf',
            //     equipment: 'squat rack'
            // }
            // filter(state.exercise, {type: 'by_field', fieldName: 'equipment', fieldValue: 'squat rack'})
            // this is what i want

            return allCardioLogs.filter(item => item[fieldName] === filter.fieldValue);
        }
        case 'from_custom_list': {
            // input list should be [id,id, ...]
            return (filter.list || []).map(id => ({ ...state.byId[id] }));
        }
        default:
            return allCardioLogs;
    }
}
