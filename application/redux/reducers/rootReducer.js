import { combineReducers } from 'redux';
import workoutPlan from './workoutPlanReducer';

import cardio from './cardioReducer';
import intervalTimer from './intervalTimerReducer';
import cardioLogs from "./cardioLogReducers";
import setsAndRepsEntryLog from "./setsAndRepsEntryReducer";

import creatingWorkoutPlan from './creating/creatingWorkoutPlanReducer';
import creatingCardio from './creating/creatingCardioReducer';

import exerciseHistory from './history/exerciseHistoryReducer';
import setHistory from './history/setHistoryReducer';
import workoutHistory from './history/workoutHistoryReducer';
import workoutPlanHistory from './history/workoutPlanHistoryReducer';

import workoutPlanProgress from './progress/workoutPlanProgressReducer';
import workoutProgress from './progress/workoutProgressReducer';
import exerciseProgress from './progress/exerciseProgressReducer';
import setProgress from './progress/setProgressReducer';


// import { createReducer } from "redux-orm";
// import orm from '../redux-orm/models'
// import schema from "../redux-orm/models";
/*
 * Combines all reducers and then used in store.js createStore
 */

import equipments from '../features/equipment/equipment.slice'
import counter from '../features/counter/counter.slice'
import whUi from '../features/workoutHistoryUi/whUi.slice'
import _workouts from '../features/workouts/workouts.slice'
import _workoutForm from '../features/workouts/workoutForm.slice'
import _exercises from '../features/exercies/exercise.slice'
import _exercisesForm from '../features/exercies/exerciseForm.slice'
import _exerciseDetaile from '../features/exerciseDetails/exerciseDetails.slice'
import _exerciesDetailForm from '../features/exerciseDetails/exerciseDetailForm.slice'
import _workoutPlan from '../features/workoutPlan/workoutPlan.slice'
import _workoutPreview from '../features/workouts/workoutPreview.slice'
import _progress from '../features/progress/progress.slice'

export default combineReducers(
    {
        workoutPlan,
        cardio,
        intervalTimer,
        cardioLogs,
        setsAndRepsEntryLog,
    
        creatingWorkoutPlan,
        creatingCardio,
    
        exerciseHistory,
        setHistory,
        workoutHistory,
        workoutPlanHistory,
    
        workoutPlanProgress,
        workoutProgress,
        exerciseProgress,
        setProgress,
    
        //new with redux toolkit
        equipments,
        counter,
        whUi,
        _workouts,
        _workoutForm,
        _exercises,
        _exercisesForm,
        _exerciseDetaile,
        _exerciesDetailForm,
        _workoutPlan,
        _workoutPreview,
        _progress
    }
);
