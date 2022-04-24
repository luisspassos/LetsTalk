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
import { MessageProvider } from '../contexts/MessageContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ConversationsProvider>
        <MessageProvider>
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
        </MessageProvider>
      </ConversationsProvider>
    </AuthProvider>
  );
}

export default MyApp;
