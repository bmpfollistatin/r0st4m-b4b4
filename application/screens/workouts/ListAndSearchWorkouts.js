import { Container } from "native-base";
import propTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import GenericListAndSearch from '../../components/GenericListAndSearch';
import PageHeader from '../../components/PageHeader';
import PlusFab from '../../components/PlusFab';
import { WorkStyle } from "./ListAndSearchWorkouts.style";
import { setWorkoutForm, clearWorkoutForm } from '../../redux/features/workouts/workoutForm.slice'
const tmpSvg = () => (
    <Svg
        viewBox="0 0 640 512"
        height={24}
        width={24}
        fill='#7b8794'
    >
        <Path d="M632 240h-24v-96c0-26.5-21.5-48-48-48h-32c-5.6 0-11 1.2-16 2.9V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48
                        48v160H256V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48 48v18.9c-5-1.8-10.4-2.9-16-2.9H80c-26.5 0-48 21.5-48 48v96H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h24v96c0 26.5 21.5 48 48 48h32c5.6 0 11-1.2 16-2.9V432c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V272h128v160c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48v-18.9c5 1.8 10.4 2.9 16 2.9h32c26.5 0 48-21.5 48-48v-96h24c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM112 384H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224c0 8.8-7.2 16-16 16zm112 48c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm256 0c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm96-64c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224z" />
    </Svg >
)


const extractExerciseInWorkouts = (state) => {

}

/**
 * List workouts in cards with search bar at top.
 * Filters cards based on search results.
 * Optionaly calls navivation goBack after selection is made.
 * Props may have a function to perform when the user makes a selection.
 * @param {object} props
 */
export default function ListAndSearchWorkouts(props) {
    const dispatch = useDispatch();
    const dataSource = useSelector(state => state._workouts.filter(i => !i.isDeleted));
    const exercises = useSelector(state => state._exercises.value)
    const exerciesDetails = useSelector(state => state._exerciseDetaile)
    const exercisesInWorkout = useSelector(state => state.exercise);
    // state
    const navigation = props.navigation;
    const params = props.route.params

    let view = params && params.view ? params.view : null;
    if (!view) {
        view = props.view;
    }
    // callback
    let setSelected = params && params.setSelected ? params.setSelected : null;
    if (!setSelected) {
        setSelected = props.setSelected;
    }
    // Use passed in setSelected, or default select action if nothing passed in

    const handleSelect = (item) => {
        if (!!setSelected) {
            setSelected(item);
        } else {
            dispatch(setWorkoutForm(item))
            navigation.navigate('CreateWorkout');
        }

    };

    const ExerciceItem = (item) => {
        const execiseDetails = exerciesDetails.filter(ed => ed.workoutId == item.id)
        return execiseDetails.map((item, index) => {
            const exId = item.exerciseId;
            const exName = exercises.find(e => e.id == exId).name || ""
            return (
                <View key={Math.random()} style={WorkStyle.exercisView}>
                    <Text style={WorkStyle.listOfExercises}>{exName}</Text>
                </View>
            )
        })

    }

    return (
        <Container style={WorkStyle.container}>
            <PageHeader
                NavigationProp="IntervalTimer"
                RightSideProp='Interval Timer'
                SVG={tmpSvg}
                Title='Workouts'
            >
            </PageHeader>

            <GenericListAndSearch dataSource={dataSource} setSelected={handleSelect}>
                {workout => ExerciceItem(workout)}
            </GenericListAndSearch>

            {/* plus button */}
            {view !== 'simple' && !!navigation && (
                <PlusFab
                    onPress={() => {
                        //call dispatch on some action to clear create workout 
                        dispatch(clearWorkoutForm());
                        navigation.navigate('CreateWorkout',
                            {
                                // pass along the setSelected that was passed in 
                                extraActions: setSelected,
                            });
                    }}
                />
            )}
        </Container>
    )
}