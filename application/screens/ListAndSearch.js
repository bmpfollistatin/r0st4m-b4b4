//DONE!

import React, { useState } from 'react';
// import { View, TouchableOpacity} from 'react-native';
import { Container, Content } from "native-base";
// import SearchBar from '../components/SearchBar';
import GenericListAndSearch from '../components/GenericListAndSearch';

var styles = require('../../assets/files/Styles');

/**
 * Can be used to list exercises and workouts.
 * Calls navivation goBack after selection is made.
 * Props should have all data to be displayed, and a
 * function to perform when the user makes a selection.
 * @param {object} props
 */
export default function ListAndSearch(props) {

    const navigation = props.navigation;
    const dataSource = navigation.getParam('dataSource');
    const setSelected = navigation.getParam('setSelected');

    const handleSelectAndGoBack = (item) => {
        setSelected(item);
        navigation.goBack()
    }

    return (
        <Container style={styles.background_general}>
            <Content>
                <GenericListAndSearch dataSource={dataSource} setSelected={handleSelectAndGoBack}/>
            </Content>
        </Container>
    )
}
