import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';
import admin from 'firebase-admin';

import webpackPreprocessor from '@cypress/webpack-preprocessor';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      const options = webpackPreprocessor.defaultOptions;

      options.webpackOptions?.module?.rules?.[0].use[0].options.plugins = [
        ['@babel/plugin-transform-modules-commonjs', { loose: true }],
      ];

      options.webpackOptions?.resolve = {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      };

      console.log(options);

      on('file:preprocessor', webpackPreprocessor(options));

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
