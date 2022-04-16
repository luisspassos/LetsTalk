import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { theme } from '../styles/theme';
import { AuthProvider } from '../contexts/AuthContext';
import { FadeInAnimationProvider } from '../contexts/FadeInAnimationContext';
import { TabProvider } from '../contexts/TabContext';
import { LoadingProvider } from '../contexts/LoadingContext';
import { BlockUserModalProvider } from '../contexts/Modal/BlockUserModalContext';
import { AddContactModalProvider } from '../contexts/Modal/AddContactModalContext';
import { ConversationsTabProvider } from '../contexts/ConversationsTabContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConversationsTabProvider>
      <AddContactModalProvider>
        <BlockUserModalProvider>
          <LoadingProvider>
            <TabProvider>
              <FadeInAnimationProvider>
                <AuthProvider>
                  <ChakraProvider theme={theme}>
                    <Component {...pageProps} />
                  </ChakraProvider>
                </AuthProvider>
              </FadeInAnimationProvider>
            </TabProvider>
          </LoadingProvider>
        </BlockUserModalProvider>
      </AddContactModalProvider>
    </ConversationsTabProvider>
  );
}

export default MyApp;
