import { Container, Content, Footer, Form, Input, Right, Textarea, Toast } from "native-base";
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import { clearExerciesForm, setExerciesDescription, setExerciesName } from '../../redux/features/exercies/exerciseForm.slice'
import { createExercise, updateExercise } from '../../redux/features/exercies/exercise.slice';
import { CrexStyle } from "./CreateExercise.style";

const tmpSvg = () => (<Svg
    viewBox="0 0 448 512"
    height={20}
    width={20}
    fill='#7b8794'
>
    <Path d="M393.3 141.3l17.5-17.5c4.7-4.7 4.7-12.3 0-17l-5.7-5.7c-4.7-4.7-12.3-4.7-17 0l-17.5 17.5c-35.8-31-81.5-50.9-131.7-54.2V32h25c6.6 0 12-5.4 12-12v-8c0-6.6-5.4-12-12-12h-80c-6.6 0-12 5.4-12 12v8c0 6.6 5.4 12 12 12h23v32.6C91.2 73.3 0 170 0 288c0 123.7 100.3 224 224 224s224-100.3 224-224c0-56.1-20.6-107.4-54.7-146.7zM224 480c-106.1 0-192-85.9-192-192S117.9 96 224 96s192 85.9 192 192-85.9 192-192 192zm4-128h-8c-6.6 0-12-5.4-12-12V172c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v168c0 6.6-5.4 12-12 12z" />
</Svg >
)

/**
 * Create or update exercises.
 * @param {*} props 
 */
export default function CreateExercise(props) {
    const dispatch = useDispatch();
    const exercises = useSelector(state => state._exercises.value)
    const exerciseForm = useSelector(state => state._exercisesForm.value)
    const { id, name, description } = exerciseForm;
    console.log({exerciseForm})
    const {navigation} = props
    const [isUpdate, setIsUpdate] = useState(!!id);
    const params = props.route.params

    // callback from navigation props
    const extraActions = params && params.extraActions ? params.extraActions : null;

    function clear() {
        dispatch(clearExerciesForm());
        setIsUpdate(false);
    }

    // ERROR MESSAGE to make sure fileds are field up
    function validate(name, state) {
        let errorMsg = null;
        if (name === null || name === '') {
            errorMsg = 'Name is required.';
            return errorMsg;
        }
        // else if (sets === null || sets === '') {
        //     errorMsg = 'Sets is required.';
        //     return errorMsg;
        // }
        // else if (reps === null || reps === '') {
        //     errorMsg = 'Reps is required.';
        //     return errorMsg;
        // }

        // Make sure the name is unique //TODO if mode === update, don't check for unique name
        const locale = 'en';
        // filter out this exercise in case it was preloaded, then check against pre existing names.
        const matchingNameList = state.filter(plan => plan.id !== id && plan.name.toLocaleUpperCase(locale) === name.toLocaleUpperCase(locale));
        if (matchingNameList.length > 0) {
            errorMsg = 'This name already exists!';
            return errorMsg;
        }

        return errorMsg;
    }

    async function handleCreateUpdate() {

        // check for errors
        const nameTrim = name.trim();
        const errorMsg = validate(nameTrim, exercises);

        if (errorMsg) {
            Toast.show({
                text: errorMsg,
                buttonText: 'Okay',
                duration: 4000,
                type: 'danger',
            })
            return;
        }

        // create new exercise
        let msg = '';
        const newExercise = { id, name, description };
        if (isUpdate) {
            dispatch(updateExercise(newExercise));
            msg = 'Exercise Updated!';
        } else {
            await dispatch(createExercise(newExercise));
            msg = 'Exercise Created!';
        }

        // Clear exercise list
        Toast.show({
            text: msg,
            buttonText: 'Okay',
            duration: 4000,
            type: 'success',
        })

        clear();
        navigation.goBack()
        // nav might have provided a callback
        if (!!extraActions) {
            extraActions(newExercise);
        }
    }


    return (
        <Container style={CrexStyle.background_general}>


            <PageHeader
                NavigationProp="IntervalTimer"
                RightSideProp='Interval Timer'
                SVG={tmpSvg}
                Title={isUpdate ? 'Update Exercise':'Create Exercise'}
            >
            </PageHeader>

            <Content>

                <Text style={CrexStyle.contentTopText}>
                    <Text style={[CrexStyle.inputLablel, { paddingTop: 15 }]}>Name:</Text>
                    <Text style={CrexStyle.redDot}>*</Text>
                </Text>
                <Input
                    placeholder='Wide Grip Bench Press'
                    value={name}
                    onChangeText={e => dispatch(setExerciesName(e))}
                    style={[CrexStyle.inputItem, CrexStyle.inputShadow]}
                    placeholderTextColor="#C4C4C4"
                    selectionColor='#00492F'
                />
                {/*  add tempo to this */}
                <Text style={[CrexStyle.inputLablel]}>Descriptions:</Text>
                <Form style={[CrexStyle.textAreaInput, CrexStyle.inputShadow]}>
                    <Textarea
                        placeholder=''
                        onChangeText={e => dispatch(setExerciesDescription(e))}
                        value={description}
                        rowSpan={20}
                        placeholderTextColor="#C4C4C4"
                        selectionColor='#00492F'
                        style={CrexStyle.textArea}
                    />
                </Form>


            </Content>

            <Footer style={CrexStyle.footer}>
                <Right>
                    <View style={CrexStyle.footerView}>
                        <CustomButton type='long-primary' text={isUpdate ? 'Update' : 'Create'} onPress={handleCreateUpdate} />
                    </View>
                </Right>
            </Footer>
        </Container>
    )
}