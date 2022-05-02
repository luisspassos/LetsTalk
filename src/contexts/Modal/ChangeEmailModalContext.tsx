import { createModalContext } from './createModalContext';

const { ModalProvider, useModal } = createModalContext();

export const ChangeEmailModalProvider = ModalProvider;

export const useChangeEmailModal = useModal;
