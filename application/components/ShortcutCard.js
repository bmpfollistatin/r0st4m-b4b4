import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Card } from 'native-base';
import propTypes from 'prop-types';

var globalStyles = require('../../assets/files/Styles');

export default function ShortcutCard(props) {
    const { iconName, onPress, text } = props;
    return (
        <TouchableOpacity onPress={onPress}>
        <Card style={styles.ShortcutCard}>
            <View style={styles.ShortcutCardContent}>
                {iconName ?
                    // This was our default...
                    // <MaterialCommunityIcons name={iconName} size={25} color="#7B8794" style={{ width: 30 }} /> :

                    // this is new and trying to make it look better
                    <MaterialCommunityIcons name={iconName} size={20} color="#7B8794" style={{ paddingRight:5 }} /> :
                    props.children // allows us to substitute a different kind of icon, such as <MaterialIcons name="timer"...
                }
                {/* old code but they have to click the word for it to go to link */}
                {/* <Text style={globalStyles.HOneTitles} onPress={onPress}>{text}</Text> */}
                <Text style={globalStyles.HOneTitles}>{text}</Text>
            </View>
            </Card>
        </TouchableOpacity>
    )
}

ShortcutCard.propTypes = {
    iconName: propTypes.string,
    onPress: propTypes.func,
    text: propTypes.string
}

const styles = StyleSheet.create({
    ShortcutCard: {
        height: 49,
        width: 275,
        borderRadius: 10,
        backgroundColor: '#F5F7F6',
        marginTop: 12,
        marginLeft: 18,
    },
    ShortcutCardContent: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        paddingLeft: 20,
        paddingTop: 2,
    },
})
