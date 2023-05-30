import './commands';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
  apiKey: 'AIzaSyA7q_6LOt-v3QAbuiVYWa1qvDwJwN1v5x8',
  authDomain: 'lets-talk-d08fa.firebaseapp.com',
  projectId: 'lets-talk-d08fa',
  storageBucket: 'lets-talk-d08fa.appspot.com',
  messagingSenderId: '1002492041049',
  appId: '1:1002492041049:web:3c71534254126237445e48',
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
