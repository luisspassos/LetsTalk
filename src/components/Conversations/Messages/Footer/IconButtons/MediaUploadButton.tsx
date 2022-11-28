import { BiImageAdd } from 'react-icons/bi';
import { InputIconButton } from '.';

export const errorToast = async () => {
  const { toast } = await import('../../../../../utils/Toasts/toast');

  toast({ status: 'error', title: 'O arquivo deve ser uma imagem ou vídeo.' });
};

export function MediaUploadButton() {
  function handleUploadMedia() {
    const fileInput = document.createElement('input');

    fileInput.type = 'file';
    fileInput.accept = '';

    fileInput.click();

    // errorToast();
  }

  return (
    <InputIconButton
      onClick={handleUploadMedia}
      ariaLabel='Enviar imagem ou vídeo'
      Icon={BiImageAdd}
    />
  );
}
