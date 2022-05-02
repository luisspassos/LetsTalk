import { useCallback } from 'react';
import { FiShare2 } from 'react-icons/fi';
import { toast } from '../../../utils/Toasts/toast';
import { Button } from './Button';

export const successToastWhenCopying = () =>
  toast({
    title: 'Link Copiado!',
    description:
      "Link do Let's Talk copiado, envie ao seus amigos para eles conversarem com você.",
    status: 'success',
  });

export function InviteToChatButton() {
  const handleOpenModal = useCallback(() => {
    navigator.clipboard.writeText('http://localhost:3000/');
    successToastWhenCopying();
  }, []);

  return (
    <Button
      onClick={handleOpenModal}
      text='Convidar para conversar'
      leftIcon={FiShare2}
    />
  );
}
