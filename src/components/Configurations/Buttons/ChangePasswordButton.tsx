import { useCallback } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Button } from './Button';

export function ChangePasswordButton() {
  const handleOpenModal = useCallback(() => {}, []);

  return (
    <Button
      onClick={handleOpenModal}
      text='Trocar senha'
      leftIcon={RiLockPasswordLine}
    />
  );
}
