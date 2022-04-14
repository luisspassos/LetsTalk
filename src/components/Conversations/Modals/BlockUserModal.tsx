import { Heading, Icon } from '@chakra-ui/react';
import { BiBlock } from 'react-icons/bi';
import { useBlockUserModal } from '../../../contexts/Modal/BlockUserModalContext';
import { Buttons } from '../../Modal/Buttons';
import { ModalWrapper } from '../../Modal/ModalWrapper';

export function BlockUserModal() {
  const { isOpen, onClose } = useBlockUserModal();

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <Icon as={BiBlock} />
      <Heading>Você deseja bloquear Guilherme?</Heading>
      <Buttons confirmButtonText='Bloquear' />
    </ModalWrapper>
  );
}
