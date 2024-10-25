// import * as firebase from 'firebase';
// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// import {getAnalytics} from 'firebase/analytics';
import * as firebaseAuth from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {
  FYEB_APIKEY,
  FYEB_AUTHDOMAIN,
  FYEB_PROJECTID,
  FYEB_STORAGEBUCKET,
  FYEB_MESSAGINGSENDERID,
  FYEB_APPID,
  FYEB_MEASURMENTID,
} from '@env';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: FYEB_APIKEY,
  authDomain: FYEB_AUTHDOMAIN,
  projectId: FYEB_PROJECTID,
  storageBucket: FYEB_STORAGEBUCKET,
  messagingSenderId: FYEB_MESSAGINGSENDERID,
  appId: FYEB_APPID,
  measurementId: FYEB_MEASURMENTID,
};

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
export default app;
export const storage = getStorage(app); // Storage instance
export const auth = firebaseAuth.initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});
// export const auth = getAuth();
