import { defineConfig } from 'cypress';
import admin from 'firebase-admin';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      return cypressFirebasePlugin(on, config, admin, {
        projectId: 'lets-talk-d08fa',
      });
    },
  },
});
