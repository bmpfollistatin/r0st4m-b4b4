import { StyleSheet, Dimensions } from "react-native";
const h = Dimensions.get('screen').height
export const AppStyle = StyleSheet.create({
    mainContainer: { height: '100%', width: '100%' },
    timerContainer: {
        height: 60, width: 120, borderTopLeftRadius: 25, borderBottomLeftRadius: 25, backgroundColor: '#eceff1',
        position: 'absolute', right: 0, bottom: h * .2, display: 'flex', flexDirection: 'row'
    },
    dotHolder: {
        display: 'flex', flexDirection: 'row', height: '100%', paddingLeft: 10, paddingRight: 10
    },
    dotCol: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center'
    },
    dot: {
        height: 7, width: 7, backgroundColor: '#b0bec5', borderRadius: 20, margin: 1
    },
    timerText: {
        fontWeight: 'bold', fontSize: 24, color: '#d50000'
    },
    timerTextContainer: { height: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' },
    timerSec: { color: '#b0bec5', fontWeight: '600', fontSize: 14 },
})