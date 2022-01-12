// this was custom created created and I did NOT finish it!!!!!
import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Form, Item, Input, Label, Toast } from "native-base";
import Modal from 'react-native-modal';
// import { debounce } from "debounce";
import { connect, useDispatch, useSelector } from 'react-redux';
import { update as updateSetProgress } from '../redux/actions/progress/setProgressActions';
import { updateSetHistory } from '../redux/actions/history/setHistoryActions';
import { update as updateExerciseProgress } from '../redux/actions/progress/exerciseProgressActions';
import { updateExerciseHistory } from '../redux/actions/history/exerciseHistoryActions';
import SetNoteModal from "./SetNoteModal";


// import TimerOnFunction from "../screens/IntervalTimer";

import CustomButton from './Button';
// import workoutProgress from '../redux/reducers/progress/workoutProgressReducer';

const window = Dimensions.get('window');
const windowWidth = window.width;

export default function InputCard(props) {
    const dispatch = useDispatch()
    const setProgress = useSelector(state => state.setProgress);
    const setHistory = useSelector(state => state.setHistory);
    const exerciseProgress = useSelector(state => state.exerciseProgress);

    const isUpdate = !!setProgress && !!setProgress.endTime;

    const [modalVisibleState, setModalVisibleState] = useState(false);

    function toggleModal() {
        setModalVisibleState(!modalVisibleState);
    }

    const updateWeight = (weight) => {
        dispatch(updateSetProgress({ ...setProgress, weight: weight }));
    }

    const updateReps = (reps) => {
        console.log({ reps })
        dispatch(updateSetProgress({ ...setProgress, reps: reps }));
    }

    const updateSet = () => {
        const now = Date.now();
        dispatch(updateSetHistory({ ...setProgress, endTime: now }));

        Toast.show({
            text: 'Set Updated',
            buttonText: 'Okay',
            duration: 4000,
            type: 'success',
        })
    }

    const validate = (set) => {
        let errorMsg = null;
        if (set.weight == null || set.reps == null) {
            errorMsg = 'Weight and reps required.';
        }

        return errorMsg
    }


    // Add endTime to set, updateSetHistory, move to next set if one exists.
    const completeSet = () => {
        const errorMsg = validate(setProgress);
        const { startTimer } = props;
        if (errorMsg) {
            Toast.show({
                text: errorMsg,
                buttonText: 'Okay',
                duration: 4000,
                type: 'danger',
                position:'center'
            })
            return;
        }

        const now = Date.now();
        dispatch(updateSetHistory({ ...setProgress, endTime: now }));

        const { setHistoryIds } = exerciseProgress;
        const setIndex = setHistoryIds.indexOf(setProgress.id);

        // load next incomplete SetProgress, else nullify
        let nextSet = null;
        for (let i = setIndex + 1; i < setHistoryIds.length; i++) {
            // Error: Invariant failed: A state mutation was detected between dispatches, in the path 'setHistory.byId.d372639c-6582-47b2-9a83-a6cbb4d776bd.startTime'. 
            // let set = setHistory.byId[setHistoryIds[i]];
            let set = { ...setHistory.byId[setHistoryIds[i]] };
            if (set && set.endTime === null) {
                nextSet = set;
                nextSet.startTime = nextSet.startTime || now;
                break;
            }
        }
        dispatch(updateSetProgress(nextSet));
        // if all sets complete, show Exercise Completed toast
        let complete = true;
        for (let i = 0; i < setHistoryIds.length; i++) {
            let set = setHistory.byId[setHistoryIds[i]];
            if (i !== setIndex && (!set || !set.endTime)) {
                complete = false;
            }
        }

        if (complete) {
            Toast.show({
                text: 'Exercise Complete',
                buttonText: 'Okay',
                duration: 4000,
                type: 'success',
                position: 'center'
            })

            // add end time to exercise, save to history
            dispatch(updateExerciseProgress({ ...exerciseProgress, endTime: now }));
            dispatch(updateExerciseHistory({ ...exerciseProgress, endTime: now }));
            return;
        }


        startTimer()
    }

    return (

        <View style={{
            display: 'flex', flexDirection: 'row', width: windowWidth, justifyContent: 'center', paddingBottom: 15,
            backgroundColor: '#F5F7F6',
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
            borderWidth: 1,
            borderColor: 'hsl(98, 0%, 88%)',
            borderTopColor: 'hsl(98, 0%, 88%)'
        }}>
            {/* <KeyboardAvoidingView */}
            {/* // behavior={Platform.OS == "ios" ? "padding" : "padding"} */}
            {/* // style={styles.Keyboardcontainer} */}
            {/* // > */}
            <Modal isVisible={modalVisibleState}
                style={{ maxHeight: 650, paddingTop: 100 }}
            >
                <SetNoteModal setModalVisibleState={setModalVisibleState} />
            </Modal>
            {/* </KeyboardAvoidingView> */}

            {/*Weight and Notes Button*/}



            <View>

                <View style={{ marginBottom: 10 }}>

                    <Form>
                        <Item fixedLabel style={{ borderBottomColor: 'rgb(100, 115, 128)', width: 120 }}>
                            <Input
                                selectionColor='hsl(158, 100%, 40%)'
                                keyboardType='number-pad'
                                defaultValue={setProgress && setProgress.weight ? setProgress.weight.toString() : null}
                                // onChangeText={debounce(text => updateWeight(parseInt(text)), 500)}
                                onChangeText={(text => updateWeight(parseInt(text)))}
                            />
                            <Label>lbs</Label>

                        </Item>
                    </Form>

                </View>
                <CustomButton type='long-secondary' text='Notes' onPress={toggleModal} />
            </View>
            {/* </KeyboardAvoidingView> */}


            {/*Reps and Completed Sets Button*/}

            {/* <KeyboardAvoidingView
      behavior='padding'
      style={{flex:1}}
    >  */}
            <View style={{ marginLeft: 20 }}>
                <View style={{ marginBottom: 10 }}>
                    <Form>
                        <Item fixedLabel style={{ borderBottomColor: 'rgb(100, 115, 128)', width: 120 }}>
                            <Input
                                selectionColor='hsl(158, 100%, 40%)'
                                keyboardType='number-pad'
                                defaultValue={setProgress && setProgress.reps ? setProgress.reps.toString() : null}
                                // onChangeText={debounce(text => updateReps(parseInt(text)), 500)}
                                onChangeText={text => updateReps(parseInt(text))}
                            />
                            <Label>reps</Label>

                        </Item>
                    </Form>
                </View>


                <CustomButton type='long-primary' text={isUpdate ? 'Update Set' : 'Complete Set'} onPress={isUpdate ? updateSet : completeSet} />

            </View>

        </View>

        // </KeyboardAvoidingView>

    )
}
