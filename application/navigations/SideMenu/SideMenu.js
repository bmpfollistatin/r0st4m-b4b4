import { Body, ListItem, Text } from 'native-base';
import React from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import Svg, { Image } from 'react-native-svg';
import { supabase } from '../../../supabaseClient';
import { SmStyles } from './SideMenu.style';

const MenuItem = (props) => {
    return (
        <ListItem style={SmStyles.item_menu} onPress={props.onPress}>
            <Body>
                <Text style={SmStyles.item_menu}>{props.title}</Text>
            </Body>
        </ListItem>
    )
}

const SideMenu = (props) => {
    const navigateToScreen = (route) => () => {
        props.navigation.navigate(route)
    }

    const createTwoButtonAlert = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        supabase.auth.signOut()
                    }
                }
            ],
            { cancelable: true }
        );
    }

    return (
        <View style={SmStyles.container_menu}>
            <TouchableOpacity onPress={navigateToScreen('HomeScreen')}>
                <View style={SmStyles.topItemContainer}>
                    <Svg
                        width={287 / 2.5}
                        height={620.5 / 2.5}
                        viewBox="0 0 574 1241"
                    >
                        <Image
                            x={57}
                            y={27}
                            width={460}
                            height={1198}
                            href={require('../../../assets/images/logo.png')}
                        />
                    </Svg>
                </View>
            </TouchableOpacity>

            <ScrollView>
                <MenuItem title="History" onPress={navigateToScreen('WorkoutHistoryScreen')} />
                <MenuItem title="Exercises" onPress={navigateToScreen('ListAndSearchExercises')} />
                <MenuItem title="Workouts" onPress={navigateToScreen('ListAndSearchWorkouts')} />
                <MenuItem title="Workout Plans" onPress={navigateToScreen('ListAndSearchWorkoutPlans')} />
                <MenuItem title="Progress Pics" onPress={navigateToScreen('ProgressPictures')} />
                <MenuItem title="Give Feedback" onPress={navigateToScreen('Feedback')} />
                <MenuItem title="Equipments" onPress={navigateToScreen('Equipments')} />
            </ScrollView>

            {/* Sign out text */}
            <View style={SmStyles.footer_menu}>
                <TouchableOpacity onPress={createTwoButtonAlert}>
                    <Text style={SmStyles.logout_text}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SideMenu;