import React from 'react';
import { Text } from "native-base";
import { View, TextInput } from 'react-native';

var styles = require('../../assets/files/Styles');

export default function TimerInput(props) {
    const { title, increase, decrease, updateFirst, updateSecond, firstValue, secondValue, endEdit } = props;
    const { doubleInput } = props;

    return (
        <View>
            <Text style={styles.timerTitle}>{title}</Text>
            <View style={styles.SideBySide}>
                <Text style={styles.timerIconTextSize} onPress={decrease}> - </Text>
                <View style={[styles.SideBySide, { width: '40%' }]}>

                    <TextInput
                        placeholder='00'
                        keyboardType={'numeric'}
                        maxLength={2}
                        style={styles.timerUserInput}
                        value={firstValue}
                        onChangeText={updateFirst}
                        onEndEditing={endEdit}
                        selectionColor='#00492F'
                    />
                    {doubleInput && (
                        <Text style={styles.timerUserInput}> : </Text>
                    )}
                    {doubleInput && (
                        <TextInput
                            placeholder=' 00'
                            keyboardType={'numeric'}
                            maxLength={2}
                            style={styles.timerUserInput}
                            value={secondValue}
                            onChangeText={updateSecond}
                            onEndEditing={endEdit}
                            selectionColor='#00492F'
                        />
                    )}
                </View>
                <Text style={styles.timerIconTextSize} onPress={increase}> + </Text>
            </View>
        </View>
    )
}
