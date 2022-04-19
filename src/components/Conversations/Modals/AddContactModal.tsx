import { FormControl } from '@chakra-ui/react';
import { Input } from '../../Form/Input';
import { Buttons } from '../../Modal/Button/Buttons';
import { ModalWrapper } from '../../Modal/ModalWrapper';
import { useAddContactModal } from '../../../contexts/Modal/AddContactModalContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMemo } from 'react';

type AddContactFormData = {
  contactName: string;
};

type AllUsersResponse = {
  arr: string[];
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
    formState: { errors, isSubmitting },
  } = useForm<AddContactFormData>({
    resolver: yupResolver(addContactFormSchema),
  });

  const { isOpen, onClose } = useAddContactModal();

  const handleAddContact = useMemo(
    () =>
      handleSubmit(async ({ contactName }) => {
        try {
          const { doc, getDoc } = await import('firebase/firestore');
          const { db } = await import('../../../services/firebase');

          const allUsersRef = doc(db, 'users', 'allUsers');
          const allUsersSnap = await getDoc(allUsersRef);

          const { arr: users } = allUsersSnap.data() as AllUsersResponse;

          if (users.includes(contactName)) {
            alert('Usuário encontrado');
          } else {
            setError();
          }
        } catch {}
      }),
    [handleSubmit, setError]
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
