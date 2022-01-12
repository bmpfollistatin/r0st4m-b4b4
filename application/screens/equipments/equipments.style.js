import { StyleSheet } from "react-native";

export const EqStyle = StyleSheet.create({
    headerList: { height: 50 },
    headerTochable: {
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        borderWidth: 0
    },
    eqCardContainer: {
        width: '50%',
        padding: 5
    },
    eqCard: {
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: "#eceff1",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden'
    },
    eqCardName: {
        flex: 1,
        margin: 5
    },
    eqImageContainer: {
        height: 60,
        width: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cfd8dc'
    },
    eqImage: {
        height: 50,
        width: 50
    },
    categoryTitle: {
        fontWeight: '400',
        fontSize: 18,
        paddingBottom: 10,
        paddingTop: 10
    },
    dc: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 15
    },
    d: {
        width: '80%',
        height: 1,
        backgroundColor: 'grey'
    }

})