import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';
import admin from 'firebase-admin';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  setupNodeEvents(on, config) {
    on('file:preprocessor', createBundler());
    return cypressFirebasePlugin(on, config, admin, {
      projectId: 'lets-talk-d08fa',
    });
  },
});
