import { useAuth } from 'contexts/AuthContext';
import { Stack } from '../../Button/Stack';
import { ChangePassword } from './ChangePassword';
import { DeleteAccount } from './DeleteAccount';
import { Exit } from './Exit';
import { SwitchEmail } from './SwitchEmail';

export function Buttons() {
  const { isLoggedInWithGoogle } = useAuth();

  return (
    <Stack>
      {!isLoggedInWithGoogle && (
        <>
          <SwitchEmail />
          <ChangePassword />
        </>
      )}
      <DeleteAccount />
      <Exit />
    </Stack>
  );
}
