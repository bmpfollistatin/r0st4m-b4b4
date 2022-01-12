import React, { useEffect} from 'react';
import ConfigApp from '../utils/ConfigApp';
import {AdMobInterstitial} from 'expo-ads-admob';

function InterstitialAd(props){
  useEffect(()=> {
    _loadInitialState().done();
  },[])
  const _loadInitialState = async () => {
    AdMobInterstitial.setAdUnitID(ConfigApp.INTERSTITIAL_ID); // Test ID, Replace with your-admob-unit-id
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  };
}

// class InterstitialAd extends React.Component {
//   componentDidMount() {
//     this._loadInitialState().done();
//   }
//   _loadInitialState = async () => {
//     AdMobInterstitial.setAdUnitID(ConfigApp.INTERSTITIAL_ID); // Test ID, Replace with your-admob-unit-id
//     AdMobInterstitial.setTestDeviceID('EMULATOR');
//     await AdMobInterstitial.requestAdAsync();
//     await AdMobInterstitial.showAdAsync();
//   };
// }

export default InterstitialAd;
