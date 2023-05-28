import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  env: {
    googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID,
    googleClientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});
