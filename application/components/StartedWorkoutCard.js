import propTypes from "prop-types";
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';



export default function StartWorkoutCard(props) {
    const { onPress, SVG, OpacityNumber, OptionMenu , disabled} = props;
    const dumbellSVG =
        <View>
            <Svg
                viewBox="0 0 640 512"
                height={24}
                width={24}
                fill='url(#cameraColor)'
            >
                <Defs>
                    <LinearGradient id="cameraColor" x1="0" y1="0" x2="1" y2="0">
                        <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
                        <Stop offset="1" stopColor="#CF1124" stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                <Path d="M632 240h-24v-96c0-26.5-21.5-48-48-48h-32c-5.6 0-11 1.2-16 2.9V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48
                        48v160H256V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48 48v18.9c-5-1.8-10.4-2.9-16-2.9H80c-26.5 0-48 21.5-48 48v96H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h24v96c0 26.5 21.5 48 48 48h32c5.6 0 11-1.2 16-2.9V432c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V272h128v160c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48v-18.9c5 1.8 10.4 2.9 16 2.9h32c26.5 0 48-21.5 48-48v-96h24c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM112 384H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224c0 8.8-7.2 16-16 16zm112 48c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm256 0c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm96-64c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224z" />
            </Svg >
        </View>

    const addSVG =
        <Svg
            viewBox="0 0 512 512"
            height={24}
            width={24}
            style={{ marginLeft: 3, marginRight: 2, fontSize: 35, marginTop: 6 }}
            fill='url(#cameraColor)'
        >
            <Defs>
                <LinearGradient id="cameraColor" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
                    <Stop offset="1" stopColor="#CF1124" stopOpacity="1" />
                </LinearGradient>
            </Defs>
            <Path d="M384 250v12c0 6.6-5.4 12-12 12h-98v98c0 6.6-5.4 12-12 12h-12c-6.6 0-12-5.4-12-12v-98h-98c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h98v-98c0-6.6 5.4-12 12-12h12c6.6 0 12 5.4 12 12v98h98c6.6 0 12 5.4 12 12zm120 6c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z" />
        </Svg >


    return (
        <TouchableOpacity onPress={onPress} activeOpacity={OpacityNumber}>
            <View style={styles.StartWorkoutCard}>
                <View style={styles.StartWorkoutCardContent}>
                    <View style={styles.SideBySide}>
                        {/* old method */}
                        {/* <Image style={{ marginRight: 15 }} source={ iconSource } /> */}

                        {/* changing it to fire icon */}
                        {/* <View style={{}}> */}
                        {SVG === 'dumbellSVG' ? dumbellSVG : addSVG}
                        <View style={[styles.TopToBottom, { paddingLeft: 5 }]}>
                            {props.children}
                        </View>

                        <TouchableOpacity style={{ alignContent: 'flex-end', paddingRight: 10 , display:  !!disabled ? 'none':'flex'}} hitSlop={{ bottom: 50, top: 50, left: 50, right: 50 }}>
                            {OptionMenu}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

StartWorkoutCard.propTypes = {
    iconSource: propTypes.object,
}
const styles = StyleSheet.create({
    StartWorkoutCard: {
        height: 66,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#F5F7F6',
        // marginTop: 10,
        overflow: 'scroll',
    },
    StartWorkoutCardContent: {
        marginTop: 13,
        marginLeft: 20,
    },
    SideBySide: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
    },
    TopToBottom: {
        display: "flex",
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '100%',
        flex: 1,
    }
})
