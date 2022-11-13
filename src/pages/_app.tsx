import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/roboto/400.css';

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
import { SearchInConversationProvider } from '../contexts/SearchInConversationContext';
import { OnlineAtEventsProvider } from '../contexts/OnlineAtEventsContext';
import { ConversationPopoverProvider } from '../contexts/ConversationPopoverContext';
import { RenamingNameProvider } from '../contexts/RenamingNameContext';
import { MessageInputRefProvider } from '../contexts/MessageInputRef';
import { ToggleEmojiPickerProvider } from '../contexts/EmojiPicker/ToggleEmojiPickerContext';
import { EmojiStylesProvider } from '../contexts/EmojiPicker/EmojiStylesContext';
import { CategoriesProvider } from '../contexts/EmojiPicker/CategoriesContext';
import { EmojiPickerScrollProvider } from '../contexts/EmojiPicker/EmojiPickerScrollContext';
import { SearchedEmojisProvider } from '../contexts/EmojiPicker/SearchedEmojiContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MessageInputRefProvider>
        <RenamingNameProvider>
          <OnlineAtEventsProvider>
            <SearchInConversationProvider>
              <ConversationPopoverProvider>
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
                                      <SearchedEmojisProvider>
                                        <CategoriesProvider>
                                          <EmojiStylesProvider>
                                            <EmojiPickerScrollProvider>
                                              <ToggleEmojiPickerProvider>
                                                <Component {...pageProps} />
                                              </ToggleEmojiPickerProvider>
                                            </EmojiPickerScrollProvider>
                                          </EmojiStylesProvider>
                                        </CategoriesProvider>
                                      </SearchedEmojisProvider>
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
              </ConversationPopoverProvider>
            </SearchInConversationProvider>
          </OnlineAtEventsProvider>
        </RenamingNameProvider>
      </MessageInputRefProvider>
    </AuthProvider>
  );
}

export default MyApp;
