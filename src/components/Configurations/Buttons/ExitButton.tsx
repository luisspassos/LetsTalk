import { useCallback } from 'react';
import { ImExit } from 'react-icons/im';
import { Button } from './Button';

export function ExitButton() {
  const handleSignOut = useCallback(() => {}, []);

  return <Button onClick={handleSignOut} text='Sair' leftIcon={ImExit} />;
}
