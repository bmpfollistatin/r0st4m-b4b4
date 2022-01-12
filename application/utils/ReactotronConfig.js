// // import Reactotron from 'reactotron-react-native';
// // import { reactotronRedux } from 'reactotron-redux';
// const host = '192.168.1.191'


// // // WITHOUT REDUX BUT WORKING
// // Reactotron
// //     .setAsyncStorageHandler() // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
// //     .configure({ host}) // controls connection & communication settings
// //     .useReactNative() // add all built-in react native plugins
// //     .connect() // let's connect!


// // // from easy peasy and it's working but the store is not connected yet
// // // const reactotronConfig = {
// // //     initiate: () => {
// // //         Reactotron.configure({ host })
// // //             .useReactNative({
// // //                 storybook: true
// // //             })
// // //             .use(reactotronRedux())
// // //             .connect();
// // //     },
// // //     createEnhancer: () => Reactotron.createEnhancer()
// // // };

// // // export default reactotronConfig;
// // export default Reactotron;



// // working right now with react native
// import Reactotron from "reactotron-react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { reactotronRedux } from 'reactotron-redux'


// // Reactotron.setAsyncStorageHandler(AsyncStorage)
// //     .configure({
// //         name: "Reactotron In Expo demo",
// //     })
// //     .useReactNative({
// //         asyncStorage: false,
// //         networking: {
// //             ignoreUrls: /symbolicate|127.0.0.1/,
// //         },
// //         editor: false,
// //         errors: { veto: stackFrame => false },
// //         overlay: false,
// //     })
// //     .use(reactotronRedux())
// //     .connect();

// const reactotron = Reactotron
//     .setAsyncStorageHandler(AsyncStorage)
//     .configure({ name: 'sculp' })
//     .useReactNative()
//     .use(reactotronRedux()) //  <- here i am!
//     .connect() //Don't forget about me!

// export default reactotron


//     // trying to connect it with redux
// // const reactotronConfig = {
// //     initiate: () => {
// //         Reactotron.setAsyncStorageHandler(AsyncStorage)
// //             .configure({
// //                 name: "Reactotron In Expo demo",
// //             })
// //             .useReactNative({
// //                 asyncStorage: false,
// //                 networking: {
// //                     ignoreUrls: /symbolicate|127.0.0.1/,
// //                 },
// //                 editor: false,
// //                 errors: { veto: stackFrame => false },
// //                 overlay: false,
// //             })

// //             .use(reactotronRedux())
// //             .connect();
// //     },
// //     createEnhancer: () => Reactotron.createEnhancer()
// // };
