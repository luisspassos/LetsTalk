import { Button, Icon } from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import { useAddContactModal } from '../../../contexts/Modal/AddContactModalContext';

export function AddContactButton() {
  const { onOpen } = useAddContactModal();

  return (
    <Button
      w='min'
      pr='4px'
      fontSize={['17px', '20px', '23px']}
      fontWeight={400}
      color='gray.900'
      variant='link'
      leftIcon={<Icon as={IoMdAdd} fontSize={['27px', '32px', '35px']} />}
      justifyContent='start'
      onClick={onOpen}
    >
      Adicionar contato
    </Button>
  );
}
