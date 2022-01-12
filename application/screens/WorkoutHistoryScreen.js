import { CheckBox } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HistoryOfCardio from '../components/HistoryOfCardio';
import HistoryOfWorkout from '../components/HistoryOfWorkout';
import PageHeader from '../components/PageHeader';
import { filterWorkoutHistory } from '../redux/reducers/history/workoutHistoryReducer';
import { filterExerciseHistory } from '../redux/reducers/history/exerciseHistoryReducer';
import { filterCardioLogs } from '../redux/reducers/cardioLogReducers';
import { TouchableOpacity } from 'react-native-gesture-handler';

const getDateString = (date) => {
    const d = new Date(date);
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
}

export default function WorkoutHistory(props) {
    const dispatch = useDispatch();
    const _state = useSelector(state => state)
    const [list, setList] = useState([])
    const [showWorkouts, setShowWorkouts] = useState(true)
    const [showCardios, setShowCardios] = useState(true)
    const workoutPlan = useSelector(state => state.workoutPlan);
    const exerciseHistories = useSelector(state => state.exerciseHistory)
    // let plan = workoutPlan.byId[workoutInfo.workoutPlanId];
    const workoutHistory = filterWorkoutHistory(useSelector(state => state.workoutHistory), { type: 'all' });

    // const reversedList = [...workoutHistory].reverse();

    const cardioLogs = filterCardioLogs(useSelector(state => state.cardioLogs), { type: 'all' });
    const { navigation } = props
    console.log({ _state })


    const extractSetsDetails = (workout) => {
        const setDetails = []
        const workoutExercises = [];
        workout.exerciseHistoryIds.map(i => {
            workoutExercises.push(_state.exerciseHistory.byId[i])
        })
        workoutExercises.map(we => {
            const exerciseName = _state._exercises.value.find(i => i.id == we.exerciseId).name
            const exist = setDetails.findIndex(i => i.name == exerciseName)
            if (exist > -1) {
                typeof setDetails[exist]["sets"] == 'number' ? setDetails[exist]["sets"] + we.setHistoryIds.length : (setDetails[exist]["sets"] = we.setHistoryIds.length)
            } else {
                setDetails.push({
                    name: exerciseName,
                    sets: we.setHistoryIds.length
                })
            }
        })
        return setDetails
    }


    const extractList = () => {
        const wac = []; //workout and cardio
        workoutHistory.map(wh => {
            //get sets details
            const setDetails = extractSetsDetails(wh)
            const dataToAdd = { ...wh, ...{ setDetails } }
            const _date = getDateString(wh.endTime)
            const exist = wac.findIndex(i => i.date == _date);
            if (exist > -1) {
                wac[exist].workouts.push(dataToAdd)
            } else {
                wac.push({
                    date: _date,
                    workouts: [dataToAdd],
                    cardios: []
                })
            }
        })



        cardioLogs.map(ch => {
            const _date = getDateString(ch.endTime)
            const exi = wac.findIndex(i => i.date == _date);
            if (exi > -1) {
                wac[exi].cardios.push(ch)
            } else {
                wac.push({
                    date: _date,
                    cardios: [ch],
                    workouts: []
                })
            }
        })

        console.log(wac)
        setList(wac)
    }

    useEffect(() => {
        extractList()
    }, [])

    const cardDisplay = (cardinfo) => {
        if ((cardinfo.workouts.lenght == 0 || !showWorkouts) && (cardinfo.cardios.lenght == 0 || !showCardios)) {
            return 'none'
        } else {
            return 'flex'
        }
    }

    const renderWorkouts = (workout) => {
        const workoutName = _state._workouts.find(i => i.id == workout.workoutId).name
        return (
            <TouchableOpacity onPress={() => navigation.navigate('WorkoutHistoryDetail', { workoutInfo: workout })} key={Math.random() + ""} style={{ padding: 10 }}>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>{workoutName}</Text>
                {workout.setDetails.map(i => {
                    return (
                        <Text style={{ color: '#757575', fontSize: 12, marginBottom: 3 }} key={Math.random() + ""}>{i.name + " - " + i.sets + " sets"}</Text>
                    )
                })}
            </TouchableOpacity>

        )
    }

    const renderCardios = (cardio) => {
        const row = (value, label) => {
            return (
                <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 5, alignItems: 'flex-end' }}>
                    <Text>{value}</Text>
                    <Text style={{ color: '#757575', fontSize: 11 }}>{label}</Text>
                </View>
            )
        }
        return (
            <View style={{ padding: 10 }}>
                <Text style={{ color: '#757575', fontSize: 16, marginBottom: 10 }}>{"Cardio:"}</Text>
                {cardio.map(i => {
                    return (
                        <View key={Math.random()} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, marginBottom: 3 }}>{i.name + " - "}</Text>
                            {row(i.minutes, 'Min @')}
                            {row(i.speed, 'Mph')}
                            {row(i.level, 'incline')}
                        </View>
                    )
                })}
            </View>
        )
    }

    const seeDetails = (workoutId) => {
        console.log(item)
    }


    return (

        <View style={{ backgroundColor: 'hsl(50, 100%, 100%)', height: '100%' }}>
            <PageHeader
                Title='Workout History'
            >
            </PageHeader>

            <FlatList
                data={list}
                renderItem={({ item, index }) => {
                    return (
                        <View key={Math.random() + ""} style={{ margin: 20, marginTop: index == 0 ? 20 : 10, marginBottom: 10, backgroundColor: '#eceff1', display: cardDisplay(item) }}>
                            <Text style={{ width: '100%', textAlign: 'right', padding: 10, color: '#757575' }}>{item.date}</Text>
                            {showWorkouts && item.workouts.map(w => renderWorkouts(w))}
                            {showCardios && renderCardios(item.cardios)}
                        </View>
                    )
                }}
            />
            {/* <Tabs tabBarUnderlineStyle={{ backgroundColor: '#DE911D', height: 2 }}>
                    <Tab heading="Workout History"
                        tabStyle={[{ backgroundColor: '#f8f8f8' }]}
                        textStyle={{ color: '#7E7E7E' }}
                        activeTextStyle={{ color: '#DE911D' }}
                    >

                        <HistoryOfWorkout />
                    </Tab>

                    <Tab heading="Cardio History"
                        tabStyle={[{ backgroundColor: '#f8f8f8' }]}
                        textStyle={{ color: '#7E7E7E' }}
                        activeTextStyle={{ color: '#DE911D' }}
                    >
                        <HistoryOfCardio />
                    </Tab>

                </Tabs> */}



            <View style={{ position: 'absolute', bottom: 40, right: 0, display: 'flex', alignItems: 'flex-start', padding: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <CheckBox
                        style={{ marginRight: 15, borderRadius: 3 }}
                        size="md"
                        checked={showWorkouts}
                        color="#000"
                        onPress={() => setShowWorkouts(!showWorkouts)}
                    >
                    </CheckBox>

                    <Text>Workouts</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox
                        style={{ marginRight: 15, borderRadius: 3 }}
                        size="md"
                        checked={showCardios}
                        color="#000"
                        onPress={() => setShowCardios(!showCardios)}
                    >
                    </CheckBox>

                    <Text>Cardios</Text>
                </View>


            </View>
        </View>


    )
}


const styles = StyleSheet.create({
    cardBackground: {
        borderRadius: 10,
        backgroundColor: '#F5F7F6',
        margin: 10,
        paddingVertical: 15,
        paddingLeft: 22
    },
    workoutTitle: {
        fontSize: 18,
        color: '#222222',
        paddingBottom: 2,
    },
    listOfExercises: {
        fontSize: 12,
        color: '#7E7E7E',
        paddingVertical: 4,
    },
    cardioTitle: {
        fontSize: 18,
        color: '#9E9E9E',
        paddingTop: 8,
        paddingBottom: 2,
    },
    cardioMethod: {
        fontSize: 12,
        color: '#222222',
        // paddingTop: 4,
    },
    Beside: {
        display: "flex",
        flexDirection: 'row',
    },
})


// // counting sets
// const combineExerciseAndHistory = (state) => {
//     // get list of exerciseHistory pertaining to current workout in progress.
//     const exerciseHistory = filterExerciseHistory(state.exerciseHistory, { type: 'all' });

//     // add count of completed sets, cant rely on just counting setHistoryIds list since they might be empty sets
//     let count = 0;
//     const { exerciseProgress } = state;
//     exerciseHistory.forEach(exercise => {
//         let eObj = exercise.id === exerciseProgress.id ? exerciseProgress : exercise;
//         eObj.setHistoryIds && eObj.setHistoryIds.forEach(id => {
//             let set = state.setHistory.byId[id];
//             if (set && !!set.endTime) {
//                 count++;
//             }
//         })
//         exercise.completedSets = count;
//         count = 0;
//     })

//     const exerciseHistoriesObj = {};
//     exerciseHistory.map(item => { exerciseHistoriesObj[item.id] = { ...state.exercise.byId[item.exerciseId], ...item } });
//     return exerciseHistoriesObj;
// }