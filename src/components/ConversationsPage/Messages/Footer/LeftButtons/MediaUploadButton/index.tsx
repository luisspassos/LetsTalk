import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { IconButton } from '../IconButton';
import { Modal } from './Modal';

export type ModalContent = {
  name: string;
  src: string;
  type: 'image' | 'video';
};

type AcceptedType = ModalContent['type'] | undefined;

export const errorToast = async () => {
  const { toast } = await import('utils/Toasts/toast');

  toast({ status: 'error', title: 'O arquivo deve ser uma imagem ou vídeo.' });
};

export function MediaUploadButton() {
  const [modalContent, setModalContent] = useState<ModalContent>({
    name: '',
    src: '',
    type: 'image',
  });

  const { isOpen, onClose, onOpen } = useDisclosure();

  function handleUploadMedia() {
    const fileInput = document.createElement('input');

    const acceptedTypes = ['image', 'video'];

    fileInput.type = 'file';

    const accept = acceptedTypes.map((t) => t + '/*').join(', '); // type/* ...;
    fileInput.accept = accept;

    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;

      if (!target.files) return;

      const [file] = target.files;

      const acceptedType = acceptedTypes.find((type) =>
        file.type.startsWith(type)
      ) as AcceptedType;

      if (!acceptedType) return errorToast();

      const src = URL.createObjectURL(file);

      setModalContent({
        name: file.name,
        type: acceptedType,
        src,
      });

      onOpen();
    };

    fileInput.click();
  }

  return (
    <>
      <Modal content={modalContent} isOpen={isOpen} onClose={onClose} />
      <IconButton
        onClick={handleUploadMedia}
        aria-label='Enviar imagem ou vídeo'
        Icon={BiImageAdd}
      />
    </>
  );
}
