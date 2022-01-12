import { Card } from "native-base";
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Svg, { Path } from "react-native-svg";
import { useDispatch, useSelector } from 'react-redux';
import { filterWorkoutHistory } from '../redux/reducers/history/workoutHistoryReducer';
import reduxUtils from '../redux/utils';

function HistoryOfWorkout(props) {
    const dispatch = useDispatch()
    const allstate = useSelector(state => state)
    const workoutHistory = filterWorkoutHistory(useSelector(state => state.workoutHistory), { type: 'all' });
    
    const reversedList = [...workoutHistory].reverse();
    const workout = useSelector(state => state._workouts);
    const workoutPlan = useSelector(state => state.workoutPlan);
    const { navigation } = props;
    const utilState = useSelector(state => state)

    let prevWorkoutPlanId = undefined;

    return (


        <View>
            {/* {workoutHistory.map((workoutInfo, index) => { */}
            {reversedList.map((workoutInfo, index) => {
                // changed open parenthesis to bracket
                //now we can do some more js up here
                const workoutObj = workout.find(i => i.id == workoutInfo.workoutId);

                let plan = workoutPlan.byId[workoutInfo.workoutPlanId];

                // do we print the name or not
                let printPlanName = false;
                if (prevWorkoutPlanId === undefined || prevWorkoutPlanId !== plan.id) {
                    // he is comparing against plan.id instead of plan.name b/c plan.id is unique...so no fuck up would happen
                    prevWorkoutPlanId = plan.id;
                    printPlanName = true;
                }

                let startTime = workoutInfo.startTime;
                let diff = Date.now() - startTime;
                let daysBetween = Math.floor((((diff / 1000) / 60) / 60) / 24);
                let daysBetweenHours = Math.floor(((((diff / 1000) / 60) / 60) / 24) * (24)) // to get hours

                const DisplayHours = <Text>{daysBetweenHours} hours ago</Text>
                const DisplayDays = <Text>{daysBetween} days ago</Text>


                function handleRemove(i) {
                    // the props connects it to the store. Without it, you are just using the imported function
                    // that's not connected
                    // props.removeWorkoutHistory({ id: i });
                    reduxUtils.removeWorkoutHistory(i, utilState, dispatch);
                }

                //Alert fnction to ask to delete workout
                const createTwoButtonAlert = () =>
                    Alert.alert(
                        "Delete Workout?",
                        "You can NOT undo this!",
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { text: "Delete", onPress: () => handleRemove(workoutInfo.id) }
                        ],
                        { cancelable: false }
                    );

                return (

                    <>


                        {printPlanName && (
                            <Text key={Math.random()+"_"} style={{ padding: 10, fontSize: 16, color: 'grey', paddingBottom: 0 }}>{plan.name}</Text>
                        )}

                        {/* this is a parameter that is being passed....basically the props version navigation  */}
                        <TouchableOpacity key={Math.random()+""}  onPress={() => navigation.navigate('WorkoutHistoryDetail', { workoutInfo })} style={{ paddingHorizontal: 9 }}>


                            <Card style={styles.cardBackground}>

                                {/* <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}> */}
                                <View style={{ flexDirection: 'row' }}>

                                    <Text style={styles.workoutTitle}>{workoutObj.name}</Text>

                                    <View style={{ position: 'absolute', right: 1, flexDirection: 'row' }}>

                                        <Text style={styles.dateStyle}>{daysBetweenHours < 24 ? DisplayHours : DisplayDays}</Text>


                                        <Menu onSelect={value => alert(`Selected number: ${value}`)} style={{ alignSelf: 'flex-end' }}>
                                            <MenuTrigger>
                                                <Svg viewBox="0 0 64 512"
                                                    height={22}
                                                    width={22}
                                                    fill='#222'
                                                >
                                                    <Path d="M32 224c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM0 136c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32zm0 240c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32z" />
                                                </Svg>
                                            </MenuTrigger>
                                            <MenuOptions>
                                                <MenuOption value={2}>
                                                    <Text style={{ color: 'red' }} onPress={createTwoButtonAlert}>Delete</Text>
                                                </MenuOption>
                                            </MenuOptions>
                                        </Menu>



                                    </View>
                                </View>


                                {/* 
                                <View>

                                    {workoutInfo.exerciseHistoryIds.map(item => {

                                        // list of exercises within the workout
                                        let exerciseHistoriesObj = exerciseHistories[item];
                                        //gives all of the information for the exercises, reps, sets, and other info that are done
                                        // { console.log(exerciseHistoriesObj.setHistoryIds + 'aint this some shit')}

                                        return (
                                            <View>
                                                <Text style={styles.listOfExercises}>{exerciseHistoriesObj.name + ': ' + exerciseHistoriesObj.completedSets} sets</Text>
                                            </View>

                                        )
                                    })}



                                </View> */}

                            </Card>

                        </TouchableOpacity>



                    </>

                )
            })}
        </View>

    )
}

const styles = StyleSheet.create({
    cardBackground: {
        borderRadius: 10,
        backgroundColor: '#F5F7F6',
        padding: 10,
        paddingVertical: 15,
        paddingLeft: 22
    },
    workoutTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#00492F',
    },
    listOfExercises: {
        fontSize: 15,
        color: '#7E7E7E',
        paddingVertical: 4,
    },
    Beside: {
        display: "flex",
        flexDirection: 'row',
    },
    dateStyle: {
        alignSelf: 'center',
        color: '#B1B1B1',
    },
})

export default HistoryOfWorkout;
