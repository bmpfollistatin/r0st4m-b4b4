import { BlurView } from 'expo-blur';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Container, Toast } from 'native-base';
import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, Platform, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import apple from '../../../assets/images/apple.png';
import _email from '../../../assets/images/email.png';
import fb from '../../../assets/images/facebook.png';
import google from '../../../assets/images/google.png';
import sculp from '../../../assets/images/sculp_login.jpeg';
import { supabase } from '../../../supabaseClient';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { Lstyle } from './Login.style';

var styles = require('../../../assets/files/Styles');

const h = Dimensions.get('screen').height
const w = Dimensions.get('screen').width
export default function LoginNew(props) {
	const [step, setStep] = useState(0)
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")
	const [hiden, setHiden] = useState(true)

	const loginWithFacebook = async () => {
		const sur = await supabase.auth.signIn({
			provider: 'facebook'
		})
		let result = await WebBrowser.openAuthSessionAsync(sur.url)
		if (result.type == 'success' && result.url) {
			let queries = String(result.url).split(Linking.createURL("/#"))[1].split('&');
			let qObj = {}
			queries.map(i => {
				qObj[i.split("=")[0]] = i.split("=")[1]
			})
			qObj.access_token && supabase.auth.setAuth(qObj.access_token);
			qObj.refresh_token && supabase.auth.setSession(qObj.refresh_token);
		}
	}

	const emailAuthentication = () => {
		console.log({ email: email, pass: pass })
		// if(email.trim() == "" || pass.trim() == ""){
		// 	Toast.show({text: 'please enter email and password' , type: 'warning'})
		// 	return;
		// }
		supabase.auth.signIn({ email: email, password: pass }).then((res) => {
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
			Toast.show({ text: `welcome back ${res.user.user_metadata.name}`, duration: 2000, position: 'bottom', type: 'success' })
		}).catch(e => {
			console.log({ e })
			Toast.show({ text: e.message ? e.message : "Something Wrong!\nplease try again", position: 'bottom', buttonText: 'Try Again' })
		})
	}

	const appleAuthentice = async () => {
		const sur = await supabase.auth.signIn({
			provider: 'apple'
		})
		console.log({ sur })
		let result = await WebBrowser.openAuthSessionAsync(sur.url)
		console.log({ result })
		// try {
		// 	AppleAuthentication.signInAsync({
		// 		requestedScopes: [
		// 			AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
		// 			AppleAuthentication.AppleAuthenticationScope.EMAIL,
		// 		],
		// 	}).then(credentials => {
		// 		console.log('apple credentials', { credentials })
		// 		const { identityToken } = credentials;
		// 		const provider = new firebase.auth.OAuthProvider('apple.com');
		// 		const credential = provider.credential({
		// 			idToken: identityToken,
		// 			rawNonce: nonce
		// 		});
		// 		return firebase.auth().signInWithCredential(credential);
		// 	}).catch((error) => {
		// 		console.log('apple - firebase login error', error)
		// 	});
		// } catch (e) {
		// 	if (e.code === 'ERR_CANCELED') {
		// 		console.log('user canceled!', e)
		// 	} else {
		// 		console.log('apple auth failed', e)
		// 	}
		// }
	}

	const googleAuthenticate = async () => {
		const sur = await supabase.auth.signIn({
			provider: 'google'
		})
		let result = await WebBrowser.openAuthSessionAsync(sur.url)
		if (result.url) {
			let queries = String(result.url).split(Linking.createURL("/#"))[1].split('&');
			let qObj = {}
			queries.map(i => {
				qObj[i.split("=")[0]] = i.split("=")[1]
			})
			qObj.access_token && supabase.auth.setAuth(qObj.access_token);
			qObj.refresh_token && supabase.auth.setSession(qObj.refresh_token);
		}
	}

	const loginCard = (src, text, on, hide) => {
		if (!hide) {
			return (
				<TouchableOpacity onPress={on} style={{ height: 50, paddingLeft: 15, paddingRight: 15, width: 0.8 * w, borderRadius: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', margin: 10, marginLeft: 20, marginRight: 20 }}>
					<Image style={{ height: 25, width: 25 }} source={src} />
					<Text style={{ fontWeight: '800', fontSize: 15, flex: 1, textAlign: 'center' }}>{text}</Text>
				</TouchableOpacity>
			)
		}
	}

	return (
		<Container style={{ backgroundColor: '#f2f2f2' }}>

			<ImageBackground
				resizeMode='stretch'
				source={sculp}
				style={Lstyle.imageBackground}
			>
				<View style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15, overflow: 'hidden' }}>
					<BlurView style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15 }} tint="dark" intensity={70} style={styles.blurContainer}>
						{
							step == 0 && <View
								style={Lstyle.step_container}
							>
								<View style={{ width: 0.8 * w, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', marginTop: 20, marginLeft: 20, marginRight: 20 }}>
									<TextInput value={email} onChangeText={setEmail} style={{ width: '100%', fontSize: 20, backgroundColor: '#fff', height: 49, borderRadius: 10, borderWidth: 1, borderColor: '#F5F7F675', paddingLeft: 10, paddingRight: 10 }} placeholder='Email' placeholderTextColor={'#C4C4C4'} />
									<TouchableOpacity onPress={() => setStep(1)} style={{ height: 40, width: '100%', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00492F', margin: 10, marginLeft: 20, marginRight: 20 }}>
										<Text style={{ fontSize: 20, textAlign: 'center', color: '#F6F6F6' }}>{"Continue"}</Text>
									</TouchableOpacity>
								</View>
								<Text style={{ fontSize: 17, color: '#C4C4C4', width: '100%', textAlign: 'center', textAlignVertical: 'center' }}>or</Text>
								{loginCard(fb, 'Continue with Facebook', loginWithFacebook)}
								{loginCard(google, 'Continue with Google', googleAuthenticate)}
								{loginCard(apple, 'Continue with Apple', appleAuthentice, Platform.OS != 'ios')}
							</View>
						}

						{step == 1 && <View
							style={Lstyle.step_container}
						>
							<View style={Lstyle.step1_subcontainer}>
								<TextInput value={email} onChangeText={setEmail} style={Lstyle.emailAuth_email} placeholder='Email' placeholderTextColor={'#C4C4C4'} />
								<View style={Lstyle.emailAuth_password_container}>
									<TextInput secureTextEntry={hiden} value={pass} onChangeText={setPass} style={Lstyle.emailAuth_password} placeholder='Password' placeholderTextColor={'#C4C4C4'} />
									<Ionicons name={hiden ? 'md-eye' : 'md-eye-off'} size={25} style={{ position: 'absolute', right: 5, top: 12, bottom: 12 }} onPress={() => setHiden(!hiden)} />
								</View>
								<TouchableOpacity onPress={emailAuthentication} style={{ height: 40, width: '100%', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00492F', margin: 10, marginLeft: 20, marginRight: 20 }}>
									<Text style={{ fontSize: 20, textAlign: 'center', color: '#F6F6F6' }}>{"Continue"}</Text>
								</TouchableOpacity>
							</View>
						</View>}
					</BlurView>
				</View>

				<SimpleLineIcons name='arrow-left' style={{ display: step == 1 ? 'flex' : 'none', position: 'absolute', top: 25, left: 25 }} onPress={() => setStep(0)} />
			</ImageBackground>
		</Container>
	);
}