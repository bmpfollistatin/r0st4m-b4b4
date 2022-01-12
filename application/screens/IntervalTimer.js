//DONE!


import { FontAwesome } from "@expo/vector-icons";
import { Timer } from 'interval-timer';
import { Container, Content, Text } from "native-base";
import React, { useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Svg, { Path } from "react-native-svg";
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../components/PageHeader';
import TimerCountdown from '../components/TimerCountdown';
import TimerHeader from '../components/TimerHeader';
import TimerInput from '../components/TimerInput';
import { saveActive, saveCurrentSet, saveMinutesInput, saveNumberOfSets, savePaused, saveRestMinutesInput, saveRestSecondsInput, saveSecondsInput, saveTimer, saveUpdated, saveView } from '../redux/actions/intervalTimerActions';
import { TIMER } from '../redux/types';
var styles = require('../../assets/files/Styles');

export default function TimerOnFunction(props) {
    const dispatch = useDispatch()
    const intervalTimer = useSelector(state => state.intervalTimer)
    const { timer, active, numberOfSets, currentSet, minutesInput, secondsInput, updated, restMinutesInput, restSecondsInput, view, paused } = intervalTimer;
    const activeRef = useRef(active);
    const currentSetRef = useRef(currentSet);
    const timerRef = useRef(timer);

    const Spacer = <Text style={{ margin: 20 }}></Text>
    console.log(intervalTimer)
    // Ref functions
    const setTimer = (t) => {
        timerRef.current = t;
        dispatch(saveTimer(t));
    }

    const setActive = (val) => {
        activeRef.current = val;
        dispatch(saveActive(val))
    }

    const setCurrentSet = (val) => {
        currentSetRef.current = val;
        dispatch(saveCurrentSet(val));
    }

    // handlerLongClick = () => {
    //     //handler for Long Click
    //     resetTimer();
    // };

    // Timer functions
    const resetTimer = () => {
        try {
            setCurrentSet(1);
            setActive(true);
            dispatch(saveView(TIMER.INPUTS_VIEW));
            dispatch(saveUpdated(true));

            if (timer) {
                timer.stop();
            }
        } catch (error) {
            console.log('reset timer error', error)
        };
    }


    const startClickTimer = () => {
        console.log('start timer')
        // must have at least valid secondsInput and restSecondsInput
        if (isNaN(parseInt(secondsInput)) || isNaN(parseInt(restSecondsInput)) || isNaN(numberOfSets)) {
            return;
        }
        console.log('-----0')
        // stop the old timer if it exists
        try {
            if (timer) {
                timer.stop();
            }
        } catch (error) {
            // console.log('<> <> error', error)
        }

        console.log('-----1')

        const optionsActive = {
            startTime: parseInt(minutesInput || '0') * 60 * 1000 + parseInt(secondsInput || '1') * 1000, //how long the timer will be set to
            updateFrequency: 100,
            selfAdjust: true,
            countdown: true,
        };

        const optionsRest = {
            startTime: parseInt(restMinutesInput || '0') * 60 * 1000 + parseInt(restSecondsInput || '1') * 1000,
            updateFrequency: 100,
            selfAdjust: true,
            countdown: true,
        };

        console.log('-----2')
        const t = new Timer(optionsActive);
        console.log('-----3' , t)
        resetTimer();
        console.log('-----4')
        t.on('update', () => {
            console.log('-----5')
            // setTimer(t); //TODO: cause of error
        });
        console.log('-----6')

        t.on('end', () => {
            console.log('-----7')
            if (currentSetRef.current < parseInt(numberOfSets)) {
                let options = optionsRest;
                if (!activeRef.current) {
                    setCurrentSet(currentSetRef.current + 1);
                    options = optionsActive;
                }
                t.reset(options);
                setActive(!activeRef.current);
                t.start();
            } else {
                // alert that timer is complete
            }
        });

        console.log('-----8')
        t.start();
        console.log('-----9')

        setTimer(t);
        console.log('-----10')
        dispatch(saveView(TIMER.COUNTDOWN_VIEW));
        console.log('-----11')
        formatWorkInterval();
        console.log('-----12')
        formatRestInterval();
        console.log('-----13')
        dispatch(saveUpdated(false));
        console.log('-----14')
    };


    /**
     * Ensures sets between 0 - 99 and saves to redux
     * @param {number} sets
     */
    function updateSets(sets) {
        if (isNaN(sets) || sets === '') {
            dispatch(saveNumberOfSets(null));
            return;
        }
        sets = sets < 1 ? 1 : sets;
        sets = sets > 99 ? 99 : sets;

        dispatch(saveNumberOfSets(sets))
        resetTimer();
    }

    // TODO: make a component to be minute and second input to re-use for work and rest intervals
    /**
     * Checks for negative, or seconds that overflow to minutes
     * @param {number} seconds
     * @param {boolean} fromButton, default false, if true adjusts to twoDigitFormat
     */
    function updateWorkSeconds(seconds, fromButton = false) {

        if (isNaN(seconds) || seconds === '') {
            dispatch(saveSecondsInput(''));
            return;
        }

        const mInput = parseInt(minutesInput) || 0;
        let secondAdjust = Math.abs(seconds) % 60;
        let minAdjust = Math.floor(Math.abs(seconds) / 60);

        if (seconds < 0) {
            secondAdjust = mInput > 0 ? 60 - secondAdjust : 0;
            minAdjust = -1 * minAdjust - 1;
        }

        dispatch(saveSecondsInput(fromButton ? twoDigFormat(secondAdjust) : secondAdjust.toString()));
        resetTimer();
        if (minAdjust !== 0) {
            updateWorkMinutes(mInput + minAdjust, fromButton);
        }
    }

    /**
     * Set minutes in two digit format if this was called from button click
     * @param {number} minutes
     * @param {boolean} fromButton, default false, if true adjusts to twoDigitFormat
     */
    function updateWorkMinutes(minutes, fromButton = false) {
        if (isNaN(minutes) || minutes < 0) {
            dispatch(saveMinutesInput(''));
            return;
        }
        if (minutes > 99) {
            minutes = 99;
        }
        dispatch(saveMinutesInput(fromButton ? twoDigFormat(minutes) : minutes.toString()));
        resetTimer();
    }

    /**
     * Sets min and sec inputs to two digit format
     */
    function formatWorkInterval() {
        dispatch(saveMinutesInput(twoDigFormat(minutesInput)));
        dispatch(saveSecondsInput(twoDigFormat(secondsInput)));
    }

    /**
     * Checks for negative, or seconds that overflow to minutes
     * @param {number} seconds
     * @param {boolean} fromButton, default false, if true adjusts to twoDigitFormat
     */
    function updateRestSeconds(seconds, fromButton = false) {
        if (isNaN(seconds) || seconds === '') {
            dispatch(saveRestSecondsInput(''));
            return;
        }

        const mInput = parseInt(restMinutesInput) || 0;
        let secondAdjust = Math.abs(seconds) % 60;
        let minAdjust = Math.floor(Math.abs(seconds) / 60);

        if (seconds < 0) {
            secondAdjust = mInput > 0 ? 60 - secondAdjust : 0;
            minAdjust = -1 * minAdjust - 1;
        }

        dispatch(saveRestSecondsInput(fromButton ? twoDigFormat(secondAdjust) : secondAdjust.toString()));
        resetTimer();
        if (minAdjust !== 0) {
            updateRestMinutes(mInput + minAdjust, fromButton);
        }
    }

    /**
     * Set minutes in two digit format if this was called from button click
     * @param {number} minutes
     * @param {boolean} fromButton, default false, if true adjusts to twoDigitFormat
     */
    function updateRestMinutes(minutes, fromButton = false) {
        if (isNaN(minutes) || minutes < 0) {
            dispatch(saveRestMinutesInput(''));
            return;
        }
        if (minutes > 99) {
            minutes = 99;
        }
        dispatch(saveRestMinutesInput(fromButton ? twoDigFormat(minutes) : minutes.toString()));
        resetTimer();
    }

    /**
     * Sets min and sec inputs to two digit format
     */
    function formatRestInterval() {
        dispatch(saveRestMinutesInput(twoDigFormat(restMinutesInput)));
        dispatch(saveRestSecondsInput(twoDigFormat(restSecondsInput)));
    }

    /**
     * Takes numeric type and return two digit padded string
     * @param {number} num
     */
    function twoDigFormat(num) {
        if (num == null || num == undefined || isNaN(num)) {
            return '';
        }
        return ('00' + num).slice(-2);
    }


    let min = null;
    let sec = null;
    if (updated) {
        // Active wil be true. Set to active min and sec.
        min = minutesInput || '00';
        sec = secondsInput || '00';
    } else if (timer && timer.getTime) {
        min = twoDigFormat(timer.getTime.minutes);
        sec = twoDigFormat(timer.getTime.seconds);
    }

    return (

        <Container style={styles.background_general}>
            {/* <Container> */}

            <PageHeader
                SVG='rightSideSVG'
                Title='Interval Timer'
            >
            </PageHeader>

            {view === TIMER.COUNTDOWN_VIEW && (
                <View style={{ margin: 20, }}>
                    <TimerHeader
                        workMinutes={minutesInput}
                        workSeconds={secondsInput}
                        restMinutes={restMinutesInput}
                        restSeconds={restSecondsInput}
                        currentSet={currentSet}
                        numberOfSets={numberOfSets}
                    />
                </View>
            )}
            <Content contentContainerStyle={{ paddingTop: 40 }}>
                <View style={{ paddingHorizontal: 50, paddingTop: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {view === TIMER.INPUTS_VIEW && (
                        <View>
                            {/*SETS*/}
                            <TimerInput
                                title='Sets'
                                increase={() => updateSets(parseInt(numberOfSets || '0') + 1)}
                                decrease={() => updateSets(parseInt(numberOfSets || '0') - 1)}
                                updateFirst={(text) => { updateSets(parseInt(text)); }}
                                firstValue={(numberOfSets || '').toString()}
                                endEdit={() => { if (numberOfSets === null) { updateSets(1); } }}
                            />
                            {Spacer}
                            {/*WORK INTERVAL*/}
                            <TimerInput
                                title='Work Interval'
                                doubleInput={true}
                                increase={() => { updateWorkSeconds(parseInt(secondsInput || '0') + 5, true); }}
                                decrease={() => { updateWorkSeconds(parseInt(secondsInput || '0') - 5, true); }}
                                updateFirst={(text) => { updateWorkMinutes(parseInt(text)); }}
                                updateSecond={(text) => { updateWorkSeconds(parseInt(text)); }}
                                firstValue={minutesInput}
                                secondValue={secondsInput}
                                endEdit={formatWorkInterval}
                            />
                            {Spacer}
                            {/*REST INTERVAL*/}
                            <TimerInput
                                title='Rest Interval'
                                doubleInput={true}
                                increase={() => { updateRestSeconds(parseInt(restSecondsInput || '0') + 5, true); }}
                                decrease={() => { updateRestSeconds(parseInt(restSecondsInput || '0') - 5, true); }}
                                updateFirst={(text) => { updateRestMinutes(parseInt(text)); }}
                                updateSecond={(text) => { updateRestSeconds(parseInt(text)); }}
                                firstValue={restMinutesInput}
                                secondValue={restSecondsInput}
                                endEdit={formatRestInterval}
                            />
                        </View>
                    )}

                    {view === TIMER.COUNTDOWN_VIEW && (
                        <View>

                            <TimerCountdown style={{ color: active ? '#00492F' : 'red' }} minutes={min} seconds={sec} />
                        </View>
                    )}


                </View>

                {/* BUTTONS */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'flex-end', margin: 0, }}>


                    {/* reset total button */}
                    {view === TIMER.COUNTDOWN_VIEW && (
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                                flex: 1,
                            }}
                            onLongPress={resetTimer}
                            disabled={paused ? false : true}

                        >

                            <Svg
                                viewBox="0 0 512 512"
                                height={57}
                                width={57}
                                fill={paused ? '#BDECDC' : '#DEDEDE'}
                            // style={{ color: paused ? '#BDECDC' : '#DEDEDE' }}
                            >
                                {/* <Path d="M492 8h-10c-6.627 0-12 5.373-12 12v110.625C426.804 57.047 346.761 7.715 255.207 8.001 118.82 8.428 7.787 120.009 8 256.396 8.214 393.181 119.166 504 256 504c63.926 0 122.202-24.187 166.178-63.908 5.113-4.618 5.354-12.561.482-17.433l-7.069-7.069c-4.503-4.503-11.749-4.714-16.482-.454C361.218 449.238 311.065 470 256 470c-117.744 0-214-95.331-214-214 0-117.744 95.331-214 214-214 82.862 0 154.737 47.077 190.289 116H332c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h160c6.627 0 12-5.373 12-12V20c0-6.627-5.373-12-12-12z" /> */}
                                <Path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm296-80v160c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h160c8.8 0 16 7.2 16 16z" />
                            </Svg>
                            {/* <FontAwesome5
                                name="stop-circle"
                                style={{color: paused ? '#BDECDC' : '#DEDEDE', fontSize: 65 }}

                            /> */}
                            <Text style={styles.timerText}>Reset (Hold)</Text>

                        </TouchableOpacity>
                    )}


                    {/* Pause Button */}
                    {view === TIMER.COUNTDOWN_VIEW && !paused && (
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                                flex: 1,
                            }}
                            onPress={() => {
                                try {
                                    timer.pause();
                                    dispatch(savePaused(true));
                                } catch (error) { }
                            }}
                        >
                            <FontAwesome
                                name="pause-circle"
                                style={{ color: "#89D8BB", fontSize: 130 }}
                            />
                        </TouchableOpacity>
                    )}


                    {/*play button*/}
                    {(view === TIMER.INPUTS_VIEW || paused) && (
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                                flex: 1,
                            }}
                            onPress={() => {
                                console.log('--=--')
                                // if already created, continue on the same timer
                                // else create a new timer
                                if (timer !== null && !updated) {
                                    dispatch(savePaused(false));
                                    timer.start();
                                } else {
                                    dispatch(savePaused(false));
                                    startClickTimer();
                                }
                            }}
                        >
                            <FontAwesome
                                name="play-circle"
                                style={{ color: "#45B68D", fontSize: 130 }}
                            />
                        </TouchableOpacity>
                    )}

                    {/* Restart set button */}
                    {view === TIMER.COUNTDOWN_VIEW && (
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                                flex: 1,
                            }}
                            onPress={() => {
                                // console.log('<> <> Timer reset called');
                                timer.reset();
                                dispatch(savePaused(true));
                            }}
                            disabled={paused ? false : true}
                        >
                            {/* <MaterialCommunityIcons
                                name="loop"
                                style={{color: paused ? '#BDECDC' : '#DEDEDE', fontSize: 65 }}
                            /> */}

                            <Svg
                                viewBox="0 0 512 512"
                                height={50}
                                width={50}
                                fill={paused ? '#BDECDC' : '#DEDEDE'}
                            // style={{ color: paused ? '#BDECDC' : '#DEDEDE' }}
                            >
                                {/* <Path d="M492 8h-10c-6.627 0-12 5.373-12 12v110.625C426.804 57.047 346.761 7.715 255.207 8.001 118.82 8.428 7.787 120.009 8 256.396 8.214 393.181 119.166 504 256 504c63.926 0 122.202-24.187 166.178-63.908 5.113-4.618 5.354-12.561.482-17.433l-7.069-7.069c-4.503-4.503-11.749-4.714-16.482-.454C361.218 449.238 311.065 470 256 470c-117.744 0-214-95.331-214-214 0-117.744 95.331-214 214-214 82.862 0 154.737 47.077 190.289 116H332c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h160c6.627 0 12-5.373 12-12V20c0-6.627-5.373-12-12-12z" /> */}
                                <Path d="M500 8h-27.711c-6.739 0-12.157 5.548-11.997 12.286l2.347 98.568C418.075 51.834 341.788 7.73 255.207 8.001 118.82 8.428 7.787 120.009 8 256.396 8.214 393.181 119.165 504 256 504c63.926 0 122.202-24.187 166.178-63.908 5.113-4.618 5.354-12.561.482-17.433l-19.738-19.738c-4.498-4.498-11.753-4.785-16.501-.552C351.787 433.246 306.105 452 256 452c-108.322 0-196-87.662-196-196 0-108.322 87.662-196 196-196 79.545 0 147.941 47.282 178.675 115.302l-126.389-3.009c-6.737-.16-12.286 5.257-12.286 11.997V212c0 6.627 5.373 12 12 12h192c6.627 0 12-5.373 12-12V20c0-6.627-5.373-12-12-12z" />
                            </Svg>

                            {/* <FontAwesome
                                name="refresh"
                                style={{ color: paused ? '#BDECDC' : '#DEDEDE', fontSize: 65 }}
                            /> */}
                            <Text style={styles.timerText}>Restart Set</Text>
                        </TouchableOpacity>
                    )}


                </View>
            </Content>
        </Container>
    )
}
