import { useDisclosure } from '@chakra-ui/react';
import { BiImageAdd } from 'react-icons/bi';
import { IconButton } from '../IconButton';
import { Modal } from './Modal';

export const errorToast = async () => {
  const { toast } = await import('utils/Toasts/toast');

  toast({ status: 'error', title: 'O arquivo deve ser uma imagem ou vídeo.' });
};

export function MediaUploadButton() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  function handleUploadMedia() {
    // const fileInput = document.createElement('input');
    // fileInput.type = 'file';
    // fileInput.accept = '';
    // fileInput.click();
    // onOpen();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} />
      <IconButton
        onClick={handleUploadMedia}
        aria-label='Enviar imagem ou vídeo'
        Icon={BiImageAdd}
      />
    </>
  );
}
