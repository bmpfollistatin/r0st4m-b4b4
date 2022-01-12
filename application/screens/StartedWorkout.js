import { Button, Container, Text, Toast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { NavigationActions } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../components/PageHeader';
import StartedWorkoutCard from "../components/StartedWorkoutCard";
import { addExerciseHistory, updateExerciseHistory } from '../redux/actions/history/exerciseHistoryActions';
import { addSetHistory, updateSetHistory } from '../redux/actions/history/setHistoryActions';
import { start as startExerciseProgress } from '../redux/actions/progress/exerciseProgressActions';
import { start as startSetProgress } from '../redux/actions/progress/setProgressActions';
import { addExerciseHistory as addExerciseHistoryToWorkoutProgress } from '../redux/actions/progress/workoutProgressActions';
import { filterExerciseHistory } from '../redux/reducers/history/exerciseHistoryReducer';
import reduxUtils from '../redux/utils';


var styles = require('../../assets/files/Styles');

const getAllDoneSetsData = (eh) => {
    var remainSets = 0
    eh.map(i => {
        remainSets += (i.sets - i.completedSets);
    })
    return remainSets
}

//NAVIGATION AT TOP
export default function StartedWorkout(props) {
    const dispatch = useDispatch();

    const utilState = useSelector(state => state);

    const currentWorkout = utilState._workouts[utilState.workoutProgress.workoutId];
    const exerciseProgress = utilState.exerciseProgress;
    const exerciseHistories = combineExerciseAndHistory(utilState);
    const remainSets = getAllDoneSetsData(exerciseHistories)
    const exerciseHistory = utilState.exerciseHistory;
    const setProgress = utilState.setProgress;
    const setHistory = utilState.setHistory;
    const previewWorkout = props.route.params ? props.route.params.workout : null;

    const workoutProgressMatchesPreview = !!utilState.workoutProgress.id && previewWorkout && utilState.workoutProgress.workoutId === previewWorkout.id;


    console.log({exerciseHistories})
    
    const [mounted, setMounted] = useState(false)

    const { navigation } = props

    const handleAdd = () => {
        let addFunc = workoutProgressMatchesPreview ? _addExerciseToHistory : _addExerciseToPreview;
        navigation.navigate('ListAndSearchExercises', {
            setSelected: (item) => {
                addFunc(item);
                navigation.goBack()
                // navigation.navigate(props.navigation.state.routeName); // Come back to this screen
            },
        })
    }

    const _addExerciseToPreview = (item) => {
        // adds to preview reducer
        // dispatch(addExerciseId(item.id));
    }

    const _addExerciseToHistory = async (item) => {
        let ـexerciseHistory = {
            startTime: null,
            exerciseId: item.id,
            setHistoryIds: null,
            notes: '',
        }

        // Add to ExciseHistoryReducer first
        await dispatch(addExerciseHistory(ـexerciseHistory));

        // Then add the created id to workout in progress exerciseHistroyIds
        dispatch(addExerciseHistoryToWorkoutProgress(ـexerciseHistory.id));
    }

    const onNextExercies = () => {
        const unfinishedExercies = exerciseHistories.find(i => i.sets > i.completedSets)
        console.log( unfinishedExercies)
        if(unfinishedExercies){
            onPress(unfinishedExercies)
        }
    }

    // END of Add exercise button from current workout
    useEffect(() => {
        if (!mounted) {
            setMounted(true)
            const name = (currentWorkout || {}).name;
            //TODO:
            // props.navigation.setParams({ currentWorkoutName: name });
        }
    }, []);


    const initializeSets = async (count) => {
        const sets = [];
        // Add all exercises to exerciseHistory upon starting workout
        for (let i = 0; i < count; i++) {
            let ـsetHistory = {
                startTime: null,
                endTime: null,
                weight: null,
                reps: null,
            }
            await dispatch(addSetHistory(ـsetHistory));
            sets.push(ـsetHistory);
        }
        return sets;
    }


    /* 
     * If sets empty: 
     *   set up the sets for this exercise
     * if what they clicked is not what is already selected: 
     *   1. Save current ExerciseProgress into history.
     *   2. Load exercise + history object into ExerciseProgress.
     * 3. Navigate to sets and reps screen
     */
    // Takes in combined exercise definition and exercise history object
    const onPress = async (exercisePlusHistory) => {
        console.log('to sets and reps 1' , {exercisePlusHistory})
        let nextExercise = { ...(exerciseHistory.byId[exercisePlusHistory.id]) };
        const now = Date.now();

        // check if they click on the same exercise or on a new one
        if (exerciseProgress.id !== nextExercise.id) {
            console.log('to sets and reps 2')
            dispatch(updateExerciseHistory(exerciseProgress));
            if (nextExercise.startTime === null) {
                nextExercise.startTime = now;
            }
        } else {
            console.log('to sets and reps 3')
            nextExercise = exerciseProgress;
        }

        // next set is nextExercise first empty set, or the first of the newly initialized sets
        let nextSet = null;

        // Initialize sets if it's the firt time entering this exercise
        if (nextExercise.setHistoryIds === null) {
            console.log('to sets and reps 4')
            const sets = await initializeSets(exercisePlusHistory.sets);
            nextSet = sets[0];
            nextExercise.setHistoryIds = sets.map(item => item.id); // this might be the issue
        } else {
            console.log('to sets and reps 5')
            // next set is next exercises next blank set.
            for (let i = 0; i < nextExercise.setHistoryIds.length; i++) {
                let id = nextExercise.setHistoryIds[i];
                if (setHistory.byId[id].endTime === null) {
                    nextSet = { ...(setHistory.byId[id]) };
                    break;
                }
            }
        }

        if (!!nextSet && nextSet.startTime === null) {
            nextSet.startTime = now;
        }

        console.log('to sets and reps 6')
        // if there is a current set in progress and its not part of this exercise, 
        // save it to history and put first set of sets into progress
        if (!!setProgress.id && exerciseProgress.id !== nextExercise.id) {
            dispatch(updateSetHistory(setProgress));
        }

        console.log('to sets and reps 7')
        dispatch(startExerciseProgress(nextExercise));
        dispatch(startSetProgress(nextSet));

        navigation.navigate('SetsAndReps', { remainSets , onNextExercies });
    }

    const CompleteWorkoutAlert = () =>
        Alert.alert(
            "Complete Workout?",
            "You can not go back and edit it",
            [
                {
                    text: "No",
                    // onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => completeWorkout() }
            ],
            { cancelable: false }
        );

    const completeWorkout = () => {
        const { navigation } = props;
        let isSaved = reduxUtils.saveAndClearWorkoutProgress(utilState, dispatch);

        let toast = {
            text: 'Workout Saved',
            buttonText: 'Okay',
            duration: 4000,
            type: 'success',
        };

        if (!isSaved) {
            toast.text = 'No data saved';
            toast.type = 'danger';
        }

        Toast.show(toast);
        navigation.navigate('HomeScreen')
    }

    return (
        <Container style={styles.background_general}>
            <PageHeader
                Title="Exercises"
                LeftSideIcon='goHome'
            />

            <ScrollView>

                {!!currentWorkout && !!currentWorkout.notes && (
                    <View style={styles.WorkoutNotes}>
                        <Text>{currentWorkout.notes}</Text>
                    </View>
                )}

                <View style={[styles.CenterContent, { marginTop: 10 }]}>

                    {exerciseHistories && exerciseHistories.map(exercise => {
                        return (
                            <View key={Math.random() + "-"} style={[styles.SideBySide, { justifyContent: 'flex-start', paddingRight: 50, marginTop: 10 }]}>
                                {/* green arrow pointed  to current exercise */}
                                <View style={{ width: 30 }}>
                                    {exercise.exerciseDetailId === exerciseProgress.exerciseDetailId && (
                                        <Svg
                                            viewBox="0 0 448 512"
                                            height={18}
                                            width={18}
                                            fill='url(#arrowColor)'
                                            style={{ alignSelf: 'flex-end' }}
                                        >
                                            <Defs>
                                                <LinearGradient id="arrowColor" x1="0" y1="0" x2="1" y2="0">
                                                    <Stop offset="0" stopColor="#EF4E4E" stopOpacity="1" />
                                                    <Stop offset="1" stopColor="#CF1124" stopOpacity="1" />
                                                </LinearGradient>
                                            </Defs>
                                            <Path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                                        </Svg>
                                    )}
                                </View>
                                <View style={{ width: '100%' }}>

                                    {/* <StartedWorkoutCard iconSource={tmpIcon} onPress={() => this.onPress(exercise)}> */}
                                    <StartedWorkoutCard onPress={() => onPress(exercise)}
                                        SVG='dumbellSVG'
                                    >

                                        <Text style={styles.HOneTitles} >{exercise.name}</Text>
                                        <Text style={styles.WorkoutSet} >{`${exercise.completedSets}/${exercise.sets} Sets Completed`}</Text>
                                    </StartedWorkoutCard>
                                </View>
                            </View>
                        )
                    }
                    )}


                    {/* top of the complete workout card and bottom of workout card */}
                    <View style={{ width: '90%', paddingLeft: 6, marginTop: 10 }}>
                        {/* <StartedWorkoutCard iconSource={tmpIcon} onPress={() => this.onPress(exercise)}> */}
                        <StartedWorkoutCard onPress={handleAdd}
                            SVG="addSVG"
                        >
                            <Text style={[styles.HOneTitles, { paddingTop: 9 }]}>Add exercise</Text>
                        </StartedWorkoutCard>
                    </View>

                    {/* top of the complete workout card and bottom of workout card */}
                    <View style={{ marginTop: 15 }}>
                        {/* <CustomButton type='long-secondary' text='Complete Workout' onPress={this.completeWorkout} /> */}
                        {/* <Button onPress={this.completeWorkout} style={{ backgroundColor: '#E0F7EF' }}> */}
                        <Button onPress={CompleteWorkoutAlert} style={{ backgroundColor: '#E0F7EF' }}>
                            <Text style={{ color: '#00492F' }}>Complete Workout</Text>
                        </Button>
                    </View>
                </View>


                {/* Modal for exercise details input */}



            </ScrollView>
        </Container>
    )

}

const combineExerciseAndHistory = (state) => {
    // get list of exerciseHistory pertaining to current workout in progress.
    const exerciseHistory = filterExerciseHistory(state.exerciseHistory, { type: 'from_custom_list', list: state.workoutProgress.exerciseHistoryIds });

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
        });
        exercise.completedSets = count;
        count = 0;
    });
    // add these to your notion notes hossein you fuck. learning
    // let ob = {a:1, 'Derek Smith':2}
    // ob.a // return 1
    // ob[a] // return 1
    // let name = 'Derek Smith'
    // ob['Derek Smith']
    // ob[name]


    // id: references history id since ...item overwrites what state.exercise returns
    return exerciseHistory.map(item => { return { ...state._exercises.value.find(i => i.id == item.exerciseId), ...state._exerciseDetaile.find(i => i.id == item.exerciseDetailId), ...item } });
}