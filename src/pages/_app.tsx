import { ChakraProvider, useColorModePreference } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { theme } from '../styles/theme';
import { AuthProvider } from '../contexts/AuthContext';
import { FadeInAnimationProvider } from '../contexts/FadeInAnimationContext';
import { TabProvider } from '../contexts/TabContext';
import { BlockUserModalProvider } from '../contexts/Modal/BlockUserModalContext';
import { AddContactModalProvider } from '../contexts/Modal/AddContactModalContext';
import { ConversationsTabProvider } from '../contexts/ConversationsTabContext';
import { ConversationsProvider } from '../contexts/ConversationsContext';
import Head from 'next/head';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [favicon, setFavicon] = useState('./favicon/favicon_light_scheme.svg');
  const colorModePreference = useColorModePreference();

  useEffect(() => {
    if (colorModePreference === 'light') {
      setFavicon('./favicon/favicon_light_scheme.svg');
    } else {
      setFavicon('./favicon/favicon_dark_scheme.svg');
    }
  }, [colorModePreference]);

  return (
    <>
      <Head>
        <link rel='shortcut icon' href={favicon} type='image/x-icon' />
      </Head>
      <AuthProvider>
        <ConversationsProvider>
          <ConversationsTabProvider>
            <AddContactModalProvider>
              <BlockUserModalProvider>
                <TabProvider>
                  <FadeInAnimationProvider>
                    <ChakraProvider theme={theme}>
                      <Component {...pageProps} />
                    </ChakraProvider>
                  </FadeInAnimationProvider>
                </TabProvider>
              </BlockUserModalProvider>
            </AddContactModalProvider>
          </ConversationsTabProvider>
        </ConversationsProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
