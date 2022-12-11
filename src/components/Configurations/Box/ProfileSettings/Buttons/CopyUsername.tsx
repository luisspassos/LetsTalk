import { useCallback } from 'react';
import { RiFileCopy2Line } from 'react-icons/ri';
import { useAuth } from '../../../../../contexts/AuthContext';
import { toast } from '../../../../../utils/Toasts/toast';
import { Button } from '../../../Buttons/Button';

export const successToastWhenCopying = () =>
  toast({
    title: 'Copiado!',
    status: 'success',
  });

export function CopyUsername() {
  const { user } = useAuth();
  const handleCopyUsername = useCallback(() => {
    if (!user?.username) return;

    navigator.clipboard.writeText(user.username);
    successToastWhenCopying();
  }, [user?.username]);

  return (
    <Button
      onClick={handleCopyUsername}
      text='Copiar nome de perfil'
      icon={RiFileCopy2Line}
    />
  );
}
