import {TEST} from '../types.js';

export const setText = (payload) => {
  return {
    type: TEST.SET_TEXT,
    payload: payload
  };
};