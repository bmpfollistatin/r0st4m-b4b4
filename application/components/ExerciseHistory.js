import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
export default function ExerciseHistory(props) {
    const { sets, selectedIndex } = props
    
    let startTime = sets[0].startTime;
    let diff = Date.now() - startTime;
    let daysBetween = Math.floor((((diff / 1000) / 60) / 60) / 24) // today days
    let daysBetweenHours = Math.floor(((((diff / 1000) / 60) / 60) / 24) * (24)) // to get hours

    const DisplayHours = <Text>{daysBetweenHours} hours ago</Text>
    const DisplayDays = <Text>{daysBetween} days ago</Text>

    return (

        <View style={styles.WorkoutCard} >
            {/* <Text style={styles.dateStyle}>{daysBetween} days ago</Text>  */}
            <Text style={styles.dateStyle}>{daysBetweenHours < 24 ? DisplayHours : DisplayDays}</Text>

            {sets.map((item, index) => {
                const isSelected = selectedIndex === index || index === sets.length - 1 && selectedIndex > index;
                return(
                        <View key={index} style={{ paddingBottom: 14 }}>
                            <View style={styles.setLayout}>
                                <View style={styles.repSelector}>
                                    <Text style={isSelected ? styles.SetNumber : styles.unSetNumber}>{index + 1} </Text>
                                </View>
                            
                                <Text style={isSelected ? styles.MainText : styles.unMainText}>{item.weight}</Text>
                                <Text style={isSelected ? styles.textDetails : styles.untextDetails}>lbs</Text>
                                    <Text style={isSelected ? styles.MainText : styles.unMainText}> x </Text>
                                <Text style={isSelected ? styles.MainText : styles.unMainText}>{item.reps}</Text>
                            <Text style={isSelected ? styles.textDetails : styles.untextDetails}>Reps</Text>
                            {item.tempo &&
                            <Text>
                                <Text style={isSelected ? styles.textDetails : styles.untextDetails}> @</Text>
                                <Text style={isSelected ? styles.setTempo : styles.unsetTempo}>{item.tempo}</Text>
                            </Text>
                            }
                        </View>
                        
                            <View>

                            {item.notes &&
                                    <Text style={isSelected ? styles.setComment : styles.unsetComment}>{item.notes}</Text>
                            }

                            {item.injury &&
                                <Text style={isSelected ? styles.setInjury : styles.unsetInjury}>{item.injury}</Text>
                            }
                        </View>
                    </View>
                ) })}
        </View >
    )
}

const styles = StyleSheet.create({
    WorkoutCard: {
        borderRadius: 10,
        backgroundColor: '#F5F7F6',
        margin: 10,
        paddingTop: 13,
        paddingBottom: 10,
    },
    WorkoutCardContent: {
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    setLayout: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: 13,
        color: '#7B8794',
        paddingLeft: 22
    },

    repNumber: {
        fontSize: 14,
        color: '#B1B1B1',
    },
        textDetails: {
        color: '#7E7E7E',
        fontSize: 10,
        alignSelf: 'center',
    },
    MainText: {
        paddingLeft: 3,
        color: '#222222',
        fontSize: 13,
        // I have semiBold imported but when I type "SemiBold" it results in an error. 
        // they are all imported in app.js 
        fontWeight: '600',
    },
    setComment: {
        paddingLeft: 22,
        fontSize: 14,
        color: '#222222',
        paddingTop: 1.8,
        
    },
    setInjury: {
        color: '#CF1124',
        fontSize: 13,
        paddingLeft: 22,
        // paddingBottom: 10,
        // paddingVertical: 5,
    },
    SetNumber: {
        fontSize: 13,
        color: '#7B8794',
    }, 
    setTempo: {
        fontSize: 10,
        color: '#222222',
        paddingLeft: 0.8,
    },
    // THESE ARE UNSELECTED color styles. Just added unto all css class
    untextDetails: {
        color: '#B1B1B1',
        fontSize: 8,
    },
    unMainText: {
        color: '#B1B1B1',
        fontSize: 13,
        // I have semiBold imported but when I type "SemiBold" it results in an error. 
        // they are all imported in app.js 
        fontWeight: '600',
    },
    unsetComment: {
        paddingLeft: 20,
        fontSize: 12,
        color: '#B1B1B1',
        // paddingVertical: 0,
    },
    unsetInjury: {
        color: '#B1B1B1',
        fontSize: 13,
        paddingLeft: 22,
        // paddingBottom: 10,
    },
    unSetNumber: {
        fontSize: 13,
        color: '#B1B1B1',
    },
    unsetTempo: {
        fontSize: 10,
        color: '#B1B1B1',
        paddingLeft: 0.8,
    },
    dateStyle: {
        // justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginRight: 25,
        color: '#B1B1B1',
    },

})