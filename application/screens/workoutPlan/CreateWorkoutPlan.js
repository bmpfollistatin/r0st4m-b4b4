//DONE!!

import { Button, Container, Content, Footer, Form, Input, Text, Textarea, Toast } from "native-base";
import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/Button';
import IndexedList from '../../components/IndexedList';
import LoadModal from '../../components/LoadModal';
import PageHeader from '../../components/PageHeader';
import { addWorkout, clearWorkouts, insertWorkout, load, removeWorkout, setId, setName, setNotes, updateWorkout } from '../../redux/actions/creating/creatingWorkoutPlanActions';
import { start as startWorkoutPlanProgress } from '../../redux/actions/progress/workoutPlanProgressActions';
import { addWorkoutPlan, updateWorkoutPlan } from '../../redux/actions/workoutPlanActions';
import { filterWorkoutPlans } from '../../redux/reducers/workoutPlanReducer';
import reduxUtils from '../../redux/utils';
import { WpStyle } from "./CreateWorkoutPlan.style";
import ListAndSearchWorkoutPlans from './ListAndSearchWorkoutPlans';

const tmpSvg = () => (<Svg
    viewBox="0 0 640 512"
    height={24}
    width={24}
    fill='#7b8794'
>
    <Path d="M632 240h-24v-96c0-26.5-21.5-48-48-48h-32c-5.6 0-11 1.2-16 2.9V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48
                        48v160H256V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48 48v18.9c-5-1.8-10.4-2.9-16-2.9H80c-26.5 0-48 21.5-48 48v96H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h24v96c0 26.5 21.5 48 48 48h32c5.6 0 11-1.2 16-2.9V432c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V272h128v160c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48v-18.9c5 1.8 10.4 2.9 16 2.9h32c26.5 0 48-21.5 48-48v-96h24c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM112 384H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224c0 8.8-7.2 16-16 16zm112 48c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm256 0c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm96-64c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224z" />
</Svg >)

