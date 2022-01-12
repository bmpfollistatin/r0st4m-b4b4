import { SETS_REPS } from '../types.js';

// sets array must contains objects of
// {
//  setNumber: 0,
//  weight: 0,
//  reps: 0,
//  units: 'lbs',
// }
const defaultState = {
  currentIndex: 0,
  currentWeight: null,
  currentReps: null,
  sets: [{}, {}, {}, {}],
  tempo: [null, null, null, null]
};

// Check out this reference for dealing with immutable update patterns
// https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/

function addItem(array, action) {
  return [...array,
  {
    weight: action.payload.weight,
    reps: action.payload.reps,
  }]
}

function updateItem(array, action) {
  // expexted action payload {index, weight, reps}
  return [
    ...array.slice(0, action.payload.index),
    {
      weight: action.payload.weight,
      reps: action.payload.reps,
    },
    ...array.slice(action.payload.index + 1)]
}

function removeItem(array, action) {
  return [...array.slice(0, action.payload.index), ...array.slice(action.payload.index + 1)]
}

const setsAndReps = (state = defaultState, action) => {
  switch (action.type) {
    case SETS_REPS.UPDATE_SET: {
      // expexted action payload {index, weight, reps}
      return {
        ...state,
        sets: updateItem(state.sets, action),
      };
    }
    case SETS_REPS.ADD_SET: {
      return {
        ...state,
        sets: addItem(state.sets, action),
      };
    }
    case SETS_REPS.REMOVE_SET: {
      return {
        ...state,
        sets: removeItem(state.sets, action),
      };
    }
    case SETS_REPS.SET_CURRENT_INDEX: {
      const index = action.payload;
      if (index > state.sets.length) {
        return { ...state };
      }
      return {
        ...state,
        currentIndex: index,
        currentWeight: state.sets[index].weight,
        currentReps: state.sets[index].reps,
      };
    }
    case SETS_REPS.SET_CURRENT_WEIGHT: {
      return {
        ...state,
        currentWeight: action.payload,
      };
    }
    case SETS_REPS.SET_CURRENT_REPS: {
      return {
        ...state,
        currentReps: action.payload,
      };
    }

    // ASAP'S FUCKERY FOR INPUT CARD MODAL!

    case SETS_REPS.SET_CURRENT_NOTE: {
      return {
        ...state,
        currentNotes: action.payload,
      };
    }

    case SETS_REPS.SET_CURRENT_TEMPO: {
      return {
        ...state,
        tempo: action.payload,
      }
    }

    case SETS_REPS.SET_CURRENT_INJURY: {
      return {
        ...state,
        currentInjury: action.payload,
      };
    }

    default:
      return state;
  }
};

// Selectors
export function currentIndexSelector(state) {
  return state.setsAndReps.currentIndex;
}

export default setsAndReps;
