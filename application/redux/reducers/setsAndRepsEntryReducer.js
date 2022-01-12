import {SETS_AND_REPS_ENTRY} from '../types.js';
import {CARDIO} from "../types";
import {combineReducers} from "redux";

const setsAndRepsEntryLogMap = {

}

const byId = (state = setsAndRepsEntryLogMap, action) => {
    switch (action.type) {
        case SETS_AND_REPS_ENTRY.SETS_AND_REPS_SAVE_LOG_ENTRY: {
            const id = action.payload.id;
            return {
                ...state,
                [id]: {
                    ...action.payload
                }
            };
        }
        case SETS_AND_REPS_ENTRY.SETS_AND_REPS_REMOVE_LOG_ENTRY: {
            const id = action.payload.id;
            const { [id]: _, ...filteredState } = state;
            return filteredState;
        }
        default:
            return state;
    }
}

// just a list of all the cardio id's
const allIds = (state = Object.keys(setsAndRepsEntryLogMap), action) => {
    switch (action.type) {
        case SETS_AND_REPS_ENTRY.SETS_AND_REPS_SAVE_LOG_ENTRY: {
            return [...state, action.payload.id];
        }
        case SETS_AND_REPS_ENTRY.SETS_AND_REPS_REMOVE_LOG_ENTRY: {
            return state.filter(i => i !== action.payload.id);
        }
        default:
            return state;
    }
}

const setsAndRepsEntryLog = combineReducers(
    {
        byId,
        allIds
    }
);

export default setsAndRepsEntryLog;

