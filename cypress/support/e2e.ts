import './commands';

// Firebase

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
  apiKey: 'AIzaSyD_ZtpvIiHDi7vLypRjMoC-HWf1cF6xkIw',
  authDomain: 'let-s-talk-tests.firebaseapp.com',
  projectId: 'let-s-talk-tests',
  storageBucket: 'let-s-talk-tests.appspot.com',
  messagingSenderId: '223757209084',
  appId: '1:223757209084:web:e4b423c598babbe1fc3679',
  measurementId: 'G-K8C289LY39',
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });

const auth = firebase.auth();

export { auth };

// Uncaught Exceptions

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
});
