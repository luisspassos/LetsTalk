import { ModalWrapper } from 'components/Modal/ModalWrapper';
import { useChangeEmailModal } from 'contexts/Modal/ChangeEmailModalContext';
import { Form } from './Form';

export function ChangeEmailModal() {
  const { isOpen, onClose } = useChangeEmailModal();

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} modalTitle='Trocar email'>
      <Form />
    </ModalWrapper>
  );
}
