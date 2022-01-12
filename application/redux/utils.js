/*
 * Helpful functions for state manegement.
 */

import * as setHistoryActions from './actions/history/setHistoryActions';
import * as setProgressActions from './actions/progress/setProgressActions';
import * as exerciseHistoryActions from './actions/history/exerciseHistoryActions';
import * as exerciseProgressActions from './actions/progress/exerciseProgressActions';
import * as workoutHistoryActions from './actions/history/workoutHistoryActions';
import * as workoutProgressActions from './actions/progress/workoutProgressActions';
import * as workoutPlanHistoryActions from './actions/history/workoutPlanHistoryActions';
import * as workoutPlanProgressActions from './actions/progress/workoutPlanProgressActions';

/**
 * Checks if exercise is complete and removes unused sets.
 * Sets endTime if necessary.
 * Modifies setHistory and exerciseHistory.
 * Returns false if this was an empty exercise, true if had at least one completed set.
 */
const checkAndTrimExercise = (exerciseObj, state, dispatch) => {
    const { setHistory } = state;

    // If there are sets, filter out the incomplete ones.
    if (!!exerciseObj.setHistoryIds) {
        // 1. delete any empty sets and remove ids from exercise progress list.
        exerciseObj.setHistoryIds = exerciseObj.setHistoryIds.filter(id => {
            let setObj = setHistory.byId[id];
            if (setObj === null || setObj === undefined || setObj.endTime === null || setObj.endTime === undefined) {
                // this is an incomplete set, delete it
                dispatch(setHistoryActions.removeSetHistory({ id }));
                return false;
            }
            return true;
        });
    }

    // if there were no completed sets, delete this exercise history.
    if (!exerciseObj.setHistoryIds || exerciseObj.setHistoryIds.length === 0) {
        dispatch(exerciseHistoryActions.removeExerciseHistory(exerciseObj));

        return false;
    } else {
        // 2. save to history
        // TODO: potential problem. Will exerciseObj for sure have an 'endTime'?
        // What we can do is check each exercise. If it has sets but no end time, use the last set endTime as the exercise endTime
        if (!exerciseObj.endTime) {
            let lastSet = setHistory.byId[exerciseObj.setHistoryIds[exerciseObj.setHistoryIds.length - 1]];
            exerciseObj.endTime = lastSet.endTime;
        }
        dispatch(exerciseHistoryActions.updateExerciseHistory(exerciseObj));//XXXXX here
        return true;
    }
}

/**
 * Deletes empty sets, saves exercise progress to history,
 * and clears exercise and set progress.
 */
const saveAndClearExerciseProgress = (state, dispatch) => {
    const { exerciseProgress } = state;

    let ep = { ...exerciseProgress };

    const isSaved = checkAndTrimExercise(ep, state, dispatch);

    // clear progress
    dispatch(exerciseProgressActions.update({}));
    dispatch(setProgressActions.update({}));

    return isSaved;
}

/**
 * Checks if workout is complete and removes unused exercises.
 * Sets endTime if necessary.
 * Modifies exerciseHistory and workoutHistory.
 * Returns false if this was an empty workout, true if had at least one completed exercise.
 * @param {*} workoutObj 
 */
const checkAndTrimWorkout = (workoutObj, state, dispatch) => {
    // this is state object....as in the entire redux state
    const { exerciseHistory } = state; //XXX here

    if (!!workoutObj.exerciseHistoryIds) {
        // if the exercise is incomplete, checkAndTrimExercise will remove it from history.
        // Returning false in the filter function will also remove it from this list.
        workoutObj.exerciseHistoryIds = workoutObj.exerciseHistoryIds.filter(id => {
            // last update
            // let exerciseObj = exerciseHistory.byId[id]; //XXX here
            let exerciseObj = {...exerciseHistory.byId[id]}; //XXX here
            const valid = checkAndTrimExercise({...exerciseObj}, state, dispatch);
            return valid;
        });
    }

    // if there are no completed exercises, delete this workout
    if (!workoutObj.exerciseHistoryIds || workoutObj.exerciseHistoryIds.length === 0) {
        dispatch(workoutHistoryActions.removeWorkoutHistory(workoutObj));
        return false;
    } else {
        // 2. save to history
        // TODO: potential problem. Will workout for sure have an 'endTime'?
        if (!workoutObj.endTime) {
            // last update
            // let lastExercise = exerciseHistory.byId[workoutObj.exerciseHistoryIds[workoutObj.exerciseHistoryIds.length - 1]];
            let lastExercise = {...exerciseHistory.byId[workoutObj.exerciseHistoryIds[workoutObj.exerciseHistoryIds.length - 1]]};
            workoutObj.endTime = lastExercise.endTime;
        }
        dispatch(workoutHistoryActions.updateWorkoutHistory(workoutObj));

        // put workout in WorkoutPlanProgress and History
        if (!state.workoutPlan.workoutHistoryIds || !state.workoutPlan.workoutHistoryIds.includes(workoutObj.id)) {
            let updatedPlan = { ...state.workoutPlanProgress };
            updatedPlan.workoutHistoryIds = [...(updatedPlan.workoutHistoryIds || []), workoutObj.id];
            dispatch(workoutPlanProgressActions.update(updatedPlan));
            dispatch(workoutPlanHistoryActions.updateWorkoutPlan(updatedPlan));
        }

        return true;
    }
}

