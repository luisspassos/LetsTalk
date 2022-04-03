import {
  initializeApp as adminInitializeApp,
  applicationDefault,
} from 'firebase-admin/app';

import { getAuth } from 'firebase-admin/auth';

adminInitializeApp({
  credential: applicationDefault(),
});

const auth = getAuth();

export { auth };

// baixar json do admin
