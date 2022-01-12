import { CardItem } from "native-base";
import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { connect } from "react-redux";
// import { debounce } from "debounce";
import { update as updateSetProgress } from '../redux/actions/progress/setProgressActions';

var styles = require('../../assets/files/Styles');


function ExerciseDetailsModal(props) {
    const { tempo, ExerciseDescription, ExerciseName } = props;
    const [currentTempo, setCurrentTempo] = useState(tempo && tempo.length > 3 ? tempo : [null, null, null, null]);
    const [numberOfSets, setNumberOfSets] = useState();
    const [numberOfReps, setNumberOfReps] = useState();
    const [restDuration, setRestDuration] = useState();



    const { setModalVisibleState } = props;

    function onPressCancel() {
        setModalVisibleState(false);
    }

    // auto select next text input

    const inputOne = useRef(null);
    const inputTwo = useRef(null);
    const inputThree = useRef(null);
    const inputFour = useRef(null);


    const TempoOne = () => {
        // `current` points to the mounted text input element
        inputOne.current.focus();
    };

    const TempoTwo = () => {
        // `current` points to the mounted text input element
        inputTwo.current.focus();
    };

    const TempoThree = () => {
        // `current` points to the mounted text input element
        inputThree.current.focus();
    };

    const TempoFour = () => {
        // `current` points to the mounted text input element
        inputFour.current.focus();
    };

    const setTempo = (index, value) => {
        let tmp = [...currentTempo];
        tmp[index] = value;
        setCurrentTempo(tmp);
    }

    const onPressOk = () => {
        // if tempo is unchanged, dont save array of nulls
        let nonNull = false;
        currentTempo.forEach(element => {
            nonNull = nonNull || !!element;
        });

        let updatedSet = { ...props.setProgress, notes: currentNotes, injury: currentInjury };
        if (nonNull) {
            updatedSet.tempo = currentTempo;
        }
        props.updateSetProgress(updatedSet);
        setModalVisibleState(false);
    }

    return (
        // <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.Keyboardcontainer}
            >
                <View style={styles.background}>
                    <CardItem style={[styles.background, styles.rowing]}>
                        <View style={{ marginHorizontal: 5 }}>
                            <Svg
                                viewBox="0 0 640 512"
                                height={24}
                                width={24}
                                fill='#7b8794'
                            >
                                <Path d="M632 240h-24v-96c0-26.5-21.5-48-48-48h-32c-5.6 0-11 1.2-16 2.9V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48
                                48v160H256V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48 48v18.9c-5-1.8-10.4-2.9-16-2.9H80c-26.5 0-48 21.5-48 48v96H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h24v96c0 26.5 21.5 48 48 48h32c5.6 0 11-1.2 16-2.9V432c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V272h128v160c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48v-18.9c5 1.8 10.4 2.9 16 2.9h32c26.5 0 48-21.5 48-48v-96h24c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM112 384H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224c0 8.8-7.2 16-16 16zm112 48c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm256 0c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm96-64c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224z" />
                            </Svg >
                            <Text style={styles.exerciseDescription}>{ExerciseName}</Text>

                        </View>

                        {/* <View style={{paddingLeft: 10}}> */}
                        <View>
                            <Text style={styles.exerciseDescription}>{ExerciseDescription}</Text>
                        </View>

                    </CardItem>

                    <CardItem style={{justifyContent: 'space-between', backgroundColor: '#fbfcfc' }}>



                        {/* styling for magin or padding doesn't take in the icon or text.
                 Don't know the reason but the icons need to be pushed down a little bit */}
                        <Text>

                            <Svg
                                viewBox="0 0 512 512"
                                height={15}
                                width={15}
                                fill='#CFCFCF'
                            >
                                <Path d="M145.35 207a8 8 0 00-11.35 0l-71 71-39-39a8 8 0 00-11.31 0L1.35 250.34a8 8 0 000 11.32l56 56a8 8 0 0011.31 0l88-88a8 8 0 000-11.32zM62.93 384c-17.67 0-32.4 14.33-32.4 32s14.73 32 32.4 32a32 32 0 000-64zm82.42-337A8 8 0 00134 47l-71 71-39-39a8 8 0 00-11.31 0L1.35 90.34a8 8 0 000 11.32l56 56a8 8 0 0011.31 0l88-88a8 8 0 000-11.32zM503 400H199a8 8 0 00-8 8v16a8 8 0 008 8h304a8 8 0 008-8v-16a8 8 0 00-8-8zm0-320H199a8 8 0 00-8 8v16a8 8 0 008 8h304a8 8 0 008-8V88a8 8 0 00-8-8zm0 160H199a8 8 0 00-8 8v16a8 8 0 008 8h304a8 8 0 008-8v-16a8 8 0 00-8-8z" />
                            </Svg>

                            <TextInput
                                style={styles.mainNumber}
                                placeholder="# of sets"
                                defaultValue={numberOfSets}
                                onChangeText={setRestDuration}
                                keyboardType={'numeric'}
                            />
                            <Text style={styles.secondNumber}>sets</Text>
                        </Text>

                        <Text>

                            <Svg
                                viewBox="0 0 512 512"
                                height={15}
                                width={15}
                                fill='#CFCFCF'
                            >
                                <Path d="M54.027 327.713C40.129 307.242 32 282.553 32 256c0-70.579 57.421-128 128-128h160v63.969c0 29.239 36.192 43.177 55.785 21.407l72-79.968c10.952-12.169 10.953-30.644 0-42.814l-72-79.974C356.226-11.114 320 2.738 320 32.026V96H160C71.775 96 0 167.775 0 256c0 33.913 10.612 65.391 28.683 91.299 4.427 6.348 13.606 6.936 18.785 1.185l5.488-6.096c3.667-4.073 4.149-10.14 1.071-14.675zM352 32l72 80-72 80V32zm131.317 132.701c-4.427-6.348-13.606-6.936-18.785-1.185l-5.488 6.096c-3.667 4.073-4.149 10.14-1.071 14.675C471.871 204.758 480 229.447 480 256c0 70.579-57.421 128-128 128H192v-63.969c0-29.239-36.192-43.177-55.785-21.407l-72 79.969c-10.952 12.169-10.953 30.644 0 42.814l72 79.974C155.774 523.113 192 509.264 192 479.974V416h160c88.225 0 160-71.775 160-160 0-33.913-10.612-65.391-28.683-91.299zM160 480l-72-80 72-80v160z" />
                            </Svg>
                            <Text>
                                <TextInput
                                    style={styles.mainNumber}
                                    placeholder="# of reps"
                                    defaultValue={numberOfReps}
                                    onChangeText={setNumberOfReps}
                                    keyboardType={'numeric'}
                                />
                                <Text style={styles.secondNumber}>reps</Text>
                            </Text>
                        </Text>

                        <Text>
                            <Svg
                                viewBox="0 0 384 512"
                                height={15}
                                width={15}
                                fill='#CFCFCF'
                            >
                                <Path d="M368 32h4c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h4c0 91.821 44.108 193.657 129.646 224C59.832 286.441 16 388.477 16 480h-4c-6.627 0-12 5.373-12 12v8c0 6.627 5.373 12 12 12h360c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12h-4c0-91.821-44.108-193.657-129.646-224C324.168 225.559 368 123.523 368 32zM48 32h288c0 110.457-64.471 200-144 200S48 142.457 48 32zm288 448H48c0-110.457 64.471-200 144-200s144 89.543 144 200zM285.621 96H98.379a12.01 12.01 0 01-11.602-8.903 199.464 199.464 0 01-2.059-8.43C83.054 71.145 88.718 64 96.422 64h191.157c7.704 0 13.368 7.145 11.704 14.667a199.464 199.464 0 01-2.059 8.43A12.013 12.013 0 01285.621 96zm-15.961 50.912a141.625 141.625 0 01-6.774 8.739c-2.301 2.738-5.671 4.348-9.248 4.348H130.362c-3.576 0-6.947-1.61-9.248-4.348a142.319 142.319 0 01-6.774-8.739c-5.657-7.91.088-18.912 9.813-18.912h135.694c9.725 0 15.469 11.003 9.813 18.912z" />
                            </Svg>

                            <Text>
                                <TextInput
                                    style={styles.mainNumber}
                                    placeholder="66"
                                    defaultValue={restDuration}
                                    onChangeText={setNumberOfReps}
                                    keyboardType={'numeric'}
                                />
                                <Text style={styles.secondNumber}>sec</Text>
                            </Text>
                        </Text>
                    </CardItem>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

// ============
// ======= FOR THE SETS REPS AND ALL THAT USE UPDATED EXERFCISE DETAIL. ========== this is not meant for this location................................
// ===============

const mapStateToProps = (state) => ({
    setProgress: state.setProgress,
});

const mapDispatchToProps = (dispatch) => ({
    updateSetProgress: (x) => dispatch(updateSetProgress(x)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseDetailsModal);
