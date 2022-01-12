import { CREATING_CARDIO } from '../../types.js';

export const load = (payload) => {
    const { id, name, description} = payload;
    return dispatch => {
        dispatch(setId(id));
        dispatch(setName(name));
        dispatch(setDescription(description));
    }
}

export const setId = (payload) => {
    return {
        type: CREATING_CARDIO.SET_ID,
        payload: payload
    };
};

export const setName = (payload) => {
    return {
        type: CREATING_CARDIO.SET_NAME,
        payload: payload
    };
};

export const setDescription = (payload) => {
    return {
        type: CREATING_CARDIO.SET_DESCRIPTION,
        payload: payload
    };
};

