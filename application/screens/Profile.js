import * as firebase from 'firebase';
import { Container, Text } from 'native-base';
import React, { Component, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { NavigationActions } from 'react-navigation';
import SetNoteModal from "../components/SetNoteModal";
import StartedWorkoutCard from "../components/StartedWorkoutCard";
import Strings from '../utils/Strings';
var styles = require('../../assets/files/Styles');

export default function Profile(props) {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
        });
        props.navigation.dispatch(navigateAction);
    }

    const [modalVisibleState, setModalVisibleState] = useState(false)
    const navigationOptions = {
        title: `${Strings.ST6}`,
    };

    const toggleModal = () => {
        setModalVisibleState(!modalVisibleState)
    }

    var user = firebase.auth().currentUser;
    var email, displayName, emailVerified, creationTime;

    if (user != null) {
        email = user.email;
        displayName = user.displayName;
        emailVerified = user.emailVerified;
        creationTime = user.metadata.creationTime;
    }

    <Modal
        isVisible={modalVisibleState}
        // onBackdropPress={toggleModal}
        style={{ maxHeight: 650, paddingTop: 100 }}
    >
        <SetNoteModal
            // currentNote = {(text) => { updateWorkSeconds(parseInt(text)); }}
            // currentTempo
            // currentInjury
            setCurrentTempo
            setCurrentInjury
            updateSet

        />
    </Modal>

    return (



        <Container>
            <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 50 }}>
                {/* comment out to get rid of react paper */}

                <View style={styles.profileBackground}>
                    <View style={[styles.userProfileInfo, { justifyContent: 'center' }]}>
                        <View style={styles.SideBySide}>

                            {/* Height */}
                            <Text style={{ paddingRight: 25, paddingTop: 10 }}>
                                <Text style={styles.profileTitle}>Height:</Text>
                                <Text style={styles.profileInfo}> 6'</Text>
                            </Text>
                            <Text style={{ fontSize: 36, color: 'hsl(98, 0%, 81%)', position: 'absolute', top: '-20%' }}>|</Text>
                            {/* Weight */}
                            <Text style={{ paddingLeft: 25, paddingTop: 10 }}>
                                <Text style={styles.profileTitle}>Weight:</Text>
                                <Text style={styles.profileInfo}> 192</Text>
                                <Text style={styles.profileInfo2}>lbs</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ justifyContent: 'flex-start', marginTop: 75, paddingHorizontal: 25 }}>
                <Text style={{ fontWeight: 'bold' }}>Stats:</Text>

                <StartedWorkoutCard iconSource={require('../../assets/images/activity-level-small.png')}>
                    <Text style={styles.profileSubtitleBold}>Coming Soon</Text>
                </StartedWorkoutCard>

                <StartedWorkoutCard iconSource={require('../../assets/images/trophy.png')}>
                    <Text style={styles.profileSubtitleBold}>Coming Soon</Text>
                </StartedWorkoutCard>

                <StartedWorkoutCard iconSource={require('../../assets/images/heart.png')}>
                    <Text style={styles.profileSubtitleBold}>Coming Soon</Text>
                </StartedWorkoutCard>

                <TouchableOpacity onPress={toggleModal}>
                    <Text style={{ justifyContent: 'flex-start', fontWeight: 'bold', color: '#8A8A8A', marginTop: 75, fontSize: 12 }}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )

}

