/* eslint-disable prettier/prettier */
//DONE!
import React, { useState, useEffect } from "react";
import {
    Dimensions,
    View,
    ScrollView,
    TextInput,
    Text,
    TouchableOpacity,
} from 'react-native';


import { Container, Content, CardItem } from "native-base";


import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { connect } from 'react-redux';

//Custom import
import CardioCard from "../components/CardioCard";
import CustomButton from "../components/Button";

import SearchBar from '../components/SearchBar';

import { filterCardios } from '../redux/reducers/cardioReducer';
import { saveCardioLogEntry } from '../redux/actions/cardioLogActions';


var styles = require('../../assets/files/Styles');

//NAVIGATION AT TOP
// export default function Cardio {
// for opening modal and all
const CardioListingLogging = (props) => {
    const [selected, setSelected] = useState({});
    const [level, setLevel] = useState('');
    const [speed, setSpeed] = useState('');
    const [cardioHour, setCardioHour] = useState('');
    const [cardioMinute, setCardioMinute] = useState('');
    const { allCardioList } = props;

    const [filteredData, setFilteredData] = useState(allCardioList);


    useEffect(() => {
        setFilteredData(allCardioList);
    }, [allCardioList])

    const [modalVisibleState, setModalVisibleState] = useState("off");

    function toggleModal() {
        setModalVisibleState(!modalVisibleState);
    }

    function validated() {
        let val = true;
        if (!cardioMinute || isNaN(cardioMinute)) {
            val = false;
        }
        if (!level || isNaN(level)) {
            val = false;
        }
        if (!speed || isNaN(speed)) {
            val = false;
        }
        return val && !!selected.id;
    }

    function clear() {
        setCardioMinute('');
        setLevel('');
        setSpeed('');
        setSelected({});
    }


    return (
        <Container style={styles.background_general}>

            <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                <SearchBar dataSource={Object.values(props.cardio.byId)} showResults={false} setFilteredData={setFilteredData} />

                <View>
                    <Content horizontal={true}>

                        {filteredData.map((item, index) => {
                            return (
                                <TouchableOpacity key={Math.random()+""} onPress={() => setSelected(item)}>
                                        <View style={[{ alignItems: 'center' }, selected.id == item.id ? { paddingTop: 10 } : { paddingTop: 20 }]}>
                                            <CardioCard style={selected.id == item.id ? { backgroundColor: 'green', fontWeight: 'bold' } : {}} >
                                                <CardItem style={[styles.card, selected.id == item.id ? { backgroundColor: 'green' } : {}]}>
                                                    <Text>
                                                        <Svg
                                                            viewBox="0 0 512 512"
                                                            height={50}
                                                            width={50}
                                                            fill='white'
                                                        >
                                                            <Path d="M468.7 76.5C423.6 32.2 375 32 362.3 32c-12.7 0-61.5.2-106.3 44.4C211.3 32.3 162.5 32 149.7 32c-12.7 0-61.4.2-106.4 44.5C15.4 104 0 140.7 0 179.9 0 214.1 12.3 246 33.8 272h120.8l29.9-71.8 56.9 126.4c5.5 12.3 22.9 12.7 28.9.6l49.7-99.4 22.1 44.2h136c21.5-26 33.8-57.9 33.8-92.1.1-39.2-15.3-75.9-43.2-103.4zM462.5 240H361.9l-27.6-55.2c-5.9-11.8-22.7-11.8-28.6 0l-48.9 97.9-58.2-129.3c-5.8-12.8-24-12.5-29.4.4L133.3 240H49.5c-9.2-14.6-42.6-82.7 18.3-142.7C90.4 75.1 120 64 149.7 64c33.9 0 54.5 6.3 106.3 57.3C311 67.1 330.5 64 362.3 64c29.7 0 59.3 11.1 81.8 33.3 61 60.1 27.5 128.2 18.4 142.7zM268.7 443.4c-6.2 6.1-16.2 6.1-22.4 0L108.9 304H64l159.9 162.2c18.7 18.5 48.6 18.4 67.3 0L448 304h-44.5L268.7 443.4z" />
                                                        </Svg>
                                                    </Text>
                                                </CardItem>
                                            </CardioCard>
                                            <Text style={[{ fontSize: 18, color: 'hsl(98, 0%, 11%)', paddingLeft: 15 }, selected.id == item.id ? { fontWeight: 'bold' } : {}]}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                            )
                        })}
                    </Content>
                </View>


                {/* level and spped input */}
                <View style={[styles.Beside, { marginHorizontal: 20, justifyContent: 'space-between', marginTop: 50 }]}>
                    <View style={styles.CardioNumberText}>
                        <TextInput
                            selectionColor='hsl(158, 100%, 40%)'
                            placeholder='00'
                            keyboardType={'numeric'}
                            maxLength={2}
                            style={[styles.cardioInput, styles.inputTextColor]}
                            onChangeText={level => setLevel(level)}
                            value={level}
                        >
                        </TextInput>
                        <Text style={{ fontSize: 28, color: '#C4C4C4' }}>incline</Text>
                    </View>

                    <View style={styles.CardioNumberText}>
                        <TextInput
                            selectionColor='hsl(158, 100%, 40%)'
                            placeholder='00'
                            keyboardType={'numeric'}
                            maxLength={2}
                            style={styles.cardioInput}
                            onChangeText={speed => setSpeed(speed)}
                            value={speed}
                        >
                        </TextInput>
                        <Text style={{ fontSize: 28, color: '#C4C4C4' }}>speed</Text>
                    </View>
                </View>

                {/* minute input */}
                <View style={[styles.CenterContent, styles.CardioNumberText, { alignItems: 'center' }]}>

                    <MaterialIcons name="timer" size={52} color="#EBEBEB" style={{ marginTop: 10 }} />

                    <TextInput
                        selectionColor='hsl(158, 100%, 40%)'
                        placeholder='00'
                        keyboardType={'numeric'}
                        maxLength={3}
                        onChangeText={cardioMinute => setCardioMinute(cardioMinute)}
                        value={cardioMinute}
                        style={{ fontSize: 55, marginLeft: 5, marginRight: 8, fontFamily: 'ssb_Bold' }}>
                    </TextInput>
                    <Text style={{ fontSize: 28, color: "#CFCFCF", paddingTop: 20 }}>min</Text>
                </View>

                <View style={[styles.CenterContent, { marginTop: 35 }]} sel>
                    <CustomButton type='large-secondary' text='Log It'
                        disabled={!validated()}
                        onPress={() => {
                            props.saveCardioLogEntry({ name: selected.name, level, speed, minutes: cardioMinute, endTime: Date.now() }); //minutes: cardioMinutes will save the cardiominutes as minutes
                            clear();
                        }}
                    />
                </View>


            </ScrollView>
        </Container >
    )
}



const mapStateToProps = (state) => ({
    cardio: state.cardio,
    allCardioList: filterCardios(state.cardio, { type: 'all' }),
});

const mapDispatchToProps = (dispatch) => ({
    saveCardioLogEntry: (LoggingCardio) => dispatch(saveCardioLogEntry(LoggingCardio))
});
export default connect(mapStateToProps, mapDispatchToProps)(CardioListingLogging);
