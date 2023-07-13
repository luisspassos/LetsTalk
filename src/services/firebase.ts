import { initializeApp, getApps, getApp } from 'firebase/app';

import { connectAuthEmulator, getAuth } from 'firebase/auth';
import {
  Firestore,
  FirestoreSettings,
  getFirestore,
  initializeFirestore,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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

let shouldUseEmulator: boolean;

if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  shouldUseEmulator = true;
} else {
  shouldUseEmulator = false;
}

const firestoreSettings: FirestoreSettings = {};

if (typeof window !== 'undefined' && window.Cypress) {
  firestoreSettings.experimentalForceLongPolling = true;
}

let db: Firestore;

// Emulate Firestore
if (shouldUseEmulator) {
  firestoreSettings.host = 'localhost:8080';
  firestoreSettings.ssl = false;
  console.debug(`Using Firestore emulator: ${firestoreSettings.host}`);

  db = initializeFirestore(getApp(), firestoreSettings);
} else {
  db = getFirestore();
}

// Emulate Auth
const auth = getAuth();

if (shouldUseEmulator) {
  connectAuthEmulator(auth, 'http://localhost:9099/');
  console.debug(`Using Auth emulator: http://localhost:9099/`);
}

const storage = getStorage();

export { auth, db, storage };
