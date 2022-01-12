import { Fab } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from "react-native-svg";
var styles = require('../../assets/files/Styles');

export default function PlusFab(props) {
    const { onPress } = props;
    return (
        <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <Fab
                style={{ backgroundColor: '#00492F', paddingLeft: 5 }}
                onPress={onPress}
            >

                <Svg
                    viewBox="0 0 512 512"
                    height={30}
                    width={30}
                    fill='white'
                >
                    <Path d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z" />
                </Svg>

            </Fab>
        </View>
    );
}