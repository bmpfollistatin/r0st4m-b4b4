import {
    createDrawerNavigator, DrawerContentScrollView
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import LogoutScreen from "../screens/auth/Logout";
import BackPicCameraPage from "../screens/BackPicCameraPage";
import CardioScreen from "../screens/Cardio";
import CreateCardio from "../screens/CreateCardio";
import CreateExercise from "../screens/createExercies/CreateExercise";
import CreateWorkout from "../screens/createWorkout/CreateWorkout";
import { Equipments } from '../screens/equipments/equipments';
import Exercises from '../screens/exercieses/ListAndSearchExercises';
import Feedback from '../screens/Feedback';
import FrontPicCameraPage from "../screens/FrontPicCameraPage";
import HomeScreen from '../screens/Home';
import TimerScreen from "../screens/IntervalTimer";
import ListAndSearch from '../screens/ListAndSearch';
import PreviewWorkoutScreen from "../screens/PreviewWorkout";
import ProfileScreen from "../screens/Profile";
import ProgressPictures from "../screens/progressPic/ProgressPictures";
import runningTimerScreen from "../screens/runningTimer";
import SetsAndRepsScreen from "../screens/SetsAndReps";
import StartedWorkoutScreen from "../screens/StartedWorkout";
import Tutorial from '../screens/Tutorial';
import WeeklyProgressPictures from "../screens/WeeklyProgressPictures";
import WorkoutHistoryDetail from '../screens/WorkoutHistoryDetail';
import WorkoutHistoryScreen from '../screens/WorkoutHistoryScreen';
import CreateWorkoutPlan from '../screens/workoutPlan/CreateWorkoutPlan';
import ListAndSearchWorkoutPlans from '../screens/workoutPlan/ListAndSearchWorkoutPlans';
import ListAndSearchWorkouts from '../screens/workouts/ListAndSearchWorkouts';
import { LogStyle } from './Logged.style';
import SideMenu from './SideMenu/SideMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const so = { headerShown: false } //screen option

const leftIcon = (navigation) => {
    return (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Svg
                viewBox="0 0 448 512"
                height={50}
                width={20}
                fill='#7E7E7E'
                style={LogStyle.leftIcon}
            >
                <Path d="M442 114H6a6 6 0 01-6-6V84a6 6 0 016-6h436a6 6 0 016 6v24a6 6 0 01-6 6zm0 160H6a6 6 0 01-6-6v-24a6 6 0 016-6h436a6 6 0 016 6v24a6 6 0 01-6 6zm0 160H6a6 6 0 01-6-6v-24a6 6 0 016-6h436a6 6 0 016 6v24a6 6 0 01-6 6z" />
            </Svg>
        </TouchableOpacity >
    )
}

function RootStack(props) {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            defaultScreenOptions={{
                headerStyle: LogStyle.headerStyle,
                headerBackTitle: null,
                headerTintColor: 'black',
                headerTitleStyle: LogStyle.headerTitleStyle,
            }}
        >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerLeft: () => leftIcon(navigation), headerShown: false }}
            />

            <Stack.Screen name="ListAndSearch" component={ListAndSearch} options={so} />
            <Stack.Screen name="ListAndSearchWorkoutPlans" component={ListAndSearchWorkoutPlans} options={so} />
            <Stack.Screen name="ListAndSearchWorkouts" component={ListAndSearchWorkouts} options={so} />
            <Stack.Screen name="ListAndSearchExercises" component={Exercises} options={so} />
            <Stack.Screen name="WorkoutHistoryScreen" component={WorkoutHistoryScreen} options={so} />
            <Stack.Screen name="WorkoutHistoryDetail" component={WorkoutHistoryDetail} options={so} />
            <Stack.Screen name="WeeklyProgressPictures" component={WeeklyProgressPictures} options={so} />
            <Stack.Screen name="FrontPicCameraPage" component={FrontPicCameraPage} options={so} />
            <Stack.Screen name="BackPicCameraPage" component={BackPicCameraPage} options={so} />
            <Stack.Screen name="CreateWorkoutPlan" component={CreateWorkoutPlan} options={so} />
            <Stack.Screen name="CreateWorkout" component={CreateWorkout} options={so} />
            <Stack.Screen name="CreateExercise" component={CreateExercise} options={so} />
            <Stack.Screen name="CreateCardio" component={CreateCardio} options={so} />
            <Stack.Screen name="Cardio" component={CardioScreen} options={so} />
            <Stack.Screen name="IntervalTimer" component={TimerScreen} options={so} />
            <Stack.Screen name="runningTimer" component={runningTimerScreen} options={so} />
            <Stack.Screen name="PreviewWorkout" component={PreviewWorkoutScreen} options={so} />
            <Stack.Screen name="StartedWorkout" component={StartedWorkoutScreen} options={so} />
            <Stack.Screen name="ProgressPictures" component={ProgressPictures} options={so} />
            <Stack.Screen name="SetsAndReps" component={SetsAndRepsScreen} options={so} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={so} />
            <Stack.Screen name="LogoutScreen" component={LogoutScreen} options={so} />
            <Stack.Screen name="Feedback" component={Feedback} options={so} />
            <Stack.Screen name="Tutorial" component={Tutorial} options={so} />
            <Stack.Screen name="Equipments" component={Equipments} options={so} />
        </Stack.Navigator>
    );
}

function LoggedNavigation(props) {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={(props) =>
                    <DrawerContentScrollView {...props}>
                        <SideMenu {...props} />
                    </DrawerContentScrollView>
                }
                screenOptions={{
                    headerShown: false,
                    drawerPosition: 'right',
                    drawerStyle: { width: 200 },
                    overlayColor: 'rgba(0, 73, 46, 0.2)',

                }}>
                <Drawer.Screen name="Home" component={RootStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default LoggedNavigation