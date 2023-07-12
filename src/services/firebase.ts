import { initializeApp, getApps, getApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { FirestoreSettings, initializeFirestore } from 'firebase/firestore';
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

const shouldUseEmulator = window.location.hostname === 'localhost';

const firestoreSettings: FirestoreSettings = {};

if (window.Cypress) {
  firestoreSettings.experimentalForceLongPolling = true;
}

const auth = getAuth();
const db = initializeFirestore(getApp(), firestoreSettings);
const storage = getStorage();

export { auth, db, storage };
