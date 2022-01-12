import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { Body, Button, Container, Form, Header, Input, Item, Left, Right, Text, Title, Toast, View } from 'native-base';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Image } from 'react-native-svg';
import sculp from '../../assets/images/sculp.png';
import Strings from '../utils/Strings';
var styles = require('../../assets/files/Styles');

function ForgotPass(props) {
	const navigationOptions = {
		headerShown: false
	};

	const [email, setEmail] = useState('')

	const restpass = () => {
		if (email) {
			firebase.auth().sendPasswordResetEmail(email).then(() => {
				Toast.show({ text: `${Strings.ST34}`, position: 'bottom' })
			}).catch((e) => {
				if (e.code == 'auth/user-not-found') {
					Toast.show({ text: `${Strings.ST31}`, position: 'bottom', buttonText: `${Strings.ST33}` })
				} else {
					Toast.show({ text: `${Strings.ST32}`, position: 'bottom', buttonText: `${Strings.ST33}` })
				}
			});
		}
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
						<Title style={{ color: '#000000' }}>{Strings.ST29}</Title>
					</Body>
					<Right style={{ flex: 1 }} />
				</Header>
				<Body>
					<ScrollView>
						<KeyboardAvoidingView
							behavior={Platform.OS == "ios" ? "padding" : "height"}
							style={styles.Keyboardcontainer}
						>

							<View style={{ flex: 0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
								<Svg
									width={287 / 2}
									height={584.5 / 2}
									viewBox="0 0 287 584"
								>
									<Image
										x={30}
										y={64}
										width={460 / 2}
										height={1030 / 2}
										href={sculp}
									/>
								</Svg>

								<Text><Text style={{ color: '#cf1124', fontSize: 30, fontWeight: 'bold' }}>Sculp</Text></Text>

								<View style={{ paddingTop: 10 }}>
									<Form>

										<Item rounded style={styles.inputLogin}>
											<Ionicons name="md-mail" style={{ fontSize: 18, marginLeft: 18, marginRight: 5, color: '#a4a4a4' }} />
											<Input selectionColor='#00492F' value={email} onChangeText={email => setEmail(email)} placeholder={Strings.ST104} placeholderTextColor="#a4a4a4" style={{ fontSize: 16, color: '#a4a4a4' }} autoCapitalize="none" />
										</Item>

									</Form>

									<Button rounded block onPress={restpass} style={styles.button_auth}>
										<Text>Recover Password</Text>
									</Button>

									<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.text_auth} activeOpacity={1}>
										<Text style={styles.text_auth}>{Strings.ST35}</Text>
									</TouchableOpacity>


								</View>
							</View>

						</KeyboardAvoidingView>
					</ScrollView>

				</Body>
			</Container>
		)
	
}

export default ForgotPass