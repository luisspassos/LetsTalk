import { ModalWrapper } from 'components/Modal/ModalWrapper';
import { useAddContactModal } from 'contexts/Modal/AddContactModalContext';
import { Form } from './Form';

export function Modal() {
  const { onClose, isOpen } = useAddContactModal();

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      modalTitle='Adicionar contato'
    >
      <Form />
    </ModalWrapper>
  );
}
