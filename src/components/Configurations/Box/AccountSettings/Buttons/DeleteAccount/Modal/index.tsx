import { Flex } from '@chakra-ui/react';
import { ModalWrapper } from '../../../Modal/ModalWrapper';
import { WarningText } from './WarningText';
import { useDeleteAccountModal } from '../../../../contexts/Modal/DeleteAccountModalContext';
import { Content } from './Content';
import { Header } from './Header';

export function Modal() {
  const { isOpen, onClose } = useDeleteAccountModal();

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <Flex direction='column' align='center'>
        <Header />
        <Content />
        <WarningText />
      </Flex>
    </ModalWrapper>
  );
}
