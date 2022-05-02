import { createModalContext } from './createModalContext';

const { ModalProvider, useModal } = createModalContext();

export const RenameUsernameModalProvider = ModalProvider;

export const useRenameUsernameModal = useModal;
