import { useBlockUserModal } from 'contexts/Modal/BlockUserModalContext';
import { ModalWrapper } from 'components/Modal/ModalWrapper';
import { Content } from './Content';

export function Modal() {
  const { isOpen, onClose } = useBlockUserModal();

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <Content />
    </ModalWrapper>
  );
}
