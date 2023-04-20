import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { getNameAndId, useAuth } from 'contexts/AuthContext';
import { useRenameUsernameModal } from 'contexts/Modal/RenameUsernameModalContext';
import { useRenamingName } from 'contexts/RenamingNameContext';
import { regexs } from 'utils/regexs';
import { Buttons } from './Buttons';
import { Input } from './Input';
import * as yup from 'yup';
import { ModalFormControl } from 'components/Modal/ModalFormControl';

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
          const { db, auth } = await import('services/firebase');

          const { id } = user.nameAndId;

          const newName = `${name}#${id}`;

          await deleteDoc(doc(db, 'users', user.displayName));

          await setDoc(doc(db, 'users', newName), {
            uid: user.uid,
            onlineAt: 'now',
          });

          if (auth.currentUser === null) throw 'user is null';

          await updateProfile(auth.currentUser, {
            displayName: newName,
          });

          fillUser({
            ...user,
            displayName: newName,
            nameAndId: getNameAndId(newName),
          });

          onClose();
          resetForm();
        } catch (e) {
          const { unknownErrorToast } = await import(
            'utils/Toasts/unknownErrorToast'
          );

          unknownErrorToast();
        } finally {
          setRenamingName(false);
        }
      }),
    [fillUser, handleSubmit, onClose, resetForm, setRenamingName, user]
  );

  return (
    <ModalFormControl onSubmit={handleRenameUsername}>
      <Input register={register} error={errors.name} />
      <Buttons isSubmitting={isSubmitting} />
    </ModalFormControl>
  );
}
