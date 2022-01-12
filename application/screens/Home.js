/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from "../components/Button";
import FeedbackFab from '../components/FeedbackFab';
import PageHeader from '../components/PageHeader';
import ShortcutCard from "../components/ShortcutCard";
//CUSTOM CARD IMPORT
import WorkoutCard from "../components/WorkoutCard";
import { filterWorkoutHistory } from '../redux/reducers/history/workoutHistoryReducer';
import { filterWorkoutPlanProgress } from '../redux/reducers/progress/workoutPlanProgressReducer';
import {setWorkoutPreview} from '../redux/features/workouts/workoutPreview.slice'

var styles = require('../../assets/files/Styles');


export default function Home(props) {
  const horizRef = React.createRef();
  const all = useSelector(state => state)
  const [name, setName] = useState(null)
  const [restTime, setRestTime] = useState(null)
  const [mounted, setMounted] = useState(false)
  const dispatch = useDispatch()
  const rest_time = useSelector((state) => state.intervalTimer.rest_time)
  console.log({all})
  const orderedWorkoutList = getWPProgression(useSelector((state) => state))
  const workoutProgress = useSelector((state) => state.workoutProgress)
  const currentWorkoutPlan = useSelector((state) => state.workoutPlan.byId[state.workoutPlanProgress.workoutPlanId])
  // const navigationOptions = ({ navigation }) => {
  //   const name = navigation.getParam('currentWorkoutPlanName')
  //   return {
  //     headerTitle: name,
  //   }
  // };
  const { navigation } = props;
  useEffect(() => {
    const prevName = (currentWorkoutPlan || {}).name;
    if (name !== prevName) {
      props.navigation.setParams({ currentWorkoutPlanName: name });
    }

    if (restTime === rest_time) {
      !!horizRef.current && horizRef.current.scrollTo({ animated: false, x: 0, y: 0 });
    }
  }, [currentWorkoutPlan, rest_time]);

  useEffect(() => {
    if (!mounted) {
      console.log('====== 2 ======')
      setMounted(true)
      setName((currentWorkoutPlan || {}).name)
      setRestTime(rest_time)
    }
  }, []);

  const navigateToScreen = (route, params = {}) => {
    navigation.navigate(route, { ...params })
  }

  const handlePreview = (workout) => {
    dispatch(setWorkoutPreview(workout))
    // dispatch(setPreview(workout)) //TODO:
    props.navigation.navigate('PreviewWorkout', { workout }); // just used for setting the title based off workout.name
  }

  const isWorkoutInProgress = (workout) => {
    const isInProgress = workout.id === workoutProgress.workoutId;
    isInProgress ? navigateToScreen('StartedWorkout', { workout }) : handlePreview(workout);
  }

  return (
    <SafeAreaView style={[styles.background_general, { height: '100%' }]}>

      <PageHeader
        {...props}
        LeftSideIcon='nothing'
        SVG='hamburger'
        Title={!!currentWorkoutPlan && currentWorkoutPlan.name || 'Current Workout'}
      />

      <View style={{ paddingTop: 30, backgroundColor: '#FFF' }}>
        <Text style={[styles.headerTitle, { paddingBottom: 15 }]}>Workouts:</Text>

        {/* This is a horizontal list of todays workout, and the other workouts in the users routine */}
        {/* TODO, this should be provided by api call for current user based on user ID */}
        <ScrollView ref={horizRef} horizontal={true} showsHorizontalScrollIndicator={true}>

          {orderedWorkoutList && orderedWorkoutList.map((workout, index) => {
            return (

              <TouchableOpacity key={index} onPress={() => isWorkoutInProgress(workout)}>
                <WorkoutCard key={workout.id} onPress={() => isWorkoutInProgress(workout)}>
                  <Text style={[styles.TertiaryBtnLinkText, styles.TitleText]} onPress={() => isWorkoutInProgress(workout)}>{workout.name}</Text>
                  <View style={{ flexDirection: "row" }} onPress={() => isWorkoutInProgress(workout)}>
                    {/* TODO completed count goes here */}
                    {/* Completed out of specific count...USE THIS when we start rolling out paid version of the app */}
                    <Text style={{ paddingBottom: 5, color: '#8A8A8A', fontWeight: '300' }}>{'Completed: ' + workout.count + 'x'}</Text>
                  </View>
                  {/* Show Continue on workour in progress */}
                  {!!workoutProgress.id && Number(workoutProgress.workoutPlanId) === workout.id && (
                    <View>
                      {/* horizontal line */}
                      <View style={{ width: 120, borderBottomWidth: 1, borderBottomColor: '#A3A3A3', marginBottom: 10, marginTop: 10 }} />
                      <CustomButton type='small-yellow' text='Continue' onPress={() => navigateToScreen('StartedWorkout')} />
                    </View>
                  )}

                  {/* OR Show start in first card */}
                  {!workoutProgress.id && index === 0 && (
                    <View>
                      {/* horizontal line */}
                      <View style={{ width: 120, borderBottomWidth: 1, borderBottomColor: '#A3A3A3', marginBottom: 10, marginTop: 10 }} />
                      <CustomButton type='small-yellow' text='Start' onPress={() => handlePreview(workout)} />
                    </View>
                  )}

                </WorkoutCard>
              </TouchableOpacity>
            )

          })}


        </ScrollView>

        <Text style={[styles.headerTitle, styles.paddingTop75]}>
          Essentials:
        </Text>

        <ShortcutCard onPress={() => navigateToScreen('Cardio')} text={'  Cardio'} >
          <Svg
            viewBox="0 0 512 512"
            height={20}
            width={20}
            fill='url(#cardioColor)'
          >
            <Defs>
              <LinearGradient id="cardioColor" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
                <Stop offset="1" stopColor="#CF1124" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Path d="M468.7 76.5C423.6 32.2 375 32 362.3 32c-12.7 0-61.5.2-106.3 44.4C211.3 32.3 162.5 32 149.7 32c-12.7 0-61.4.2-106.4 44.5C15.4 104 0 140.7 0 179.9 0 214.1 12.3 246 33.8 272h120.8l29.9-71.8 56.9 126.4c5.5 12.3 22.9 12.7 28.9.6l49.7-99.4 22.1 44.2h136c21.5-26 33.8-57.9 33.8-92.1.1-39.2-15.3-75.9-43.2-103.4zM462.5 240H361.9l-27.6-55.2c-5.9-11.8-22.7-11.8-28.6 0l-48.9 97.9-58.2-129.3c-5.8-12.8-24-12.5-29.4.4L133.3 240H49.5c-9.2-14.6-42.6-82.7 18.3-142.7C90.4 75.1 120 64 149.7 64c33.9 0 54.5 6.3 106.3 57.3C311 67.1 330.5 64 362.3 64c29.7 0 59.3 11.1 81.8 33.3 61 60.1 27.5 128.2 18.4 142.7zM268.7 443.4c-6.2 6.1-16.2 6.1-22.4 0L108.9 304H64l159.9 162.2c18.7 18.5 48.6 18.4 67.3 0L448 304h-44.5L268.7 443.4z" />
          </Svg>
        </ShortcutCard>


        <ShortcutCard onPress={() => navigateToScreen('IntervalTimer')} text={'  Interval Timer'}>
          <Svg
            viewBox="0 0 448 512"
            height={20}
            width={20}
            fill='url(#timerColor)'
          >
            <Defs>
              <LinearGradient id="timerColor" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
                <Stop offset="1" stopColor="#CF1124" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Path d="M393.3 141.3l17.5-17.5c4.7-4.7 4.7-12.3 0-17l-5.7-5.7c-4.7-4.7-12.3-4.7-17 0l-17.5 17.5c-35.8-31-81.5-50.9-131.7-54.2V32h25c6.6 0 12-5.4 12-12v-8c0-6.6-5.4-12-12-12h-80c-6.6 0-12 5.4-12 12v8c0 6.6 5.4 12 12 12h23v32.6C91.2 73.3 0 170 0 288c0 123.7 100.3 224 224 224s224-100.3 224-224c0-56.1-20.6-107.4-54.7-146.7zM224 480c-106.1 0-192-85.9-192-192S117.9 96 224 96s192 85.9 192 192-85.9 192-192 192zm4-128h-8c-6.6 0-12-5.4-12-12V172c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v168c0 6.6-5.4 12-12 12z" />
          </Svg>
        </ShortcutCard>
        {/* Testing */}
        <ShortcutCard onPress={() => navigateToScreen('WeeklyProgressPictures')} text={'  Weekly Checkin'}>
          <Svg
            viewBox="0 0 512 512"
            height={20}
            width={20}
            fill='url(#cameraColor)'
          >
            <Defs>
              <LinearGradient id="cameraColor" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
                <Stop offset="1" stopColor="#CF1124" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Path d="M256 408c-66.2 0-120-53.8-120-120s53.8-120 120-120 120 53.8 120 120-53.8 120-120 120zm0-208c-48.5 0-88 39.5-88 88s39.5 88 88 88 88-39.5 88-88-39.5-88-88-88zm-32 88c0-17.6 14.4-32 32-32 8.8 0 16-7.2 16-16s-7.2-16-16-16c-35.3 0-64 28.7-64 64 0 8.8 7.2 16 16 16s16-7.2 16-16zM324.3 64c3.3 0 6.3 2.1 7.5 5.2l22.1 58.8H464c8.8 0 16 7.2 16 16v288c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h110.2l20.1-53.6c2.3-6.2 8.3-10.4 15-10.4h131m0-32h-131c-20 0-37.9 12.4-44.9 31.1L136 96H48c-26.5 0-48 21.5-48 48v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48h-88l-14.3-38c-5.8-15.7-20.7-26-37.4-26z" />
          </Svg>
        </ShortcutCard>
      </View>
      <FeedbackFab onPress={() => navigateToScreen('Feedback')} />
    </SafeAreaView>
  )

}

