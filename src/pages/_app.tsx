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
import { ChangePasswordModalProvider } from '../contexts/Modal/ChangePasswordModalContext';
import { ChangeEmailModalProvider } from '../contexts/Modal/ChangeEmailModalContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        />
        <meta name='description' content='Description' />
        <meta name='keywords' content='Keywords' />

        <link rel='manifest' href='/manifest.json' />
        <link
          href='/icons/favicon-16x16.png'
          rel='icon'
          type='image/png'
          sizes='16x16'
        />
        <link
          href='/icons/favicon-32x32.png'
          rel='icon'
          type='image/png'
          sizes='32x32'
        />
        <link rel='apple-touch-icon' href='/apple-icon.png'></link>
        <meta name='theme-color' content='#317EFB' />
      </Head>
      <AuthProvider>
        <ConversationsProvider>
          <ConversationsTabProvider>
            <AddContactModalProvider>
              <BlockUserModalProvider>
                <RenameUsernameModalProvider>
                  <DeleteAccountModalProvider>
                    <ChangePasswordModalProvider>
                      <ChangeEmailModalProvider>
                        <TabProvider>
                          <FadeInAnimationProvider>
                            <ChakraProvider theme={theme}>
                              <Component {...pageProps} />
                            </ChakraProvider>
                          </FadeInAnimationProvider>
                        </TabProvider>
                      </ChangeEmailModalProvider>
                    </ChangePasswordModalProvider>
                  </DeleteAccountModalProvider>
                </RenameUsernameModalProvider>
              </BlockUserModalProvider>
            </AddContactModalProvider>
          </ConversationsTabProvider>
        </ConversationsProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
