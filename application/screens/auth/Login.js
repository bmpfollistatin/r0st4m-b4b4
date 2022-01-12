import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { Body, Button, Container, Form, Header, Input, Item, Left, Right, Text, Title, Toast, View } from 'native-base';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Image } from 'react-native-svg';
import { NavigationActions } from 'react-navigation';
import sculp from '../../../assets/images/sculp.png';
import { supabase } from '../../../supabaseClient';
var styles = require('../../../assets/files/Styles');
export default function Login(props) {
	const navigationOptions = {
		headerShown: false
	};
	const [hidden, setHidden] = useState(true)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const login = () => {
		console.log('login')
		if (email, password) {
			supabase.auth.signIn({ email: email, password: password }).then((res) => {
				console.log({ res })
				if (res.error) {
					Toast.show({
						text: res.error.message,
						duration: 3000,
						type: 'danger',
						position: 'bottom'
					})
					return
				}
				res.session.refresh_token && supabase.auth.setSession(res.session.refresh_token);
				res.session.access_token && supabase.auth.setAuth(res.session.access_token);
				Toast.show({text: `welcome back ${res.user.user_metadata.name}` , duration: 2000 , position: 'bottom' , type: 'success'})
			}).catch(e => {
				console.log({ e })
				Toast.show({ text: e.message ? e.message : "Something Wrong!\nplease try again", position: 'bottom', buttonText: 'Try Again' })
			})
		}
	}

	const forgetpass = () => {
		const navigateAction = NavigationActions.navigate({
			routeName: 'ForgetPass'
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
					<Title style={{ color: '#222' }}>Log In</Title>
				</Body>
				<Right style={{ flex: 1 }} />
			</Header>

			<Body>
				<ScrollView>
					<KeyboardAvoidingView
						behavior={Platform.OS == "ios" ? "padding" : "height"}
						style={styles.Keyboardcontainer}
					>
						<View>
							<Text style={{ paddingBottom: 10 }}>
								<Svg
									width={287 / 2}
									height={584.5 / 2}
									viewBox="0 0 287 584"
								>
									<Image
										x={30}
										y={84}
										width={460 / 2}
										height={1030 / 2}
										href={sculp}
									/>

								</Svg>
								<Text><Text style={{ color: '#cf1124', fontSize: 30, fontWeight: 'bold' }}>Sculp</Text> Your Body!</Text>
							</Text>
							<Form>
								<Item rounded style={styles.inputLogin}>
									<Ionicons name="md-mail" style={{ fontSize: 18, marginLeft: 18, marginRight: 5, color: '#a4a4a4' }} />
									<Input selectionColor='#00492F' onChangeText={email => setEmail(email)} placeholder='Email' placeholderTextColor="#a4a4a4" style={{ fontSize: 16, color: '#222' }} autoCapitalize="none" />
								</Item>

								<Item rounded style={styles.inputLogin}>
									<Ionicons name="md-lock-closed" style={{ fontSize: 18, marginLeft: 18, marginRight: 5, color: '#a4a4a4' }} />
									<Input selectionColor='#00492F' onChangeText={password => setPassword(password)} placeholder='Password' placeholderTextColor="#a4a4a4" style={{ fontSize: 16, color: '#222' }} secureTextEntry={hidden} autoCapitalize="none" />
									<TouchableOpacity onPress={() => setHidden(!hidden)}>
										<Text style={{ marginRight: 15 }}>{hidden === false ? 'Hide' : 'Show'}</Text>
									</TouchableOpacity>
								</Item>

							</Form>
						</View>
						<View>
							<Button rounded block onPress={login} style={styles.button_auth}>
								<Text>Enter</Text>
							</Button>
							<TouchableOpacity onPress={forgetpass} style={styles.text_auth} activeOpacity={1}>
								<Text style={styles.text_auth}>Forgot Password?</Text>
							</TouchableOpacity>
						</View>
					</KeyboardAvoidingView>
				</ScrollView>
			</Body>
		</Container>
	);
}