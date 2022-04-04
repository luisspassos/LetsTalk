import firebaseAdmin from 'firebase-admin';

import serviceAccount from '../../../../../../Downloads/serviceAccount-letstalk.json';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount as any),
  });
}

export { firebaseAdmin };
