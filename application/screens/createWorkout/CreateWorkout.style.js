import { StyleSheet, Dimensions } from "react-native";
const H = Dimensions.get('window').height;
const W = Dimensions.get('window').width;

export const CreWstyle = StyleSheet.create({
    iwlView: { backgroundColor: "#00000015", marginBottom: 25 , height: 30 , width: 130 },
    iwlText: { color: "#8D8D8D", fontSize: 8 , marginTop: 3,marginLeft: 4,height: 8},
    iwlSubView: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 9},
    iwlSubViewInput: { fontSize: 13, fontWeight: '600' , height: 18  },
    ctTextContainer: { marginLeft: 15, paddingTop: 15 },
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
    footer: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        elevation: 0
    },
    footerView: {
        paddingRight: 25
    },
    w100: { width: '100%' },
    modal: { justifyContent: 'center', alignSelf: 'center', paddingTop: H / 5, paddingHorizontal: 20, width: W  },
    Keyboardcontainer: {
        flex: 1
    },
    keyboardView: { width: '100%' },
    keyboardCard: { display: 'flex' , flexDirection: 'column' , backgroundColor: '#fbfcfc'},
    checkbox: { borderRadius: 3, height: 18, width: 18 },
    creSupersetText: { marginLeft: 15, fontSize: 10, fontWeight: '600' },
    btnContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' , height: 20 },
    cancelText: { fontSize: 12, color: '#00492F', fontWeight: 'bold' },
    okText: { fontSize: 12, color: '#F6F6F6', fontWeight: 'bold' },
    customFooter: {
        display: 'flex',
        flexDirection: 'row',
        width: W,
        justifyContent: 'center',
        paddingBottom: 35,
        paddingTop: 25,
      },
})