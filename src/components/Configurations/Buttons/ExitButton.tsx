import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { ImExit } from 'react-icons/im';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from './Button';

export function ExitButton() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    await signOut();
    router.push('/');
  }, [router, signOut]);

  return <Button onClick={handleSignOut} text='Sair' leftIcon={ImExit} />;
}
