import { useCallback } from 'react';
import { FiShare2 } from 'react-icons/fi';
import { toast } from '../../../../../utils/Toasts/toast';
import { Button } from '../../Button';

export const successToastWhenCopying = () =>
  toast({
    title: 'Link Copiado!',
    description:
      "Link do Let's Talk copiado, envie ao seus amigos para eles conversarem com você.",
    status: 'success',
  });

export function InviteToChat() {
  const handleOpenModal = useCallback(() => {
    const currentUrl = process.env.NEXT_PUBLIC_CURRENT_URL;

    if (!currentUrl) return;

    navigator.clipboard.writeText(currentUrl);

    successToastWhenCopying();
  }, []);

  return (
    <Button
      onClick={handleOpenModal}
      text='Convidar para conversar'
      icon={FiShare2}
    />
  );
}
