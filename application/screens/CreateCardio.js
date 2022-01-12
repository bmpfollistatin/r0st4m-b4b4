import { Container, Content, Input, Toast } from "native-base";
import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../components/Button';
import PageHeader from '../components/PageHeader';
import { addCardio } from "../redux/actions/cardioActions";
import { setDescription, setId, setName } from '../redux/actions/creating/creatingCardioActions';
import { filterCardios } from '../redux/reducers/cardioReducer';


var styles = require('../../assets/files/Styles');

export default function CreateCardio(props) {
    const dispatch = useDispatch()
    const { id, name, description } = useSelector(state => state.creatingCardio);
    const cardio = filterCardios(useSelector(state => state.cardio));
    // Creating Cardio Actions
    // Cardio State and Action

    function clear() {
        dispatch(setId(null));
        dispatch(setName(''));
        dispatch(setDescription(''));
    }

    // ERROR MESSAGE to make sure fileds are field up
    function validate(name, state) {
        let errorMsg = null;
        if (name === null || name === '') {
            errorMsg = 'Name is required.';
            return errorMsg;
        }

        // Make sure the name is unique //TODO if mode === update, don't check for unique name
        const locale = 'en';
        // filter out this exercise in case it was preloaded, then check against pre existing names.
        const matchingNameList = state.filter(cardio => cardio.id !== id && cardio.name.toLocaleUpperCase(locale) === name.toLocaleUpperCase(locale));
        if (matchingNameList.length > 0) {
            errorMsg = 'This name already exists!';
            return errorMsg;
        }

        return errorMsg;
    }

    async function handleCreateUpdate() {
        // check for errors
        const nameTrim = name.trim();
        const errorMsg = validate(nameTrim, cardio);

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
        const newCardio = { name: nameTrim, description };

        await dispatch(addCardio(newCardio));
        msg = 'Exercise Created!';

        // Clear exercise list
        Toast.show({
            text: msg,
            buttonText: 'Okay',
            duration: 4000,
            type: 'success',
        })

        clear();
    }

    return (
        <Container style={styles.background_general}>

            <PageHeader
                Title='Create Cardio'
            >
            </PageHeader>

            <Content>
                <Text style={{ marginLeft: 15, paddingTop: 15 }}>
                    <Text style={[styles.inputLablel, { paddingTop: 15 }]}>Name:</Text>
                    <Text style={styles.redDot}>*</Text>
                </Text>
                <Input
                    placeholder='Elliptical'
                    value={name}
                    onChangeText={e => dispatch(setName(e))}
                    style={[styles.inputItem, styles.inputShadow]}
                    placeholderTextColor="#C4C4C4"
                    selectionColor='#00492F'
                />
            </Content>

            <View style={styles.bottomRightButtons}>
                <CustomButton type='large-primary' text='Create'
                    onPress={handleCreateUpdate}
                />
            </View>



        </Container>
    )
}