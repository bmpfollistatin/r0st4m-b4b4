import { TIMER } from '../types.js';

export const saveTimer = (payload) => {
    return {
        type: TIMER.SAVE_TIMER,
        payload: payload
    };
};

export const saveActive = (payload) => {
    return {
        type: TIMER.SAVE_ACTIVE,
        payload: payload
    };
};

export const saveNumberOfSets = (payload) => {
    return {
        type: TIMER.SAVE_NUM_SETS,
        payload: payload
    };
};

export const saveCurrentSet = (payload) => {
    return {
        type: TIMER.SAVE_CURRENT_SET,
        payload: payload
    };
};

export const saveMinutesInput = (payload) => {
    return {
        type: TIMER.SAVE_MINUTES_INPUT,
        payload: payload
    };
};

export const saveSecondsInput = (payload) => {
    return {
        type: TIMER.SAVE_SECONDS_INPUT,
        payload: payload
    };
};

export const saveRestMinutesInput = (payload) => {
    return {
        type: TIMER.SAVE_REST_MINUTES_INPUT,
        payload: payload
    };
};

export const saveRestSecondsInput = (payload) => {
    return {
        type: TIMER.SAVE_REST_SECONDS_INPUT,
        payload: payload
    };
};

export const saveUpdated = (payload) => {
    return {
        type: TIMER.SAVE_UPDATED,
        payload: payload
    };
};

export const saveView = (payload) => {
    return {
        type: TIMER.SAVE_VIEW,
        payload: payload
    };
};

export const savePaused = (payload) => {
    return {
        type: TIMER.SAVE_PAUSED,
        payload: payload
    };
};


// export const setRestCountdown = (payload) => {
//     type: TIMER.REST_COUNTDOWN,
//     payload
// }

// export const decrementRestCountdown = () => ({
//     type: TIMER.REST_DECREMENT_COUNTDOWN
// })

// export const updateRestTimer = (payload) => {
//     var currentTime = payload;
//     return (dispatch) => {
//         dispatch({
//             type: TIMER.REST_COUNTDOWN,
//             payload
//         })
//         setInterval(() => {
//             if(currentTime > 0 ) {
//                 dispatch({
//                     type: TIMER.REST_DECREMENT_COUNTDOWN
//                 })
//                 currentTime--;
//             } else {
//                 dispatch({
//                     type: TIMER.REST_COUNTDOWN,
//                     payload
//                 })
//             }
//         }, 1000);
//     }
// };


// resetTimer = () => {
//     if (this.myInterval) {
//         clearInterval(this.myInterval);
//         this.setState({ seconds: this.props.exerciseData.rests });
//     }
// }

let restTimerInterval = null;

// Set Time
export const setRestTimer = (initialTime) => ({
    type: TIMER.SET_REST_TIMER,
    payload: { initialTime }
})

// Start
export const startRestTimer = (initialTime, exercise) => (dispatch) => {
   clearInterval(restTimerInterval);
   restTimerInterval = setInterval(() => dispatch(tickRestTimer()), 1000);
   dispatch({ 
       type: TIMER.START_REST_TIMER, 
       payload: { initialTime, exercise } 
    });
   dispatch(tickRestTimer())
}

// Tick
export const tickRestTimer = () => ({
    type: TIMER.TICK_REST_TIMER
})

// Stop
export const stopRestTimer = () => {
    clearInterval(restTimerInterval)
    return {type: TIMER.STOP_REST_TIMER }
}