export default function CreateWorkoutPlan(props) {
    const dispatch = useDispatch()
    const utilState = useSelector(state => state)
    const creatingWorkoutPlan = utilState.creatingWorkoutPlan
    const orderedWorkoutList = utilState._workouts
    const name = creatingWorkoutPlan.name;
    const notes = creatingWorkoutPlan.notes;
    const id = creatingWorkoutPlan.id;
    const allWps = utilState.workoutPlan;
    const workoutPlans = filterWorkoutPlans(utilState.workoutPlan)
    const preloaded = id && !!allWps.byId[id]

    // state
    const { navigation } = props;
    const params = props.route.params

    // callback
    const extraActions = params && params.extraActions ? params.extraActions : null;


    function handleAdd() {
        dispatch(addWorkout({ id: null }));
    }

    function handleInsert(item, index) {
        dispatch(insertWorkout({ id: item.id, index: index }))
    }


    function handleUpdate(item, index) {
        // check for duplicates
        if (orderedWorkoutList.some(obj => obj.id === item.id)) {
            Toast.show({
                text: 'Workout already selected.',
                buttonText: 'Okay',
                duration: 4000,
                type: 'danger',
            })
            return false;
        }

        dispatch(updateWorkout({ id: item.id, index }));
        return true;
    }

    function handleRemove(i) {
        dispatch(removeWorkout({ index: i }));
    }

    function handleLoad(item) {
        dispatch(load(item));
    }

    function clear() {
        dispatch(setId(null));
        dispatch(setName(''));
        dispatch(setNotes(''));
        dispatch(clearWorkouts());
    }

    function validate(name, idList, state) {
        if (name === null || name === '') {
            return 'Name is required.';
        }

        // Make sure the name is unique //TODO if mode === update, don't check for unique name
        const locale = 'en';
        // filter out this exercise in case it was preloaded, then check against pre existing names.
        const matchingNameList = state.filter(plan => plan.id !== id && plan.name.toLocaleUpperCase(locale) === name.toLocaleUpperCase(locale));
        if (matchingNameList.length > 0) {
            return 'This name already exists!';
        }

        if (!idList || idList.filter(id => !!id).length < 1) {
            return 'List cannot be empty.';
        }

        if ((new Set(idList)).size !== idList.length) {
            return 'Cannot have duplicate workouts.';
        }
    }

    // workout plan actions
    async function addUpdateWorkoutPlan() {
        const nameTrim = name.trim();
        const workoutIdList = orderedWorkoutList.filter(item => item.id !== null && item.id !== undefined).map(item => item.id);

        const errorMsg = validate(nameTrim, workoutIdList, workoutPlans);
        if (errorMsg) {
            Toast.show({
                text: errorMsg,
                buttonText: 'Okay',
                duration: 4000,
                type: 'danger',
            })
            return;
        }

        // Save the workout plan
        let msg = '';
        const newWorkoutPlan = { id, name: nameTrim, workoutIdList, notes }
        if (preloaded) {
            dispatch(updateWorkoutPlan(newWorkoutPlan));
            msg = 'Workout Plan Updated!';
        } else {
            await dispatch(addWorkoutPlan(newWorkoutPlan));
            msg = 'Workout Plan Created!';
        }

        // Clear workout list
        Toast.show({
            text: msg,
            buttonText: 'Okay',
            duration: 4000,
            type: 'success',
        })
        clear();

        // nav might have provided a callback
        if (!!extraActions) {
            extraActions(newWorkoutPlan);
        }
    }

    const startWorkoutPlan = () => {
        if (!preloaded) {
            Toast.show({
                text: 'Load an existing Workout Plan before starting.',
                buttonText: 'Okay',
                duration: 4000,
                type: 'danger',
            })
            return;
        }

        // First save everything in progress, and clear out the progress reducers
        // This func trickles down to workout, exercise, set.
        reduxUtils.saveAndClearWorkoutPlanProgress(utilState, dispatch);

        const workoutIdList = orderedWorkoutList.filter(item => item.id !== null && item.id !== undefined).map(item => item.id);
        const workoutPlanObj = {
            workoutPlanId: id,
            workoutProgression: workoutIdList,
            workoutHistoryIds: null,
            notes: '',
            startTime: Date.now(),
            endTime: null,
        }

        startWorkoutPlanProgress(workoutPlanObj);

        Toast.show({
            text: 'Started Workout Plan' + name,
            buttonText: 'Okay',
            duration: 4000,
            type: 'success',
        })

        navigation.navigate('HomeScreen');

    }

    return (
        <Container style={WpStyle.background_general}>


            <PageHeader
                NavigationProp="IntervalTimer"
                RightSideProp='Interval Timer'
                SVG={tmpSvg}
                Title='Create Workout Plan'
            >
            </PageHeader>

            <Content>

                <Text style={WpStyle.ctTopTextc}>
                    <Text style={[WpStyle.inputLablel, { paddingTop: 15 }]}>Name:</Text>
                    <Text style={WpStyle.redDot}>*</Text>
                </Text>
                <Input
                    selectionColor='#00492F'
                    placeholder='Name'
                    value={name}
                    onChangeText={setName}
                    style={[WpStyle.inputItem, WpStyle.inputShadow]}
                    placeholderTextColor="#C4C4C4"
                />

                <Text style={[WpStyle.inputLablel]}>Notes:</Text>
                <Form style={[WpStyle.textAreaInput, WpStyle.inputShadow]}>
                    <Textarea
                        rowSpan={10}
                        placeholder="Notes"
                        value={notes}
                        onChangeText={setNotes}
                        placeholderTextColor="#C4C4C4"
                    />
                </Form>
                {/* where workouts get listed and the add workout button comes from here */}
                <IndexedList
                    // keyWord='Workout'
                    keyWord='Workout'
                    orderedList={orderedWorkoutList}
                    handleInsert={handleInsert}
                    handleRemove={handleRemove}
                    handleAdd={handleAdd}
                    handleButtonPress={(e, index) => {
                        navigation.navigate('ListAndSearchWorkouts',
                            // params
                            {
                                setSelected: (item) => {
                                    if (handleUpdate(item, index)) {
                                        props.navigation.navigate(props.navigation.state.routeName); // Come back to this screen
                                    }
                                },
                            })
                    }
                    }
                />

                <View style={WpStyle.strWorkoutContainer}>
                    <Button dark onPress={startWorkoutPlan}>
                        <Text>Start Workout Plan</Text>
                    </Button>
                </View>

            </Content>

            {/* All the styling is to remove the top border and shadow*/}
            <Footer style={WpStyle.footer}>
                <LoadModal WrappedComponent={<ListAndSearchWorkoutPlans view='simple' setSelected={handleLoad} />} >
                    <CustomButton type='long-tertiary' text='Load Workout Plan' onPress={() => handleLoad()} />
                </LoadModal>

                <View style={{ marginLeft: 35 }}>
                    <CustomButton type='long-primary' text={preloaded ? 'Update' : 'Create'} onPress={addUpdateWorkoutPlan} />
                </View>
            </Footer>
        </Container>
    )
}