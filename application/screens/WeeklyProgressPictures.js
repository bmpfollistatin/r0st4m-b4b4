import { Container, Text } from "native-base";
import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import CustomButton from "../components/Button";
import PageHeader from '../components/PageHeader';
var styles = require('../../assets/files/Styles');
export default function WeeklyProgressPictures(props) {
    const navigationOptions = {
        title: `Weekly Progress Pictures`
    };

    const navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
        });
        this.props.navigation.dispatch(navigateAction);
    }

    return (
        <Container style={styles.background_general}>

            <PageHeader
                // NavigationProp="IntervalTimer"
                // RightSideProp='Create Cardio'
                // SVG={tmpSvg}
                Title='Weekly Progress Pictures'
            >
            </PageHeader>


            <View style={{ padding: 15, justifyContent: 'center' }}>
                {/* old working instructions */}
                {/* <Text style={{ paddingVertical: 5 }}>1) Check-in at least once a week <Text style={{textDecorationLine: 'underline' }}>first thing in the morning</Text></Text>
                    <Text style={{ paddingVertical: 5 }}>2) Wake up, use the bathroom, take your checkin pictures.</Text>
                    <Text style={{ paddingVertical: 5 }}>3) Do NOT drink water, eat, or take a shower. You want a consistent state of your body!</Text> */}
                {/* </View> */}
                {/* <Text style={{ paddingVertical: 5 }}>1) At least once a week <Text style={{textDecorationLine: 'underline' }}>first thing in the morning</Text></Text> */}
                {/* <Text style={{ paddingVertical: 5 }}>2) use the bathroom</Text> */}
                {/* <Text style={{ paddingVertical: 5 }}>3) Do NOT drink, eat, or take a shower. You want a consistent state of your body!</Text> */}
            </View>

            <View style={[styles.centerItem, styles.instructionBox1]}>
                <View style={styles.marginCenter}>
                    <Text style={[styles.boldTitle, styles.Red]}>Follow these instructions!</Text>
                    <Text style={styles.fivepadding}>Checkin:{"\n"}
                        {'\u2022'} At least once a week{"\n"}
                        {'\u2022'} First thing in the morning{"\n"}
                        {'\u2022'} After using the bathroom{"\n"}
                        {'\u2022'} Do NOT drink, eat, or take a shower {"\n"}</Text>
                </View>
            </View>

            <View style={[styles.centerItem, styles.instructionBox2]}>
                <View style={styles.marginCenter}>
                    <Text style={[styles.boldTitle, styles.Red]}>Have The Same:</Text>
                    {/* <Text style={styles.fivepadding}>Have the Same:{"\n"} */}
                    <Text style={styles.fivepadding}>
                        {'\u2022'} Background{"\n"}
                        {'\u2022'} Lighting{"\n"}
                        {'\u2022'} Pose (Flex and align within the overlay) {"\n"}</Text>
                </View>
            </View>


            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>

                {/* <TouchableWithoutFeedback onPress={this.navigateToScreen('FrontPicCameraPage')}>
                        <View style={styles.imageWrapper} onPress={this.navigateToScreen('FrontPicCameraPage')}>
                            <Text style={[styles.centerItem, styles.fivePadding, styles.boldTitle, styles.HOneTitles, { fontSize: 27 }]} onPress={this.navigateToScreen('CameraPage')}>Front Picture</Text>
                            <Feather name='camera' size={65} style={styles.centerItem} />
                        </View>
                    </TouchableWithoutFeedback> */}

                <CustomButton type='large-primary' text='Start'
                    onPress={navigateToScreen('FrontPicCameraPage')}
                />
            </View>
        </Container>
    )

}
