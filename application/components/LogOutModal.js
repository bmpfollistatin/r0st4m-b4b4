import { Button } from "native-base";
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';

var styles = require('../../assets/files/Styles');

export default function LogoutModal(props) {
    const [modalVisibleState, setModalVisibleState] = useState("off");

    function toggleModal() {
        setModalVisibleState(!modalVisibleState);
    }

    return (
        <View>
            <Button onPress={toggleModal}>
                <Text>Show  Modal</Text>
            </Button>
            <Modal isVisible={!modalVisibleState}
                onBackdropPress={toggleModal}
            >
                <View style={{ backgroundColor: 'white', borderColor: '#FFB800', borderWidth: 2 }}>
                    <View style={{ padding: 20, paddingBottom: 20, }}>
                        <Text style={styles.modalHeader}>Logout</Text>
                    </View>

                    <View style={{ paddingBottom: 50, padding: 20 }}>
                        <Text>Some body text</Text>
                    </View>

                    <View style={[styles.Beside, styles.modalFooter]}>

                        <Button style={[styles.LightGreen, styles.CenterContent, { margin: 10 }]}>
                            <Text style={{ color: 'black', fontWeight: '400', fontSize: 13 }}>Notes</Text>
                        </Button>


                        <Button style={[styles.DarkGreen, styles.CenterContent, { margin: 10 }]}
                            onPress={() => updateSet({ index: currentIndex, weight: currentWeight, reps: currentReps })}>
                            <Text style={{ color: 'white', fontWeight: '400', fontSize: 13 }}>Complete Set</Text>
                        </Button>

                    </View>
                </View>
            </Modal>
        </View>
    );
}

