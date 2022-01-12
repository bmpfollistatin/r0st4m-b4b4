//DONE!

import { Container, Text } from "native-base";
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from "react-native-svg";
import YoutubePlayer from 'react-native-youtube-iframe';
import { useNavigation } from 'react-navigation-hooks';
import PageHeader from '../components/PageHeader';

export default function Tutorial(props) {

    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(true);

    const { navigate } = useNavigation();

    const Feedback =

        <TouchableOpacity onPress={() => navigate("Feedback")}>
            <Svg
                viewBox="0 0 576 512"
                height={20}
                width={20}
                fill='#7b8794'
                style={{ alignSelf: 'center' }}

            >
                <Path d="M569.9 441.1c-.5-.4-22.6-24.2-37.9-54.9 27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.4 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.1 2.1 18.4 3.7 28 4.8 31.5 57.5 105.5 98 191.8 98 20.8 0 40.8-2.4 59.8-6.8 28.5 18.5 71.6 38.8 125.2 38.8 9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25zM155.4 314l-13.2-3-11.4 7.4c-20.1 13.1-50.5 28.2-87.7 32.5 8.8-11.3 20.2-27.6 29.5-46.4L83 283.7l-16.5-16.3C50.7 251.9 32 226.2 32 192c0-70.6 79-128 176-128s176 57.4 176 128-79 128-176 128c-17.7 0-35.4-2-52.6-6zm289.8 100.4l-11.4-7.4-13.2 3.1c-17.2 4-34.9 6-52.6 6-65.1 0-122-25.9-152.4-64.3C326.9 348.6 416 278.4 416 192c0-9.5-1.3-18.7-3.3-27.7C488.1 178.8 544 228.7 544 288c0 34.2-18.7 59.9-34.5 75.4L493 379.7l10.3 20.7c9.4 18.9 20.8 35.2 29.5 46.4-37.1-4.2-67.5-19.4-87.6-32.4z" />
            </Svg >
            <Text style={{ fontSize: 10, color: '#7b8794' }}>Feedback</Text>
        </TouchableOpacity >

    return (
        <Container style={styles.background_general}>
            <PageHeader
                Title='Tutorial'
                SVG='rightSideSVG'
                rightSideSVG={Feedback}
            >
            </PageHeader>

            <ScrollView style={styles.background_general}>
                <View style={{ alignItems: 'center' }}>

                    <View style={{ paddingVertical: 10 }}>
                        <Text style={styles.PageText}>General Overview</Text>
                        <YoutubePlayer
                            height={250}
                            width={400}
                            ref={playerRef}
                            videoId={'h59lUTbuE1I'}
                            volume={100}
                            playbackRate={1}
                            playerParams={{
                                cc_lang_pref: "us",
                                showClosedCaptions: true
                            }}
                        />
                    </View>

                    <View style={{ paddingVertical: 10 }}>
                        <Text style={styles.PageText}>Essentials</Text>
                        <YoutubePlayer
                            height={250}
                            width={400}
                            ref={playerRef}
                            videoId={'h59lUTbuE1I'}
                            volume={100}
                            playbackRate={1}
                            playerParams={{
                                cc_lang_pref: "us",
                                showClosedCaptions: true
                            }}
                        />
                    </View>

                    <View style={{ paddingVertical: 10 }}>
                        <Text style={styles.PageText}>Exercise</Text>
                        <YoutubePlayer
                            height={250}
                            width={400}
                            ref={playerRef}
                            videoId={'h59lUTbuE1I'}
                            volume={100}
                            playbackRate={1}
                            playerParams={{
                                cc_lang_pref: "us",
                                showClosedCaptions: true
                            }}
                        />
                    </View>

                    <View>
                        <Text style={styles.PageText}>Workout</Text>
                        <YoutubePlayer
                            height={250}
                            width={400}
                            ref={playerRef}
                            videoId={'h59lUTbuE1I'}
                            volume={100}
                            playbackRate={1}
                            playerParams={{
                                cc_lang_pref: "us",
                                showClosedCaptions: true
                            }}
                        />
                    </View>

                    <View style={{ paddingVertical: 10 }}>
                        <Text style={styles.PageText}>Workout Plan</Text>
                        <YoutubePlayer
                            height={250}
                            width={400}
                            ref={playerRef}
                            videoId={'h59lUTbuE1I'}
                            volume={100}
                            playbackRate={1}
                            playerParams={{
                                cc_lang_pref: "us",
                                showClosedCaptions: true
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </Container >
    )
}

const styles = StyleSheet.create({
    background_general: {
        backgroundColor: 'hsl(50, 100%, 100%)',
        // alignItems: 'center',
        // justifyContent: 'center', 
    },
    PageText: {
        // paddingLeft: 3,
        // width: 350,
        // marginHorizontal: 10,
        // marginRight: 30,
        fontSize: 18,
        // textAlign: 'center'
        marginBottom: 5,
        letterSpacing: 2,
        color: '#222'
    },
    SideBySide: {
        // flexDirection: 'row',
        // padding: 20,
        // justifyContent: 'space-between',
        // paddingVertical: 10,

    },
})
