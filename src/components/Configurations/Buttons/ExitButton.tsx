import { ImExit } from 'react-icons/im';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from './Button';

export function ExitButton() {
  const { signOut } = useAuth();

  return <Button onClick={signOut} text='Sair' leftIcon={ImExit} />;
}
