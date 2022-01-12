import { WORKOUT_ENDPOINT } from '../../config';
import axios from 'axios';

export function request(url, method, payload){
    let options = {
        url,
        baseURL: `${WORKOUT_ENDPOINT}/api/v1.0`,
        headers: {},
        method,
        data: payload,
    }
    return axios(options);
};

/**
 * Fetch workouts for this user.
 */
export function fetchUserWorkouts(){
    // return request('/workouts/', 'get', {})
    // return new Promise((resolve, reject) => {
    //     reject('Testing rejected promise');
    // })

    // lets pretent we get back a list of workouts
    // the first is todays workout
    // each workout has a list of exercises
    return new Promise((resolve, reject) => {
        resolve([
            {
                workoutId: 1,
                exerciseIdList: [1,2,3,4],

            }
        ])
    })
}