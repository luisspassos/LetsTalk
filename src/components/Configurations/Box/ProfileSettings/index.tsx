import { Divider } from '../../../Divider';
import { Box } from '../../Box';
import { ButtonStack } from '../../Buttons/ButtonStack';
import { CopyUsernameButton } from './Buttons/CopyUsername';
import { EditProfilePhotoButton } from './Buttons/EditProfilePhoto';
import { EditUsernameButton } from './Buttons/EditUsernameButton';
import { InviteToChatButton } from './Buttons/InviteToChat';
import { User } from './User';

export function ProfileSettings() {
  return (
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
  );
}
