import { FormControl } from '@chakra-ui/react';
import { Input } from '../../Form/Input';
import { Buttons } from '../../Modal/Button/Buttons';
import { ModalWrapper } from '../../Modal/ModalWrapper';
import { useAddContactModal } from '../../../contexts/Modal/AddContactModalContext';
import { db } from '../../../services/firebase';
import { useAuth } from '../../../contexts/AuthContext';

export function AddContactModal() {
  const { isOpen, onClose } = useAddContactModal();
  const { user } = useAuth();

  async function handleAddContact() {
    const contactName = 'Luís#1234';
    const { setDoc, doc } = await import('firebase/firestore');

    if (user?.uid) {
      await setDoc(doc(db, 'conversations', user?.uid), {
        contactName,
      });
    }
  }

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
          id='username'
          label='Usuário'
          inputProps={{
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
          }}
          confirmButtonText='Adicionar'
        />
      </FormControl>
    </ModalWrapper>
  );
}
