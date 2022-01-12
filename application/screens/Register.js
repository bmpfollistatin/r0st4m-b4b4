import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { Body, Button, Container, Form, Header, Input, Item, Left, Right, Text, Title, Toast, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { supabase } from '../../supabaseClient';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
var styles = require('../../assets/files/Styles');

export default function Register(props) {
  const navigationOptions = {
    headerShown: false
  };
  const [mounted, setMounted] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [swipeToClose, setSwipeToClose] = useState(false)
  const [sliderValue, setSliderValue] = useState(0.3)
  const [dataSource, setDataSource] = useState(null)
  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      fetch(ConfigApp.URL + 'json/data_strings.php')
        .then((response) => response.json())
        .then((responseJson) => {
          setIsLoading(false)
          setDataSource(responseJson)
        })
        .catch((error) => {
          console.error({ src: 'Register.js', error });
        });
    }
  }, []);

  const register = () => {
    if (name, email, password) {
      const errorHandler = ((e) => {
        console.log(e);
        if (e.code == 'auth/email-already-in-use') {
          Toast.show({ text: 'Email already exists', position: 'bottom', buttonText: 'Try Again' })
        } else {
          Toast.show({ text: e.message ? e.message : "Something Wrong!\nplease try again", position: 'bottom', buttonText: 'Try Again' })
        }
      })
      console.log('register')
      supabase.auth.signUp({ email: email, password: password, provider: 'email' }, {
        data: {
          name: name
        }
      }).then(res => {
        console.log(res)
        if (res.session) {
          r.session.access_token && supabase.auth.setAuth(r.session.access_token)
          r.session.refresh_token && supabase.auth.setSession(r.session.refresh_token)
          return;
        }
        if (res.user.aud == "authenticated") {
          Toast.show({
            type: 'warning',
            text: 'this email registered before!',
            duration: 3000,
            position: 'bottom'
          })
        }
      }).catch(e => {
        console.log(e)
        Toast.show({ text: e.message ? e.message : "Something Wrong!\nplease try again", position: 'bottom', buttonText: 'Try Again' })
      })
    }
  }

  const validateEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setEmail(email)
    return reg.test(email) === true;
  }

  const validatePass = (password) => {
    setPassword(password)
    return String(password).trim().length < 6
  }

  const terms = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'TermsGuest'
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
          <Title style={{ color: '#000000' }}>{Strings.ST27}</Title>
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>

      <Body>
        <ScrollView>
          {/* height for andoird failed...that was in production...stick to padding */}
          <KeyboardAvoidingView
            behavior={"padding"}
            style={styles.Keyboardcontainer}
          >
            <View style={{ flex: 0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 30 }}>
              <Image source={require('../../assets/images/logo.png')} style={styles.logo_start} resizeMode="contain" />
              <Form>
                <Item rounded style={styles.inputLogin}>
                  <Ionicons name="md-person" style={{ fontSize: 18, marginLeft: 18, marginRight: 5, color: '#a4a4a4' }} />
                  <Input selectionColor='#00492F' onChangeText={name => setName(name)} placeholder='Full Name' placeholderTextColor="#a4a4a4" style={{ fontSize: 16, color: '#222222' }} />
                </Item>

                <Item rounded style={styles.inputLogin}>
                  <Ionicons name="md-mail" style={{ fontSize: 18, marginLeft: 18, marginRight: 5, color: '#a4a4a4' }} />
                  <Input selectionColor='#00492F' onChangeText={(email) => validateEmail(email)} value={email} placeholder='Email' placeholderTextColor="#a4a4a4" style={{ fontSize: 16, color: '#222222' }} autoCapitalize="none" />
                </Item>

                <Item rounded style={styles.inputLogin}>
                  <Ionicons name="md-lock-closed" style={{ fontSize: 18, marginLeft: 18, marginRight: 5, color: '#a4a4a4' }} />
                  {/* show and hides passwords */}
                  <Input selectionColor='#00492F' onChangeText={(password) => validatePass(password)} value={password} placeholder='Password' placeholderTextColor="#a4a4a4" style={{ fontSize: 16, color: '#222222' }} secureTextEntry={!isVisible} autoCapitalize="none" />
                  <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                    <Text style={{ marginRight: 15 }}>{isVisible ? 'Hide' : 'Show'}</Text>
                  </TouchableOpacity>
                </Item>

              </Form>
              <Button rounded block onPress={register} style={styles.button_auth}>
                <Text>{Strings.ST28}</Text>
              </Button>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Body>

    </Container>
  )

}