const saveAndClearWorkoutProgress = (state, dispatch) => {
    // Make each of these responsible for anything beneath it.
    // Should assume that if we are saving a workout, it must be saving the exercise in progress as well.
    saveAndClearExerciseProgress(state, dispatch);

    const { workoutProgress } = state;

    // TODO: WE NEED THE UPDATED STATE HERE FROM saveAndClearExerciseProgress.........
    const isSaved = checkAndTrimWorkout({...workoutProgress}, state, dispatch);

    // clear progress
    dispatch(workoutProgressActions.update({}));


    return isSaved;
}

const saveAndClearWorkoutPlanProgress = (state, dispatch) => {
    // Make each of these responsible for anything beneath it.
    // Should assume that if we are saving a workout, it must be saving the exercise in progress as well.
    saveAndClearWorkoutProgress(state, dispatch);

    // Not much else to do in this method, unlike the others.
    // For workouts we only generate them when they are started. No need
    // to check for empty ones, like we do exercises and sets.

    // Save progress to history and clear progress.
    const { workoutPlanProgress } = state;

    dispatch(workoutPlanHistoryActions.updateWorkoutPlan(workoutPlanProgress));
    dispatch(workoutPlanProgressActions.update({}));
}

const removeWorkoutHistory = (id, state, dispatch) => {
    const workoutHistoryObj = state.workoutHistory.byId[id];
    const workoutPlanProgressId = workoutHistoryObj.workoutPlanProgressId;
    const { workoutPlanProgress, workoutPlanHistory } = state;
    
    // first: remove id from current workout plan progress workoutHistoryIds
    if (workoutPlanProgress.id === workoutPlanProgressId) {
        const updatedWorkoutHistoryIds = workoutPlanProgress.workoutHistoryIds.filter(i => i !== id);

        //todo delete this check for debugging
        if (updatedWorkoutHistoryIds.length === workoutPlanProgress.workoutHistoryIds.length) {
            console.log('ERROR: did not remove any workout history ids from workoutPlanProgress')
        }

        dispatch(workoutPlanProgressActions.update({ ...workoutPlanProgress, workoutHistoryIds: updatedWorkoutHistoryIds }))
    }

    // and do the same for workoutPlanHistory
    const workoutPlanHistoryObj = workoutPlanHistory.byId[workoutPlanProgressId];
    if (workoutPlanHistoryObj !== null && workoutPlanHistoryObj !== undefined) {
        const updatedWorkoutHistoryIds = workoutPlanHistoryObj.workoutHistoryIds.filter(i => i !== id);

        //todo delete this check for debugging
        if (updatedWorkoutHistoryIds.length === workoutPlanHistoryObj.workoutHistoryIds.length) {
            console.log('ERROR: did not remove any workout history ids from workoutPlanHistory')
        }
        dispatch(workoutPlanHistoryActions.updateWorkoutPlan({ ...workoutPlanHistoryObj, workoutHistoryIds: updatedWorkoutHistoryIds }));
    }

    // second: delete exercises in workoutHistory[id].exerciseHistoryIds
    workoutHistoryObj.exerciseHistoryIds.forEach(exerciseId => {
        // last update
        // const exerciseHistoryObj = state.exerciseHistory.byId[exerciseId];
        const exerciseHistoryObj = {...state.exerciseHistory.byId[exerciseId]};
        
        // third: delete sets
        exerciseHistoryObj.setHistoryIds?.forEach(setId => {
            dispatch(setHistoryActions.removeSetHistory({id: setId}));
        });

        dispatch(exerciseHistoryActions.removeExerciseHistory({id: exerciseId}));
    })

    
    // fourth: delete self from this world
    dispatch(workoutHistoryActions.removeWorkoutHistory({id}));
}


export default {
    saveAndClearExerciseProgress,
    saveAndClearWorkoutProgress,
    checkAndTrimExercise,
    checkAndTrimWorkout,
    saveAndClearWorkoutPlanProgress,
    // clearEmptySets,
    removeWorkoutHistory,
};