import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';
const ms = require('smtp-tester');

// @ts-ignore: This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.
import admin from 'firebase-admin';

export default defineConfig({
  videosFolder: 'src/tests/videos',
  supportFolder: 'src/tests/support',
  fixturesFolder: 'src/tests/fixtures',
  downloadsFolder: 'src/tests/downloads',
  screenshotsFolder: 'src/tests/screenshots',

  env: {
    email: 'test@example.com',
    password: '123456',
  },
  e2e: {
    specPattern: 'src/tests/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'src/tests/support/e2e/index.ts',
    baseUrl: 'http://localhost:3000/',
    // @ts-ignore: Property 'projectRoot' is optional in type 'ExtendedCypressConfig' but required in type 'PluginConfigOptions'.
    setupNodeEvents(on, config) {
      const port = 7777;
      const mailServer = ms.init(port);
      console.log('mail server at port %d', port);

      // process all emails
      mailServer.bind((addr, id, email) => {
        console.log('--- email ---');
        console.log(addr, id, email);
      });

      on('before:browser:launch', (_, launchOptions) => {
        launchOptions.args.push('--enable-features=SharedArrayBuffer');

        return launchOptions;
      });

      return cypressFirebasePlugin(on, config, admin);
    },
  },

  component: {
    indexHtmlFile: 'src/tests/support/component/component-index.html',
    supportFile: 'src/tests/support/component/index.ts',
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
