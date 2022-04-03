import {
  initializeApp as adminInitializeApp,
  applicationDefault,
} from 'firebase-admin/app';

adminInitializeApp({
  credential: applicationDefault(),
});
