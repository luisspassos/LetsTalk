import { useCallback } from 'react';
import { RiFileCopy2Line } from 'react-icons/ri';
import { Button } from './Button';

export function CopyUsernameButton() {
  const handleCopyUsername = useCallback(() => {}, []);

  return (
    <Button
      onClick={handleCopyUsername}
      text='Copiar nome de perfil'
      leftIcon={RiFileCopy2Line}
    />
  );
}
