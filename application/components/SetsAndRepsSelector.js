import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThreeDotMenu } from '../components/ThreeDotMenu';



export default function SetsAndRepsSelector(props) {
    const { sets, selectedSet, setSelectedSet, menuActions, onMenuAction, addSet } = props;

    return (
        <>
            <View style={styles.WorkoutCard} >
                {/* List of Sets */}
                {sets && sets.map((item, index) => {
                    let style = [styles.WorkoutCardContent];
                    if (item === null || item === undefined) {
                        return (<></>);
                    }
                    if (selectedSet === item.id) {
                        style.push(styles.Shadow);
                    }
                    return (
                        <TouchableOpacity key={Math.random()+""} style={style} onPress={() => setSelectedSet(item)}>
                            <View style={styles.SetNumbers}>
                                {/* {console.log(item)} */}
                                <View style={styles.setLayout}>
                                    <View style={styles.repSelector}>
                                        <Text style={[styles.repNumber, selectedSet === item.id ? { color: '#7B8794' } : {}]}>{index + 1} </Text>
                                    </View>

                                    <Text>{item.endTime !== null ?
                                        <>
                                            <Text style={selectedSet === item.id ? styles.MainText : styles.unMainText}> {item.weight}</Text>
                                            <Text style={selectedSet === item.id ? styles.textDetails : styles.untextDetails}>lbs</Text>
                                            <Text style={selectedSet === item.id ? styles.MainText : styles.unMainText}> x </Text>
                                            <Text style={selectedSet === item.id ? styles.MainText : styles.unMainText}>{item.reps}</Text>
                                            <Text style={selectedSet === item.id ? styles.textDetails : styles.untextDetails}>Reps</Text>

                                            {item.tempo &&
                                                <Text>
                                                    <Text style={selectedSet === item.id ? styles.textDetails : styles.untextDetails}> @</Text>
                                                    <Text style={selectedSet === item.id ? styles.setTempo : styles.unsetTempo}>{item.tempo}</Text>
                                                </Text>
                                            }

                                            {item.notes &&
                                                <Text style={selectedSet == item.id ? styles.setComment : styles.unsetComment}>
                                                    {"\n"}
                                                    <Text style={{ maxWidth: 40 }}>{item.notes}</Text>
                                                </Text>
                                            }


                                            {item.injury &&
                                                <Text style={selectedSet == item.id ? styles.setInjury : styles.unsetComment}>
                                                    {"\n"}
                                                    {/* <Text style={styles.setInjury}>{item.injury}</Text>  */}
                                                    <Text >{item.injury}</Text>
                                                </Text>
                                            }

                                        </>


                                        : <Text style={selectedSet === item.id ? { color: '#222222' } : { color: '#B1B1B1' }}> {'Set' + ' ' + (index + 1)}</Text>}
                                    </Text>
                                </View>


                            </View>

                            <ThreeDotMenu onPress={() => setSelectedSet(item)} menuActions={menuActions} onMenuAction={onMenuAction} />
                        </TouchableOpacity>
                    )
                })
                }

                {/* +1 row */}
                <TouchableOpacity style={[styles.WorkoutCardContent]} onPress={addSet}>
                    <View style={styles.SetNumbers}>
                        <View style={styles.repSelector}>
                            <Text style={styles.addSet}>+</Text>
                        </View>
                        <Text style={{ color: '#52606D' }}> Add Set</Text>
                    </View>
                </TouchableOpacity>
            </View >
        </>

    )
}


const styles = StyleSheet.create({
    WorkoutCard: {
        borderRadius: 10,
        backgroundColor: '#F5F7F6',
        margin: 10,
        paddingTop: 13,
        paddingBottom: 10,

        elevation: 5, // android
        shadowColor: '#000', // ios
        shadowOffset: { width: 0, height: 2 }, // ios
        shadowOpacity: 0.8, // ios
        shadowRadius: 2, // ios
    },
    WorkoutCardContent: {
        marginTop: 5,
        marginLeft: 20,
        marginRight: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Header: {
        marginLeft: 18,
        // fontSize: 13,
        marginBottom: 5,
    },
    InputText: {
        width: 140,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        height: 1,
        paddingLeft: 6,
        alignItems: 'flex-end',
        // selectionColor: '#00492F',
    },
    SetNumbers: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Shadow: {
        marginLeft: 14,
        marginRight: 10,
        padding: 5,
        paddingLeft: 10,
        borderRadius: 5,
        color: 'green',

        //  - Pure border way -
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#ddd',
        borderBottomColor: '#9C9C9C',
        borderEndColor: '#9C9C9C',
        borderBottomWidth: 2,
        borderRightWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#FAFAFA',

        // none border way -
        // elevation: 1,

    },

    // these are the green circles around the numbers
    repSelector: {
        // width: 21,
        // height: 21,
        // borderRadius: 20/2,
        // backgroundColor: 'purple',
        // borderColor: '#00492F',
        // borderWidth: 2,
        // alignItems: 'center',
        paddingLeft: 3,
    },
    repNumber: {
        fontSize: 14,
        color: '#B1B1B1',
    },
    addSet: {
        fontSize: 13,
        fontWeight: 'bold',
        paddingRight: 3,
        color: '#7B8794',

    },
    // - iOS -
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,

    // - Android -
    //     borderTopRightRadius: 9, // this is really odd. If all borders are 10, the border on Android gets HUGE. So need to offset one.
    //     elevation: 3, //android

    setLayout: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        fontSize: 13,
        color: '#7B8794',
        // paddingLeft: 22
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
    tempoTextDetail: {
        color: '#7E7E7E',
        fontSize: 10,
        alignSelf: 'center',
        paddingLeft: 0.8,
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
        paddingVertical: 1.8,
        paddingHorizontal: 3,
    },
    setInjury: {
        color: '#CF1124',
        fontSize: 13,
        paddingLeft: 22,
        paddingBottom: 10,
    },
    SetNumber: {
        fontSize: 13,
        color: '#7B8794',
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
    },
    unsetInjury: {
        color: '#B1B1B1',
        fontSize: 12,
        paddingLeft: 22,
        paddingBottom: 10,
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
    setTempo: {
        fontSize: 10,
        color: '#222222',
        paddingLeft: 0.8,
    },
})

const mapStateToProps = (state) => ({
    sets: state.setsAndReps.sets,
    setProgress: state.setProgress,
    exerciseData: state.exercise.byId[state.exerciseProgress.exerciseId],
    exerciseProgress: state.exerciseProgress,
    // currentSetList: (state.exerciseProgress.setHistoryIds || []).map(id => state.setHistory.byId[id]),
    setHistoryList: buildSetHistories(state),
});
