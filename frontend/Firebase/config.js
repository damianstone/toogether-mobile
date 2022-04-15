import firebase from 'firebase';
/* Contstants allow to read data from app.json */
import Constants from 'expo-constants';
const firebaseConfig = {
  apiKey: Constants.manifest.extra.API_KEY,
  authDomain: Constants.manifest.extra.AUTH_DOMAIN,
  databaseURL: Constants.manifest.extra.DATABASE_URL,
  projectId: Constants.manifest.extra.PROJECT_ID,
  storageBucket: Constants.manifest.extra.STORAGE_BUCKET,
  messagingSenderId: Constants.manifest.extra.MESSAGE_SENDER_ID,
  appId: Constants.manifest.extra.APP_ID,
  measurementId: Constants.manifest.extra.MEASUREMENT_ID,
};
let Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;





/*


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATwjBaC2AwIlzXaAzFws2E8O26lrUhtkE",
  authDomain: "toogether-c4d4f.firebaseapp.com",
  projectId: "toogether-c4d4f",
  storageBucket: "toogether-c4d4f.appspot.com",
  messagingSenderId: "17321266316",
  appId: "1:17321266316:web:e3dac382e8fb4714307fa9",
  measurementId: "G-9SQ0M3WKQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

*/