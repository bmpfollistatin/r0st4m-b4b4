import { Container, Toast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ExerciseHistory from '../components/ExerciseHistory';
import ExerciseInfo from '../components/ExerciseInfo';
import InputCard from '../components/inputCard';
import PageHeader from '../components/PageHeader';
import SetsAndRepsSelector from '../components/SetsAndRepsSelector';
import { updateExerciseHistory } from '../redux/actions/history/exerciseHistoryActions';
import { addSetHistory, removeSetHistory, updateSetHistory } from '../redux/actions/history/setHistoryActions';
import { setRestTimer, startRestTimer, stopRestTimer } from '../redux/actions/intervalTimerActions';
import { update as updateExerciseProgress } from '../redux/actions/progress/exerciseProgressActions';
import { start as startSetProgress } from '../redux/actions/progress/setProgressActions';
import uuid from '../utils/uuid';

var styles = require('../../assets/files/Styles');

const ONE_SECOND_IN_MS = 1000;

export default function SetsAndReps(props) {
  const dispatch = useDispatch();
  const _state = useSelector(state => state)
  const setProgress = _state.setProgress;
  const exerciseProgress = _state.exerciseProgress;
  const setHistory = _state.setHistory;
  const exerciseData = _state._exercises.value.find(i => i.id == exerciseProgress.exerciseId);
  const exerciseDetail = _state._exerciseDetaile.find(i => i.id == exerciseProgress.exerciseDetailId);
  const currentSetList = (exerciseProgress.setHistoryIds || []).map(id => setHistory.byId[id]);
  const setHistoryList = buildSetHistories(_state);
  const exerciseHistory = _state.exerciseHistory;
  const rest_time = _state.intervalTimer.rest_time;
  const rest_exercise = _state.intervalTimer.rest_exercise;


  const [menuActions, setMenuActions] = useState(['Delete']);
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [mounted, setMounted] = useState(false)

  console.log({props})

  const remainSets = props.route.params.remainSets;
  // const ceRemain = currentExerciseSetDoneData(currentSetList) //current exercies remain sets

  useEffect(() => {
    if (!mounted) {
      setMounted(true) 
      checkSelectedIndex();
      // Check if timer running
      if (rest_exercise === null) {
        dispatch(setRestTimer(exerciseData.rests));
      }
    }
  }, []);

  useEffect(() => {
    checkSelectedIndex()
  }, []);

  const startTimer = () => {
    const { rests, name } = exerciseData;
    // console.log("**************************", rests, name, "**************************")
    // dispatch(startRestTimer(rests, name)); //TODO:
  }

  const checkSelectedIndex = () => {
    const index = exerciseProgress.setHistoryIds.indexOf(setProgress.id);
    if (index !== selectedIndex) {
      setSelectedIndex(index)
    }
  }

  const setSelectedSet = (nextSet) => {
    // set to setProgress
    if (nextSet.id !== setProgress.id) {
      dispatch(updateSetHistory(setProgress));
      dispatch(startSetProgress(nextSet));
    }
  }



  const addSet = async () => {
    // Needs to create an empty set in history, then add setHistoryId to ExerciseProgress
    let _setHistory = {
      startTime: null,
      endTime: null,
      weight: null,
      reps: null,
    }
    _setHistory.id = await uuid.v4()
    dispatch(addSetHistory(_setHistory));
    dispatch(updateExerciseProgress({ ...exerciseProgress, setHistoryIds: [...exerciseProgress.setHistoryIds, _setHistory.id] }));
  }

  const deleteSet = () => {
    dispatch(removeSetHistory(setProgress));
    dispatch(startSetProgress(null));

    //remove from exerciseProgress setHistoryIds
    const { setHistoryIds } = exerciseProgress;
    const filteredIds = setHistoryIds.filter(id => id !== setProgress.id);

    // if all sets complete, show Exercise Completed toast
    let complete = filteredIds.length > 0;

    for (let i = 0; i < filteredIds.length; i++) {
      // let set = setHistory.byId[filteredIds[i]];
      let set = { ...setHistory.byId[filteredIds[i]] };
      // if (i !== setIndex && (!set || !set.endTime)) {
      if (!set || !set.endTime) {
        complete = false;
      }
    }

    if (complete) {
      Toast.show({
        text: 'Exercise Complete',
        buttonText: 'Okay',
        duration: 4000,
        type: 'success',
      })

      // add end time to exercise, save to history
      const now = Date.now();
      dispatch(updateExerciseProgress({ ...exerciseProgress, setHistoryIds: filteredIds, endTime: now }));
      let exerciseHistoryObject = { ...exerciseHistory.byId[exerciseProgress.id] };
      if (exerciseHistoryObject !== null && exerciseHistoryObject !== undefined) {
        dispatch(updateExerciseHistory({ ...exerciseHistoryObject, setHistoryIds: filteredIds, endTime: now }));
      }
      return;
    } else {
      dispatch(updateExerciseProgress({ ...exerciseProgress, setHistoryIds: filteredIds }));
    }

    // TODO: if they delete last empty set, so all others are complete, we need to save exercise to history 
    // and show "Exercise Complete" toast.
  }


  const onMenuAction = (menuAction) => {
    switch (menuAction) {
      case 'Delete': {
        deleteSet();
        break;
      }
    }
  }

  const reversedList = [...setHistoryList].reverse();

  if (rest_time <= 0) {
    dispatch(stopRestTimer())
  }

  const goToNextExercies = () => {
    props.navigation.goBack();
    props.route.params.onNextExercies()
  }

  const RenderNextExercise = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={{
          width: '100%',
          padding: 12,
          height: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F5F7F6',
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          borderWidth: 1,
          borderColor: 'hsl(98, 0%, 88%)',
          borderTopColor: 'hsl(98, 0%, 88%)'
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#2C3B35' }}>{remainSets > 0 ? 'Exercise Completed' : 'All Exercises Done!'}</Text>
          <View style={{ width: '100%', display: 'flex', alignItems: 'flex-end' }}>
            <TouchableOpacity
            onPress={()=> {
              if(remainSets){
                console.log('go to next exercies');
                goToNextExercies()
              }else{
                props.navigation.replace("HomeScreen")
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center', 
              justifyContent: 'center', 
              height: 32, width: 146, borderRadius: 6, marginTop: 15, marginRight: 5, backgroundColor: "#00492F"
            }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: "#fff" }}>{remainSets == 0 ? 'Complete Workout' : 'Next Exercise'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

    )
  }

  return (
    // <>
    <Container style={styles.background_general}>


      <PageHeader
        Title={exerciseData.name}
      >
      </PageHeader>
      <ScrollView>

        <ExerciseInfo
          ExerciseName={exerciseData.name}
          ExerciseDetails={exerciseData.description}
          numberOfSets={exerciseDetail.sets}
          numberOfReps={exerciseDetail.reps}
          restPeriod={exerciseDetail.rests}
        />

        <SetsAndRepsSelector
          sets={currentSetList}
          selectedSet={setProgress.id}
          setSelectedSet={setSelectedSet}
          onMenuAction={onMenuAction}
          menuActions={menuActions}
          addSet={addSet}
        />

        {reversedList.map((item, index) => {
          return (
            <ExerciseHistory
              key={index}
              sets={item.setHistoryObjs}
              selectedIndex={selectedIndex}
            />
          )
        }
        )}


      </ScrollView>

      {setProgress.id && (
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <InputCard selectionColor='#00492F' startTimer={startTimer} style={styles.InputCard} ></InputCard>
        </KeyboardAvoidingView>

      )}
      {!setProgress.id && <RenderNextExercise />}
    </Container>
  )

}

/*
  We need:
  1. exercise in progress
  2. the set data. *Just like for exercises, lets make all the sets, populate the set list, and load from that.
*/

const buildSetHistories = (state) => {
  const exerciseHistoryList = [];

  for (const [k, v] of Object.entries(state.exerciseHistory.byId)) {
    let value = { ...v };
    if (value.id !== state.exerciseProgress.id) {
      // if (value.exerciseId === state.exerciseProgress.exerciseId && !!value.setHistoryIds) {
      if (value.exerciseDetailId === state.exerciseProgress.exerciseDetailId && !!value.setHistoryIds) {
        value.setHistoryObjs = value.setHistoryIds.map(id => state.setHistory.byId[id]);
        exerciseHistoryList.push(value);
      }
    }
  }
  return exerciseHistoryList;
};