import { useCallback } from 'react';
import { FiShare2 } from 'react-icons/fi';
import { Button } from './Button';

export function InviteToChatButton() {
  const handleOpenModal = useCallback(() => {}, []);

  return (
    <Button
      onClick={handleOpenModal}
      text='Convidar para conversar'
      leftIcon={FiShare2}
    />
  );
}
