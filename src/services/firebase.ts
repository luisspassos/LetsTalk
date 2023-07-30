import { initializeApp, getApps, getApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import {
  connectFirestoreEmulator,
  FirestoreSettings,
  initializeFirestore,
} from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { emulators } from '../../firebase.json';

export const firebaseConfig = {
  apiKey: 'AIzaSyD_ZtpvIiHDi7vLypRjMoC-HWf1cF6xkIw',
  authDomain: 'let-s-talk-tests.firebaseapp.com',
  projectId: 'let-s-talk-tests',
  storageBucket: 'let-s-talk-tests.appspot.com',
  messagingSenderId: '223757209084',
  appId: '1:223757209084:web:e4b423c598babbe1fc3679',
  measurementId: 'G-K8C289LY39',
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const firestoreSettings: FirestoreSettings = {};

const isCypress = typeof window !== 'undefined' && window.Cypress;
if (isCypress) {
  firestoreSettings.experimentalForceLongPolling = true;
}

const auth = getAuth();
const db = initializeFirestore(getApp(), firestoreSettings);
const storage = getStorage();

export const emulatorHost = 'localhost';

export const shouldUseEmulator = ['test', 'development'].includes(
  process.env.NODE_ENV
);

if (shouldUseEmulator) {
  connectAuthEmulator(auth, `http://${emulatorHost}:${emulators.auth.port}/`, {
    disableWarnings: true,
  });
  connectFirestoreEmulator(db, emulatorHost, emulators.firestore.port);
  connectStorageEmulator(storage, emulatorHost, emulators.storage.port);
}

export { auth, db, storage };
