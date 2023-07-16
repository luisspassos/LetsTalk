import './commands';

// Firebase

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';
import {
  emulatorHost,
  firebaseConfig,
  shouldUseEmulator,
} from 'services/firebase';
import { emulators } from '../../../../firebase.json';

export const myFirebase = firebase.initializeApp(firebaseConfig);

if (shouldUseEmulator) {
  firebase.firestore().settings({
    host: emulatorHost + ':' + emulators.firestore.port,
    ssl: false,
  });

  firebase.auth().useEmulator(`http://${emulatorHost}:${emulators.auth.port}/`);
}

attachCustomCommands({ Cypress, cy, firebase });

// Uncaught Exceptions

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
});
