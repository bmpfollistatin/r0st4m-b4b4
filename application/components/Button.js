import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'native-base';
// import { PrimaryColor } from '../../assets/files/Styles';

/**
 * Skulp button with flexible css depending on type.
 * Types can be large-primary, large-secondary, small-primary, small-secondary, long-primary, long-secondary.
 * Default is large-primary.
 * @param {{type: string, text: string, onPress: ()}} props 
 */
export default function CustomButton(props) {
    const { type, text, onPress, Icon, IconName, buttonStyle, disabled } = props;

    let [cls, color] = ['large', 'primary']
    try {
        [cls, color] = type.split('-');
    } catch{ }
    const defaultButtonStyle = { ...buttonStyles.shared, backgroundColor: buttonColors[color] };
    const defaultTextStyle = { ...textStyles.large, color: textColors[color] };

    return (

        <Button
            disabled={disabled}
            style={[defaultButtonStyle, buttonStyles[cls], buttonStyle, disabled ? { backgroundColor: 'gray' } : {}]}
            onPress={onPress}
        >
            {/* <Icon name={IconName}/> */}
            <Text style={[defaultTextStyle, textStyles[cls], buttonStyle, disabled ? { color: '#e9e9e9' }: {}]}>{text}</Text>
        </Button >
    )
}

const buttonColors = {
    primary: '#00492F',
    secondary: '#E0F7EF',
    tertiary: 'transparent',
    yellow: '#F7C948',
}

const textColors = {
    primary: '#E7E9E7',
    secondary: '#00492F',
    tertiary: '#00492F',
    yellow: '#222',
}

const buttonStyles = StyleSheet.create({
    shared: {
        // shared with all buttons
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'center', /* center items vertically, in this case */
        alignItems: 'center',    /* center items horizontally, in this case */
        elevation: 0,
    },
    large: {
        height: 47,
        width: 115,
    },
    small: {
        height: 31,
        width: 87,
    },
    long: {
        width: 146,
        height: 32,
    },

})

const textStyles = StyleSheet.create({
    large: {
        fontWeight: 'bold',
        fontSize: 24
    },
    small: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    long: {
        fontWeight: '400',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
