import './commands';

// Firebase

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';
import { firebaseConfig } from '../../src/services/firebase';

firebase.initializeApp(firebaseConfig);

attachCustomCommands({ Cypress, cy, firebase });

// Uncaught Exceptions

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
});
