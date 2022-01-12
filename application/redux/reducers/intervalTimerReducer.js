import { TIMER } from '../types.js';

const defaultState = {
  timer: null,
  active: true,
  updated: false,
  numberOfSets: 1,
  currentSet: 1,
  minutesInput: '',
  secondsInput: '',
  restMinutesInput: '',
  restSecondsInput: '',
  view: TIMER.INPUTS_VIEW,
  paused: false,
  rest_time: 0,
  rest_exercise: null
};

const intervalTimer = (state = defaultState, action) => {
  switch (action.type) {
    case TIMER.SAVE_TIMER: {
      return {
        ...state,
        timer: action.payload,
      };
    }
    case TIMER.SAVE_ACTIVE: {
      console.log('--== action ==--' , action)
      return {
        ...state,
        active: action.payload,
      };
    }
    case TIMER.SAVE_UPDATED: {
      return {
        ...state,
        updated: action.payload,
      };
    }
    case TIMER.SAVE_NUM_SETS: {
      return {
        ...state,
        numberOfSets: action.payload,
      };
    }
    case TIMER.SAVE_CURRENT_SET: {
      return {
        ...state,
        currentSet: action.payload,
      };
    }
    case TIMER.SAVE_MINUTES_INPUT: {
      return {
        ...state,
        minutesInput: action.payload,
      };
    }
    case TIMER.SAVE_SECONDS_INPUT: {
      return {
        ...state,
        secondsInput: action.payload,
      };
    }
    case TIMER.SAVE_REST_MINUTES_INPUT: {
      return {
        ...state,
        restMinutesInput: action.payload,
      };
    }
    case TIMER.SAVE_REST_SECONDS_INPUT: {
      return {
        ...state,
        restSecondsInput: action.payload,
      };
    }
    case TIMER.SAVE_VIEW: {
      return {
        ...state,
        view: action.payload,
      };
    }
    case TIMER.SAVE_PAUSED: {
      return {
        ...state,
        paused: action.payload,
      };
    }
    case TIMER.SET_REST_TIMER: {
      const { initialTime } = action.payload;
      return {
        ...state,
        initial_rest_time: initialTime,
        rest_time: initialTime,
      }
    }
    case TIMER.START_REST_TIMER: {
      const { initialTime, exercise } = action.payload;
      return {
        ...state,
        initial_rest_time: initialTime,
        rest_time: initialTime,
        rest_exercise: exercise
      }
    }
    case TIMER.TICK_REST_TIMER: {
      return {
          ...state,
          rest_time: state.rest_time - 1
      }
    }
    case TIMER.STOP_REST_TIMER: {
      return {
        ...state,
        rest_time: state.initial_rest_time,
        initial_rest_time: null,
        rest_exercise: null
      }
    }
    default:
      return state;
  }
};

export default intervalTimer;
