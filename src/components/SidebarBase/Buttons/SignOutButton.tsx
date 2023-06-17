import { useAuth } from 'contexts/AuthContext';
import { ImExit } from 'react-icons/im';
import { Base } from './Base';

type SignOutButtonProps = {
  Base: Base;
};

export function SignOutButton({ Base }: SignOutButtonProps) {
  const { signOut } = useAuth();

  return (
    <Base
      data-testid='sign out'
      onClick={signOut}
      icon={<ImExit />}
      aria-label='Sair da conta'
    />
  );
}
