import { SETS_REPS } from '../types.js';

export const updateSet = (payload) => {
  return {
    type: SETS_REPS.UPDATE_SET,
    payload: payload
  };
};

export const addSet = (payload) => {
  return {
    type: SETS_REPS.ADD_SET,
    payload: payload
  };
};

export const removeSet = (payload) => {
  return {
    type: SETS_REPS.REMOVE_SET,
    payload: payload
  };
};

export const setCurrentIndex = (payload) => {
  return {
    type: SETS_REPS.SET_CURRENT_INDEX,
    payload: payload
  };
};

export const setCurrentWeight = (payload) => {
  return {
    type: SETS_REPS.SET_CURRENT_WEIGHT,
    payload: payload
  };
};

export const setCurrentReps = (payload) => {
  return {
    type: SETS_REPS.SET_CURRENT_REPS,
    payload: payload
  };
};

// ASAP'S FUCKERY FOR INPUT CARD MODAL!

export const setCurrentNote = (payload) => {
  return {
    type: SETS_REPS.SET_CURRENT_NOTE,
    payload: payload
  };
};

export const setCurrentTempo = (payload) => {
  return {
    type: SETS_REPS.SET_CURRENT_TEMPO,
    payload: payload
  };
};

export const setCurrentTempoOne = (payload) => {
  return {
    type: SETS_REPS.SET_CURRENT_TEMPO,
    payload: payload
  };
};

export const setCurrentTempoTwo = (payload) => {
  return {
    type: SETS_REPS.SET_CURRENT_TEMPO,
    payload: payload
  };
};

export const setCurrentTempoThree = (payload) => {
  return {
    type: SETS_REPS.SET_CURRENT_TEMPO,
    payload: payload
  };
};

export const setCurrentTempoFour = (payload) => {
  return {
    type: SETS_REPS.SET_CURRENT_TEMPO,
    payload: payload
  };
};
export const setCurrentInjury = (payload) => {
  return {
    type: SETS_REPS.SET_CURRENT_INJURY,
    payload: payload
  };
};

