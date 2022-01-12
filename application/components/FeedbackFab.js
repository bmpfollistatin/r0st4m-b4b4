import { Fab } from 'native-base';
import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from "react-native-svg";
var styles = require('../../assets/files/Styles');
import { Ionicons } from '@expo/vector-icons';


/**
 * 
 * for changing size:
 * <Fab /> style height , with 
 * <Ionicons /> size
 * <Text /> fontSize and translateY
 */
export default function FeedbackFab(props) {
    const { onPress } = props;
    return (
        <Fab
            position='bottomRight'
            style={{ backgroundColor: '#E0F7EF', height: 75, width: 75, borderRadius: 100 }}
            onPress={onPress}
        >

            <View style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Ionicons name="md-chatbubbles-outline" size={36} color="#004440" />
                <Text style={{ color: "#004440", fontSize: 12, transform: [{translateY: -3}] }}>Feedback</Text>
            </View>
        </Fab>
    );
}