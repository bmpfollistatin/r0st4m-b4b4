import { StyleSheet , Platform , Dimensions } from "react-native";
const width = Dimensions.get('screen').width

export const LogStyle = StyleSheet.create({
    headerStyle: {
        backgroundColor: 'white',
        shadowOpacity: 0,
        elevation: 0,
        height: Platform.OS === "ios" ? 50 : 50,
        borderBottomColor: '#d0cece',
        borderBottomWidth: 1 / 4,
        paddingBottom: 15,
    },
    headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        paddingLeft: Platform.OS === 'ios' ? 0 : width * .1,
        fontSize: 18,
        color: '#1b1b1b',
        fontFamily: 'ssb_Regular'
    },
    leftIcon: { marginLeft: 10 }
})