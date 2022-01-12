
//////////////////// CONFIG APP

import Constants from 'expo-constants';

const isStandAloneApp = Constants.appOwnership == "standalone";

const ConfigApp = {

    // backend url
    URL: "http://app.skulpt.ai/",

    // banner admob unit id
    BANNER_ID: "ca-app-pub-3940256099942544/6300978111",

    // interstitial admob unit id
    INTERSTITIAL_ID: "ca-app-pub-3940256099942544/1033173712",

    // testdevice id, DON'T CHANGE IT
    TESTDEVICE_ID : isStandAloneApp?"EMULATOR" : "EMULATOR"
};

export default ConfigApp;
