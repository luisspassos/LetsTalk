import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // return cypressFirebasePlugin(on, config, admin, {
      //   projectId: 'lets-talk-d08fa',
      // });
    },
  },
});
