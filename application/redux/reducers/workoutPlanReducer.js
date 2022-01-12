import { WORKOUT_PLAN } from '../types.js';
import { combineReducers } from 'redux';
const WorkoutPlanDatabase = require('../../../assets/files/workoutPlan.json');

const parseBasicWorkoutPlan = workoutPlan => ({ id: workoutPlan.id, name: workoutPlan.workoutPlan_name, workoutIdList: workoutPlan.workoutIdList, notes: workoutPlan.notes });
// const parseBasicExercise = exercise => ({ id: exercise.id, name: exercise.Name, description: exercise.Description });
// const mappingWorkoutPlan = WorkoutPlanDatabase.workoutPlan.map(parseBasicWorkoutPlan);


const reducedWorkoutPlan = WorkoutPlanDatabase.workoutPlan.reduce((acc, workoutPlan) => {
    const { id } = workoutPlan; // so this is equal to exercise.id....it's es6 or something.
    return { ...acc, [id]: parseBasicWorkoutPlan(workoutPlan) };
}, {});


/*
 * Constains workout days that can be added to a workout
 */

const workoutplanmap = {
    // 'The starter': { id: 'The starter', name: 'The starter', workoutIdList: ['arms', 'legs', 'back', 'abs', 'chest'], notes: '' },
    // 'The chicken Leg': { id: 'The chicken Leg', name: 'The chicken Leg', workoutIdList: ['legs', 'back', 'hamstring', 'chest'], notes: '' },
    // '5x/week': { id: '5x/week', name: '5x/week', workoutIdList: ['legs', 'arms', 'abs', 'back', 'chest'],  notes: '' },
    // 'The Arnold': { id: 'The Arnold', name: 'The Arnold', workoutIdList: ['legs', 'arms', 'abs', 'back', 'chest'],  notes: '' },
};

const defaultState = {
    // currentWorkoutPlan: '5x5',
    loading: false,
}




const info = (state = defaultState, action) => {
    switch (action.type) {
        case WORKOUT_PLAN.REQUESTING: {
            return {
                ...state,
                loading: true,
            };
        }
        case WORKOUT_PLAN.RECEIVED: {
            return {
                ...state,
                loading: false,

            };
        }
        case WORKOUT_PLAN.SET_CURRENT_WORKOUT_PLAN: {
            return {
                ...state,
                currentWorkoutPlan: action.payload,
            }
        }

        default:
            return state;
    }
};

const createWorkoutPlan = (action) => {
    let { id, name, workoutIdList, currentWorkoutId, notes } = action.payload;
    if (!currentWorkoutId && workoutIdList.length > 0) {
        currentWorkoutId = workoutIdList[0];
    }
    return {
        id,
        name,
        workoutIdList: workoutIdList || [],
        currentWorkoutId,
        notes
    }
}


// state object of workoutPlan
const byId = (state = reducedWorkoutPlan, action) => {
    switch (action.type) {
        case WORKOUT_PLAN.UPDATE_WORKOUT_PLAN:
        case WORKOUT_PLAN.ADD_WORKOUT_PLAN: {
            const id = action.payload.id;
            return {
                ...state,
                [id]: createWorkoutPlan(action),
            };
        }
        case WORKOUT_PLAN.REMOVE_WORKOUT_PLAN: {
            const id = action.payload.id;
            const { [id]: _, ...filteredState } = state;
            return filteredState;
        }
        case WORKOUT_PLAN.ADD_WORKOUT: {
            const { id, workoutId } = action.payload;
            return {
                ...state,
                [id]: { ...state[id], workoutIdList: [...state[id].workoutIdList, workoutId] },
            };
        }
        case WORKOUT_PLAN.REMOVE_WORKOUT: {
            const { id, workoutId } = action.payload;
            return {
                ...state,
                [id]: { ...state[id], workoutIdList: state[id].workoutIdList.filter((i) => i !== workoutId) },
            };
        }
        // case WORKOUT_PLAN.COMPLETE_WORKOUT: {
        //     const { id } = action.payload;
        //     return {
        //         ...state,
        //         [id]: { ...state[id], currentWorkoutId: getNextWorkoutId(state[id]) }
        //     };
        // };
        default:
            return state;
    }
}

// just a list of all the exercise id's
const allIds = (state = Object.keys(reducedWorkoutPlan), action) => {
    switch (action.type) {
        case WORKOUT_PLAN.ADD_WORKOUT_PLAN: {
            const id = action.payload.id;
            return [...state, id];
        }
        case WORKOUT_PLAN.REMOVE_WORKOUT_PLAN: {
            return state.filter((i) => i !== action.payload.id);
        }
        default:
            return state;
    }
}

const workoutPlan = combineReducers(
    {
        byId,
        allIds,
        info
    }
);

export default workoutPlan;

/*
 * Selectors
 */

const getallWorkoutPlans = (state) => state.allIds.map(id => state.byId[id]);

// filtered exercises. This is a selector, not a reducer. Will not modify state, just return what we want to see.
export const filterWorkoutPlans = (state, filter = { type: 'all', list: [] }) => {
    const allWorkoutPlans = getallWorkoutPlans(state);
    // const current = allWorkoutPlans.find(item => item.id === state.info.currentWorkoutPlan);
    switch (filter.type) {
        case 'all': {
            return allWorkoutPlans;
        }
        // case 'current': {
        //     return current;
        // }
        case 'from_custom_list': {
            // input list should be [id,id,id ...], returns array of workout objects for those id's
            return (filter.list || []).map(id => ({ ...state.byId[id]}));
          }

        default:
            return allWorkoutPlans;
    }
}

/*
 * Helpers
 */

// get the workouts in order for the Home view.
// return list of objects containing {id, originalIndex}


// function getNextWorkoutId(currentWorkoutPlan) {
//     const { workoutIdList, currentWorkoutId } = currentWorkoutPlan;
//     const index = workoutIdList.findIndex((id) => (id === currentWorkoutId));
//     let nextWorkoutId = workoutIdList[index + 1] || workoutIdList[0];
//     return nextWorkoutId;
// }
