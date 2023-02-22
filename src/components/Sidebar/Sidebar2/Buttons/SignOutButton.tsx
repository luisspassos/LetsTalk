import { useAuth } from 'contexts/AuthContext';
import { ImExit } from 'react-icons/im';
import { Button } from './Button';

export function SignOutButton() {
  const { signOut } = useAuth();

  return <Button onClick={signOut} icon={<ImExit />} aria-label='Sair' />;
}
