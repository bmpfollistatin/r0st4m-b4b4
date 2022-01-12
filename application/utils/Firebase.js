import firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyC7zJJRPrAIo9d9zpek8pZyWbgKKVQVelc",
  databaseURL: "https://skulpt-ai-cbe2e.firebaseio.com/",
  projectId: "skulpt-ai-cbe2e",
  authDomain: "skulpt-ai-cbe2e.firebaseapp.com",
  storageBucket: "skulpt-ai-cbe2e.appspot.com",
  messagingSenderId: "422646822161",
  appId: "1:422646822161:web:14b7f589ff47810ea288b0",
  measurementId: "G-B8R17EQ6Q1"
};

//


firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage,firebaseConfig as default};



////// <><><><> Old working code <><><><>
// export default firebaseConfig = {
//   apiKey: "AIzaSyC7zJJRPrAIo9d9zpek8pZyWbgKKVQVelc",
//     databaseURL: "https://skulpt-ai-cbe2e.firebaseio.com/",
//     projectId: "skulpt-ai-cbe2e",
//     authDomain: "skulpt-ai-cbe2e.firebaseapp.com",
//   storageBucket: "skulpt-ai-cbe2e.appspot.com",
//     messagingSenderId: "422646822161",
//     appId: "1:422646822161:web:14b7f589ff47810ea288b0",
//     measurementId: "G-B8R17EQ6Q1"
// };
