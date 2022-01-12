import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, ScrollView,Image } from 'react-native';
import { Button, Text, Header, Content, Body, Container } from "native-base";
import SearchBar from '../components/SearchBar';
import propTypes from 'prop-types';

import ExerciseCard from "../components/ExerciseCard";
import { equipments } from '../redux/features/equipment/equipments.data';


/**
 * Can be used to list exercises and workouts.
 * Props should have all data to be displayed, and a
 * function to perform when the user makes a selection.
 * @param {object} props
 */
export default function GenericListAndSearch(props) {



    const { dataSource, setSelected } = props;
    const [filteredData, setFilteredData] = useState(dataSource);



    useEffect(() => {
        setFilteredData(props.dataSource);
    }, [props.dataSource])

    const handleSelected = (item) => {

        setSelected(item);
    }

    const getImage = (exc) => {
        const img = equipments.find( i => i.ID == exc.equipment)
        return img? img.image : null
    }

    return (

        <View style={{ paddingTop: 20}}>

            <SearchBar type='' dataSource={dataSource} showResults={false} setFilteredData={setFilteredData} style={{ justifiedContent: 'center', position: 'absolute' }} />
                <FlatList
                    //only thing that worked on giving FlatList Footer some padding but only works on ios
                    contentInset={{ bottom: 100 }}
                    //  this works for both iOS and android but leaving both to reduce risk
                    contentContainerStyle={{ paddingBottom: 200 }}
                    initialNumToRender={20}
                    data={filteredData}
                    renderItem={({ item, index, separators }) => (
                        <TouchableOpacity key={`${item}-${index}-${item.note}`} onPress={() => { handleSelected(item) }} 
                        style={{ marginHorizontal: 10 }}>
                            <ExerciseCard customStyle={{ width: '100%'}} iconType='image' iconSource={getImage(item)}>
                                {/* <Image style={{height: 20 , width: 20}} source={getImage(item)}/> */}
                                <Text style={styles.GenericListAndSearchTitle}>{item.name}</Text>
                                {props.children && typeof props.children === 'function' && props.children(item)}
                                {props.children && typeof props.children !== 'function' && props.children}
                                {/* props.children is a function (this is based that is being importet in...list and search
                workout page is an example) .... item is an objects. */}
                            </ExerciseCard>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id + item.name}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    GenericListAndSearchTitle: {
        // fontSize: 13,
        fontSize: 15,
        // fontWeight: 'bold',
        fontFamily: 'ssb_SemiBold',
        color: '#00492F',
    },
})

GenericListAndSearch.defaultProps = {
    setSelected: (item) => { alert('Selected item', item); }
}

GenericListAndSearch.propTypes = {
    dataSource: propTypes.array.isRequired,
    setSelected: propTypes.func.isRequired,
}
