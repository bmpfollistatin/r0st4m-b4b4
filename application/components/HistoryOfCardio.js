/* eslint-disable prettier/prettier */

//DONE!


import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
// import { Button } from 'native-base';
import { connect } from 'react-redux';
import { filterCardioLogs } from '../redux/reducers/cardioLogReducers';
// import moment from 'moment';

import { removeCardioLogEntry } from '../redux/actions/cardioLogActions';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Svg, { Path } from "react-native-svg"

function HistoryOfCardio(props) {

    const { cardioLogs } = props;
    const reversedList = [...cardioLogs].reverse();


    // function handleRemove(i) {
    //     // the props connects it to the store. Without it, you are just using the imported function
    //     // that's not connected
    //     props.removeCardioLogEntry({ id: i });
    // }

    return (

        <View>

            {reversedList.map((cardio, index) => { // changed open parenthesis to bracket
                //now we can do some more js up here
                const cardioObj = cardioLogs;

                let endTime = cardio.endTime;
                let diff = Date.now() - endTime;
                let daysBetween = Math.floor((((diff / 1000) / 60) / 60) / 24)
                let daysBetweenHours = Math.floor(((((diff / 1000) / 60) / 60) / 24) * (24)) // to get hours
                // let today = moment(new Date()).format('hh:mm');
                // let convertEndTime = moment(endTime).format('hh:mm'); // this give current date in month/day/year and correct local time
                const DisplayHours = <Text>{daysBetweenHours} hours ago</Text>
                const DisplayDays = <Text>{daysBetween} days ago</Text>


                function handleRemove(i) {
                    // the props connects it to the store. Without it, you are just using the imported function
                    // that's not connected
                    props.removeCardioLogEntry({ id: i });
                }

                //Alert fnction to ask to delete workout
                const createTwoButtonAlert = () =>
                    Alert.alert(
                        "Delete Cardio?",
                        "You can NOT undo this!",
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { text: "Delete", onPress: () => handleRemove(cardio.id) }
                        ],
                        { cancelable: false }
                    );

                return (
                    <>

                        <View  key={Math.random()+""} style={styles.cardBackground}>

                            <View>

                            <Text>
                                {/* <Text style={styles.indexNumber}>{index + 1}. </Text> */}
                                    <Text style={styles.workoutTitle}>{cardio.name} - </Text>

                                <Text>
                                        <Text style={styles.cardioInfo}>{cardio.minutes}</Text>
                                    <Text style={styles.cardioTitle}>Min @ </Text>

                                </Text>

                                <Text>
                                        <Text style={styles.cardioInfo}>{cardio.speed}</Text>
                                    <Text style={styles.cardioTitle}>mph &</Text>

                                </Text>

                                <Text>
                                        <Text style={styles.cardioInfo}> {cardio.level}</Text>
                                    <Text style={styles.cardioTitle}>incline</Text>
                                </Text>
                                </Text>
                            </View>

                            {/* <View style={styles.dateContainer}>

                                <Text style={styles.dateStyle}>{daysBetweenHours < 24 ? DisplayHours : DisplayDays}</Text>

                            </View> */}


                            {/* <Button onPress={() => handleRemove(item.id)}>
                                <Text onPress={() => handleRemove(item.id)}>Remove</Text>
                            </Button> */}


                             <View style={styles.dateContainer}>


                                <Text style={styles.dateStyle}>{daysBetweenHours < 24 ? DisplayHours : DisplayDays}</Text>


                                <Menu onSelect={value => alert(`Selected number: ${value}`)} style={{ alignSelf: 'flex-start' }}>
                                    <MenuTrigger>
                                        <Svg viewBox="0 0 64 512"
                                            height={22}
                                            width={22}
                                            fill='#222'
                                        >
                                            <Path d="M32 224c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM0 136c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32zm0 240c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32z" />
                                        </Svg>
                                    </MenuTrigger>
                                    <MenuOptions>
                                        <MenuOption value={2}>
                                            <Text style={{ color: 'red' }} onPress={createTwoButtonAlert}>Delete</Text>
                                        </MenuOption>
                                    </MenuOptions>
                                </Menu>

                            </View>

                        </View>
                    </>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    cardBackground: {
        borderRadius: 10,
        backgroundColor: '#F5F7F6',
        margin: 10,
        paddingVertical: 15,
        paddingLeft: 22,
        display: 'flex',
        flexDirection: 'row'
    },
    cardioTitle: {
        fontSize: 13,
        color: '#7E7E7E',

    },
    cardioInfo: {
        fontSize: 16,
        color: '#222222',
    },
    workoutTitle: {
        fontSize: 18,
        color: '#222222',
        paddingBottom: 2,
    },
    listOfExercises: {
        fontSize: 12,
        color: '#7E7E7E',
        paddingVertical: 4,
    },
    cardioMethod: {
        fontSize: 12,
        color: '#222222',
    },
    Beside: {
        display: "flex",
        flexDirection: 'row',
    },
    indexNumber: {
        fontSize: 13,
        color: '#7B8794',
    },
    dateContainer: {
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
        // marginRight: 22,
        flexDirection: 'row',

    },
    dateStyle: {
        alignSelf: 'center',
        color: '#B1B1B1',
    },
})

const mapStateToProps = (state) => ({

    cardioLogs: filterCardioLogs(state.cardioLogs, { type: 'all' }),


});

const mapDispatchToProps = (dispatch) => ({
    // Asap --- delete Cardio from history
    removeCardioLogEntry: (id) => dispatch(removeCardioLogEntry(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryOfCardio);
