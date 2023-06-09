import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

// @ts-ignore: This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.
import admin from 'firebase-admin';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    // @ts-ignore: Property 'projectRoot' is optional in type 'ExtendedCypressConfig' but required in type 'PluginConfigOptions'.
    setupNodeEvents(on, config) {
      on('before:browser:launch', (_, launchOptions) => {
        launchOptions.args.push('--enable-features=SharedArrayBuffer');

        return launchOptions;
      });

      return cypressFirebasePlugin(on, config, admin, {
        projectId: 'lets-talk-d08fa',
      });
    },
  },
});
