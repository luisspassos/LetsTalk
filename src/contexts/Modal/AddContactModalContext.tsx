import { createModalContext } from './createModalContext';

const { ModalProvider, useModal } = createModalContext();

export const AddContactModalProvider = ModalProvider;

export const useAddContactModal = useModal;
