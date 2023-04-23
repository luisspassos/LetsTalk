import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from 'contexts/AuthContext';
import { ConversationPopoverProvider } from 'contexts/ConversationPopoverContext';
import { ConversationsProvider } from 'contexts/ConversationsContext';
import { CategoriesProvider } from 'contexts/EmojiPicker/CategoriesContext';
import { EmojiPickerScrollProvider } from 'contexts/EmojiPicker/EmojiPickerScrollContext';
import { EmojiStylesProvider } from 'contexts/EmojiPicker/EmojiStylesContext';
import { PositionSelectedFromEmojiPickerCategoriesProvider } from 'contexts/EmojiPicker/PositionSelectedFromEmojiPickerCategoriesContext';
import { SearchedEmojisProvider } from 'contexts/EmojiPicker/SearchedEmojiContext';
import { ToggleEmojiPickerProvider } from 'contexts/EmojiPicker/ToggleEmojiPickerContext';
import { FadeInAnimationProvider } from 'contexts/FadeInAnimationContext';
import { MessageInputRefProvider } from 'contexts/MessageInputRef';
import { AddContactModalProvider } from 'contexts/Modal/AddContactModalContext';
import { BlockUserModalProvider } from 'contexts/Modal/BlockUserModalContext';
import { ChangeEmailModalProvider } from 'contexts/Modal/ChangeEmailModalContext';
import { ChangePasswordModalProvider } from 'contexts/Modal/ChangePasswordModalContext';
import { DeleteAccountModalProvider } from 'contexts/Modal/DeleteAccountModalContext';
import { RenameUsernameModalProvider } from 'contexts/Modal/RenameUsernameModalContext';
import { RenamingNameProvider } from 'contexts/RenamingNameContext';
import { SearchInConversationProvider } from 'contexts/SearchInConversationContext';
import { TabToggleProvider } from 'contexts/TabToggleContext';
import { ReactNode } from 'react';
import { theme } from 'styles/theme';

type ContextsProps = {
  children: ReactNode;
};

export function Contexts({ children }: ContextsProps) {
  return (
    <AuthProvider>
      <MessageInputRefProvider>
        <RenamingNameProvider>
          <SearchInConversationProvider>
            <ConversationPopoverProvider>
              <ConversationsProvider>
                <TabToggleProvider>
                  <AddContactModalProvider>
                    <BlockUserModalProvider>
                      <RenameUsernameModalProvider>
                        <DeleteAccountModalProvider>
                          <ChangePasswordModalProvider>
                            <ChangeEmailModalProvider>
                              <FadeInAnimationProvider>
                                <ChakraProvider theme={theme}>
                                  <PositionSelectedFromEmojiPickerCategoriesProvider>
                                    <SearchedEmojisProvider>
                                      <EmojiStylesProvider>
                                        <CategoriesProvider>
                                          <ToggleEmojiPickerProvider>
                                            <EmojiPickerScrollProvider>
                                              {children}
                                            </EmojiPickerScrollProvider>
                                          </ToggleEmojiPickerProvider>
                                        </CategoriesProvider>
                                      </EmojiStylesProvider>
                                    </SearchedEmojisProvider>
                                  </PositionSelectedFromEmojiPickerCategoriesProvider>
                                </ChakraProvider>
                              </FadeInAnimationProvider>
                            </ChangeEmailModalProvider>
                          </ChangePasswordModalProvider>
                        </DeleteAccountModalProvider>
                      </RenameUsernameModalProvider>
                    </BlockUserModalProvider>
                  </AddContactModalProvider>
                </TabToggleProvider>
              </ConversationsProvider>
            </ConversationPopoverProvider>
          </SearchInConversationProvider>
        </RenamingNameProvider>
      </MessageInputRefProvider>
    </AuthProvider>
  );
}
