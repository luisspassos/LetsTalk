import { Flex } from '@chakra-ui/react';
import { WarningText } from './WarningText';
import { Content } from './Content';
import { Header } from './Header';
import { ModalWrapper } from 'components/Modal/ModalWrapper';
import { useDeleteAccountModal } from 'contexts/Modal/DeleteAccountModalContext';

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
