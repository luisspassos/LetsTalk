import { ModalWrapper } from 'components/Modal/ModalWrapper';
import { useChangePasswordModal } from 'contexts/Modal/ChangePasswordModalContext';
import { Form } from './Form';

export function Modal() {
  const { isOpen, onClose } = useChangePasswordModal();

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} modalTitle='Trocar senha'>
      <Form />
    </ModalWrapper>
  );
}
