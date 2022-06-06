import { Buttons } from '../../Modal/Button/Buttons';
import { ModalFormControl } from '../../Modal/ModalFormControl';
import { ModalInput } from '../../Modal/ModalInput';
import { ModalWrapper } from '../../Modal/ModalWrapper';
import { useRenameUsernameModal } from '../../../contexts/Modal/RenameUsernameModalContext';
import * as yup from 'yup';
import { regexs } from '../../../utils/regexs';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { refreshToken, useAuth } from '../../../contexts/AuthContext';
import { useRenamingName } from '../../../contexts/RenamingNameContext';

type RenameUsernameFormData = {
  name: string;
};

const RenameUsernameFormSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Nome obrigatório')
    .matches(regexs.cannotContainHashtag, 'O nome não pode conter #'),
});

export function RenameUsernameModal() {
  const { isOpen, onClose } = useRenameUsernameModal();

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

          const { auth } = await import('../../../services/firebase');

          const currentUser = auth.currentUser;

          if (!currentUser) return;

          const { setDoc, doc, deleteDoc } = await import('firebase/firestore');
          const { updateProfile } = await import('firebase/auth');
          const { db } = await import('../../../services/firebase');

          if (!user) return;

          const id = user.username.split('#')[1];

          const newName = `${name}#${id}`;

          await deleteDoc(doc(db, 'users', user.username));

          await setDoc(doc(db, 'users', newName), {
            uid: user.uid,
            onlineAt: 'now',
          });

          await updateProfile(currentUser, {
            displayName: newName,
          });

          await refreshToken();

          fillUser({ ...user, username: newName });

          onClose();
          resetForm();
        } catch {
          const { unknownErrorToast } = await import(
            '../../../utils/Toasts/unknownErrorToast'
          );

          unknownErrorToast();
        } finally {
          setRenamingName(false);
        }
      }),
    [handleSubmit, user, onClose, resetForm, fillUser, setRenamingName]
  );

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      modalTitle='Trocar nome de usuário'
    >
      <ModalFormControl>
        <ModalInput
          id='name'
          label='Nome'
          placeholder='Coloque seu novo nome'
          error={errors.name}
          register={register}
        />
        <Buttons
          confirmButtonProps={{
            onClick: handleRenameUsername,
            isLoading: isSubmitting,
          }}
          cancelButtonProps={{
            onClick: onClose,
          }}
          confirmButtonText='Trocar'
        />
      </ModalFormControl>
    </ModalWrapper>
  );
}
