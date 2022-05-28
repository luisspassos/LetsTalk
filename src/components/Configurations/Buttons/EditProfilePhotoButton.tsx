import { useCallback, useState } from 'react';
import { RiImageEditFill } from 'react-icons/ri';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from './Button';

export const errorToast = async () => {
  const { toast } = await import('../../../utils/Toasts/toast');

  toast({ status: 'error', title: 'O arquivo selecionado não é uma imagem.' });
};

export function EditProfilePhotoButton() {
  const { fillUser, user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleEditPhoto = useCallback(() => {
    setLoading(true);

    const fileInput = document.createElement('input');

    fileInput.type = 'file';
    fileInput.accept = 'image/png, image/jpeg';

    const checkThatNoFilesHaveBeenSelected = () => {
      setTimeout(() => {
        if (fileInput.value.length === 0) {
          setLoading(false);
        }

        window.removeEventListener('focus', checkThatNoFilesHaveBeenSelected);
      }, 100);
    };

    window.addEventListener('focus', checkThatNoFilesHaveBeenSelected);

    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;

      if (!target.files) return;

      const file = target.files[0];

      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        errorToast();
        return;
      }

      const { updateProfile } = await import('firebase/auth');
      const { auth, storage } = await import('../../../services/firebase');
      const { refreshToken } = await import('../../../contexts/AuthContext');
      const { ref, uploadBytes, getDownloadURL } = await import(
        'firebase/storage'
      );

      const currentUser = auth.currentUser;

      if (!currentUser) return;

      const usersProfileAvatarRef = ref(
        storage,
        `usersProfileAvatar/${currentUser.displayName}`
      );

      await uploadBytes(usersProfileAvatarRef, file);

      const photoUrl = await getDownloadURL(usersProfileAvatarRef);

      if (!user) return;

      fillUser({ ...user, picture: photoUrl });

      await updateProfile(currentUser, {
        photoURL: photoUrl,
      });

      await refreshToken();

      setLoading(false);
    };

    fileInput.click();
  }, [fillUser, user]);

  return (
    <Button
      onClick={handleEditPhoto}
      text='Editar foto de perfil'
      icon={RiImageEditFill}
      isLoading={loading}
      loadingText='Editando foto de perfil'
    />
  );
}
