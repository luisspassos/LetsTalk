import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/roboto/400.css';

import type { AppProps } from 'next/app';
import RouteLoading from 'next-progress';
import { Contexts } from 'components/Contexts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Contexts>
      <RouteLoading
        options={{
          showSpinner: false,
        }}
      />
      <Component {...pageProps} />
    </Contexts>
  );
}

export default MyApp;
