import './commands';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';
import { firebaseConfig } from '../../src/services/firebase';

firebase.initializeApp(firebaseConfig);

attachCustomCommands({ Cypress, cy, firebase });
