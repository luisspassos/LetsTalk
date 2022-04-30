import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { theme } from '../styles/theme';
import { AuthProvider } from '../contexts/AuthContext';
import { FadeInAnimationProvider } from '../contexts/FadeInAnimationContext';
import { TabProvider } from '../contexts/TabContext';
import { BlockUserModalProvider } from '../contexts/Modal/BlockUserModalContext';
import { AddContactModalProvider } from '../contexts/Modal/AddContactModalContext';
import { ConversationsTabProvider } from '../contexts/ConversationsTabContext';
import { ConversationsProvider } from '../contexts/ConversationsContext';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    let darkModeOn = darkModeMediaQuery.matches;

    const faviconLightScheme = document.querySelector(
      'link#favicon_light_scheme'
    );
    const faviconDarkScheme = document.querySelector(
      'link#favicon_dark_scheme'
    );

    function updateFavicon() {
      if (darkModeOn && faviconDarkScheme) {
        document.head.appendChild(faviconDarkScheme);
        faviconLightScheme?.remove();
      } else {
        if (faviconLightScheme) {
          document.head.appendChild(faviconLightScheme);
        }
        faviconDarkScheme?.remove();
      }
    }
    updateFavicon();

    darkModeMediaQuery.addEventListener('change', (e) => {
      darkModeOn = e.matches;
      updateFavicon();
    });
  }, []);

  return (
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
  );
}

export default MyApp;
