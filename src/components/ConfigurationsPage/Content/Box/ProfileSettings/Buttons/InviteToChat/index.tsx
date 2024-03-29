import { useCallback } from 'react';
import { FiShare2 } from 'react-icons/fi';
import { toast } from 'utils/Toasts/toast';
import { Button } from '../../../Button';

export const successToastWhenCopying = () =>
  toast({
    title: 'Link Copiado!',
    description:
      "Link do Let's Talk copiado, envie ao seus amigos para eles conversarem com você.",
    status: 'success',
    id: 'success',
  });

export function InviteToChat() {
  const handleOpenModal = useCallback(() => {
    const currentUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL;

    if (currentUrl === undefined) throw 'url does not exist';

    navigator.clipboard.writeText(currentUrl);

    successToastWhenCopying();
  }, []);

  return (
    <Button
      onClick={handleOpenModal}
      text='Convidar para conversar'
      icon={FiShare2}
      data-testid='invite to chat'
    />
  );
}
