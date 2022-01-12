import { Dimensions, StyleSheet } from "react-native";
const height = Dimensions.get('screen').height;

export const SmStyles = StyleSheet.create({
    item_menu: {
        borderBottomWidth: 0,
        borderBottomColor: '#f7f8f9',
    },

    container_menu: {
        flex: 1,
        backgroundColor: '#FFF'
    },

    topItemContainer: {
        flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#FFF',
        height: height * 0.30, marginTop: 30
    },

    footer_menu: {
        padding: 20,
        paddingBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },

    logout_text: { color: '#FFBDBD' }
})