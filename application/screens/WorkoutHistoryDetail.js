import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../components/PageHeader';
import { filterExerciseHistory } from '../redux/reducers/history/exerciseHistoryReducer';
import { filterWorkoutHistory } from '../redux/reducers/history/workoutHistoryReducer';

export default function WorkoutHistoryDetail(props) {
    const dispatch = useDispatch()
    const _state = useSelector(state => state)
    const exerciseHistories = combineExerciseAndHistory(_state);
    const workoutHistory = filterWorkoutHistory(_state.workoutHistory, { type: 'all' });
    const workout = _state._workouts;
    const workoutPlan = _state.workoutPlan;
    const setHistory = _state.setHistory;
    // this gets the paramter from history of workout.js ...it's the prop that is being passed in after 
    // user has clicked
    let navWorkoutInfo = props.route.params.workoutInfo;
    let workoutIdToFilterBy = navWorkoutInfo.workoutId;

    // previous workout plan ID ...this is for workout title
    let prevWorkoutPlanId = undefined;

    return (
        <ScrollView>
            <View>
                <PageHeader
                    NavigationProp="IntervalTimer"
                    RightSideProp='Interval Timer'
                    Title='Workout Detail'
                >
                </PageHeader>

                {workoutHistory.filter(workoutHistoryObj => workoutHistoryObj.workoutId === workoutIdToFilterBy).map((workoutInfo, index) => {
                    // changed open parenthesis to bracket
                    //now we can do some more js up here
                    const workoutObj = workout.find(i => i.id == workoutInfo.workoutId);
                    let startTime = workoutInfo.startTime;
                    let diff = Date.now() - startTime;
                    let daysBetween = Math.floor((((diff / 1000) / 60) / 60) / 24);
                    let plan = workoutPlan.byId[workoutInfo.workoutPlanId];

                    // do we print the name or not
                    let printPlanName = false;
                    if (prevWorkoutPlanId === undefined || prevWorkoutPlanId !== plan.id) {
                        // he is comparing against plan.id instead of plan.name b/c plan.id is unique...so no fuck up would happen
                        prevWorkoutPlanId = plan.id;
                        printPlanName = true;
                    }

                    return (
                        <View key={Math.random() + ""} style={{ backgroundColor: 'white', height: '1000%' }}>
                            {/* if this is true then go ahead and print the name...for workout plan id */}


                            <View style={{ display: 'flex', padding: 5, flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                <Text style={styles.dateStyle}>{daysBetween} days ago</Text>
                                <Text style={{ display: printPlanName ? 'flex' : 'none', padding: 10, fontSize: 16, color: 'grey', paddingBottom: 0 }}>{plan.name}</Text>
                            </View>
                            <View style={styles.cardBackground}>
                                {/* Time span */}


                                {/* workout TITLE */}
                                <Text style={styles.workoutTitle}>{workoutObj.name}</Text>
                                <View>
                                    {workoutInfo.exerciseHistoryIds.map(id => {
                                        // list of exercises within the workout
                                        let exerciseHistoriesObj = exerciseHistories[id];
                                        //gives all of the information for the exercises, reps, sets, and other info that are done
                                        //idk man
                                        let setHistoryObjs = setHistoryObjs;
                                        return (
                                            <View>
                                                <Text style={styles.listOfExercises}>{exerciseHistoriesObj.name}:</Text>
                                                {exerciseHistoriesObj.setHistoryIds.map((id, index) => {
                                                    let item = setHistory.byId[id];
                                                    return (
                                                        <View>
                                                            <Text style={{ paddingVertical: 3 }}>
                                                                <Text style={styles.repNumber}>{index + 1} </Text>
                                                                <Text style={styles.MainText}> {item.weight}</Text>
                                                                <Text style={styles.textDetails}>lbs</Text>
                                                                <Text style={styles.MainText}> x </Text>
                                                                <Text style={styles.MainText}>{item.reps}</Text>
                                                                <Text style={styles.textDetails}>Reps</Text>

                                                                {item.tempo &&
                                                                    <Text>
                                                                        <Text style={styles.textDetails}> @</Text>
                                                                        <Text style={styles.setTempo}>{item.tempo}</Text>
                                                                    </Text>
                                                                }

                                                                {item.notes &&
                                                                    <Text style={styles.setComment}>
                                                                        {"\n"}
                                                                        <Text style={{ maxWidth: 40 }}>{item.notes}</Text>
                                                                    </Text>
                                                                }
                                                                {item.injury &&
                                                                    <Text style={styles.setInjury}>
                                                                        {"\n"}
                                                                        <Text >{item.injury}</Text>
                                                                    </Text>
                                                                }
                                                            </Text>
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    cardBackground: {
        borderRadius: 10,
        backgroundColor: '#F5F7F6',
        margin: 10,
        paddingVertical: 15,
        paddingLeft: 22,
        display: "flex",
    },
    workoutTitle: {
        fontSize: 15,
        fontFamily: 'ssb_Bold',
        color: '#00492F',
    },
    listOfExercises: {
        fontSize: 15,
        color: '#7E7E7E',
        paddingTop: 10,
    },
    cardioTitle: {
        fontSize: 18,
        color: '#9E9E9E',
        paddingTop: 8,
        paddingBottom: 2,
    },
    cardioMethod: {
        fontSize: 12,
        color: '#222222',
    },
    Beside: {
        display: "flex",
        flexDirection: 'row',
    },
    dateStyle: {
        alignSelf: 'flex-end',
        marginRight: 25,
        color: '#B1B1B1',
    },
    repNumber: {
        fontSize: 14,
        color: '#B1B1B1',
    },
    textDetails: {
        color: '#7E7E7E',
        fontSize: 10,
        alignSelf: 'center',
    },
    tempoTextDetail: {
        color: '#7E7E7E',
        fontSize: 10,
        alignSelf: 'center',
        paddingLeft: 0.8,
    },
    MainText: {
        paddingLeft: 3,
        color: '#222222',
        fontSize: 13,
        // I have semiBold imported but when I type "SemiBold" it results in an error. 
        // they are all imported in app.js 
        fontWeight: '600',
    },
    setComment: {
        paddingLeft: 22,
        fontSize: 14,
        color: '#222222',
        paddingVertical: 1.8,
        paddingHorizontal: 3,
    },
    setInjury: {
        color: '#CF1124',
        fontSize: 13,
        paddingLeft: 22,
        paddingBottom: 10,
    },
    SetNumber: {
        fontSize: 13,
        color: '#7B8794',
    },
    setTempo: {
        fontSize: 10,
        color: '#222222',
        paddingLeft: 0.8,
    },
    repNumber: {
        fontSize: 14,
        color: '#B1B1B1',
    },
})




// counting sets
const combineExerciseAndHistory = (state) => {
    // get list of exerciseHistory pertaining to current workout in progress.
    const exerciseHistory = filterExerciseHistory(state.exerciseHistory, { type: 'all' });

    // add count of completed sets, cant rely on just counting setHistoryIds list since they might be empty sets
    let count = 0;
    const { exerciseProgress } = state;
    exerciseHistory.forEach(exercise => {
        let eObj = exercise.id === exerciseProgress.id ? exerciseProgress : exercise;
        eObj.setHistoryIds && eObj.setHistoryIds.forEach(id => {
            let set = state.setHistory.byId[id];
            if (set && !!set.endTime) {
                count++;
            }
        })
        exercise.completedSets = count;
        count = 0;
    })

    const exerciseHistoriesObj = {};
    exerciseHistory.map(item => { exerciseHistoriesObj[item.id] = { ...state._exercises.value.find(i => i.id == item.exerciseId), ...item } });
    return exerciseHistoriesObj;
}