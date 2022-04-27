import { FormControl } from '@chakra-ui/react';
import { Input } from '../../Form/Input';
import { Buttons } from '../../Modal/Button/Buttons';
import { ModalWrapper } from '../../Modal/ModalWrapper';
import { useAddContactModal } from '../../../contexts/Modal/AddContactModalContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMemo } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

type AddContactFormData = {
  contactName: string;
};

const addContactFormSchema = yup.object().shape({
  contactName: yup
    .string()
    .trim()
    .required('Usuário obrigatório')
    .matches(
      /^([^#])([^#]*#\d+)$/,
      'O usuário deve seguir este formato: usuario#1234'
    ),
});
export function AddContactModal() {
  const {
    register,
    handleSubmit,
    setError,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<AddContactFormData>({
    resolver: yupResolver(addContactFormSchema),
  });

  const { isOpen, onClose } = useAddContactModal();
  const { user } = useAuth();

  const username = user?.username;

  const handleAddContact = useMemo(
    () =>
      handleSubmit(async ({ contactName }) => {
        try {
          const { doc, getDoc } = await import('firebase/firestore');
          const { db } = await import('../../../services/firebase');

          const contactUserRef = doc(db, 'users', contactName);
          const contactUserSnap = await getDoc(contactUserRef);
          const contactExists = contactUserSnap.exists();

          if (username && contactExists && contactName !== username) {
            const { setDoc } = await import('firebase/firestore');

            const contactRef = doc(
              db,
              'conversations',
              username,
              'messages',
              contactName
            );
            const contactSnap = await getDoc(contactRef);

            if (contactSnap.exists()) {
              setError('contactName', {
                message: 'Este contato já existe',
              });
              return;
            }

            setDoc(contactRef, {});

            onClose();
            resetForm();
          } else {
            setError('contactName', {
              message:
                'Não foi possível adicionar este usuário, talvez ele não exista',
            });
          }
        } catch {
          const { unknownErrorToast } = await import(
            '../../../utils/Toasts/unknownErrorToast'
          );

          unknownErrorToast();
        }
      }),
    [handleSubmit, setError, username, onClose, resetForm]
  );

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      modalTitle='Adicionar contato'
    >
      <FormControl
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
      >
        <Input
          id='contactName'
          label='Usuário'
          error={errors.contactName}
          inputProps={{
            ...register('contactName'),
            placeholder: 'Insira um usuário, exemplo: usuario#1234',
            h: ['39px', '42px', '45px'],
            borderColor: 'blueAlpha.900',
            fontSize: ['14px', '15px', '16px'],
          }}
          labelProps={{
            color: 'gray.900',
            opacity: 1,
            fontSize: ['15px', '15.5px', '16px'],
          }}
          helperText='O nome de usuário com ID pode ser encontrado nas configurações ou
            clicando na foto na barra ao lado.'
        />
        <Buttons
          confirmButtonProps={{
            onClick: handleAddContact,
            isLoading: isSubmitting,
          }}
          cancelButtonProps={{
            onClick: onClose,
          }}
          confirmButtonText='Adicionar'
        />
      </FormControl>
    </ModalWrapper>
  );
}
