import { Button } from '@chakra-ui/react';
import { BiBlock } from 'react-icons/bi';
import { useBlockUserModal } from '../../../../../../../contexts/Modal/BlockUserModalContext';

export function BlockUserButton() {
  const { onOpen } = useBlockUserModal();

  return (
    <Button
      mt='5px'
      colorScheme='red'
      leftIcon={<BiBlock />}
      variant='ghost'
      pl='13px'
      fontWeight={400}
      onClick={onOpen}
    >
      Bloquear usuário
    </Button>
  );
}
