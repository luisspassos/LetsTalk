import { initializeApp as adminInitializeApp } from 'firebase-admin/app';
import serviceAccount from '../../../../../../Downloads/letstalk_adminsdk.json';

import { apps, credential } from 'firebase-admin';

import { getAuth } from 'firebase-admin/auth';

if (!apps.length) {
  adminInitializeApp({
    credential: credential.cert(serviceAccount as any),
  });
}

const auth = getAuth();

export { auth };
