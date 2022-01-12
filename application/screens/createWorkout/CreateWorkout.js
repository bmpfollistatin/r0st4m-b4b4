import { Card, CheckBox, Container, Content, Form, Input, Text, Textarea, Toast } from "native-base";
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text as Tx, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from 'react-native-modal';
import Svg, { Path } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/Button';
import IndexedList from '../../components/IndexedList';
import LoadModal from '../../components/LoadModal';
import PageHeader from '../../components/PageHeader';
import { clearExerciseDetailForm, setdetailExerciseId, setdetailReps, setdetailRests, setdetailSets, setExerciseDetailForm } from '../../redux/features/exerciseDetails/exerciseDetailForm.slice';
import { createOrUpdateExerciseDetail, removeExerciseDetail } from '../../redux/features/exerciseDetails/exerciseDetails.slice';
import { clearWorkoutForm, setWorkoutName, setWorkoutNote, setWorkoutForm } from '../../redux/features/workouts/workoutForm.slice';
// import { addWorkout, updateWorkout } from '../../redux/actions/workoutActions'; 
import { createOrUpdateWorkout } from '../../redux/features/workouts/workouts.slice';
import ListAndSearchWorkouts from '../workouts/ListAndSearchWorkouts';
import { CreWstyle } from "./CreateWorkout.style";

function RUID() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const tmpSvg = () => (<Svg
    viewBox="0 0 640 512"
    height={24}
    width={24}
    fill='#7b8794'
>
    <Path d="M632 240h-24v-96c0-26.5-21.5-48-48-48h-32c-5.6 0-11 1.2-16 2.9V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48
                        48v160H256V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48 48v18.9c-5-1.8-10.4-2.9-16-2.9H80c-26.5 0-48 21.5-48 48v96H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h24v96c0 26.5 21.5 48 48 48h32c5.6 0 11-1.2 16-2.9V432c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V272h128v160c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48v-18.9c5 1.8 10.4 2.9 16 2.9h32c26.5 0 48-21.5 48-48v-96h24c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM112 384H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224c0 8.8-7.2 16-16 16zm112 48c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm256 0c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm96-64c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224z" />
</Svg >)

const extractDetailWithExercise = (state) => {
    let detailedExercies = [];
    const workout_id = state._workoutForm.value.id;
    const details = state._exerciseDetaile.filter(ed => ed.workoutId == workout_id)
    if (Array.isArray(details)) {
        details.map(item => {
            detailedExercies.push({ ...item, name: state._exercises.value.find(i => i.id == item.exerciseId).name })
        })
    }
    console.log({ detailedExercies })
    return detailedExercies
}

