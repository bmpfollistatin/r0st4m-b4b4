import React, { Component, useState ,useEffect} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Timer } from "interval-timer";
import Strings from "../utils/Strings";
import { NavigationActions } from "react-navigation";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";


function ModalTimer(props) {
    const [minutesInput, setMinutesInput] = useState('')
    const [secondsInput, setSecondsInput] = useState('')
    const [numberOfSets, setNumberOfSets] = useState('')
    const [restMinuteInput, setRestMinuteInput] = useState('')
    const [restSecondsInput, setRestSecondsInput] = useState('')
    const [timer, setTimer] = useState(null)
    const [currentSeconds, setCurrentSeconds] = useState(null)
    const [active, setActive] = useState(null)

    useEffect(() => {
        return () => {
            //component unmount.
            const _timer = timer;
            _timer.stop()
        }
    }, [])

    const startClickTimer = () => {
        const optionsActive = {
            startTime: parseInt(minutesInput) * 60 * 1000 + parseInt(secondsInput) * 1000, //how long the timer will be set to
            updateFrequency: 100,
            selfAdjust: true,
            countdown: true,
        };
        const optionsRest = {
            startTime: parseInt(restMinuteInput) * 60 * 1000 + parseInt(restSecondsInput) * 1000, //how long the timer will be set to
            updateFrequency: 100,
            selfAdjust: true,
            countdown: true,
        };

        const timer = new Timer(optionsActive);
        setTimer(timer)

        timer.on('update', () => {
            setCurrentSeconds(timer.getTime.seconds)
        });

        timer.on('end', () => {
            timer.reset(active ? optionsRest : optionsActive);
            setActive(!active)
            timer.start();
        });

        timer.start();
    }

    return (
        <View style={{ flex: 1, justifyContent: "space-between", margin: 50 }}>

            {/* This displays the active running timer */}
            {timer && (
                <Text>{active ? 'Active Timer: ' : 'Rest Timer: '}{timer.getTime.minutes} : {timer.getTime.seconds}</Text>
            )}


            {/*SETS*/}
            <Text style={styles.timerTitle}>Sets</Text>
            <View style={styles.SideBySide}>
                <Text style={styles.timerIconTextSize}> - </Text>
                <TextInput
                    selectionColor='#00492F'
                    placeholder='1'
                    keyboardType={'numeric'}
                    maxLength={2}
                    style={styles.timerUserInput}
                    value={numberOfSets} //need to parse this into a string, right now its a number and react complains
                    onChangeText={(number) => {
                        setNumberOfSets(number)
                    }
                    }
                />
                <Text style={styles.timerIconTextSize}> + </Text>
            </View>


            {/*WORK INTERVAL*/}
            <Text style={styles.timerTitle}>Work Interval</Text>
            <View style={styles.SideBySide}>
                <Text style={styles.timerIconTextSize}> - </Text>
                <TextInput
                    selectionColor='#00492F'
                    placeholder='00'
                    keyboardType={'numeric'}
                    maxLength={2}
                    style={styles.timerUserInput}
                    value={minutesInput} //need to parse this into a string, right now its a number and react complains
                    onChangeText={(number) => {
                        setMinutesInput(number)
                    }
                    }
                />
                <Text> : </Text>
                <TextInput
                    selectionColor='#00492F'
                    placeholder='00'
                    keyboardType={'numeric'}
                    maxLength={2}
                    style={styles.timerUserInput}
                    value={secondsInput} //need to parse this into a string, right now its a number and react complains
                    onChangeText={(text) => {
                        setSecondsInput(text)
                    }
                    }
                />

                <Text style={styles.timerIconTextSize}> + </Text>
            </View>

            {/*REST INTERVAL*/}
            <Text style={styles.timerTitle}>Rest Interval</Text>
            <View style={styles.SideBySide}>
                <Text style={styles.timerIconTextSize}> - </Text>
                <TextInput
                    selectionColor='#00492F'
                    placeholder='00'
                    keyboardType={'numeric'}
                    maxLength={2}
                    style={styles.timerUserInput}
                    value={restMinuteInput} //need to parse this into a string, right now its a number and react complains
                    onChangeText={(number) => {
                        setRestMinuteInput(number)
                    }
                    }
                />
                <Text> : </Text>
                <TextInput
                    selectionColor='#00492F'
                    placeholder='00'
                    keyboardType={'numeric'}
                    maxLength={2}
                    style={styles.timerUserInput}
                    value={restSecondsInput} //need to parse this into a string, right now its a number and react complains
                    onChangeText={(number) => {
                        setRestSecondsInput(number)
                    }
                    }
                />
                <Text style={styles.timerIconTextSize}> + </Text>
            </View>

            {/* BUTTONS */}
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 30 }}>

                <TouchableOpacity
                    style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent'
                    }}
                    onPress={() => {
                        timer.pause();
                    }}
                >
                    <FontAwesome
                        name="pause-circle"
                        style={{ color: "black", fontSize: 85 }}
                    />
                </TouchableOpacity>

                {/*play button*/}

                <TouchableOpacity
                    style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    }}
                    onPress={() => {
                        startClickTimer();
                    }}
                >
                    <FontAwesome
                        name="play-circle"
                        style={{ color: "#45B68D", fontSize: 85 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    }}
                    onPress={() => {
                        timer.reset();
                    }}
                >
                    <MaterialCommunityIcons
                        name="loop"
                        style={{ color: 'black', fontSize: 65 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ModalTimer
