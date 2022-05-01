import { useCallback } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { Button } from './Button';

export function DeleteAccountButton() {
  const handleOpenModal = useCallback(() => {}, []);

  return (
    <Button
      onClick={handleOpenModal}
      text='Deletar conta'
      leftIcon={RiDeleteBin2Line}
    />
  );
}