export default function CreateWorkout(props) {

    const dispatch = useDispatch();
    const allstate = useSelector(state => state)
    // const orderedExerciseDetailList = combineExerciseWithDetail(useSelector(state => state));

    const [orderedExerciseDetailList, setOrderDetailList] = useState([])
    const workouts = useSelector(state => state._workouts.value)
    const workoutForm = useSelector(state => state._workoutForm.value);
    const detailForm = useSelector(state => state._exerciesDetailForm);
    // const id = useSelector(state => state.creatingWorkout.id)
    const [editDetialeIndex, setEditIndex] = useState(0)
    const [editDetiale, setEditDetaile] = useState(false)
    // const preloaded = useSelector(state => state.creatingWorkout.id) && !!useSelector(state => state.workout.byId[state.creatingWorkout.id])
    const { navigation } = props;
    const params = props.route.params
    // callback
    const extraActions = params && params.extraActions ? params.extraActions : null;

    const [modalVisibleState, setModalVisibleState] = useState(false);//TODO:
    const [mounted, setMounted] = useState(false)
    const [checked, setChecked] = useState(false)
    const [supesetChain, setsupersetChain] = useState(false)
    const [supersetId, setSupersetId] = useState("")

    const [canUpdate, setCanUpdate] = useState(false)

    useEffect(() => {
        if (!mounted) {
            setMounted(true)
            // _setWorkoutExercises()
            setOrderDetailList(extractDetailWithExercise(allstate))
        }
    }, []);

    function toggleModal() {
        setModalVisibleState(!modalVisibleState);
    }

    function confirmDetailChanges() {
        const payload = { ...detailForm };
        if (checked || supesetChain) {
            let _supersetId = RUID();
            supersetId == "" ? setSupersetId(_supersetId) : null;
            payload.supersetId = supersetId != "" ? supersetId : _supersetId;
        }
        if (!checked) {
            setsupersetChain(false)
            setSupersetId("")
        }

        const newList = orderedExerciseDetailList.map(i => i)
        if (!editDetiale) {
            newList.push(payload)

        } else {
            newList[editDetialeIndex] = { ...newList[editDetialeIndex], ...payload };
        }

        setOrderDetailList(newList)

        if (checked) {
            setTimeout(() => {
                handleAdd()
                setsupersetChain(true)
            }, 2000);
        }
        clearModal()
    }

    const cancelCreation = () => {
        setSupersetId("")
        clearModal()
    }

    const handleAdd = () => {
        clearModal();
        navigation.navigate('ListAndSearchExercises',
            // params
            {
                setSelected: (item) => {
                    dispatch(setdetailExerciseId(item.id))
                    setModalVisibleState(true)
                    navigation.goBack(); // Come back to this screen
                }
            })
    }

    function handleEdit(item, index) {
        setEditDetaile(true)
        setEditIndex(index)
        dispatch(setExerciseDetailForm(item))
        toggleModal();
    }

    function _handleInsert(item, index) {
        const newList = orderedExerciseDetailList.map(i => i)
        newList.splice(index, 0, item)
        setOrderDetailList(newList)
    }

    function handleRemove(item, index) {
        const newList = orderedExerciseDetailList.map(i => i)
        newList[index] = { ...newList[index], Deleted: true }
        setOrderDetailList(newList)
    }

    function handleLoad(item) {
        dispatch(setWorkoutForm(item));
    }

    function clear() {
        dispatch(clearWorkoutForm())
    }

    const clearModal = () => {
        setEditDetaile(false)
        setEditIndex(0)
        setChecked(false)
        setModalVisibleState(false)
        dispatch(clearExerciseDetailForm())
    }

    function validate(name, idList) {
        let errorMsg = null;

        if (name === null || name === '') {
            errorMsg = 'Name is required.';
            return errorMsg;
        }

        const matchingNameList = workouts.find(i => i.name == name)
        if (matchingNameList.length > 0) {
            errorMsg = 'This name already exists!';
            return errorMsg;
        }

        if (!idList || idList.length == 0) {
            errorMsg = 'List cannot be empty.';
            return errorMsg;
        }

        return errorMsg;
    }

    // workout actions
    async function addUpdateWorkout() {
        const nameTrim = workoutForm.name.trim();
        const errorMsg = validate(nameTrim, orderedExerciseDetailList.filter(i => !i.Deleted), workouts);
        if (errorMsg) {
            Toast.show({
                text: errorMsg,
                buttonText: 'Okay',
                duration: 4000,
                type: 'danger',
            })
            return;
        }

        let msg = workoutForm.id ? 'Workout Updated!' : 'Workout Created!';

        const _id = workoutForm.id
        if (!workoutForm.id) { //found workout id
            _id = Math.max(...workouts.map((i) => i.id))
        }

        const completeExerciseDetails = [];

        orderedExerciseDetailList.map(i => { //apply workoutId
            completeExerciseDetails.push({ ...i, workoutId: _id })
        })
        completeExerciseDetails.map(async i => { //create or update exercise details
            if (!i.Deleted) {
                dispatch(createOrUpdateExerciseDetail(i))
            }
        })
        completeExerciseDetails.map(async i => { //remove deleted exercise details
            if (i.id && i.Deleted) {
                dispatch(removeExerciseDetail(i.id))
            }
        })
        dispatch(createOrUpdateWorkout(workoutForm)) //create or update workout with latest details

        Toast.show({
            text: msg,
            buttonText: 'Okay',
            duration: 4000,
            type: 'success',
        })

        // nav might have provided a callback
        if (!!extraActions) {
            extraActions(workoutForm);
        }

        clear();

        navigation.goBack()
    }

    const svSets = <Path d="M145.35 207a8 8 0 00-11.35 0l-71 71-39-39a8 8 0 00-11.31 0L1.35 250.34a8 8 0 000 11.32l56 56a8 8 0 0011.31 0l88-88a8 8 0 000-11.32zM62.93 384c-17.67 0-32.4 14.33-32.4 32s14.73 32 32.4 32a32 32 0 000-64zm82.42-337A8 8 0 00134 47l-71 71-39-39a8 8 0 00-11.31 0L1.35 90.34a8 8 0 000 11.32l56 56a8 8 0 0011.31 0l88-88a8 8 0 000-11.32zM503 400H199a8 8 0 00-8 8v16a8 8 0 008 8h304a8 8 0 008-8v-16a8 8 0 00-8-8zm0-320H199a8 8 0 00-8 8v16a8 8 0 008 8h304a8 8 0 008-8V88a8 8 0 00-8-8zm0 160H199a8 8 0 00-8 8v16a8 8 0 008 8h304a8 8 0 008-8v-16a8 8 0 00-8-8z" />
    const svReps = <Path d="M54.027 327.713C40.129 307.242 32 282.553 32 256c0-70.579 57.421-128 128-128h160v63.969c0 29.239 36.192 43.177 55.785 21.407l72-79.968c10.952-12.169 10.953-30.644 0-42.814l-72-79.974C356.226-11.114 320 2.738 320 32.026V96H160C71.775 96 0 167.775 0 256c0 33.913 10.612 65.391 28.683 91.299 4.427 6.348 13.606 6.936 18.785 1.185l5.488-6.096c3.667-4.073 4.149-10.14 1.071-14.675zM352 32l72 80-72 80V32zm131.317 132.701c-4.427-6.348-13.606-6.936-18.785-1.185l-5.488 6.096c-3.667 4.073-4.149 10.14-1.071 14.675C471.871 204.758 480 229.447 480 256c0 70.579-57.421 128-128 128H192v-63.969c0-29.239-36.192-43.177-55.785-21.407l-72 79.969c-10.952 12.169-10.953 30.644 0 42.814l72 79.974C155.774 523.113 192 509.264 192 479.974V416h160c88.225 0 160-71.775 160-160 0-33.913-10.612-65.391-28.683-91.299zM160 480l-72-80 72-80v160z" />
    const svRest = <Path d="M368 32h4c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h4c0 91.821 44.108 193.657 129.646 224C59.832 286.441 16 388.477 16 480h-4c-6.627 0-12 5.373-12 12v8c0 6.627 5.373 12 12 12h360c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12h-4c0-91.821-44.108-193.657-129.646-224C324.168 225.559 368 123.523 368 32zM48 32h288c0 110.457-64.471 200-144 200S48 142.457 48 32zm288 448H48c0-110.457 64.471-200 144-200s144 89.543 144 200zM285.621 96H98.379a12.01 12.01 0 01-11.602-8.903 199.464 199.464 0 01-2.059-8.43C83.054 71.145 88.718 64 96.422 64h191.157c7.704 0 13.368 7.145 11.704 14.667a199.464 199.464 0 01-2.059 8.43A12.013 12.013 0 01285.621 96zm-15.961 50.912a141.625 141.625 0 01-6.774 8.739c-2.301 2.738-5.671 4.348-9.248 4.348H130.362c-3.576 0-6.947-1.61-9.248-4.348a142.319 142.319 0 01-6.774-8.739c-5.657-7.91.088-18.912 9.813-18.912h135.694c9.725 0 15.469 11.003 9.813 18.912z" />

    const inputWithLabel = (text, iconPath, placeholder = "", value, changeValue = (t) => { }) => {
        return (
            <View style={CreWstyle.iwlView}>
                <Tx style={CreWstyle.iwlText}>{text}</Tx>
                <View style={CreWstyle.iwlSubView}>
                    <Input
                        style={CreWstyle.iwlSubViewInput}
                        placeholder={placeholder}
                        keyboardType="numeric"
                        defaultValue={value ? String(value) : ""}
                        onChangeText={changeValue}
                    />
                    <Svg
                        viewBox="0 0 512 512"
                        height={10}
                        width={10}
                        fill='#a8a8a8'
                    >
                        {iconPath}
                    </Svg>
                </View>
            </View>
        )
    }

    const checkBoxToggle = () => {
        setChecked(!checked)
    }

    const createButtonEnabled = () => {
        if (checked) {
            return Number(detailForm.sets) > 0 && String(detailForm.reps).trim().length > 0
        } else {
            return Number(detailForm.sets) > 0 && String(detailForm.reps).trim().length > 0 && Number(detailForm.rests) > 0
        }
    }

    const handleCancelOrEdit = () => {
        if(!canUpdate){
            setCanUpdate(true)
            return
        }
        setCanUpdate(false)
        console.log('cancel')
    }

    return (
        <Container style={CreWstyle.background_general}>
            <PageHeader
                NavigationProp="IntervalTimer"
                RightSideProp='Interval Timer'
                SVG={tmpSvg}
                Title={workoutForm.id ? workoutForm.name : 'Create Workout'}
            >
            </PageHeader>

            <Content>

                <Text style={CreWstyle.ctTextContainer}>
                    <Text style={[CreWstyle.inputLablel, { paddingTop: 15 }]}>Name:</Text>
                    <Text style={CreWstyle.redDot}>*</Text>
                </Text>
                <Input
                    selectionColor='#00492F'
                    placeholder='Name'
                    disabled={!canUpdate}
                    value={workoutForm.name}
                    onChangeText={t => dispatch(setWorkoutName(t))}
                    style={[CreWstyle.inputItem, CreWstyle.inputShadow]}
                    placeholderTextColor="#C4C4C4"
                />

                <Text style={[CreWstyle.inputLablel]}>Notes:</Text>
                <Form style={[CreWstyle.textAreaInput, CreWstyle.inputShadow]}>
                    <Textarea
                        rowSpan={10}
                        disabled={!canUpdate}
                        placeholder="Notes"
                        value={workoutForm.notes}
                        onChangeText={t => dispatch(setWorkoutNote(t))}
                        placeholderTextColor="#C4C4C4"
                    />
                </Form>
                {/* workoutExercises */}
                <View style={CreWstyle.w100}>
                    <IndexedList
                        disabled={!canUpdate}
                        keyWord='Exercise'
                        orderedList={orderedExerciseDetailList} //this needs to be the orderedExerciseDetailList
                        handleInsert={_handleInsert}
                        handleRemove={handleRemove}
                        handleAdd={handleAdd}
                        handleEdit={handleEdit}
                        handleButtonPress={handleAdd}
                    />
                </View>
            </Content>

            {/* Modal for exercise details input */}

            <Modal isVisible={modalVisibleState}
                onBackdropPress={() => setModalVisibleState(false)}
                style={[CreWstyle.modal]}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={CreWstyle.Keyboardcontainer}
                >
                    <View style={[CreWstyle.keyboardView]}>
                        <Card style={[CreWstyle.keyboardCard, { borderColor: '#FFB800', padding: 25, paddingBottom: 15, borderWidth: 30 }]}>
                            <View style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                                <View>
                                    {inputWithLabel('# of sets', svSets, "4", detailForm.sets, t => dispatch(setdetailSets(t)))}
                                    {inputWithLabel('# of reps', svReps, "15", detailForm.reps, t => dispatch(setdetailReps(t)))}
                                    {inputWithLabel('Rest duration (in seconds)', svRest, "35", detailForm.rests, t => dispatch(setdetailRests(t)))}
                                </View>

                                <View style={{ width: '50%', display: 'flex', justifyContent: 'flex-end', paddingBottom: 25 }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'flex-end' }}>
                                        <CheckBox
                                            colorScheme="green"
                                            size="md"
                                            style={CreWstyle.checkbox}
                                            checked={checked}
                                            color="green"
                                            onPress={checkBoxToggle}
                                        >
                                        </CheckBox>
                                        <Tx style={[CreWstyle.creSupersetText, { marginBottom: 3 }]}>superset</Tx>
                                    </View>
                                </View>
                            </View>

                            <View style={[CreWstyle.btnContainer]}>
                                <TouchableOpacity style={{ marginRight: 15 }}
                                    onPress={() => {
                                        cancelCreation()
                                    }}>
                                    <Tx style={CreWstyle.cancelText}>Cancel</Tx>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ height: '100%', width: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, backgroundColor: createButtonEnabled() ? '#00492F' : 'grey' }}
                                    onPress={() => createButtonEnabled() ? confirmDetailChanges() : null}
                                >
                                    <Tx style={CreWstyle.okText}>OK</Tx>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            <View style={CreWstyle.customFooter}>
                <View>
                    <CustomButton type={canUpdate ? 'long-secondary': 'long-primary'} text={canUpdate?'Cancel':'Edit'} onPress={() => handleCancelOrEdit()} />
                </View>

                <View style={{ marginLeft: 35 }}>
                    <CustomButton disabled={!canUpdate} type='long-primary' text={workoutForm.id ? 'Update' : 'Create'} onPress={addUpdateWorkout} />
                </View>
            </View>
        </Container>
    )
}