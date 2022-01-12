import { SET_HISTORY } from '../../types';
import uuid from '../../../utils/uuid';


export const addSetHistory = (payload) => {
    return async (dispatch) => {
        if (payload.id === undefined || payload.id === null) {
            payload.id = await uuid.v4();
        }
        dispatch({
            type: SET_HISTORY.ADD,
            payload: payload
        });
    }
};

export const updateSetHistory = (payload) => {
    // should already have an id
    if (payload.id === undefined || payload.id === null) {
        // TODO throw some kind of error
    }
    return {
        type: SET_HISTORY.UPDATE,
        payload: payload
    }
};

// remove by id
export const removeSetHistory = (payload) => {
    return {
        type: SET_HISTORY.REMOVE,
        payload: payload
    };
};
