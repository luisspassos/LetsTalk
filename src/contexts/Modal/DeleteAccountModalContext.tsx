import { createModalContext } from './createModalContext';

const { ModalProvider, useModal } = createModalContext();

export const DeleteAccountModalProvider = ModalProvider;

export const useDeleteAccountModal = useModal;
