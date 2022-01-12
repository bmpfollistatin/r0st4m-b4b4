import React, { useContext, useState } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Body, Header, Left, Right, Button, } from 'native-base';
import Svg, { Path } from "react-native-svg"
import { SimpleLineIcons } from '@expo/vector-icons';

import { NavigationContext } from "@react-navigation/native"

export default function PageHeader(props) {
    const [nameWidth, setNameWidth] = useState(1)
    const [nameContainerWidth, setNCW] = useState(0)
    const [showDots, setShowDots] = useState(true)
    const navigation = useContext(NavigationContext);

    const { LeftSideIcon, Title, SVG, rightSideSVG } = props;

    const NavigateToScreen = () => {
        navigation.navigate("IntervalTimer");
    };

    const toogleDrawer = () => {
        // console.log('tdr'  , props.navigation)
        props.navigation.toggleDrawer()

    }

    const TimerSVG =
        <TouchableOpacity onPress={() => NavigateToScreen()}>
            <Svg
                viewBox="0 0 448 512"
                height={20}
                width={20}
                fill='#7b8794'
                style={{ alignSelf: 'center' }}
            >
                <Path d="M393.3 141.3l17.5-17.5c4.7-4.7 4.7-12.3 0-17l-5.7-5.7c-4.7-4.7-12.3-4.7-17 0l-17.5 17.5c-35.8-31-81.5-50.9-131.7-54.2V32h25c6.6 0 12-5.4 12-12v-8c0-6.6-5.4-12-12-12h-80c-6.6 0-12 5.4-12 12v8c0 6.6 5.4 12 12 12h23v32.6C91.2 73.3 0 170 0 288c0 123.7 100.3 224 224 224s224-100.3 224-224c0-56.1-20.6-107.4-54.7-146.7zM224 480c-106.1 0-192-85.9-192-192S117.9 96 224 96s192 85.9 192 192-85.9 192-192 192zm4-128h-8c-6.6 0-12-5.4-12-12V172c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v168c0 6.6-5.4 12-12 12z" />
            </Svg>
            <Text style={{ fontSize: 10, color: '#7b8794' }}>Interval Timer</Text>

        </TouchableOpacity >

    const Navback =
        <SimpleLineIcons name='arrow-left' style={{ fontSize: 18, color: '#7b8794' }} onPress={() => navigation.goBack()} />

    const goHome =
        <SimpleLineIcons name='arrow-left' style={{ fontSize: 18, color: '#7b8794' }} onPress={() => navigation.navigate('HomeScreen')} />

    const nothing =
        <Text></Text>


    const TutorialPage =
        <TouchableOpacity onPress={() => navigation.navigate("Tutorial")}>
            <Svg
                viewBox="0 0 640 512"
                height={17}
                width={17}
                fill='#7b8794'
                style={{ alignSelf: 'center' }}

            >
                <Path d="M608 0H192c-17.67 0-32 14.33-32 32v96c-53.02 0-96 42.98-96 96s42.98 96 96 96 96-42.98 96-96c0-41.74-26.8-76.9-64-90.12V32h416v352h-64v-64c0-17.67-14.33-32-32-32H384c-17.67 0-32 14.33-32 32v64h-46.66c-.59-.94-1.03-1.96-1.65-2.88-17.25-25.62-46.67-39.11-76.9-39.11C199 342.02 192.02 352 160 352c-31.97 0-38.95-9.98-66.79-9.98-30.23 0-59.65 13.48-76.9 39.11C6.01 396.42 0 414.84 0 434.67V472c0 22.09 17.91 40 40 40h240c22.09 0 40-17.91 40-40v-37.33c0-6.41-.84-12.6-2.04-18.67H608c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32zM224 224c0 35.29-28.71 64-64 64s-64-28.71-64-64 28.71-64 64-64 64 28.71 64 64zm64 248c0 4.41-3.59 8-8 8H40c-4.41 0-8-3.59-8-8v-37.33c0-12.79 3.75-25.13 10.85-35.67 10.53-15.64 29.35-24.98 50.36-24.98 21.8 0 29.99 9.98 66.79 9.98 36.79 0 45.01-9.98 66.79-9.98 21 0 39.83 9.34 50.36 24.98 7.1 10.54 10.85 22.88 10.85 35.67V472zm224-88H384v-64h128v64z" />
            </Svg >
            <Text style={{ fontSize: 10, color: '#7b8794' }}>Tutorial</Text>
        </TouchableOpacity >

    const hamburger =
        <TouchableOpacity onPress={toogleDrawer}>
            <Svg
                viewBox="0 0 448 512"
                height={50}
                width={20}
                fill='#7E7E7E'
                style={{ marginLeft: 10 }}
            >
                <Path d="M442 114H6a6 6 0 01-6-6V84a6 6 0 016-6h436a6 6 0 016 6v24a6 6 0 01-6 6zm0 160H6a6 6 0 01-6-6v-24a6 6 0 016-6h436a6 6 0 016 6v24a6 6 0 01-6 6zm0 160H6a6 6 0 01-6-6v-24a6 6 0 016-6h436a6 6 0 016 6v24a6 6 0 01-6 6z" />
            </Svg>
        </TouchableOpacity >

    const isCloseToEnd = ({ layoutMeasurement, contentOffset, contentSize }) => {
        // const paddingToBottom = 20;
        return layoutMeasurement.width + contentOffset.x >=
            contentSize.width;
    };

    const onScroll = ({ nativeEvent }) => {
        if (isCloseToEnd(nativeEvent)) {
            showDots ? setShowDots(false) : null
        } else {
            !showDots ? setShowDots(true) : null
        }
    }

    return (
        <Header style={{ backgroundColor: 'white', borderBottomWidth: 1, shadowOpacity: 0, elevation: 0, borderBottomColor: '#E1E1E1' }}>

            {/* <Left style={{ flex: 1}}> */}
            <Left style={{ flex: 1, paddingLeft: 10 }}>
                <Button transparent>
                    {LeftSideIcon === 'TutorialPage' ? (TutorialPage)
                        : LeftSideIcon === 'goHome' ? (goHome)
                            : LeftSideIcon === 'nothing' ? (nothing)
                                : (Navback)
                    }


                </Button>
            </Left>



            <View style={{ flex: 3, display: 'flex', flexDirection: 'row', alignItems: 'center' }} onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setNCW(width)
            }}>
                <ScrollView style={{ display: nameWidth > nameContainerWidth ? 'flex' : 'none' }} scrollEventThrottle={400} onScroll={onScroll} horizontal>
                    <Text onLayout={(event) => {
                        const { width } = event.nativeEvent.layout;
                        setNameWidth(width)
                    }} style={{ color: '#222', fontFamily: 'ssb_Light', fontSize: 18 }}>{Title}</Text>
                </ScrollView>
                <Text style={{ display: nameWidth <= nameContainerWidth ? 'flex' : 'none', color: '#222', fontFamily: 'ssb_Light', fontSize: 18, width: '100%', textAlign: 'center' }}>{Title}</Text>
                <Text style={{ display: (nameWidth > nameContainerWidth) && showDots ? 'flex' : 'none', paddingLeft: 2 }}>...</Text>
            </View>


            {/* Can't get the svg to align to middle */}
            <Right style={{ flexDirection: 'column', alignItems: 'center' }}  >
                {SVG === 'rightSideSVG' ? (rightSideSVG)
                    : SVG === 'hamburger' ? (hamburger)
                        : (TimerSVG)
                }



            </Right>
        </Header>
    )
}