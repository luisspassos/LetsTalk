import { createModalContext } from './createModalContext';

const { ModalProvider, useModal } = createModalContext();

export const ChangePasswordModalProvider = ModalProvider;

export const useChangePasswordModal = useModal;
