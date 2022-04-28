import { Flex } from '@chakra-ui/react';
import { useBlockUserModal } from '../../../../contexts/Modal/BlockUserModalContext';
import { DangerousActionButtons } from '../../../Modal/Button/DangerousActionButtons';
import { ModalWrapper } from '../../../Modal/ModalWrapper';
import { BlockIcon } from './BlockIcon';
import { BlockUserModalTitle } from './BlockUserModalTitle';

export function BlockUserModal() {
  const { isOpen, onClose } = useBlockUserModal();

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <Flex direction='column' align='center' gap={['6px', '8px', '10px']}>
        <BlockIcon />
        <BlockUserModalTitle />
        <DangerousActionButtons confirmButtonText='Bloquear' />
      </Flex>
    </ModalWrapper>
  );
}
