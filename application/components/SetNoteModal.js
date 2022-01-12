import React, { useState, useRef } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { Form, Textarea } from "native-base";
import { update as updateSetProgress } from '../redux/actions/progress/setProgressActions';
import { connect } from "react-redux";
import CustomButton from '../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
var styles = require('../../assets/files/Styles');

function SetNoteModal(props) {
    const { tempo, notes, injury } = props.setProgress;
    const [currentTempo, setCurrentTempo] = useState(tempo && tempo.length > 3 ? tempo : [null, null, null, null]);
    const [currentNotes, setCurrentNotes] = useState(notes);
    const [currentInjury, setCurrentInjury] = useState(injury);

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
        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.Keyboardcontainer}
            >
                <View>
                    <View style={{ backgroundColor: 'white', borderColor: '#FFB800', borderWidth: 2 }}>
                        <View style={{ padding: 10, paddingBottom: 15, }}>
                            <Text style={[styles.modalHeader, { color: '#00492F' }]}>Notes for set</Text>
                        </View>

                        <Text style={{ paddingLeft: 15 }}>Tempo</Text>
                        <View style={[styles.Beside, { paddingLeft: 15, paddingBottom: 15 }]}>
                            <TextInput
                                selectTextOnFocus
                                style={styles.tempoInput}
                                placeholder='1'
                                maxLength={1}
                                defaultValue={currentTempo[0] ? currentTempo[0].toString() : null}
                                keyboardType={'numeric'}
                                selectionColor='#00492F'
                                // go to next input
                                ref={inputOne}
                                onChange={TempoTwo}

                                //passing data to this componenet from input card
                                onChangeText={(integer) => setTempo(0, parseInt(integer))}

                            />
                            <TextInput
                                selectTextOnFocus
                                style={styles.tempoInput}
                                placeholder='1'
                                maxLength={1}
                                defaultValue={currentTempo[1] ? currentTempo[1].toString() : null}
                                keyboardType={'numeric'}
                                ref={inputTwo}
                                onChangeText={(integer) => setTempo(1, parseInt(integer))}
                                onChange={TempoThree}
                                selectionColor='#00492F'
                            />

                            <TextInput
                                selectTextOnFocus
                                style={styles.tempoInput}
                                placeholder='1'
                                maxLength={1}
                                defaultValue={currentTempo[2] ? currentTempo[2].toString() : null}
                                keyboardType={'numeric'}
                                ref={inputThree}
                                onChangeText={(integer) => setTempo(2, parseInt(integer))}
                                onChange={TempoFour}
                                selectionColor='#00492F'
                            />
                            <TextInput
                                selectTextOnFocus
                                style={styles.tempoInput}
                                placeholder='1'
                                maxLength={1}
                                defaultValue={currentTempo[3] ? currentTempo[3].toString() : null}
                                keyboardType={'numeric'}
                                ref={inputFour}
                                onChangeText={(integer) => setTempo(3, parseInt(integer))}
                                selectionColor='#00492F'
                            />
                        </View>

                        <View style={{ paddingBottom: 6, padding: 10 }}>

                            {/*Notes input */}
                            <Form style={[styles.inputShadow]}>

                                <Textarea
                                    rowSpan={5}
                                    placeholder="Notes"
                                    defaultValue={currentNotes}
                                    onChangeText={setCurrentNotes}
                                />
                            </Form>

                        </View>


                        <View style={{ paddingBottom: 15, padding: 10 }}>

                            {/*Notes input */}
                            <Form style={[styles.inputShadow]}>

                                <Textarea
                                    rowSpan={2}
                                    placeholder="Any pains or injuries?"
                                    defaultValue={currentInjury}
                                    // onChangeText={debounce(setCurrentInjury, 500)}
                                    onChangeText={setCurrentInjury}
                                />
                            </Form>

                        </View>

                        <View style={[styles.Beside, styles.modalFooter, { justifyContent: 'flex-end', paddingRight: 0, margin: 10 }]}>
                            <CustomButton type='long-tertiary' text='Cancel' onPress={onPressCancel} />
                            <CustomButton type='small-primary' text='OK' onPress={onPressOk} />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const mapStateToProps = (state) => ({
    setProgress: state.setProgress,
});

const mapDispatchToProps = (dispatch) => ({
    updateSetProgress: (x) => dispatch(updateSetProgress(x)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetNoteModal);
