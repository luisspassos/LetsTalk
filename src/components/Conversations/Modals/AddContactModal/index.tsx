import { useAddContactModal } from 'contexts/Modal/AddContactModalContext';
import { ModalWrapper } from '../../../Modal/ModalWrapper';
import { Form } from './Form';

export function AddContactModal() {
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
