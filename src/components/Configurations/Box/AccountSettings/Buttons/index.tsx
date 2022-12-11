import { ButtonStack } from '../../../Buttons/ButtonStack';
import { ChangePasswordButton } from './ChangePassword';
import { DeleteAccountButton } from './DeleteAccount';
import { ExitButton } from './Exit';
import { SwitchEmailButton } from './SwitchEmail';

export function Buttons() {
  return (
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
  );
}
