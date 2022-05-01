import { useCallback } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { Button } from './Button';

export function SwitchEmailButton() {
  const handleOpenModal = useCallback(() => {}, []);

  return (
    <Button
      onClick={handleOpenModal}
      text='Trocar email'
      leftIcon={HiOutlineMail}
    />
  );
}
