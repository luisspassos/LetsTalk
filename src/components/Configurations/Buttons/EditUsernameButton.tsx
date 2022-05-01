import { useCallback } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { Button } from './Button';

export function EditUsernameButton() {
  const handleOpenModal = useCallback(() => {}, []);

  return (
    <Button
      onClick={handleOpenModal}
      text='Editar nome de perfil'
      leftIcon={FaPencilAlt}
    />
  );
}
