import { initializeApp, getApps } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyA7q_6LOt-v3QAbuiVYWa1qvDwJwN1v5x8',
  authDomain: 'lets-talk-d08fa.firebaseapp.com',
  projectId: 'lets-talk-d08fa',
  storageBucket: 'lets-talk-d08fa.appspot.com',
  messagingSenderId: '1002492041049',
  appId: '1:1002492041049:web:3c71534254126237445e48',
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };
