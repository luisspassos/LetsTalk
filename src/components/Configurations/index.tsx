import { Flex } from '@chakra-ui/react';
import { Divider } from '../Divider';
import { PageTitle } from '../PageTitle';
import { Box } from './Box';
import { ButtonStack } from './Buttons/ButtonStack';
import { ThemeSelect } from './ThemeSelect';
import { CopyUsernameButton } from './Box/ProfileSettings/Buttons/CopyUsername';
import { EditUsernameButton } from './Box/ProfileSettings/Buttons/EditUsernameButton';
import { EditProfilePhotoButton } from './Box/ProfileSettings/Buttons/EditProfilePhoto';
import { InviteToChatButton } from './Box/ProfileSettings/Buttons/InviteToChat';
import { SwitchEmailButton } from './Box/AccountSettings/Buttons/SwitchEmail';
import { ChangePasswordButton } from './Box/AccountSettings/Buttons/ChangePassword';
import { DeleteAccountButton } from './Box/AccountSettings/Buttons/DeleteAccount';
import { ExitButton } from './Box/AccountSettings/Buttons/Exit';
import { useAuth } from '../../contexts/AuthContext';
import { User } from './User';

export function Configurations() {
  const { isLoggedInWithGoogle } = useAuth();

  return (
    <>
      <PageTitle pageName='Configurações' />
      <Flex
        wrap='wrap'
        p='20px'
        flex='1'
        align='center'
        justify='center'
        columnGap='min(5%, 80px)'
        rowGap='30px'
        overflow='auto'
        h='100vh'
      >
        <Box title='Configurações de perfil'>
          <User />
          <Divider />
          <ButtonStack>
            <CopyUsernameButton />
            <EditUsernameButton />
            <EditProfilePhotoButton />
            <InviteToChatButton />
          </ButtonStack>
        </Box>
        <Box title='Configurações de conta'>
          <ThemeSelect />
          <ButtonStack>
            {!isLoggedInWithGoogle && (
              <>
                <SwitchEmailButton />
                <ChangePasswordButton />
              </>
            )}
            <DeleteAccountButton />
            <ExitButton />
          </ButtonStack>
        </Box>
      </Flex>
    </>
  );
}
