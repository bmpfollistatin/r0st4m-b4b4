import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import ForgetPassScreen from "../screens/ForgetPass";
import LoginScreen from "../screens/auth/Login";
import LoginNew from "../screens/auth/Login-new";
import RegisterScreen from "../screens/Register";
import EmailAuth from "../screens/auth/EmailAuth";
import TermsGuestScreen from "../screens/TermsGuest";

const RootStack = createStackNavigator(

	{
		
		Start: {
			screen: LoginNew,
			navigationOptions: {
				headerShown: false
			}
		},
		EmailAuth: {
			screen: EmailAuth,
			navigationOptions: {
				headerShown: false
			}
		},
		Login: {
			screen: LoginScreen,
			navigationOptions: {
				headerShown: false
			}
		},
		Register: {
			screen: RegisterScreen,
			navigationOptions: {
				headerShown: false
			}
		},
		ForgetPass: {
			screen: ForgetPassScreen
		},
		TermsGuest: {
			screen: TermsGuestScreen
		},
	},
	{
		initialRouteName: 'Start',
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#ffffff',
				borderWidth: 0,
				borderBottomWidth: 0
			},
			headerTintColor: '#2e2694',
			headerTitleStyle: {
				textAlign: 'center',
				alignSelf: 'center',
				fontSize: 20,
				color: '#333333',
				fontWeight: 'bold',
			}
		},

	}
)

export default createAppContainer( RootStack )