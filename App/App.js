import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Updates from 'expo-updates';
import { Root, StyleProvider, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  AppRegistry, Keyboard,
  LogBox, StatusBar, TouchableWithoutFeedback, View, Text as Tx, TouchableOpacity
} from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as Sentry from 'sentry-expo';
import AppPreLoader from '../application/components/AppPreLoader';
import GuestNavigation from '../application/navigations/Guest';
import LoggedNavigation from '../application/navigations/Logged';
import { persistor, store } from '../application/redux/store';


// Native base theme
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/platform';
import { supabase } from '../supabaseClient';
import { AppStyle } from './App.style';
import { increase, pause, start, stop } from '../application/redux/features/counter/counter.slice'

Sentry.init({
  dsn: 'https://c91ee58a43094002ad18059f72fe5045@o1065416.ingest.sentry.io/6057090',
  enableInExpoDevelopment: true,
  tracesSampleRate: 1.0,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});

// console.disableYellowBox = true;
LogBox.ignoreAllLogs(true);
// cacheing all of the images from the asset folders
function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const App = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [loaded, setIsLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  // console.log({ allstate })

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require('../assets/images/logo.png'),
      require('../assets/images/nointernet.png'),
      require('../assets/images/contact.png'),
    ]);

    await Promise.all([...imageAssets]);
  }

  /**
   * supabase auth state listener
   */
  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_IN') {
      setIsLogged(true)
    }
    if (event == 'SIGNED_OUT') {
      setIsLogged(false)
    }
  })

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      componentDidMount()
    }
  }, []);

  const componentDidMount = async () => {
    await checkUpdate();
    await loadFonts();
    checkInitialSession() //TODO:
  }


  /**
   * check initial supabase session 
   */
  const checkInitialSession = () => {
    let session = supabase.auth.session()
    if (session) {
      session.access_token && supabase.auth.setAuth(session.access_token)
      session.refresh_token && supabase.auth.setSession(session.refresh_token)
    }
    setIsLoaded(true)
  }

  const checkUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        // ... notify user of update ...
        await Updates.reloadAsync();
      }
    } catch (e) {
      // handle or log error
      console.log(`update his an error ${e}`);
    }
  }


  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ssb_Bold: require('../assets/font/Source_Sans_Pro/SourceSansPro-Bold.ttf'),
      ssb_Regular: require('../assets/font/Source_Sans_Pro/SourceSansPro-Regular.ttf'),
      ssb_Light: require('../assets/font/Source_Sans_Pro/SourceSansPro-Light.ttf'),
      ssb_SemiBold: require('../assets/font/Source_Sans_Pro/SourceSansPro-SemiBold.ttf'),
      SimpleLineIcons: require('native-base/Fonts/SimpleLineIcons.ttf'),
      Ionicons: require('native-base/Fonts/Ionicons.ttf'),
      'Material Icons': require('native-base/Fonts/MaterialIcons.ttf')
    });
  }

  /**
   * render part
   */
  if (!isReady) {
    return (
      <AppLoading
        startAsync={async () => {
          await _loadAssetsAsync();
        }}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }


  if (!loaded) {
    return <AppPreLoader />;
  }

  if (isLogged && isReady) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <StyleProvider style={getTheme(variables)}>
          <Provider store={store}>
            <PersistGate
              loading={<Text>Loading...</Text>}
              persistor={persistor}
            >
              <MenuProvider>
                <Root>
                  <StatusBar
                    barStyle="dark-content"
                    backgroundColor="white"
                  />
                  <View style={AppStyle.mainContainer}>
                    <LoggedNavigation />
                    {/* <TimerOverlay /> */}
                  </View>

                </Root>
              </MenuProvider>
            </PersistGate>
          </Provider>
        </StyleProvider>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <Root>
        <StatusBar hidden />
        <GuestNavigation />
      </Root>
    );
  }

}

const TimerOverlay = (props) => {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter.value)

  const handelClick = () => {
    if (counter.stop) {
      const timer = setInterval(() => {
        dispatch(increase())
      }, 1000);
      dispatch(start({timer}));
    } else {
      dispatch(stop())
    }
  }

  return (
    <TouchableOpacity onPress={handelClick} style={AppStyle.timerContainer}>
      <Dots />
      <View style={AppStyle.timerTextContainer}>
        <Tx style={AppStyle.timerText}>{counter.sec}</Tx>
        <Tx style={AppStyle.timerSec}>Sec</Tx>
      </View>
    </TouchableOpacity>
  )

}

const Dots = () => {
  return (
    <View style={AppStyle.dotHolder}>
      <View style={AppStyle.dotCol}>
        <View style={AppStyle.dot}></View>
        <View style={AppStyle.dot}></View>
        <View style={AppStyle.dot}></View>
      </View>
      <View style={AppStyle.dotCol}>
        <View style={AppStyle.dot}></View>
        <View style={AppStyle.dot}></View>
        <View style={AppStyle.dot}></View>
      </View>
    </View>
  )
}

export default App

AppRegistry.registerComponent('main', () => App)
