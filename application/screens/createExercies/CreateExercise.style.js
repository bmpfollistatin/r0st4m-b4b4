import { StyleSheet } from "react-native";

export const CrexStyle = StyleSheet.create({
    background_general: {
        backgroundColor: 'hsl(50, 100%, 100%)'
    },
    inputLablel: {
        marginLeft: 15,
        fontSize: 20,
        color: 'hsl(98, 0%, 20%)',
    },
    redDot: {
        color: '#B50000',
    },
    inputItem: {
        backgroundColor: '#F5F7F6',
        maxWidth: '75%',
        marginBottom: 30,
        marginLeft: 15,
        marginRight: 15,
    },
    inputShadow: {
        borderTopColor: 'hsl(98, 0%, 88%)',
        borderTopWidth: 1,
        borderBottomColor: 'hsl(98, 0%, 95%)',
        borderBottomWidth: 2,
        borderRightColor: 'hsl(98, 0%, 93%)',
        borderRightWidth: 1,
        borderLeftColor: 'hsl(98, 0%, 93%)',
        borderLeftWidth: 1,
    },
    textAreaInput: {
        backgroundColor: '#FAFAFA',
        margin: 15,
        marginTop: 0,
        overflow: 'scroll',
    },
    contentTopText: {
        marginLeft: 15,
        paddingTop: 15
    },
    textArea: {
        lineHeight: (16 * 1.3)
    },
    footer: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        elevation: 0
    },
    footerView: {
        paddingRight: 25
    }
})