import { SimpleLineIcons } from '@expo/vector-icons';
import { Body, Button, Container, Header, Left, Right, Text, Title, View } from 'native-base';
import React from 'react';
import { Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
var styles = require('../../../assets/files/Styles');

export default function EmailAuth(props) {
	const navigationOptions = {
		headerShown: false
	};

	const login = () => {
		const navigateAction = NavigationActions.navigate({
			routeName: 'Login'
		});
		props.navigation.dispatch(navigateAction);
	}

	const register = () => {
		const navigateAction = NavigationActions.navigate({
			routeName: 'Register'
		});
		props.navigation.dispatch(navigateAction);
	}

	return (
		<Container style={{ backgroundColor: '#f2f2f2' }}>
			<Header style={{ backgroundColor: '#f2f2f2', borderBottomWidth: 0, shadowOpacity: 0, elevation: 0, }}>
				<Left style={{ flex: 1 }}>
					<Button transparent>
						<SimpleLineIcons name='arrow-left' style={{ fontSize: 18 }} onPress={() => props.navigation.goBack()} />
					</Button>
				</Left>
				<Body style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
					<Title style={{ color: '#222' }}>Email Authentication</Title>
				</Body>
				<Right style={{ flex: 1 }} />
			</Header>
			<Body>
				<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
					<Image source={require('../../../assets/images/logo.png')} style={styles.logo_start} resizeMode="contain" />
					<Text style={{ textAlign: 'center' }}>The registeration is used to backup your logged workouts...which is in progress.</Text>
					<View style={{ height: 15 }} />
					<Button rounded block onPress={login} style={styles.button_start} activeOpacity={1}>
						<Text style={{ color: '#222222', fontWeight: 'bold', fontSize: 14 }}>LOG IN</Text>
					</Button>
					<Button rounded block onPress={register} style={styles.button_start} activeOpacity={1}>
						<Text style={{ color: '#222222', fontWeight: 'bold', fontSize: 14 }}>SIGN UP</Text>
					</Button>
				</View>
			</Body>
		</Container>
	);
}