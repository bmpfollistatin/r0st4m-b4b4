import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function TimerCountdown(props) {
    const { minutes, seconds } = props;
    const Interval = () => <Text style={[styles.bigNumbers, props.style]}>{minutes}:{seconds} </Text>

    return (
        <View style={styles.container}>
            <Interval />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 50
    },
    bigNumbers: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#00492F',
    },
})
