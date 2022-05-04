import { Flex } from '@chakra-ui/react';
import { Divider } from '../Divider';
import { PageTitle } from '../PageTitle';
import { Avatar } from './Avatar';
import { Box } from './Box';
import { ButtonStack } from './Buttons/ButtonStack';
import { ThemeSelect } from './ThemeSelect';
import { CopyUsernameButton } from './Buttons/CopyUsernameButton';
import { EditUsernameButton } from './Buttons/EditUsernameButton';
import { EditProfilePhotoButton } from './Buttons/EditProfilePhotoButton';
import { InviteToChatButton } from './Buttons/InviteToChatButton';
import { SwitchEmailButton } from './Buttons/SwitchEmailButton';
import { ChangePasswordButton } from './Buttons/ChangePasswordButton';
import { DeleteAccountButton } from './Buttons/DeleteAccountButton';
import { ExitButton } from './Buttons/ExitButton';
import { RenameUsernameModal } from './Modals/RenameUsernameModal';
import { ChangeEmailModal } from './Modals/ChangeEmailModal';
import { ChangePasswordModal } from './Modals/ChangePasswordModal';
import dynamic from 'next/dynamic';
// import { DeleteAccountModal } from './Modals/DeleteAccountModal';

const DeleteAccountModal = dynamic(async () => {
  const { DeleteAccountModal } = await import('./Modals/DeleteAccountModal');

  return DeleteAccountModal;
});

export function Configurations() {
  return (
    <>
      <DeleteAccountModal />
      <ChangePasswordModal />
      <ChangeEmailModal />
      <RenameUsernameModal />
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
          <Avatar />
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
            <SwitchEmailButton />
            <ChangePasswordButton />
            <DeleteAccountButton />
            <ExitButton />
          </ButtonStack>
        </Box>
      </Flex>
    </>
  );
}
