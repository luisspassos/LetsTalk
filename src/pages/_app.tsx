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
import { RenameUsernameModalProvider } from '../contexts/Modal/RenameUsernameModalContext';
import { DeleteAccountModalProvider } from '../contexts/Modal/DeleteAccountModalContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ConversationsProvider>
        <ConversationsTabProvider>
          <AddContactModalProvider>
            <BlockUserModalProvider>
              <RenameUsernameModalProvider>
                <DeleteAccountModalProvider>
                  <TabProvider>
                    <FadeInAnimationProvider>
                      <ChakraProvider theme={theme}>
                        <Component {...pageProps} />
                      </ChakraProvider>
                    </FadeInAnimationProvider>
                  </TabProvider>
                </DeleteAccountModalProvider>
              </RenameUsernameModalProvider>
            </BlockUserModalProvider>
          </AddContactModalProvider>
        </ConversationsTabProvider>
      </ConversationsProvider>
    </AuthProvider>
  );
}

export default MyApp;
