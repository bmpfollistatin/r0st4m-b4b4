//DONE!!

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState , useEffect } from 'react';
import {
    SafeAreaView, Text, TouchableOpacity, View
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Timer from '../components/Timer';
import Strings from '../utils/Strings';
var styles = require('../../assets/files/Styles');

export default function RunningTimer(props) {
    // navbar
    const navigationOptions = {
        title: `${Strings.ST204}`,
    };
    
    const [minutesInput, setMinutesInput] = useState('')
    const [secondsInput, setSecondsInput] = useState('')
    const [numberOfSets, setNumberOfSets] = useState('')
    const [restMinuteInput, setRestMinuteInput] = useState('')
    const [restSecondsInput, setRestSecondsInput] = useState('')
    const [timer, setTimer] = useState(null)
    const [currentSeconds, setCurrentSeconds] = useState(null)
    const [active, setActive] = useState(true)

    useEffect(() => {
        return () => {
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

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
        });
        props.navigation.dispatch(navigateAction);
    }

    //end of navbar
    return (
        // Running timer config info
        <SafeAreaView style={{ display: 'flex' }}>
            <View style={styles.SideBySide}>
                <View style={styles.runningTimerInfo}>
                    <Text>Work Interval</Text>
                    <Text>00:30</Text>
                </View>

                <View style={styles.runningTimerInfo}>
                    <Text>Sets</Text>
                    <Text>1/4</Text>
                </View>

                <View style={styles.runningTimerInfo}>
                    <Text>Rest Interval</Text>
                    <Text>00:15</Text>
                </View>
            </View>


            <View style={styles.runningTimerCount}>
                <Text style={{ fontSize: 64, color: '#004040', fontWeight: '800' }}>00:30</Text>
            </View>

            <View style={styles.runningTimerButtons}>
                {/*Play BUTTON*/}
                <TouchableOpacity
                    style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    }}
                    onPress={() => {
                        startClickTimer()
                    }}
                >
                    <FontAwesome
                        name="play-circle"
                        style={{ color: "#45B68D", fontSize: 100 }}
                    />
                </TouchableOpacity>

                {/*PAUSE BUTTON*/}
                <TouchableOpacity
                    style={{
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        marginLeft: 25,
                    }}
                    onPress={() => {
                        timer.reset();
                    }}
                >
                    <MaterialCommunityIcons
                        name="pause-circle"
                        style={{ color: 'black', fontSize: 65 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        marginRight: 25,
                        marginTop: -65,
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
        </SafeAreaView>
    )
}