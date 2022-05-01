import { useCallback } from 'react';
import { RiImageEditFill } from 'react-icons/ri';
import { Button } from './Button';

export function EditProfilePhotoButton() {
  const handleOpenModal = useCallback(() => {}, []);

  return (
    <Button
      onClick={handleOpenModal}
      text='Editar foto de perfil'
      leftIcon={RiImageEditFill}
    />
  );
}
