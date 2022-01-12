import { CARDIO } from '../types.js';
import { combineReducers } from 'redux';

const cardioMap = {
    'Running': { id: 'running', name: 'Running', description: '' }, // Id's to be replaced with database Id's
    'Jogging': { id: 'jogging', name: 'Jogging', description: '' }, 
    'Elliptical': { id: 'elliptical', name: 'Elliptical', description: '' },
    'StairMasters': { id: 'stairMasters', name: 'StairMasters', description: '' },
    'Boxing': { id: 'boxing', name: 'Boxing', description: '' },
    'Aerobics': { id: 'aerobics', name: 'Aerobics', description: '' },
    'FieldSports': { id: 'fieldSports', name: 'Field Sports', description: '' },
    'IndoorCycling': { id: 'indoorCycling', name: 'Indoor Cycling', description: '' },
    'InlineSkating': { id: 'inlineSkating', name: 'Inline Skating', description: '' },
    'JumpRope': { id: 'jumpRope', name: 'Jump Rope', description: '' },
    'MountainBiking': { id: 'mountainBiking', name: 'Mountain Biking', description: '' },
    'Pilates': { id: 'pilates', name: 'Pilates', description: '' },
    'RecumbentBike': { id: 'recumbentBike', name: 'Recumbent Bike', description: '' },
    'RoadCycling': { id: 'roadCycling', name: 'Road Cycling', description: '' },
    'Rowing': { id: 'rowing', name: 'Rowing', description: '' },
    'StationaryBike': { id: 'stationaryBike', name: 'Stationary Bike', description: '' },
    'Swimming': { id: 'swimming', name: 'Swimming', description: '' },
    'TreadmillRunning': { id: 'treadmillRunning', name: 'Treadmill Running', description: '' },
    'Walking': { id: 'walking', name: 'Walking', description: '' },
    'Yoga': { id: 'yoga', name: 'Yoga', description: '' },
    //Total of 20 exercises

};

const defaultState = {
    loading: false,
};

function createCardio(action) {
    return {
        id: action.payload.id,
        name: action.payload.name,
        tags: action.payload.tags,
        description: action.payload.description,
    }
}

// function updateItem(array, action) {
//   return [
//     ...array.slice(0, action.payload.index),
//     {
//       weight: action.payload.weight,
//       reps: action.payload.reps,
//     },
//     ...array.slice(action.payload.index + 1)]
// }

// remove by id
// function removeItem(array, action) {
//     return array.filter(item => item.id !== action.id);
// }


// state object of CARDIOs
const byId = (state = cardioMap, action) => {
    switch (action.type) {
        case CARDIO.ADD_CARDIO: {
            const id = action.payload.id;
            return {
                ...state,
                [id]: createCardio(action),
            };
        }
        case CARDIO.REMOVE_CARDIO: {
            const id = action.payload.id;
            const { [id]: _, ...filteredState } = state;
            return filteredState;
        }
        default:
            return state;
    }
}

// just a list of all the cardio id's
const allIds = (state = Object.keys(cardioMap), action) => {
    switch (action.type) {
        case CARDIO.ADD_CARDIO: {
            return [...state, action.payload.id];
        }
        case CARDIO.REMOVE_CARDIO: {
            return state.filter(i => i !== action.payload.id);
        }
        default:
            return state;
    }
}

const cardios = combineReducers(
    {
        byId,
        allIds
    }
);

export default cardios;

const getAllCardios = (state) => state.allIds.map(id => state.byId[id]);

// filtered cardios. This is a selector, not a reducer. Will not modify state, just return what we want to see.
export const filterCardios = (state, filter = { type: 'all' }) => {
    const allCardios = getAllCardios(state);
    switch (filter.type) {
        case 'all': {
            return allCardios;
        }
        case 'tag': {
            return allCardios.filter(item => item.tags.includes(tag));
        }
        case 'from_custom_list': {
            // input list should be [{id, originalIndex}, ...]
            return filter.list.map(element => ({ ...state.byId[element.id], originalIndex: element.originalIndex }));
        }
        default:
            return allCardios;
    }
}
