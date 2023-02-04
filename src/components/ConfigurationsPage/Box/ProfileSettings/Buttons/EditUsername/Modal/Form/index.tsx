import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { refreshToken, useAuth } from 'contexts/AuthContext';
import { useRenameUsernameModal } from 'contexts/Modal/RenameUsernameModalContext';
import { useRenamingName } from 'contexts/RenamingNameContext';
import { regexs } from 'utils/regexs';
import { Buttons } from './Buttons';
import { Input } from './Input';
import * as yup from 'yup';
import { ModalFormControl } from 'components/Modal/ModalFormControl';
import { User } from 'firebase/auth';

export type RenameUsernameFormData = {
  name: string;
};

const RenameUsernameFormSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Nome obrigatório')
    .matches(regexs.cannotContainHashtag, 'O nome não pode conter #'),
});

export function Form() {
  const { onClose } = useRenameUsernameModal();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<RenameUsernameFormData>({
    resolver: yupResolver(RenameUsernameFormSchema),
  });

  const { user, fillUser } = useAuth();
  const { setRenamingName } = useRenamingName();

  const handleRenameUsername = useMemo(
    () =>
      handleSubmit(async ({ name }) => {
        try {
          setRenamingName(true);

          if (!user?.displayName) return;

          const { setDoc, doc, deleteDoc } = await import('firebase/firestore');
          const { updateProfile } = await import('firebase/auth');
          const { db } = await import('services/firebase');

          const [, id] = user.displayName.split('#');

          const newName = `${name}#${id}`;

          await deleteDoc(doc(db, 'users', user.displayName));

          await setDoc(doc(db, 'users', newName), {
            uid: user.uid,
            onlineAt: 'now',
          });

          const acceptedUser: User = {
            ...user,
            photoURL: user.photoURL ?? null,
          };

          await updateProfile(acceptedUser, {
            displayName: newName,
          });

          await refreshToken();

          fillUser({ ...user, displayName: newName });

          onClose();
          resetForm();
        } catch {
          const { unknownErrorToast } = await import(
            'utils/Toasts/unknownErrorToast'
          );

          unknownErrorToast();
        } finally {
          setRenamingName(false);
        }
      }),
    [handleSubmit, user, onClose, resetForm, fillUser, setRenamingName]
  );

  return (
    <ModalFormControl onSubmit={handleRenameUsername}>
      <Input register={register} error={errors.name} />
      <Buttons isSubmitting={isSubmitting} />
    </ModalFormControl>
  );
}
