// firebaseConfig.js
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8DwY6x1hdconICrCcTaaowMoZ4KCbk5E",
  authDomain: "messaging-app-ai.firebaseapp.com",
  projectId: "messaging-app-ai",
  storageBucket: "messaging-app-ai.appspot.com",
  messagingSenderId: "106924409607",
  appId: "1:106924409607:web:8970db40b917e62e4c3ba2",
  measurementId: "G-Z8Z9FB73Y9",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase, auth, firestore };
