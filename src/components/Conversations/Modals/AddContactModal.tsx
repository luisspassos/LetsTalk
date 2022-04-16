import { FormControl } from '@chakra-ui/react';
import { Input } from '../../Form/Input';
import { Buttons } from '../../Modal/Button/Buttons';
import { ModalWrapper } from '../../Modal/ModalWrapper';
import { useAddContactModal } from '../../../contexts/Modal/AddContactModalContext';
import { db } from '../../../services/firebase';
import { useAuth } from '../../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useMemo } from 'react';
import { unknownErrorToast } from '../../../utils/Toasts/unknownErrorToast';
import { firebaseAdmin } from '../../../services/firebaseAdmin';

type AddContactFormData = {
  contactName: string;
};

const addContactFormSchema = yup.object().shape({
  contactName: yup.string().trim().required('Usuário obrigatório'),
  // .matches(),
});
export function AddContactModal() {
  useEffect(() => {
    (async () => {
      const users = await firebaseAdmin.auth().listUsers(Infinity);
      console.log(users);
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddContactFormData>({
    resolver: yupResolver(addContactFormSchema),
  });

  const { isOpen, onClose } = useAddContactModal();
  const { user } = useAuth();

  const handleAddContact = useMemo(
    () =>
      handleSubmit(async ({ contactName }) => {
        const { setDoc, doc } = await import('firebase/firestore');

        if (user?.uid) {
          try {
            await setDoc(doc(db, 'conversations', user?.uid), {
              contactName,
            });
          } catch {
            unknownErrorToast();
          }
        }
      }),
    [handleSubmit, user?.uid]
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
          confirmButtonText='Adicionar'
        />
      </FormControl>
    </ModalWrapper>
  );
}