const getWPProgression = (state) => {
  // get all completed workouts matching current workoutPlanProgressId
  const workoutHistory = filterWorkoutHistory(state.workoutHistory, { type: 'from_custom_list', list: state.workoutPlanProgress.workoutHistoryIds })

  // count workouts by id, eg {abs: 2, chest: 3, arms:3, etc}
  const historyCounts = {};
  workoutHistory.map(element => { historyCounts[element.workoutId] = historyCounts[element.workoutId] ? historyCounts[element.workoutId] + 1 : 1 });


  // Or if there is one in progress, that needs to go first
  // const lastCompleted = (workoutHistory[workoutHistory.length - 1] || {}).workoutId;
  const lastCompletedWorkoutId = (workoutHistory[workoutHistory.length - 1] || {}).workoutId;
  const inProgressWorkoutId = (state.workoutProgress || {}).workoutId;

  let workoutIds = filterWorkoutPlanProgress(state.workoutPlanProgress,
    { type: 'from_workout', workoutId: state.workoutProgress.id ? inProgressWorkoutId : lastCompletedWorkoutId });

  // need to shift since it will have lastCompletedUid as first in the list. We want the next one
  if (!inProgressWorkoutId && !!lastCompletedWorkoutId) {
    workoutIds.push(workoutIds.shift());
  }

  // from the list of workoutId's, get the full workout objects so we can grab the name in the component
  const workoutObjs = state._workouts;

  // add the completed counts to each object to be displayed on the home page
  const ret = workoutObjs.map(element => ({ ...element, total: state.workoutPlanProgress.workoutCountMax, count: (historyCounts[element.id] || 0) }));

  return ret;
}
