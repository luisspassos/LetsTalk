import { ModalWrapper } from 'components/Modal/ModalWrapper';
import { useRenameUsernameModal } from 'contexts/Modal/RenameUsernameModalContext';
import { Form } from './Form';

export function Modal() {
  const { isOpen, onClose } = useRenameUsernameModal();

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      modalTitle='Trocar nome de usuário'
    >
      <Form />
    </ModalWrapper>
  );
}
