import React from 'react';
import {StyleSheet, View} from 'react-native';


export default function CardioCard(props) {
    const customStyle = props.style

    return(

        <View style={styles.CardioCard}>
            <View style={[styles.cardContent, customStyle]}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    CardioCard: {
        height:166,
        width:117,
        borderRadius: 10,
        borderColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft:15,
        backgroundColor: '#E4E7EB'
    },
    cardContent: {
        borderColor: 'black',
        height:166,
        width: 117,
        borderRadius: 10,
        // borderColor: 'black',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#2e2694',
    },
})
