import { Stack } from '../../Button/Stack';
import { CopyUsername } from './CopyUsername';
import { EditProfilePhoto } from './EditProfilePhoto';
import { EditUsername } from './EditUsername';
import { InviteToChat } from './InviteToChat';

export function Buttons() {
  return (
    <Stack>
      <EditUsername />
      <EditProfilePhoto />
      <CopyUsername />
      <InviteToChat />
    </Stack>
  );
}
