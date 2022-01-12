import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import propTypes from 'prop-types';


import { Card, CardItem } from 'native-base';


export default function ExerciseCard(props) {
    const { iconSource, iconType, customStyle, SVG } = props;
    return (

        <Card style={styles.Card}>
            <CardItem style={[styles.ExerciseCard, customStyle]}>
                {iconSource && iconType === 'image' && (
                    <Image style={{ marginRight: 15 , height: 60,width: 70 }} source={iconSource} />
                )}
                {SVG && iconType === 'svg' && (
                    <View style={{ marginRight: 15 }}>
                        <SVG />
                    </View>
                )}
                <View style={styles.TopToBottom}>
                    <ScrollView>
                        {props.children}
                    </ScrollView>
                </View>
            </CardItem>
        </Card >


        // <View style={[styles.ExerciseCard, customStyle]}>
        //     {/* <View style={styles.ExerciseCardContent}> */}
        //     <View style={styles.SideBySide}>
        //         <Image style={{ marginRight: 15 }} source={iconSource} />
        //         <View style={styles.TopToBottom}>
        //             {props.children}
        //         </View>
        //     </View>
        //     {/* </View> */}
        // </View>
    )
}

// ExerciseCard.propTypes = {
//     iconSource: propTypes.object,
// }

const styles = StyleSheet.create({
    Card: {
        borderRadius: 8,
    },
    ExerciseCard: {
        minHeight: 66,
        // maxHeight: 100,
        // height: 138,
        // height: 100,
        width: 330,
        borderRadius: 10,
        backgroundColor: '#F5F7F6',
        // marginTop: 15,
        overflow: 'hidden',
        padding: 5,
        paddingLeft: 20,
        alignItems: 'flex-start',
    },
    // ExerciseCardContent:{
    //     margin: 5,
    //     marginLeft: 20,
    // },
    SideBySide: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    TopToBottom: {
        // display: "flex",
        // flexDirection: 'column',
        width: 240,
    }
})
