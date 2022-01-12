import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function TimerHeader(props) {
    const { workMinutes, workSeconds, restMinutes, restSeconds, currentSet, numberOfSets } = props;
    const Title = ({ text }) => <Text style={styles.title, props.style}>{text}</Text>
    const Interval = ({ min, sec }) => <Text style={styles.bigNumbers}>{min} : {sec}</Text>


    return (
        <View style={styles.container}>
            <View style={styles.contentBox}>
                <Title text='Work Interval' />
                <Interval min={workMinutes} sec={workSeconds} />
            </View>

            <View style={styles.contentBox}>
                <Title text='Sets' />
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={styles.currentSet}>{currentSet}</Text><Text style={styles.sets}> / {numberOfSets}</Text>
                </View>
            </View>

            <View style={styles.contentBox}>
                <Title text='Rest Interval' />
                <Interval min={restMinutes} sec={restSeconds} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: 15,
    },
    bigNumbers: {
        // fontFamily: 'Roboto', //loaded in App.js into Expo.Font
        fontSize: 25,
        fontWeight: 'normal',
        color: 'gray'
    },
    currentSet: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#545454'
    },
    sets: {
        color: '#a8a8a8',
        fontSize: 16,
        paddingTop: 2,
    }
})
