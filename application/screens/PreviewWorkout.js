import { Container, Text, Toast } from 'native-base';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../components/Button';
import ExerciseCard from "../components/ExerciseCard";
import PageHeader from '../components/PageHeader';
import { addExerciseHistory } from '../redux/actions/history/exerciseHistoryActions';
import { start as startExerciseProgress } from '../redux/actions/progress/exerciseProgressActions';
import { startProgress, startExercise } from '../redux/features/progress/progress.slice'
import { start as startWorkoutProgress } from '../redux/actions/progress/workoutProgressActions';
import { filterExerciseHistory } from '../redux/reducers/history/exerciseHistoryReducer';

var styles = require('../../assets/files/Styles');

export default function PreviewWorkout(props) {

    const dispatch = useDispatch();
    const allStates = useSelector(state => state)
    const workoutPlanProgress = allStates.workoutPlanProgress
    const workoutPreview = allStates._workoutPreview
    const exerciseList = getExerciseList(allStates)
    const isWorkoutInProgress = !!allStates.workoutProgress.id
    const previewWorkout = props.route.params ? props.route.params.workout : null;
    const workoutProgressMatchesPreview = isWorkoutInProgress && allStates.workoutProgress.workoutId === previewWorkout.id

    const { navigation } = props
    const navigateToScreen = (route, params = {}) => {
        console.log('---', route)
        navigation.navigate(route, { ...params })
    }

    const handleStart = async () => {
        // TODO: what if they StartWorkout, do some sets, go back to this page, add an exercise, then all new data gets put into
        // the history? 
        if (isWorkoutInProgress) {
            Toast.show({
                text: 'Cannot start a new workout, you have a workout in progress.',
                buttonText: 'Okay',
                duration: 4000,
                type: 'danger',
            })
            return;
        }
        const { id, workoutPlanId } = workoutPlanProgress;
        const now = Date.now();
        const exerciseHistoryIds = [];
        // TODO: cleanup mechanism when workout completed or switched. Get rid of exercises user did not do from history
        // Add all exercises to exerciseHistory upon starting workout
        exerciseList.forEach(async exercise => {
            let exerciseHistory = {
                startTime: null,
                endTime: null,
                exerciseId: exercise.exerciseId,
                exerciseDetailId: exercise.id,
                setHistoryIds: null,
                notes: '',
            };
            await dispatch(addExerciseHistory(exerciseHistory));
            exerciseHistoryIds.push(exerciseHistory.id);
        });

        // set workout progression and exercise progression
        const workoutProgression = {
            workoutPlanProgressId: id, // TODO: get rid of all these id's? 
            workoutPlanId: workoutPlanId,
            workoutId: workoutPreview.id,
            exerciseHistoryIds: exerciseHistoryIds,
            startTime: now,
        };

        // await dispatch(startProgress(workoutProgression))
        await dispatch(startWorkoutProgress(workoutProgression));

        // await dispatch(startExercise({
        //     id: exerciseHistoryIds[0],
        //     exerciseDetailId: exerciseList[0].id,
        //     exerciseId: exerciseList[0].exerciseId,
        //     endTime: null,
        //     setHistoryIds: null,
        //     notes: '',
        // }))
        dispatch(startExerciseProgress({
            id: exerciseHistoryIds[0],
            exerciseDetailId: exerciseList[0].id,
            exerciseId: exerciseList[0].exerciseId,
            startTime: now,
            endTime: null,
            setHistoryIds: null,
            notes: '',
        }));

        navigateToScreen('StartedWorkout');
    }


    const tmpSvg = () => (
        <Svg
            viewBox="0 0 640 512"
            height={24}
            width={24}
            fill='url(#cameraColor)'
        >
            <Defs>
                <LinearGradient id="cameraColor" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
                    <Stop offset="1" stopColor="#CF1124" stopOpacity="1" />
                </LinearGradient>
            </Defs>
            <Path d="M632 240h-24v-96c0-26.5-21.5-48-48-48h-32c-5.6 0-11 1.2-16 2.9V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48
                        48v160H256V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48 48v18.9c-5-1.8-10.4-2.9-16-2.9H80c-26.5 0-48 21.5-48 48v96H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h24v96c0 26.5 21.5 48 48 48h32c5.6 0 11-1.2 16-2.9V432c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V272h128v160c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48v-18.9c5 1.8 10.4 2.9 16 2.9h32c26.5 0 48-21.5 48-48v-96h24c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM112 384H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224c0 8.8-7.2 16-16 16zm112 48c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm256 0c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm96-64c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224z" />
        </Svg >
    )


    return (
        <Container style={styles.background_general}>
            <PageHeader
                Title={workoutPreview.name}
            >
            </PageHeader>
            <ScrollView>
                <View style={[styles.CenterContent]}>
                    {exerciseList && exerciseList.map((exercise, index) => (
                        // TODO need to update how we do icons
                        // <ExerciseCard iconSource={tmpIcon} customStyle={{ height: 138 }}>
                        <ExerciseCard key={index} SVG={tmpSvg} iconType={'svg'} customStyle={{ height: 138 }}>
                            <View>
                                <Text style={styles.HOneTitles}>{exercise.name}</Text>
                                {/* change this to exercise details */}
                                <Text style={styles.WorkoutSet}>{exercise.sets + ' sets'}</Text>
                                <Text style={styles.workoutDescription}>{exercise.description}</Text>
                            </View>
                        </ExerciseCard>
                    ))}
                </View>

                <View style={[styles.ActiveShadow, { paddingBottom: 5 }]}>
                    {workoutProgressMatchesPreview ?
                        <CustomButton type='large-yellow' text={'Continue'} onPress={() => navigateToScreen('StartedWorkout')} />
                        :
                        <CustomButton type='large-yellow' text={'Start'} onPress={() => handleStart()} />
                    }

                </View>
                {/*END OF CUSTOM INPUT*/}
            </ScrollView>
        </Container>
    )

}


// working....from exercise list
const getExerciseList = (state) => {
    const _list = []
    //TODO: apply this
    // const exerciseDetailIds = filterExerciseHistory(state.exerciseHistory, { type: 'from_custom_list', list: state.workoutProgress.exerciseHistoryIds })
    //     .map(item => item.exerciseDetailId);
    const exerciseDetailList = state._exerciseDetaile.filter(i => i.workoutId == state._workoutPreview.id)
    exerciseDetailList.map(ed => {
        const exc = state._exercises.value.find(i => i.id == ed.exerciseId)
        if (exc) {
            _list.push({ ...exc, ...ed })
        }
    })
    // _list = state._exerciseDetaile.filter(i => exerciseDetailIds.includes(i.id)).map(p => p)
    return _list;
}