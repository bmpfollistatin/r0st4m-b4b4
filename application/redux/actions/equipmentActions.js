import { EQUIPMENT } from '../types.js';
import uuid from '../../utils/uuid';


export const addEquipment = (payload) => {
    return async (dispatch) => {
        if (payload.id === undefined || payload.id === null) {
            payload.id = await uuid.v4();
        }

        dispatch({
            type: EQUIPMENT.ADD_EQUIPMENT,
            payload: payload
        });
    }
};

// remove equipment by id
export const removeEquipment = (payload) => {
    return {
        type: EQUIPMENT.REMOVE_EQUIPMENT,
        payload: payload
    };
};
