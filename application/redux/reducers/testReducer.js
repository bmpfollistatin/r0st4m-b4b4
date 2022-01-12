import {TEST} from '../types.js';

const defaultState = {
  text: '',
  count: 0,
};

const test = (state = defaultState, action) => {
  switch (action.type) {
  case TEST.SET_TEXT: {
    return {
        ...state, 
        text: action.payload,
        count: state.count + 1,
    };
  }
  default:
    return state;
  }
};

export default test;