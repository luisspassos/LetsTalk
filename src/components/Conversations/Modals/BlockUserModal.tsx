import { Flex, Heading, Icon } from '@chakra-ui/react';
import { BiBlock } from 'react-icons/bi';
import { useBlockUserModal } from '../../../contexts/Modal/BlockUserModalContext';
import { DangerousActionButtons } from '../../Modal/Button/DangerousActionButtons';
import { ModalWrapper } from '../../Modal/ModalWrapper';

export function BlockUserModal() {
  const { isOpen, onClose } = useBlockUserModal();

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <Flex direction='column' align='center' gap='10px'>
        <Icon color='red.600' fontSize='7xl' as={BiBlock} />
        <Heading textAlign='center' fontSize='22px' fontWeight={400}>
          Você deseja bloquear Guilherme?
        </Heading>
        <DangerousActionButtons confirmButtonText='Bloquear' />
      </Flex>
    </ModalWrapper>
  );
}
