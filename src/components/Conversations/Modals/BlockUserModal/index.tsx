import { Flex } from '@chakra-ui/react';
import { BiBlock } from 'react-icons/bi';
import { useBlockUserModal } from '../../../../contexts/Modal/BlockUserModalContext';
import { DangerousActionButtons } from '../../../Modal/DangerousAction/DangerousActionButtons';
import { DangerousActionIcon } from '../../../Modal/DangerousAction/DangerousActionIcon';
import { DangerousActionModalTitle } from '../../../Modal/DangerousAction/DangerousActionModalTitle';
import { ModalWrapper } from '../../../Modal/ModalWrapper';

export function BlockUserModal() {
  const { isOpen, onClose } = useBlockUserModal();

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <Flex direction='column' align='center' gap={['6px', '8px', '10px']}>
        <DangerousActionIcon Icon={BiBlock} />
        <DangerousActionModalTitle text='Você deseja bloquear Guilherme?' />
        <DangerousActionButtons confirmButtonText='Bloquear' />
      </Flex>
    </ModalWrapper>
  );
}
